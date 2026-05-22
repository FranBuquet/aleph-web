import type { Metadata } from "next";
import { subscribeAction } from "@/app/actions/subscribe";

export const metadata: Metadata = {
  title: "Suscribite — Aleph",
  description: "7 días gratis, luego $9.900/mes. Cancelá cuando quieras.",
};

export default function SuscripcionPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-9 h-9 rounded-full bg-navy flex items-center justify-center">
            <span className="text-teal font-bold text-base">A</span>
          </div>
          <span className="font-semibold text-navy text-lg tracking-tight">Aleph</span>
        </div>

        <h1 className="text-3xl font-bold text-navy mb-2">Empezá tu prueba gratis</h1>
        <p className="text-navy/50 mb-8">
          7 días sin cargo · Luego <strong className="text-navy">$9.900/mes</strong> · Cancelá cuando quieras
        </p>

        <form action={subscribeAction} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-navy mb-1.5">Nombre</label>
            <input
              name="name"
              type="text"
              placeholder="Tu nombre"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-navy placeholder-navy/30 focus:outline-none focus:ring-2 focus:ring-teal/40"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-navy mb-1.5">
              WhatsApp (solo números, con código de país)
            </label>
            <input
              name="phone"
              type="tel"
              placeholder="541140783378"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-navy placeholder-navy/30 focus:outline-none focus:ring-2 focus:ring-teal/40"
            />
            <p className="text-xs text-navy/40 mt-1">Ej: 54 + código de área + número (sin el 9)</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-navy mb-1.5">Email</label>
            <input
              name="email"
              type="email"
              placeholder="tu@email.com"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-navy placeholder-navy/30 focus:outline-none focus:ring-2 focus:ring-teal/40"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal text-white font-semibold py-3.5 rounded-full hover:bg-teal-dark transition-colors mt-2"
          >
            Continuar con el pago →
          </button>
        </form>

        <p className="text-xs text-navy/30 text-center mt-6">
          Al continuar aceptás los{" "}
          <a href="/terminos" className="underline hover:text-navy">Términos y condiciones</a>.
          No se realiza ningún cobro durante los 7 días de prueba.
        </p>
      </div>
    </div>
  );
}
