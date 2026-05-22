"use client";

import { useState, useTransition } from "react";
import { deleteRoutine, setActiveRoutine } from "./actions";
import WorkoutLogger from "./WorkoutLogger";

type Exercise = {
  name: string;
  plannedSets?: string;
  sets?: string;
  plannedReps?: string;
  reps?: string;
};

type Day = {
  name?: string;
  dayName?: string;
  exercises?: Exercise[];
};

type Routine = {
  id: string;
  name: string;
  isActive: boolean;
  days: Day[];
};

type LoggingKey = { routineId: string; dayIdx: number } | null;

export default function RoutineList({ routines }: { routines: Routine[] }) {
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(routines.filter(r => r.isActive).map(r => r.id))
  );
  const [logging, setLogging] = useState<LoggingKey>(null);
  const [pending, startTransition] = useTransition();

  function toggle(id: string) {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function handleDelete(id: string) {
    if (!confirm("¿Eliminás esta rutina? Esta acción no se puede deshacer.")) return;
    startTransition(() => deleteRoutine(id));
  }

  function handleSetActive(id: string) {
    startTransition(() => setActiveRoutine(id));
  }

  function isLogging(routineId: string, dayIdx: number) {
    return logging?.routineId === routineId && logging?.dayIdx === dayIdx;
  }

  return (
    <div className="space-y-4">
      {routines.map(r => {
        const isOpen = expanded.has(r.id);
        return (
          <div
            key={r.id}
            className={`bg-gray-900 rounded-xl border ${r.isActive ? "border-indigo-500/50" : "border-gray-800"}`}
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-4">
              <button
                onClick={() => toggle(r.id)}
                className="flex-1 flex items-center gap-3 text-left"
              >
                <span className={`text-lg font-semibold ${r.isActive ? "text-indigo-400" : "text-gray-300"}`}>
                  {r.name}
                </span>
                {r.isActive && (
                  <span className="text-xs font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full px-2 py-0.5">
                    Oficial
                  </span>
                )}
                <span className="ml-auto text-gray-500 text-sm">{isOpen ? "▲" : "▼"}</span>
              </button>
              <div className="flex gap-2 shrink-0">
                {!r.isActive && (
                  <button
                    onClick={() => handleSetActive(r.id)}
                    disabled={pending}
                    className="text-xs px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-600/30 hover:bg-indigo-600/40 disabled:opacity-50 transition-colors"
                  >
                    Marcar oficial
                  </button>
                )}
                <button
                  onClick={() => handleDelete(r.id)}
                  disabled={pending}
                  className="text-xs px-3 py-1.5 rounded-lg bg-red-600/10 text-red-400 border border-red-600/20 hover:bg-red-600/25 disabled:opacity-50 transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>

            {/* Body — collapsible */}
            {isOpen && (
              <div className="px-4 pb-4 space-y-5 border-t border-gray-800 pt-4">
                {r.days.map((day, i) => {
                  const dayName = day.name ?? day.dayName ?? `Día ${i + 1}`;
                  const exercises = day.exercises ?? [];
                  const showLogger = isLogging(r.id, i);

                  return (
                    <div key={i}>
                      {/* Day header */}
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-gray-300 font-medium">{dayName}</p>
                        {exercises.length > 0 && !showLogger && (
                          <button
                            onClick={() => setLogging({ routineId: r.id, dayIdx: i })}
                            className="text-xs px-3 py-1 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-600/30 hover:bg-emerald-600/35 transition-colors"
                          >
                            + Registrar sesión
                          </button>
                        )}
                      </div>

                      {/* Exercise table */}
                      {exercises.length > 0 && (
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
                              {exercises.map((ex, j) => (
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

                      {/* Inline workout logger */}
                      {showLogger && (
                        <WorkoutLogger
                          routineName={r.name}
                          dayName={dayName}
                          exercises={exercises}
                          onClose={() => setLogging(null)}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
