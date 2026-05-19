import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { MacroDonut, CaloriasWeekChart, MacroAdherenceChart } from "../../nutricion/NutricionCharts";
import { PesoChart, FrecuenciaChart } from "../../entrenamiento/EntrenamientoCharts";

export const dynamic = "force-dynamic";

type AdherenceRow = { dow: number; tracked: bigint; hit_protein: bigint; hit_carbs: bigint; hit_fat: bigint };

async function getClientData(phone: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const ago7  = new Date(today); ago7.setDate(ago7.getDate() - 7);
  const ago14 = new Date(today); ago14.setDate(ago14.getDate() - 14);
  const ago28 = new Date(today); ago28.setDate(ago28.getDate() - 28);
  const ago84 = new Date(today); ago84.setDate(ago84.getDate() - 84);
  const ago90 = new Date(today); ago90.setDate(ago90.getDate() - 90);

  const user = await db.user.findUnique({ where: { phone } });
  const tP = (user?.targetProtein ?? 0) * 0.9;
  const tC = (user?.targetCarbs ?? 0) * 0.9;
  const tF = (user?.targetFat ?? 0) * 0.9;

  const adherenceQuery = (from: Date) => db.$queryRaw<AdherenceRow[]>`
    SELECT
      EXTRACT(DOW FROM date)::int AS dow,
      COUNT(*) AS tracked,
      COUNT(CASE WHEN protein >= ${tP} THEN 1 END) AS hit_protein,
      COUNT(CASE WHEN carbs >= ${tC} THEN 1 END) AS hit_carbs,
      COUNT(CASE WHEN fat >= ${tF} THEN 1 END) AS hit_fat
    FROM (
      SELECT date, SUM(protein) AS protein, SUM(carbs) AS carbs, SUM(fat) AS fat
      FROM meals
      WHERE phone = ${phone} AND date >= ${from}
      GROUP BY date
    ) daily
    GROUP BY dow
  `;

  const [
    todayMeals, weekMeals,
    adh7, adh14, adh28,
    bodyWeights, recentSessions, weeklyRaw,
  ] = await Promise.all([
    db.meal.findMany({ where: { phone, date: { gte: today } }, orderBy: { time: "asc" } }),
    db.meal.groupBy({
      by: ["date"],
      where: { phone, date: { gte: ago7, lt: today } },
      _sum: { calories: true },
      orderBy: { date: "asc" },
    }),
    adherenceQuery(ago7),
    adherenceQuery(ago14),
    adherenceQuery(ago28),
    db.bodyWeight.findMany({ where: { phone, date: { gte: ago90 } }, orderBy: { date: "asc" } }),
    db.workoutSession.findMany({
      where: { phone },
      orderBy: { date: "desc" },
      take: 5,
      select: { id: true, date: true, dayName: true, routineName: true, durationMin: true, data: true },
    }),
    db.$queryRaw<{ week: string; sessions: bigint }[]>`
      SELECT TO_CHAR(DATE_TRUNC('week', date), 'YYYY-MM-DD') AS week, COUNT(*) AS sessions
      FROM workout_sessions
      WHERE phone = ${phone} AND date >= ${ago84}
      GROUP BY week ORDER BY week
    `,
  ]);

  const toAdherence = (rows: AdherenceRow[]) =>
    rows.map(r => ({
      day: r.dow,
      tracked: Number(r.tracked),
      hitProtein: Number(r.hit_protein),
      hitCarbs: Number(r.hit_carbs),
      hitFat: Number(r.hit_fat),
    }));

  return {
    user,
    todayMeals,
    todayProtein: todayMeals.reduce((s, m) => s + m.protein, 0),
    todayCarbs:   todayMeals.reduce((s, m) => s + m.carbs, 0),
    todayFat:     todayMeals.reduce((s, m) => s + m.fat, 0),
    todayCalories: todayMeals.reduce((s, m) => s + m.calories, 0),
    caloriesWeekData: weekMeals.map(d => ({ date: d.date.toISOString().slice(0, 10), calories: d._sum.calories ?? 0 })),
    adherenceByPeriod: {
      week: toAdherence(adh7),
      twoWeeks: toAdherence(adh14),
      month: toAdherence(adh28),
    },
    weightData: bodyWeights.map(bw => ({ date: bw.date.toISOString().slice(0, 10), weight: bw.weight })),
    recentSessions,
    sessionsWeekData: weeklyRaw.map(r => ({ week: r.week, sessions: Number(r.sessions) })),
  };
}

