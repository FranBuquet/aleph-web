"use client";
import { useState } from "react";
import Link from "next/link";

const links = [
  { href: "/dashboard", label: "Inicio" },
  { href: "/dashboard/nutricion", label: "Nutrición" },
  { href: "/dashboard/entrenamiento", label: "Entrenamiento" },
  { href: "/dashboard/rutina", label: "Rutina" },
  { href: "/dashboard/plan", label: "Mi Plan" },
  { href: "/dashboard/pro", label: "Pro" },
  { href: "/dashboard/perfil", label: "Perfil" },
];

export function NavMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden md:flex gap-5 text-sm text-gray-400">
        {links.map(l => (
          <Link key={l.href} href={l.href} className="hover:text-white transition">
            {l.label}
          </Link>
        ))}
        <form action="/api/logout" method="POST">
          <button type="submit" className="hover:text-white transition cursor-pointer">Salir</button>
        </form>
      </nav>

      {/* Mobile hamburger button */}
      <button
        className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
        onClick={() => setOpen(o => !o)}
        aria-label="Menú"
      >
        <span className={`block w-6 h-0.5 bg-gray-400 transition-transform duration-200 ${open ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block w-6 h-0.5 bg-gray-400 transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
        <span className={`block w-6 h-0.5 bg-gray-400 transition-transform duration-200 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden absolute top-[57px] left-0 right-0 bg-gray-900 border-b border-gray-800 z-50 flex flex-col py-2">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="px-6 py-3 text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition"
            >
              {l.label}
            </Link>
          ))}
          <form action="/api/logout" method="POST" className="px-6 py-3">
            <button type="submit" className="text-sm text-gray-400 hover:text-white transition cursor-pointer">
              Salir
            </button>
          </form>
        </div>
      )}
    </>
  );
}
