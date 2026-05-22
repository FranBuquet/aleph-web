"use client";

import { m, useInView } from "framer-motion";
import { useRef } from "react";
import { ClipboardList, BarChart2, Bell, MessageCircle } from "lucide-react";
import { useLang } from "./LanguageProvider";
import { content } from "@/lib/content";

const ICONS = [ClipboardList, BarChart2, Bell, MessageCircle];

const WA_LINK = "https://wa.me/12015348825";

function ChatMockup({ messages }: { messages: { from: "pro" | "bot"; text: string }[]; inView: boolean }) {
  return (
    <div className="bg-[#1A2F45] rounded-2xl overflow-hidden shadow-2xl shadow-black/30 max-w-xs w-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
        <div className="w-8 h-8 rounded-full bg-teal flex items-center justify-center">
          <span className="text-navy font-bold text-sm">A</span>
        </div>
        <div>
          <p className="text-white text-sm font-semibold leading-none">Aleph</p>
          <p className="text-white/40 text-xs mt-0.5">en línea</p>
        </div>
      </div>

      {/* Messages */}
      <div className="px-4 py-4 space-y-3 min-h-[220px]">
        {messages.map((msg, i) => (
          <m.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 + i * 0.5 }}
            className={`flex ${msg.from === "pro" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs leading-relaxed whitespace-pre-line ${
                msg.from === "pro"
                  ? "bg-teal text-navy font-medium rounded-br-sm"
                  : "bg-white/10 text-white rounded-bl-sm"
              }`}
            >
              {msg.text}
            </div>
          </m.div>
        ))}
      </div>
    </div>
  );
}

export default function ProSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { lang } = useLang();
  const c = content[lang].pro;

  return (
    <section id="pro" className="py-32 px-6 bg-navy" ref={ref}>
      <div className="max-w-6xl mx-auto">

        {/* Top: copy + chat */}
        <div className="grid lg:grid-cols-5 gap-16 items-start mb-20">

          {/* Left col — copy + features */}
          <div className="lg:col-span-3">
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
              className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
            >
              {c.h2a}{" "}
              <span className="text-teal">{c.h2b}</span>
            </m.h2>

            <m.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white/50 text-lg leading-relaxed mb-10"
            >
              {c.sub}
            </m.p>

            {/* Feature grid 2×2 */}
            <div className="grid sm:grid-cols-2 gap-5">
              {c.features.map((feat, i) => {
                const Icon = ICONS[i];
                return (
                  <m.div
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-5"
                  >
                    <div className="w-9 h-9 rounded-xl bg-teal/15 flex items-center justify-center mb-3">
                      <Icon size={18} className="text-teal" />
                    </div>
                    <h3 className="text-white font-semibold text-sm mb-1">{feat.title}</h3>
                    <p className="text-white/45 text-sm leading-relaxed">{feat.body}</p>
                  </m.div>
                );
              })}
            </div>
          </div>

          {/* Right col — chat mockup */}
          <m.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="lg:col-span-2 flex justify-center lg:justify-end lg:pt-16"
          >
            <ChatMockup messages={c.chat} inView={inView} />
          </m.div>
        </div>

        {/* Pricing cards */}
        <m.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
            {c.plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex-1 max-w-xs rounded-2xl p-6 border transition-colors ${
                  plan.recommended
                    ? "border-teal bg-teal/5"
                    : "border-white/10 bg-white/5"
                }`}
              >
                {plan.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal text-navy text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    Más popular
                  </span>
                )}
                <p className="text-white font-bold text-lg mb-1">{plan.name}</p>
                <p className="text-white/40 text-sm mb-4">{plan.clients} clientes</p>
                <p className="text-white text-3xl font-bold">
                  {plan.price}
                  <span className="text-white/40 text-base font-normal">{plan.period}</span>
                </p>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-5 block text-center py-2.5 rounded-full text-sm font-semibold transition-colors ${
                    plan.recommended
                      ? "bg-teal text-navy hover:bg-teal-dark"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {c.cta}
                </a>
              </div>
            ))}
          </div>
          <p className="text-center text-white/25 text-xs">{c.plans_note}</p>
        </m.div>

      </div>
    </section>
  );
}
