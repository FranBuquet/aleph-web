import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import PrintButton from "./PrintButton";

export const dynamic = "force-dynamic";

function PlanSection({ title, content, updatedAt }: { title: string; content: string; updatedAt: Date }) {
  const lines = content.split("\n");

  return (
    <div className="bg-gray-900 rounded-xl p-6 mb-6 print:bg-white print:border print:border-gray-200 print:rounded-none print:mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-100 print:text-gray-900">{title}</h3>
        <span className="text-gray-500 text-xs print:text-gray-400">
          Actualizado {updatedAt.toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" })}
        </span>
      </div>
      <div className="space-y-1">
        {lines.map((line, i) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={i} className="h-3" />;
          const isHeading = trimmed.endsWith(":") || /^[A-ZÁÉÍÓÚÑ\s]{4,}$/.test(trimmed) || trimmed.startsWith("##") || trimmed.startsWith("**");
          const isBullet = /^[-•*]\s/.test(trimmed);
          const cleanLine = trimmed.replace(/^##\s*/, "").replace(/^\*\*(.+)\*\*$/, "$1").replace(/^[-•*]\s/, "");

          if (isHeading) {
            return <p key={i} className="text-indigo-400 font-semibold text-sm mt-4 first:mt-0 print:text-indigo-700">{cleanLine}</p>;
          }
          if (isBullet) {
            return (
              <div key={i} className="flex gap-2">
                <span className="text-gray-500 mt-0.5 shrink-0">•</span>
                <p className="text-gray-300 text-sm print:text-gray-700">{cleanLine}</p>
              </div>
            );
          }
          return <p key={i} className="text-gray-300 text-sm print:text-gray-700">{trimmed}</p>;
        })}
      </div>
    </div>
  );
}

export default async function PlanPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const [diet, training] = await Promise.all([
    db.proPlan.findUnique({ where: { clientPhone_type: { clientPhone: session.phone, type: "diet" } } }),
    db.proPlan.findUnique({ where: { clientPhone_type: { clientPhone: session.phone, type: "training" } } }),
  ]);

  return (
    <div>
      <div className="flex items-center justify-between mb-8 print:hidden">
        <h2 className="text-2xl font-semibold">Mi Plan</h2>
        {(diet || training) && <PrintButton />}
      </div>

      <div className="hidden print:block mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Mi Plan — Aleph</h1>
      </div>

      {!diet && !training ? (
        <div className="bg-gray-900 rounded-xl p-8 text-center">
          <p className="text-gray-400 mb-2">Todavía no tenés un plan cargado.</p>
          <p className="text-gray-500 text-sm">Tu coach lo cargará desde WhatsApp y aparecerá aquí.</p>
        </div>
      ) : (
        <>
          {diet && <PlanSection title="🥗 Plan de alimentación" content={diet.content} updatedAt={diet.updatedAt} />}
          {training && <PlanSection title="🏋️ Rutina de entrenamiento" content={training.content} updatedAt={training.updatedAt} />}
        </>
      )}
    </div>
  );
}
