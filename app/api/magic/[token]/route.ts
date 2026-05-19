import { db } from "@/lib/db";
import { setSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import { redirect } from "next/navigation";

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

  await setSession(jwt);

  const raw = req.nextUrl.searchParams.get("r") ?? "/dashboard";
  const redirectPath = raw.startsWith("/dashboard") ? raw : "/dashboard";
  redirect(redirectPath);
}
