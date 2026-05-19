import { NextResponse } from "next/server";
import { setSession } from "@/lib/auth";

export async function POST(req: Request) {
  const { phone, otp } = await req.json();
  if (!phone || !otp) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const botUrl = process.env.BOT_URL;
  const apiKey = process.env.DASHBOARD_API_KEY;
  const res = await fetch(`${botUrl}/api/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-dashboard-key": apiKey ?? "" },
    body: JSON.stringify({ phone, otp }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    return NextResponse.json({ error: data.error ?? "Código inválido" }, { status: 401 });
  }

  const { token } = await res.json();
  await setSession(token);
  return NextResponse.json({ ok: true });
}
