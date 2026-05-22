"use client";

import { useState, useTransition } from "react";
import { logWorkoutSession } from "./actions";

type Exercise = {
  name: string;
  plannedSets?: string;
  sets?: string;
  plannedReps?: string;
  reps?: string;
};

function parsePlan(ex: Exercise): { sets: number; reps: number; label: string } {
  const setsStr = ex.plannedSets ?? ex.sets;
  const repsStr = ex.plannedReps ?? ex.reps;
  if (setsStr) {
    return {
      sets: parseInt(setsStr) || 3,
      reps: parseInt(repsStr ?? "10") || 10,
      label: repsStr ? `${setsStr}x${repsStr}` : setsStr,
    };
  }
  // Parse from name: "Press banca 4x6-8"
  const match = ex.name.match(/(\d+)\s*[xX×]\s*(\d+(?:-\d+)?)\s*$/);
  if (match) {
    return {
      sets: parseInt(match[1]),
      reps: parseInt(match[2]),
      label: `${match[1]}x${match[2]}`,
    };
  }
  return { sets: 3, reps: 10, label: "—" };
}

export default function WorkoutLogger({
  routineName,
  dayName,
  exercises,
  onClose,
}: {
  routineName: string;
  dayName: string;
  exercises: Exercise[];
  onClose: () => void;
}) {
  const plans = exercises.map(parsePlan);
  const [weights, setWeights] = useState<string[]>(exercises.map(() => ""));
  const [setsActual, setSetsActual] = useState<string[]>(plans.map(p => String(p.sets)));
  const [notes, setNotes] = useState("");
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleSubmit() {
    startTransition(async () => {
      await logWorkoutSession({
        routineName,
        dayName,
        exercises: exercises.map((ex, i) => ({
          name: ex.name,
          sets: parseInt(setsActual[i]) || plans[i].sets,
          reps: plans[i].reps,
          weight: parseFloat(weights[i]) || 0,
        })),
        notes: notes.trim() || undefined,
      });
      setDone(true);
    });
  }

  if (done) {
    return (
      <div className="mt-3 p-4 bg-green-900/20 border border-green-700/30 rounded-xl text-center">
        <p className="text-green-400 font-medium">✓ Sesión guardada</p>
        <button onClick={onClose} className="mt-1 text-xs text-gray-500 hover:text-gray-300 transition-colors">
          Cerrar
        </button>
      </div>
    );
  }

  return (
    <div className="mt-3 border-t border-gray-700/60 pt-4">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-500 text-left border-b border-gray-800">
              <th className="pb-2 pr-3">Ejercicio</th>
              <th className="pb-2 pr-3 text-center">Plan</th>
              <th className="pb-2 pr-3 text-center">Series</th>
              <th className="pb-2 text-center">Peso (kg)</th>
            </tr>
          </thead>
          <tbody>
            {exercises.map((ex, i) => (
              <tr key={i} className="border-b border-gray-800/40 last:border-0">
                <td className="py-2 pr-3 text-gray-200">{ex.name}</td>
                <td className="py-2 pr-3 text-center text-gray-500 text-xs tabular-nums">
                  {plans[i].label}
                </td>
                <td className="py-2 pr-3">
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={setsActual[i]}
                    onChange={e => {
                      const next = [...setsActual];
                      next[i] = e.target.value;
                      setSetsActual(next);
                    }}
                    className="w-14 text-center bg-gray-800 border border-gray-700 rounded px-1 py-1 text-gray-200 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </td>
                <td className="py-2">
                  <input
                    type="number"
                    min={0}
                    step={0.5}
                    placeholder="0"
                    value={weights[i]}
                    onChange={e => {
                      const next = [...weights];
                      next[i] = e.target.value;
                      setWeights(next);
                    }}
                    className="w-20 text-center bg-gray-800 border border-gray-700 rounded px-1 py-1 text-gray-200 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3">
        <input
          type="text"
          placeholder="Notas opcionales (ej: sentí el pecho cansado)"
          value={notes}
          onChange={e => setNotes(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-gray-200 text-sm placeholder:text-gray-600 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="flex gap-2 mt-3 justify-end">
        <button
          onClick={onClose}
          disabled={pending}
          className="text-sm px-4 py-1.5 rounded-lg text-gray-400 hover:text-gray-200 disabled:opacity-50 transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          disabled={pending}
          className="text-sm px-4 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-50 transition-colors font-medium"
        >
          {pending ? "Guardando..." : "Guardar sesión"}
        </button>
      </div>
    </div>
  );
}
