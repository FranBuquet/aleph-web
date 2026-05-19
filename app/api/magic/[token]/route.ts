import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";

const COOKIE = "aleph_session";

export async function GET(req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const link = await db.magicLink.findUnique({ where: { token } });

  if (!link || link.used || link.expiresAt < new Date()) {
    return NextResponse.redirect(new URL("/login?error=link_expired", req.url));
  }

  await db.magicLink.update({ where: { id: link.id }, data: { used: true } });

  const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? "dev-secret-change-me");
  const jwt = await new SignJWT({ phone: link.phone })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret);

  const raw = req.nextUrl.searchParams.get("r") ?? "/dashboard";
  const redirectPath = raw.startsWith("/dashboard") ? raw : "/dashboard";
  const response = NextResponse.redirect(new URL(redirectPath, req.url));
  response.cookies.set(COOKIE, jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return response;
}
