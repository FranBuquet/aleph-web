import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

async function getDashboardData(phone: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);
  const startOfWeek = new Date(today);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

  const [user, todayMeals, weekSessions, lastWeight] = await Promise.all([
    db.user.findUnique({ where: { phone } }),
    db.meal.findMany({
      where: { phone, date: { gte: today } },
      orderBy: { time: "asc" },
    }),
    db.workoutSession.count({
      where: { phone, date: { gte: startOfWeek } },
    }),
    db.bodyWeight.findFirst({
      where: { phone },
      orderBy: { date: "desc" },
    }),
  ]);

  const todayCalories = todayMeals.reduce((s, m) => s + m.calories, 0);
  const todayProtein = todayMeals.reduce((s, m) => s + m.protein, 0);

  return { user, todayMeals, todayCalories, todayProtein, weekSessions, lastWeight };
}

function StatCard({ label, value, sub, color = "indigo" }: {
  label: string; value: string; sub?: string; color?: string;
}) {
  const colors: Record<string, string> = {
    indigo: "text-indigo-400", green: "text-green-400", yellow: "text-yellow-400", blue: "text-blue-400"
  };
  return (
    <div className="bg-gray-900 rounded-xl p-5">
      <p className="text-gray-400 text-sm mb-1">{label}</p>
      <p className={`text-2xl font-bold ${colors[color] ?? colors.indigo}`}>{value}</p>
      {sub && <p className="text-gray-500 text-xs mt-1">{sub}</p>}
    </div>
  );
}

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const { user, todayMeals, todayCalories, todayProtein, weekSessions, lastWeight } =
    await getDashboardData(session.phone);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Buenos días";
    if (h < 19) return "Buenas tardes";
    return "Buenas noches";
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-1">
        {greeting()}{user?.name ? `, ${user.name.split(" ")[0]}` : ""}
      </h2>
      <p className="text-gray-400 text-sm mb-8">
        {new Date().toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" })}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <StatCard
          label="Calorías hoy"
          value={`${todayCalories}`}
          sub={user?.targetCalories ? `de ${user.targetCalories} kcal` : undefined}
          color="yellow"
        />
        <StatCard
          label="Proteína hoy"
          value={`${Math.round(todayProtein)}g`}
          sub={user?.targetProtein ? `de ${Math.round(user.targetProtein)}g` : undefined}
          color="indigo"
        />
        <StatCard
          label="Sesiones esta semana"
          value={`${weekSessions}`}
          sub={user?.trainingDays ? `objetivo: ${user.trainingDays}` : undefined}
          color="green"
        />
        <StatCard
          label="Peso actual"
          value={lastWeight ? `${lastWeight.weight} kg` : "—"}
          sub={lastWeight ? new Date(lastWeight.date).toLocaleDateString("es-AR") : "Sin registros"}
          color="blue"
        />
      </div>

      {todayMeals.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mb-4">Comidas de hoy</h3>
          <div className="space-y-3">
            {todayMeals.map((m) => (
              <div key={m.id} className="bg-gray-900 rounded-xl p-4 flex justify-between items-start">
                <div>
                  <p className="text-gray-200 font-medium capitalize">{m.meal}</p>
                  <p className="text-gray-400 text-sm">{m.description}</p>
                  <p className="text-gray-500 text-xs mt-1">{m.time}</p>
                </div>
                <div className="text-right text-sm">
                  <p className="text-yellow-400 font-medium">{m.calories} kcal</p>
                  <p className="text-gray-400">P: {Math.round(m.protein)}g</p>
                  <p className="text-gray-400">C: {Math.round(m.carbs)}g · G: {Math.round(m.fat)}g</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {todayMeals.length === 0 && (
        <div className="bg-gray-900 rounded-xl p-8 text-center">
          <p className="text-gray-400">Aún no registraste comidas hoy.</p>
          <p className="text-gray-500 text-sm mt-1">Contale al bot lo que comiste para verlo acá.</p>
        </div>
      )}
    </div>
  );
}
