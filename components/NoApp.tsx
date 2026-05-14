"use client";

import { m, useInView } from "framer-motion";
import { useRef } from "react";
import { useLang } from "./LanguageProvider";
import { content } from "@/lib/content";

export default function NoApp() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { lang } = useLang();
  const c = content[lang].noApp;

  return (
    <section className="bg-navy text-white py-32 px-6">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <m.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-teal font-semibold text-sm uppercase tracking-widest mb-4"
        >
          {c.label}
        </m.p>
        <m.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl lg:text-5xl font-bold mb-16 max-w-2xl leading-tight"
        >
          {c.h2}
        </m.h2>

        <div className="grid md:grid-cols-3 gap-12">
          {c.points.map((p, i) => (
            <m.div
              key={p.number}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
            >
              <span className="text-teal text-5xl font-bold opacity-40">{p.number}</span>
              <h3 className="text-xl font-semibold mt-4 mb-2">{p.title}</h3>
              <p className="text-white/50 leading-relaxed">{p.body}</p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
