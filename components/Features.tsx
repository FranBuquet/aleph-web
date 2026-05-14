"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Camera, Watch, Calculator, BarChart3, Dumbbell, Microscope } from "lucide-react";

const FEATURES = [
  {
    icon: Camera,
    title: "Foto → macros en segundos",
    body: "Sacá una foto de tu plato. Aleph identifica la comida, estima la porción y registra los macros automáticamente.",
  },
  {
    icon: Watch,
    title: "Apple Watch + Strava",
    body: "Cada entrenamiento sincronizado llega solo a Aleph. Sin tener que escribir nada después de entrenar.",
  },
  {
    icon: Calculator,
    title: "Macros por deporte y objetivo",
    body: "Un runner necesita más carbos que alguien que hace fuerza. Aleph lo sabe y ajusta tus targets en consecuencia.",
  },
  {
    icon: BarChart3,
    title: "Historial nutricional de 3 días",
    body: "Aleph siempre tiene contexto de cómo comiste los últimos días para darte consejos precisos.",
  },
  {
    icon: Dumbbell,
    title: "Rutinas personalizadas por IA",
    body: "Describí tu objetivo y disponibilidad. Aleph arma tu rutina semanal o carga la que ya tenés.",
  },
  {
    icon: Microscope,
    title: "Composición corporal",
    body: "Cargá tu % de grasa de un estudio DEXA o bioimpedancia. Aleph lo usa para calcular tus macros con más precisión.",
  },
];

export default function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="features" className="py-32 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-teal font-semibold text-sm uppercase tracking-widest mb-4 text-center"
        >
          Funciones
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl lg:text-5xl font-bold text-navy text-center mb-16 leading-tight"
        >
          Todo lo que hace Aleph.
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 bg-teal/10 rounded-xl flex items-center justify-center mb-5">
                <f.icon size={20} className="text-teal" />
              </div>
              <h3 className="font-semibold text-navy mb-2">{f.title}</h3>
              <p className="text-navy/55 text-sm leading-relaxed">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
