"use client";
import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  ReferenceLine, PieChart, Pie, Cell, Legend,
} from "recharts";

const COLORS = { protein: "#818cf8", carbs: "#34d399", fat: "#fbbf24" };
const DAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export function MacroDonut({ protein, carbs, fat, targetProtein, targetCarbs, targetFat }: {
  protein: number; carbs: number; fat: number;
  targetProtein?: number; targetCarbs?: number; targetFat?: number;
}) {
  const data = [
    { name: "Proteína", value: Math.round(protein), target: targetProtein },
    { name: "Carbos", value: Math.round(carbs), target: targetCarbs },
    { name: "Grasa", value: Math.round(fat), target: targetFat },
  ];
  return (
    <div className="bg-gray-900 rounded-xl p-5">
      <h3 className="font-semibold mb-4 text-gray-200">Macros de hoy</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={data} dataKey="value" cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3}>
            {data.map((_, i) => (
              <Cell key={i} fill={Object.values(COLORS)[i]} />
            ))}
          </Pie>
          <Tooltip formatter={(v) => `${v}g`} contentStyle={{ background: "#1f2937", border: "none", borderRadius: 8 }} />
          <Legend formatter={(v) => <span className="text-gray-300 text-sm">{v}</span>} />
        </PieChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-3 gap-2 mt-2">
        {data.map((d, i) => (
          <div key={i} className="text-center">
            <p className="text-xs text-gray-400">{d.name}</p>
            <p className="font-bold" style={{ color: Object.values(COLORS)[i] }}>{d.value}g</p>
            {d.target && <p className="text-xs text-gray-500">/ {Math.round(d.target)}g</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export function CaloriasWeekChart({ data, target }: {
  data: { date: string; calories: number }[];
  target?: number;
}) {
  const fmt = data.map(d => ({
    ...d,
    day: DAYS[new Date(d.date).getDay()],
  }));
  return (
    <div className="bg-gray-900 rounded-xl p-5">
      <h3 className="font-semibold mb-4 text-gray-200">Calorías — últimos 7 días</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={fmt} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
          <XAxis dataKey="day" tick={{ fill: "#9ca3af", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ background: "#1f2937", border: "none", borderRadius: 8 }} formatter={(v) => [`${v} kcal`, "Calorías"]} />
          {target && <ReferenceLine y={target} stroke="#fbbf24" strokeDasharray="4 4" label={{ value: "objetivo", fill: "#fbbf24", fontSize: 10 }} />}
          <Bar dataKey="calories" fill="#818cf8" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

type AdherenceRow = { day: number; tracked: number; hitProtein: number; hitCarbs: number; hitFat: number };
type Period = "week" | "twoWeeks" | "month";

const PERIOD_LABELS: Record<Period, string> = {
  week: "1 semana",
  twoWeeks: "2 semanas",
  month: "1 mes",
};

export function MacroAdherenceChart({ dataByPeriod }: {
  dataByPeriod: Record<Period, AdherenceRow[]>;
}) {
  const [period, setPeriod] = useState<Period>("month");
  const data = dataByPeriod[period];

  const fmt = [...data]
    .sort((a, b) => (a.day === 0 ? 7 : a.day) - (b.day === 0 ? 7 : b.day))
    .map(d => ({
      day: DAYS[d.day],
      protein: d.tracked > 0 ? Math.round((d.hitProtein / d.tracked) * 100) : 0,
      carbs: d.tracked > 0 ? Math.round((d.hitCarbs / d.tracked) * 100) : 0,
      fat: d.tracked > 0 ? Math.round((d.hitFat / d.tracked) * 100) : 0,
    }));

  return (
    <div className="bg-gray-900 rounded-xl p-5">
      <div className="flex items-start justify-between mb-1">
        <h3 className="font-semibold text-gray-200">Adherencia de macros por día de semana</h3>
        <div className="flex gap-1 shrink-0 ml-4">
          {(Object.keys(PERIOD_LABELS) as Period[]).map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-2 py-1 text-xs rounded-md transition ${
                period === p
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              {PERIOD_LABELS[p]}
            </button>
          ))}
        </div>
      </div>
      <p className="text-gray-500 text-xs mb-4">% de días que alcanzaste el objetivo de cada macro</p>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={fmt} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
          <XAxis dataKey="day" tick={{ fill: "#9ca3af", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} domain={[0, 100]} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ background: "#1f2937", border: "none", borderRadius: 8 }} formatter={(v) => [`${v}%`]} />
          <Legend formatter={(v) => <span className="text-gray-300 text-xs">{v}</span>} />
          <ReferenceLine y={80} stroke="#6b7280" strokeDasharray="4 4" />
          <Bar dataKey="protein" name="Proteína" fill={COLORS.protein} radius={[4, 4, 0, 0]} />
          <Bar dataKey="carbs" name="Carbos" fill={COLORS.carbs} radius={[4, 4, 0, 0]} />
          <Bar dataKey="fat" name="Grasa" fill={COLORS.fat} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
