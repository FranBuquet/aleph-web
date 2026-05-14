"use client";

import { m, useInView } from "framer-motion";
import { useRef } from "react";
import { useLang } from "./LanguageProvider";
import { content } from "@/lib/content";

const WA_LINK = "https://wa.me/12015348825";

export default function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { lang } = useLang();
  const c = content[lang].cta;

  return (
    <section className="bg-navy py-32 px-6">
      <div className="max-w-4xl mx-auto text-center" ref={ref}>
        <m.h2
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
        >
          {c.h2}
        </m.h2>

        <m.p
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-white/50 text-xl mb-10"
        >
          {c.sub}
        </m.p>

        <m.a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="inline-block bg-teal text-white font-semibold px-10 py-4 rounded-full text-lg hover:bg-teal-dark transition-colors shadow-lg shadow-teal/20"
        >
          {c.btn}
        </m.a>
      </div>
    </section>
  );
}
