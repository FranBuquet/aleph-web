import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const COOKIE = "aleph_session";

export async function getSession(): Promise<{ phone: string } | null> {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (!token) return null;
  try {
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET ?? "dev-secret-change-me"
    );
    const { payload } = await jwtVerify(token, secret);
    return { phone: payload.phone as string };
  } catch {
    return null;
  }
}

export async function setSession(token: string): Promise<void> {
  const store = await cookies();
  store.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 días
    path: "/",
  });
}

export async function clearSession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE);
}
