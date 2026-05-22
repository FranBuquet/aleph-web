import { db } from "@/lib/db";
import { setSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";

export async function GET(req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  // Railway runs the app on an internal port (localhost:3000) behind a reverse proxy.
  // req.url reflects the internal URL, so we reconstruct the public origin from
  // the forwarded headers that Railway injects.
  const proto = req.headers.get("x-forwarded-proto") ?? "https";
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? "aleph-webapp-production.up.railway.app";
  const origin = `${proto}://${host}`;

  const link = await db.magicLink.findUnique({ where: { token } });

  if (!link || link.used || link.expiresAt < new Date()) {
    return NextResponse.redirect(`${origin}/login?error=link_expired`);
  }

  await db.magicLink.update({ where: { id: link.id }, data: { used: true } });

  const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? "dev-secret-change-me");
  const jwt = await new SignJWT({ phone: link.phone })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret);

  await setSession(jwt);

  const raw = req.nextUrl.searchParams.get("r") ?? "/dashboard";
  const redirectPath = raw.startsWith("/dashboard") ? raw : "/dashboard";
  return NextResponse.redirect(`${origin}${redirectPath}`);
}
