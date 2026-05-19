"use client";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, ReferenceLine, PieChart, Pie, Cell, Legend,
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

export function ProteinAdherenceChart({ data }: {
  data: { day: number; tracked: number; hit: number }[];
}) {
  const fmt = data.map(d => ({
    day: DAYS[d.day],
    pct: d.tracked > 0 ? Math.round((d.hit / d.tracked) * 100) : 0,
  }));
  return (
    <div className="bg-gray-900 rounded-xl p-5">
      <h3 className="font-semibold mb-1 text-gray-200">Adherencia proteína por día</h3>
      <p className="text-gray-500 text-xs mb-4">% de días que alcanzaste el objetivo (últimos 90 días)</p>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={fmt} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
          <XAxis dataKey="day" tick={{ fill: "#9ca3af", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} domain={[0, 100]} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ background: "#1f2937", border: "none", borderRadius: 8 }} formatter={(v) => [`${v}%`, "Adherencia"]} />
          <ReferenceLine y={80} stroke="#34d399" strokeDasharray="4 4" />
          <Bar dataKey="pct" radius={[4, 4, 0, 0]}
            fill="#818cf8"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
