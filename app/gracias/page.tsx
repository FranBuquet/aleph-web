import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "¡Ya estás adentro! — Aleph",
};

const WA_LINK = "https://wa.me/12015348825?text=Hola%20Aleph%2C%20acabo%20de%20suscribirme%20%F0%9F%92%AA";

export default function GraciasPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-md text-center">
        <div className="w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">✅</span>
        </div>

        <h1 className="text-3xl font-bold text-navy mb-3">¡Tu prueba está activa!</h1>
        <p className="text-navy/50 mb-8">
          Tenés <strong className="text-navy">7 días gratis</strong>. Aleph ya te está esperando en WhatsApp.
        </p>

        <a
          href={WA_LINK}
          className="inline-block bg-teal text-white font-semibold px-8 py-4 rounded-full hover:bg-teal-dark transition-colors text-lg"
        >
          Abrir WhatsApp →
        </a>

        <p className="text-sm text-navy/30 mt-8">
          Si no recibiste confirmación por WhatsApp en los próximos minutos,{" "}
          <a href="mailto:alephcoachpartner@gmail.com" className="underline hover:text-navy">
            contactanos
          </a>.
        </p>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <Link href="/" className="text-teal text-sm font-semibold hover:opacity-80 transition-opacity">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
