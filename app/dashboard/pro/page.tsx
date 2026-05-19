import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

function activityStatus(date: Date | null): "green" | "yellow" | "red" {
  if (!date) return "red";
  const days = Math.floor((Date.now() - date.getTime()) / 86_400_000);
  if (days <= 2) return "green";
  if (days <= 6) return "yellow";
  return "red";
}

function daysAgoLabel(date: Date | null): string {
  if (!date) return "Sin registros";
  const days = Math.floor((Date.now() - date.getTime()) / 86_400_000);
  if (days === 0) return "Hoy";
  if (days === 1) return "Ayer";
  return `Hace ${days} días`;
}

const DOT: Record<"green" | "yellow" | "red", string> = {
  green:  "bg-green-400",
  yellow: "bg-yellow-400",
  red:    "bg-red-500",
};

export default async function ProPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const proAccount = await db.professional.findUnique({
    where: { phone: session.phone },
    include: { clients: true },
  });

  // ── Non-pro landing ──────────────────────────────────────────
  if (!proAccount) {
    return (
      <div>
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-2xl font-semibold">Aleph Pro</h2>
          <span className="px-2 py-0.5 bg-indigo-600 text-white text-xs font-semibold rounded-full">Profesional</span>
        </div>

        <div className="max-w-xl">
          <p className="text-gray-300 mb-6">
            La cuenta Pro está diseñada para entrenadores personales y nutricionistas que quieren hacer un seguimiento centralizado de todos sus clientes desde el dashboard.
          </p>

          <div className="bg-gray-900 rounded-xl p-6 mb-6 space-y-4">
            <h3 className="font-semibold text-gray-200 mb-2">¿Qué incluye?</h3>
            {[
              ["Panel de clientes", "Todos tus clientes en un solo lugar con su estado de actividad en tiempo real."],
              ["Indicadores de actividad", "Semáforo verde / amarillo / rojo según cuándo registraron su última comida o entrenamiento."],
              ["Dashboards individuales", "Accedé al dashboard completo de cada cliente: peso, nutrición, adherencia a macros y sesiones."],
              ["Alertas automáticas por WhatsApp", "Recibís una notificación si un cliente lleva varios días sin registrar actividad."],
            ].map(([title, desc]) => (
              <div key={title} className="flex gap-3">
                <span className="mt-1 w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
                <div>
                  <p className="text-gray-200 text-sm font-medium">{title}</p>
                  <p className="text-gray-400 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-900 rounded-xl p-5 border border-indigo-800">
            <p className="text-gray-300 text-sm">
              Para activar tu cuenta Pro, escribile al bot de WhatsApp:
            </p>
            <p className="mt-2 font-mono text-indigo-400 text-sm">
              "Quiero activar mi cuenta Pro"
            </p>
            <p className="text-gray-500 text-xs mt-3">
              Un administrador procesará tu solicitud y recibirás confirmación por WhatsApp.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Pro client list ──────────────────────────────────────────
  const clientsData = await Promise.all(
    proAccount.clients.map(async (c) => {
      const [lastMeal, lastSession, user] = await Promise.all([
        db.meal.findFirst({
          where: { phone: c.clientPhone },
          orderBy: { date: "desc" },
          select: { date: true },
        }),
        db.workoutSession.findFirst({
          where: { phone: c.clientPhone },
          orderBy: { date: "desc" },
          select: { date: true },
        }),
        db.user.findUnique({
          where: { phone: c.clientPhone },
          select: { name: true, weight: true, targetWeight: true },
        }),
      ]);
      return {
        alias: c.alias,
        clientPhone: c.clientPhone,
        lastMeal: lastMeal?.date ?? null,
        lastSession: lastSession?.date ?? null,
        user,
      };
    })
  );

  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-2xl font-semibold">Aleph Pro</h2>
        <span className="px-2 py-0.5 bg-indigo-600 text-white text-xs font-semibold rounded-full">Profesional</span>
      </div>
      <p className="text-gray-400 text-sm mb-8">
        {proAccount.clients.length} / {proAccount.maxClients} clientes
      </p>

      {clientsData.length === 0 ? (
        <div className="bg-gray-900 rounded-xl p-8 text-center">
          <p className="text-gray-400 mb-2">Todavía no tenés clientes vinculados.</p>
          <p className="text-gray-500 text-sm">Usá el bot de WhatsApp para agregar un cliente: <span className="font-mono text-indigo-400">/addclient [número] [nombre]</span></p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {clientsData.map((c) => {
            const nutritionStatus = activityStatus(c.lastMeal);
            const trainingStatus = activityStatus(c.lastSession);
            const displayName = c.alias || c.user?.name || c.clientPhone;

            return (
              <div key={c.clientPhone} className="bg-gray-900 rounded-xl p-5 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-100">{displayName}</p>
                    {c.user?.weight && (
                      <p className="text-gray-500 text-xs mt-0.5">
                        {c.user.weight}kg{c.user.targetWeight ? ` → objetivo ${c.user.targetWeight}kg` : ""}
                      </p>
                    )}
                  </div>
                  <Link
                    href={`/dashboard/pro/${c.clientPhone}`}
                    className="text-indigo-400 hover:text-indigo-300 text-sm transition shrink-0 ml-4"
                  >
                    Ver dashboard →
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-800 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-2.5 h-2.5 rounded-full ${DOT[nutritionStatus]}`} />
                      <span className="text-gray-400 text-xs font-medium">Nutrición</span>
                    </div>
                    <p className="text-gray-300 text-xs">{daysAgoLabel(c.lastMeal)}</p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-2.5 h-2.5 rounded-full ${DOT[trainingStatus]}`} />
                      <span className="text-gray-400 text-xs font-medium">Entrenamiento</span>
                    </div>
                    <p className="text-gray-300 text-xs">{daysAgoLabel(c.lastSession)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
