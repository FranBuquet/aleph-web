import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

function Row({ label, value }: { label: string; value: string | number | null | undefined }) {
  return (
    <div className="flex justify-between py-3 border-b border-gray-800 last:border-0">
      <span className="text-gray-400 text-sm">{label}</span>
      <span className="text-gray-100 text-sm">{value ?? "—"}</span>
    </div>
  );
}

export default async function PerfilPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const user = await db.user.findUnique({ where: { phone: session.phone } });
  if (!user) redirect("/login");

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-8">Perfil</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 rounded-xl p-5">
          <h3 className="font-semibold mb-4 text-gray-200">Datos personales</h3>
          <Row label="Nombre" value={user.name} />
          <Row label="Edad" value={user.age ? `${user.age} años` : null} />
          <Row label="Peso" value={user.weight ? `${user.weight} kg` : null} />
          <Row label="Altura" value={user.height ? `${user.height} cm` : null} />
          <Row label="Sexo" value={user.sex} />
          <Row label="Nivel de actividad" value={user.activityLevel} />
          <Row label="Objetivo" value={user.fitnessGoal} />
          <Row label="Días de entrenamiento" value={user.trainingDays} />
        </div>

        <div className="bg-gray-900 rounded-xl p-5">
          <h3 className="font-semibold mb-4 text-gray-200">Macros objetivo diarios</h3>
          <Row label="Calorías" value={user.targetCalories ? `${user.targetCalories} kcal` : null} />
          <Row label="Proteína" value={user.targetProtein ? `${Math.round(user.targetProtein)}g` : null} />
          <Row label="Carbohidratos" value={user.targetCarbs ? `${Math.round(user.targetCarbs)}g` : null} />
          <Row label="Grasa" value={user.targetFat ? `${Math.round(user.targetFat)}g` : null} />
          {user.bodyFatPct && <Row label="% grasa corporal" value={`${user.bodyFatPct}%`} />}
          {user.leanMassKg && <Row label="Masa magra" value={`${user.leanMassKg} kg`} />}
        </div>
      </div>

      <p className="text-gray-600 text-xs mt-6 text-center">
        Para modificar tus datos, usá el bot de WhatsApp.
      </p>
    </div>
  );
}
