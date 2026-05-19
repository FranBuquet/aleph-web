import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function RutinaPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const routines = await db.routine.findMany({ where: { phone: session.phone } });

  if (routines.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-8">Rutina</h2>
        <div className="bg-gray-900 rounded-xl p-8 text-center">
          <p className="text-gray-400">No tenés rutinas configuradas aún.</p>
          <p className="text-gray-500 text-sm mt-1">Pedile al bot que te arme una rutina.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-8">Rutina</h2>
      <div className="space-y-6">
        {routines.map(r => {
          const days = (r.data as any)?.days ?? [];
          return (
            <div key={r.id} className="bg-gray-900 rounded-xl p-5">
              <h3 className="font-semibold text-lg text-indigo-400 mb-4">{r.name}</h3>
              <div className="space-y-4">
                {days.map((day: any, i: number) => (
                  <div key={i}>
                    <p className="text-gray-300 font-medium mb-2">{day.name ?? day.dayName ?? `Día ${i + 1}`}</p>
                    {day.exercises && (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="text-gray-500 text-left border-b border-gray-800">
                              <th className="pb-2 pr-4">Ejercicio</th>
                              <th className="pb-2 pr-4">Series</th>
                              <th className="pb-2">Reps</th>
                            </tr>
                          </thead>
                          <tbody>
                            {day.exercises.map((ex: any, j: number) => (
                              <tr key={j} className="border-b border-gray-800/50 last:border-0">
                                <td className="py-2 pr-4 text-gray-200">{ex.name}</td>
                                <td className="py-2 pr-4 text-gray-400">{ex.plannedSets ?? ex.sets ?? "—"}</td>
                                <td className="py-2 text-gray-400">{ex.plannedReps ?? ex.reps ?? "—"}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
