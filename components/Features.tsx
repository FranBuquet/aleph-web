"use client";

import { m, useInView } from "framer-motion";
import { useRef } from "react";
import { Camera, Watch, Calculator, BarChart3, Dumbbell, Microscope } from "lucide-react";
import { useLang } from "./LanguageProvider";
import { content } from "@/lib/content";

const ICONS = [Camera, Watch, Calculator, BarChart3, Dumbbell, Microscope];

export default function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { lang } = useLang();
  const c = content[lang].features;

  return (
    <section id="features" className="py-32 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <m.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-teal font-semibold text-sm uppercase tracking-widest mb-4 text-center"
        >
          {c.label}
        </m.p>
        <m.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl lg:text-5xl font-bold text-navy text-center mb-16 leading-tight"
        >
          {c.h2}
        </m.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {c.items.map((f, i) => {
            const Icon = ICONS[i];
            return (
              <m.div
                key={f.title}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 bg-teal/10 rounded-xl flex items-center justify-center mb-5">
                  <Icon size={20} className="text-teal" />
                </div>
                <h3 className="font-semibold text-navy mb-2">{f.title}</h3>
                <p className="text-navy/55 text-sm leading-relaxed">{f.body}</p>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
