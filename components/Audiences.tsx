"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Watch, Salad, Users } from "lucide-react";

const CARDS = [
  {
    icon: Watch,
    tag: "El Atleta",
    title: "Rendimiento al máximo.",
    body: "Conectá tu Apple Watch o Strava. Aleph registra cada entrenamiento automáticamente, ajusta tus macros según tu deporte — running, fuerza, triatlón — y te muestra cómo viene tu recuperación.",
    highlights: ["Apple Watch + Strava", "Macros por deporte", "Seguimiento de cargas"],
  },
  {
    icon: Salad,
    tag: "Nutrición diaria",
    title: "Comé mejor sin complicarte.",
    body: "Sacá una foto de lo que comés y Aleph calcula los macros al instante. No hace falta ir al gym. Ideal para quien quiere cuidar su nutrición, controlar su peso o asegurarse de comer bien cada día.",
    highlights: ["Foto → macros automáticos", "Sin necesidad de ir al gym", "Seguimiento de 3 días"],
  },
  {
    icon: Users,
    tag: "El Coach",
    title: "Tu partner de alto rendimiento.",
    body: "Sumá a tus alumnos y seguí su nutrición, sus entrenamientos y su progreso desde un solo lugar. Aleph es el puente entre vos y el rendimiento de cada uno de ellos.",
    highlights: ["Gestión de alumnos", "Nutrición + entreno unificado", "Progresión de cargas"],
  },
];

export default function Audiences() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="audiences" className="py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-teal font-semibold text-sm uppercase tracking-widest mb-4 text-center"
        >
          Para quién
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl lg:text-5xl font-bold text-navy text-center mb-16 leading-tight"
        >
          Uno para todos.
        </motion.h2>

        <div className="grid lg:grid-cols-3 gap-8">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.tag}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="bg-gray-50 rounded-3xl p-8 flex flex-col"
            >
              <div className="w-12 h-12 bg-teal/10 rounded-2xl flex items-center justify-center mb-6">
                <card.icon size={24} className="text-teal" />
              </div>
              <span className="text-teal text-xs font-semibold uppercase tracking-widest mb-2">{card.tag}</span>
              <h3 className="text-xl font-bold text-navy mb-3">{card.title}</h3>
              <p className="text-navy/60 leading-relaxed mb-6 flex-1">{card.body}</p>
              <ul className="flex flex-col gap-2">
                {card.highlights.map(h => (
                  <li key={h} className="flex items-center gap-2 text-sm text-navy/70">
                    <span className="w-1.5 h-1.5 bg-teal rounded-full flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
