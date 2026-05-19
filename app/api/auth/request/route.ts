import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { phone } = await req.json();
  if (!phone) return NextResponse.json({ error: "Phone required" }, { status: 400 });

  const sub = await db.subscription.findUnique({ where: { phone } });
  if (!sub || sub.status !== "active") {
    return NextResponse.json({ error: "Sin suscripción activa" }, { status: 403 });
  }

  const botUrl = process.env.BOT_URL;
  const apiKey = process.env.DASHBOARD_API_KEY;
  const res = await fetch(`${botUrl}/api/auth/send-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-dashboard-key": apiKey ?? "" },
    body: JSON.stringify({ phone }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Error enviando OTP" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
