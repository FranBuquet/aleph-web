import { db } from "@/lib/db";
import { setSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SignJWT } from "jose";

export default async function MagicLinkPage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ r?: string }>;
}) {
  const { token } = await params;
  const { r } = await searchParams;

  const link = await db.magicLink.findUnique({ where: { token } });

  if (!link || link.used || link.expiresAt < new Date()) {
    redirect("/login?error=link_expired");
  }

  await db.magicLink.update({ where: { id: link.id }, data: { used: true } });

  const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? "dev-secret-change-me");
  const jwt = await new SignJWT({ phone: link.phone })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret);

  await setSession(jwt);

  const dest = r && r.startsWith("/dashboard") ? r : "/dashboard";
  redirect(dest);
}
