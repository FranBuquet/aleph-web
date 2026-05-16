"use client";

import { m } from "framer-motion";
import { useLang } from "./LanguageProvider";
import { content } from "@/lib/content";

const WA_LINK = "https://wa.me/12015348825";

function MacroBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-xs">
        <span className="text-navy/50 font-medium">{label}</span>
        <span className="text-navy font-semibold">{value}g</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

function CardMacros({ c }: { c: typeof content["es"]["hero"] }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 24, rotate: -4 }}
      animate={{ opacity: 1, y: 0, rotate: -4 }}
      transition={{ duration: 0.7, delay: 0.5 }}
      style={{ rotate: "-4deg" }}
      className="absolute top-0 -left-6 w-56 bg-white rounded-2xl shadow-xl shadow-navy/10 border border-gray-100 p-4 z-20"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-navy/50 uppercase tracking-wide">{c.card_macros_label}</span>
        <span className="text-xs bg-teal/10 text-teal font-semibold px-2 py-0.5 rounded-full">{c.card_macros_pct}</span>
      </div>
      <div className="mb-3">
        <span className="text-2xl font-bold text-navy">{c.card_macros_kcal}</span>
        <span className="text-navy/40 text-sm ml-1">{c.card_macros_kcal_of}</span>
      </div>
      <div className="flex flex-col gap-2.5">
        <MacroBar label={c.card_macros_protein} value={156} max={192} color="#00C89E" />
        <MacroBar label={c.card_macros_carbs} value={198} max={240} color="#7EECD5" />
        <MacroBar label={c.card_macros_fat} value={61} max={75} color="#0D1B2A" />
      </div>
    </m.div>
  );
}

function CardWorkout({ c }: { c: typeof content["es"]["hero"] }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.7 }}
      className="absolute top-24 right-0 w-60 bg-navy rounded-2xl shadow-2xl shadow-navy/30 p-5 z-30"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 bg-teal/20 rounded-full flex items-center justify-center">
          <span className="text-sm">🏃</span>
        </div>
        <div>
          <p className="text-white text-xs font-semibold">{c.card_workout_synced}</p>
          <p className="text-white/40 text-xs">{c.card_workout_ago}</p>
        </div>
      </div>
      <p className="text-white font-bold text-base mb-3">{c.card_workout_title}</p>
      <div className="grid grid-cols-3 gap-2 text-center">
        {[["42 min", c.card_workout_duration], ["5:00", c.card_workout_pace], ["520 kcal", c.card_workout_burned]].map(([val, label]) => (
          <div key={label} className="bg-white/5 rounded-xl p-2">
            <p className="text-teal font-bold text-sm">{val}</p>
            <p className="text-white/40 text-[10px] mt-0.5">{label}</p>
          </div>
        ))}
      </div>
    </m.div>
  );
}

function CardFood({ c }: { c: typeof content["es"]["hero"] }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 24, rotate: 5 }}
      animate={{ opacity: 1, y: 0, rotate: 5 }}
      transition={{ duration: 0.7, delay: 0.9 }}
      style={{ rotate: "5deg" }}
      className="absolute bottom-0 left-8 w-52 bg-white rounded-2xl shadow-xl shadow-navy/10 border border-gray-100 p-4 z-20"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 bg-orange-50 rounded-xl flex items-center justify-center text-sm">📸</div>
        <div>
          <p className="text-navy text-xs font-semibold">{c.card_food_analyzed}</p>
          <p className="text-navy/40 text-xs">{c.card_food_meal}</p>
        </div>
      </div>
      <p className="text-navy font-semibold text-sm mb-1">{c.card_food_item}</p>
      <p className="text-2xl font-bold text-navy mb-2">480 <span className="text-sm font-normal text-navy/40">kcal</span></p>
      <div className="flex gap-2">
        {[["P", "42g", "text-teal"], ["C", "48g", "text-navy"], ["G", "12g", "text-navy/50"]].map(([l, v, cls]) => (
          <div key={l} className="flex-1 bg-gray-50 rounded-xl p-1.5 text-center">
            <p className={`text-xs font-bold ${cls}`}>{v}</p>
            <p className="text-navy/30 text-[10px]">{l}</p>
          </div>
        ))}
      </div>
    </m.div>
  );
}

export default function Hero() {
  const { lang } = useLang();
  const c = content[lang].hero;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-16">
      {/* Background glow — hidden on mobile, GPU-expensive on Safari */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] bg-teal-light/15 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 w-full py-24 grid lg:grid-cols-2 gap-16 items-center">
        {/* Copy */}
        <m.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 bg-teal/10 text-teal text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-teal rounded-full animate-pulse" />
            {c.badge}
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold text-navy leading-[1.05] tracking-tight mb-6">
            {c.h1a}{" "}
            <span className="text-teal">{c.h1b}</span>
          </h1>

          <p className="text-xl text-navy/60 leading-relaxed mb-10 max-w-lg">
            {c.sub}
          </p>

          <p className="text-sm text-navy/50 mb-6 flex items-center gap-1.5">
            <span className="text-teal font-bold">✓</span>
            {c.trial_note}
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-teal text-white font-semibold px-8 py-4 rounded-full text-lg hover:bg-teal-dark transition-colors shadow-lg shadow-teal/30"
            >
              {c.cta1}
            </a>
            <a
              href="#how"
              className="text-navy font-semibold px-8 py-4 rounded-full text-lg border border-navy/20 hover:border-navy/40 transition-colors"
            >
              {c.cta2}
            </a>
          </div>
        </m.div>

        {/* Floating cards */}
        <div className="hidden lg:flex justify-center items-center">
          <div className="relative w-[340px] h-[400px]">
            <CardMacros c={c} />
            <CardWorkout c={c} />
            <CardFood c={c} />
          </div>
        </div>
      </div>
    </section>
  );
}
