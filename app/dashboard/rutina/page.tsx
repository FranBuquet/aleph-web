import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import RoutineList from "./RoutineList";

export const dynamic = "force-dynamic";

export default async function RutinaPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const rawRoutines = await db.routine.findMany({
    where: { phone: session.phone },
    orderBy: [{ isActive: "desc" }],
  });

  if (rawRoutines.length === 0) {
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

  // If none is marked active (existing data before this feature), treat the first as active visually
  const hasActive = rawRoutines.some(r => r.isActive);
  const routines = rawRoutines.map((r, i) => ({
    id: r.id,
    name: r.name,
    isActive: hasActive ? r.isActive : i === 0,
    days: ((r.data as any)?.days ?? []) as any[],
  }));

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-8">Rutina</h2>
      <RoutineList routines={routines} />
    </div>
  );
}
