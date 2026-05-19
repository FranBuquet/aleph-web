import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { PesoChart, FrecuenciaChart } from "./EntrenamientoCharts";

export const dynamic = "force-dynamic";

async function getEntrenamientoData(phone: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const ago90 = new Date(today); ago90.setDate(ago90.getDate() - 90);
  const ago84 = new Date(today); ago84.setDate(ago84.getDate() - 84); // 12 semanas

  const [bodyWeights, recentSessions, weeklyRaw] = await Promise.all([
    db.bodyWeight.findMany({
      where: { phone, date: { gte: ago90 } },
      orderBy: { date: "asc" },
    }),
    db.workoutSession.findMany({
      where: { phone },
      orderBy: { date: "desc" },
      take: 10,
      select: { id: true, date: true, dayName: true, routineName: true, durationMin: true, data: true },
    }),
    db.$queryRaw<{ week: string; sessions: bigint }[]>`
      SELECT
        TO_CHAR(DATE_TRUNC('week', date), 'YYYY-MM-DD') AS week,
        COUNT(*) AS sessions
      FROM workout_sessions
      WHERE phone = ${phone} AND date >= ${ago84}
      GROUP BY week
      ORDER BY week
    `,
  ]);

  const weightData = bodyWeights.map(bw => ({
    date: bw.date.toISOString().slice(0, 10),
    weight: bw.weight,
  }));

  const weekData = weeklyRaw.map(r => ({
    week: r.week,
    sessions: Number(r.sessions),
  }));

  return { weightData, recentSessions, weekData };
}

function fmt(date: Date) {
  return new Date(date).toLocaleDateString("es-AR", { day: "numeric", month: "short" });
}

export default async function EntrenamientoPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const { weightData, recentSessions, weekData } = await getEntrenamientoData(session.phone);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-8">Entrenamiento</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <PesoChart data={weightData} />
        <FrecuenciaChart data={weekData} />
      </div>

      <h3 className="text-lg font-semibold mb-4">Últimas sesiones</h3>
      {recentSessions.length === 0 ? (
        <p className="text-gray-400">Sin sesiones registradas.</p>
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
                    <p>{fmt(s.date)}</p>
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
