"use client";

import { useState, useEffect } from "react";

const WA_LINK = "https://wa.me/12015348825";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-navy flex items-center justify-center">
            <span className="text-teal font-bold text-base">A</span>
          </div>
          <span className="font-semibold text-navy text-lg tracking-tight">Aleph</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-navy/70">
          <a href="#audiences" className="hover:text-navy transition-colors">Para quién</a>
          <a href="#features" className="hover:text-navy transition-colors">Funciones</a>
          <a href="#how" className="hover:text-navy transition-colors">Cómo funciona</a>
        </div>

        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-teal text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-teal-dark transition-colors"
        >
          Empezar
        </a>
      </div>
    </nav>
  );
}
