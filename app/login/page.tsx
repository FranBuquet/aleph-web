"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleRequestOtp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });
    setLoading(false);
    if (res.ok) {
      setStep("otp");
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Error al enviar el código");
    }
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, otp }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/dashboard");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Código incorrecto");
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="bg-gray-900 rounded-2xl p-8 w-full max-w-sm shadow-xl">
        <h1 className="text-2xl font-bold text-white mb-1">Aleph</h1>
        <p className="text-gray-400 text-sm mb-6">Tu dashboard de salud</p>

        {step === "phone" ? (
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Número de WhatsApp</label>
              <input
                type="tel"
                placeholder="+5491112345678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500"
                autoFocus
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading || !phone}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg py-3 transition disabled:opacity-50"
            >
              {loading ? "Enviando..." : "Enviar código"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <p className="text-gray-400 text-sm">
              Te enviamos un código a <span className="text-white font-mono">{phone}</span> por WhatsApp.
            </p>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500 text-center text-2xl tracking-widest"
              autoFocus
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading || otp.length < 6}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg py-3 transition disabled:opacity-50"
            >
              {loading ? "Verificando..." : "Entrar"}
            </button>
            <button
              type="button"
              onClick={() => { setStep("phone"); setError(""); setOtp(""); }}
              className="w-full text-gray-500 text-sm hover:text-gray-300 transition"
            >
              Cambiar número
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
