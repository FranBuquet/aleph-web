import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// Called on startup and by Railway healthcheck to pre-warm the Prisma connection pool.
// Without this, the first real request (e.g. magic link) can time out while
// the PostgreSQL connection is being established for the first time.
export async function GET() {
  try {
    await db.$queryRaw`SELECT 1`;
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 503 });
  }
}
