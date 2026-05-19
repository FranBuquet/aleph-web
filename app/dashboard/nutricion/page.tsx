import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { MacroDonut, CaloriasWeekChart, MacroAdherenceChart } from "./NutricionCharts";

export const dynamic = "force-dynamic";

async function getNutricionData(phone: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const ago7 = new Date(today); ago7.setDate(ago7.getDate() - 7);
  const ago90 = new Date(today); ago90.setDate(ago90.getDate() - 90);

  const user = await db.user.findUnique({ where: { phone } });
  const tP = (user?.targetProtein ?? 0) * 0.9;
  const tC = (user?.targetCarbs ?? 0) * 0.9;
  const tF = (user?.targetFat ?? 0) * 0.9;

  const ago14 = new Date(today); ago14.setDate(ago14.getDate() - 14);
  const ago28 = new Date(today); ago28.setDate(ago28.getDate() - 28);

  type AdherenceRow = { dow: number; tracked: bigint; hit_protein: bigint; hit_carbs: bigint; hit_fat: bigint };
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

  const [todayMeals, weekMeals, adh7, adh14, adh28] = await Promise.all([
    db.meal.findMany({ where: { phone, date: { gte: today } }, orderBy: { time: "asc" } }),
    db.meal.groupBy({
      by: ["date"],
      where: { phone, date: { gte: ago7, lt: today } },
      _sum: { calories: true, protein: true, carbs: true, fat: true },
      orderBy: { date: "asc" },
    }),
    adherenceQuery(ago7),
    adherenceQuery(ago14),
    adherenceQuery(ago28),
  ]);

  const todayProtein = todayMeals.reduce((s, m) => s + m.protein, 0);
  const todayCarbs = todayMeals.reduce((s, m) => s + m.carbs, 0);
  const todayFat = todayMeals.reduce((s, m) => s + m.fat, 0);
  const todayCalories = todayMeals.reduce((s, m) => s + m.calories, 0);

  const weekData = weekMeals.map(d => ({
    date: d.date.toISOString().slice(0, 10),
    calories: d._sum.calories ?? 0,
  }));

  const toAdherence = (rows: { dow: number; tracked: bigint; hit_protein: bigint; hit_carbs: bigint; hit_fat: bigint }[]) =>
    rows.map(r => ({
      day: r.dow,
      tracked: Number(r.tracked),
      hitProtein: Number(r.hit_protein),
      hitCarbs: Number(r.hit_carbs),
      hitFat: Number(r.hit_fat),
    }));

  return {
    user, todayMeals, todayProtein, todayCarbs, todayFat, todayCalories,
    weekData,
    adherenceByPeriod: {
      week: toAdherence(adh7),
      twoWeeks: toAdherence(adh14),
      month: toAdherence(adh28),
    },
  };
}

export default async function NutricionPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const data = await getNutricionData(session.phone);
  const { user, todayMeals, todayProtein, todayCarbs, todayFat, todayCalories, weekData, adherenceByPeriod } = data;


  return (
    <div>
      <h2 className="text-2xl font-semibold mb-8">Nutrición</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <MacroDonut
          protein={todayProtein} carbs={todayCarbs} fat={todayFat}
          targetProtein={user?.targetProtein ?? undefined}
          targetCarbs={user?.targetCarbs ?? undefined}
          targetFat={user?.targetFat ?? undefined}
        />
        <CaloriasWeekChart data={weekData} target={user?.targetCalories ?? undefined} />
      </div>

      <div className="mb-6">
        <MacroAdherenceChart dataByPeriod={adherenceByPeriod} />
      </div>

      <h3 className="text-lg font-semibold mb-4">Comidas de hoy</h3>
      {todayMeals.length === 0 ? (
        <p className="text-gray-400">Sin comidas registradas hoy.</p>
      ) : (
        <div className="space-y-3">
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
    </div>
  );
}
