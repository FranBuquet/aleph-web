"use client";
import { useState, useTransition } from "react";
import PlanContent from "@/app/dashboard/plan/PlanContent";
import { updateClientPlan } from "./actions";

type Props = {
  clientPhone: string;
  type: string;
  title: string;
  content: string;
  updatedAt: Date;
};

export default function PlanEditor({ clientPhone, type, title, content, updatedAt }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(content);
  const [pending, startTransition] = useTransition();

  function handleSave() {
    startTransition(async () => {
      await updateClientPlan(clientPhone, type, draft);
      setEditing(false);
    });
  }

  return (
    <div className="bg-gray-900 rounded-xl p-6 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-base font-semibold text-gray-100">{title}</h4>
        <div className="flex items-center gap-3">
          <span className="text-gray-500 text-xs">
            Actualizado {new Date(updatedAt).toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" })}
          </span>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="text-xs px-3 py-1 rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-600/30 hover:bg-indigo-600/35 transition-colors"
            >
              Editar
            </button>
          )}
        </div>
      </div>

      {editing ? (
        <div className="space-y-3">
          <textarea
            value={draft}
            onChange={e => setDraft(e.target.value)}
            rows={20}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 text-sm font-mono focus:outline-none focus:border-indigo-500 resize-y"
          />
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => { setDraft(content); setEditing(false); }}
              disabled={pending}
              className="text-sm px-4 py-1.5 rounded-lg text-gray-400 hover:text-gray-200 disabled:opacity-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={pending}
              className="text-sm px-4 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-50 transition-colors font-medium"
            >
              {pending ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </div>
      ) : (
        <PlanContent content={content} />
      )}
    </div>
  );
}
