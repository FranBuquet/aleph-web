import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("aleph_session")?.value;

  const isLoginPage = pathname === "/login";
  const isDashboard = pathname.startsWith("/dashboard");

  let valid = false;
  if (token) {
    try {
      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET ?? "dev-secret-change-me"
      );
      await jwtVerify(token, secret);
      valid = true;
    } catch {}
  }

  if (isDashboard && !valid) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (isLoginPage && valid) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
