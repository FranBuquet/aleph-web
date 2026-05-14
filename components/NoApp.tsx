"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const POINTS = [
  {
    number: "01",
    title: "Ya lo tenés instalado.",
    body: "WhatsApp está en casi todos los celulares del mundo. No hay nada que configurar.",
  },
  {
    number: "02",
    title: "Lo abrís 30 veces al día.",
    body: "El mejor hábito es el que ya existe. Aleph vive donde ya estás.",
  },
  {
    number: "03",
    title: "Sin fricción de ningún tipo.",
    body: "Sin registro, sin suscripción en la app, sin onboarding interminable. Solo escribís.",
  },
];

export default function NoApp() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-navy text-white py-32 px-6">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-teal font-semibold text-sm uppercase tracking-widest mb-4"
        >
          La ventaja clave
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl lg:text-5xl font-bold mb-16 max-w-2xl leading-tight"
        >
          No bajás ninguna app.
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-12">
          {POINTS.map((p, i) => (
            <motion.div
              key={p.number}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
            >
              <span className="text-teal text-5xl font-bold opacity-40">{p.number}</span>
              <h3 className="text-xl font-semibold mt-4 mb-2">{p.title}</h3>
              <p className="text-white/50 leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
