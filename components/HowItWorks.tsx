"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const STEPS = [
  {
    number: "01",
    title: "Escribís a Aleph por WhatsApp.",
    body: "Pedís acceso y en minutos estás hablando con tu coach. Sin descargas, sin formularios.",
  },
  {
    number: "02",
    title: "Hacés tu perfil en 5 minutos.",
    body: "Aleph te hace 9 preguntas simples: tu peso, tu deporte, tu objetivo. Con eso calcula tus macros diarios automáticamente.",
  },
  {
    number: "03",
    title: "Aleph te acompaña todos los días.",
    body: "Registrás comidas, entrenos y peso. Aleph trackea tu progreso y te ajusta el plan cuando cambia tu situación.",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="how" className="py-32 px-6 bg-white">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-teal font-semibold text-sm uppercase tracking-widest mb-4 text-center"
        >
          Cómo funciona
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl lg:text-5xl font-bold text-navy text-center mb-20 leading-tight"
        >
          Tres pasos y listo.
        </motion.h2>

        <div className="flex flex-col gap-0">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -32 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.18 }}
              className="flex gap-8 items-start relative pb-12 last:pb-0"
            >
              {/* Vertical line */}
              {i < STEPS.length - 1 && (
                <div className="absolute left-6 top-14 bottom-0 w-px bg-teal/20" />
              )}

              <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-teal font-bold text-sm">{step.number}</span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-navy mb-2">{step.title}</h3>
                <p className="text-navy/55 leading-relaxed max-w-lg">{step.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
