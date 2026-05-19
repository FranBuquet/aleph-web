"use client";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  ReferenceLine, CartesianGrid,
} from "recharts";

export function PesoChart({ data, target }: { data: { date: string; weight: number }[]; target?: number }) {
  if (data.length === 0) return (
    <div className="bg-gray-900 rounded-xl p-5 flex items-center justify-center h-48">
      <p className="text-gray-500 text-sm">Sin registros de peso</p>
    </div>
  );

  const avg = data.reduce((s, d) => s + d.weight, 0) / data.length;

  return (
    <div className="bg-gray-900 rounded-xl p-5">
      <h3 className="font-semibold mb-4 text-gray-200">Peso corporal — últimos 90 días</h3>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="date" tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false}
            tickFormatter={d => d.slice(5)} interval="preserveStartEnd" />
          <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false}
            domain={["auto", "auto"]} tickFormatter={v => `${v}kg`} />
          <Tooltip contentStyle={{ background: "#1f2937", border: "none", borderRadius: 8 }}
            formatter={(v) => [`${v} kg`, "Peso"]}
            labelFormatter={l => new Date(l as string).toLocaleDateString("es-AR")} />
          <ReferenceLine y={avg} stroke="#818cf8" strokeDasharray="4 4"
            label={{ value: `prom ${avg.toFixed(1)}kg`, fill: "#818cf8", fontSize: 10 }} />
          {target && (
            <ReferenceLine y={target} stroke="#fbbf24" strokeDasharray="4 4"
              label={{ value: `objetivo ${target}kg`, fill: "#fbbf24", fontSize: 10 }} />
          )}
          <Line type="monotone" dataKey="weight" stroke="#34d399" strokeWidth={2}
            dot={data.length < 20} activeDot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function FrecuenciaChart({ data }: { data: { week: string; sessions: number }[] }) {
  return (
    <div className="bg-gray-900 rounded-xl p-5">
      <h3 className="font-semibold mb-1 text-gray-200">Sesiones por semana</h3>
      <p className="text-gray-500 text-xs mb-4">Últimas 12 semanas</p>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -24 }}>
          <XAxis dataKey="week" tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false}
            tickFormatter={w => w.slice(5)} />
          <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false}
            allowDecimals={false} />
          <Tooltip contentStyle={{ background: "#1f2937", border: "none", borderRadius: 8 }}
            formatter={(v) => [v, "Sesiones"]} />
          <Line type="monotone" dataKey="sessions" stroke="#818cf8" strokeWidth={2}
            dot activeDot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