function fmtDate(date: Date) {
  return new Date(date).toLocaleDateString("es-AR", { day: "numeric", month: "short" });
}

export default async function ClientDashboardPage({ params }: { params: { clientPhone: string } }) {
  const session = await getSession();
  if (!session) redirect("/login");

  const proAccount = await db.professional.findUnique({
    where: { phone: session.phone },
    include: { clients: { where: { clientPhone: params.clientPhone } } },
  });
  if (!proAccount || proAccount.clients.length === 0) redirect("/dashboard/pro");

  const clientRecord = proAccount.clients[0];
  const data = await getClientData(params.clientPhone);
  const { user, todayMeals, todayProtein, todayCarbs, todayFat, todayCalories,
          caloriesWeekData, adherenceByPeriod, weightData, recentSessions, sessionsWeekData } = data;

  const displayName = clientRecord.alias || user?.name || params.clientPhone;

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/pro" className="text-gray-400 hover:text-white transition text-sm">
          ← Volver
        </Link>
        <h2 className="text-2xl font-semibold">{displayName}</h2>
      </div>

      {/* Nutrición */}
      <h3 className="text-lg font-semibold mb-4 text-gray-300">Nutrición</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <MacroDonut
          protein={todayProtein} carbs={todayCarbs} fat={todayFat}
          targetProtein={user?.targetProtein ?? undefined}
          targetCarbs={user?.targetCarbs ?? undefined}
          targetFat={user?.targetFat ?? undefined}
        />
        <CaloriasWeekChart data={caloriesWeekData} target={user?.targetCalories ?? undefined} />
      </div>
      <div className="mb-8">
        <MacroAdherenceChart dataByPeriod={adherenceByPeriod} />
      </div>

      {/* Entrenamiento */}
      <h3 className="text-lg font-semibold mb-4 text-gray-300">Entrenamiento</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <PesoChart data={weightData} target={user?.targetWeight ?? undefined} />
        <FrecuenciaChart data={sessionsWeekData} />
      </div>

      {/* Comidas de hoy */}
      <h3 className="text-lg font-semibold mb-4 text-gray-300">Comidas de hoy</h3>
      {todayMeals.length === 0 ? (
        <p className="text-gray-500 mb-8">Sin comidas registradas hoy.</p>
      ) : (
        <div className="space-y-3 mb-8">
          {todayMeals.map(m => (
            <div key={m.id} className="bg-gray-900 rounded-xl p-4 flex justify-between items-start">
              <div>
                <p className="text-gray-200 font-medium capitalize">{m.meal} · {m.time}</p>
                <p className="text-gray-400 text-sm">{m.description}</p>
              </div>
              <div className="text-right text-sm shrink-0 ml-4">
                <p className="text-yellow-400 font-medium">{m.calories} kcal</p>
                <p className="text-gray-400">P:{Math.round(m.protein)}g C:{Math.round(m.carbs)}g G:{Math.round(m.fat)}g</p>
              </div>
            </div>
          ))}
          <div className="bg-gray-800 rounded-xl p-4 flex justify-between">
            <span className="text-gray-300 font-medium">Total hoy</span>
            <div className="text-right text-sm">
              <span className="text-yellow-400 font-bold">{todayCalories} kcal</span>
              <span className="text-gray-400 ml-3">P:{Math.round(todayProtein)}g C:{Math.round(todayCarbs)}g G:{Math.round(todayFat)}g</span>
            </div>
          </div>
        </div>
      )}

      {/* Últimas sesiones */}
      <h3 className="text-lg font-semibold mb-4 text-gray-300">Últimas sesiones</h3>
      {recentSessions.length === 0 ? (
        <p className="text-gray-500">Sin sesiones registradas.</p>
      ) : (
        <div className="space-y-3">
          {recentSessions.map(s => {
            const exercises = (s.data as any)?.exercises ?? [];
            return (
              <div key={s.id} className="bg-gray-900 rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-gray-200 font-medium">{s.dayName}</p>
                    {s.routineName && <p className="text-gray-500 text-xs">{s.routineName}</p>}
                  </div>
                  <div className="text-right text-sm text-gray-400">
                    <p>{fmtDate(s.date)}</p>
                    {s.durationMin && <p>{s.durationMin} min</p>}
                  </div>
                </div>
                {exercises.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {exercises.map((ex: any, i: number) => (
                      <span key={i} className="px-2 py-0.5 bg-gray-800 text-gray-300 text-xs rounded-full">
                        {ex.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
