"use server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function updateClientPlan(clientPhone: string, type: string, content: string) {
  const session = await getSession();
  if (!session) return;
  const pro = await db.professional.findUnique({
    where: { phone: session.phone },
    include: { clients: { where: { clientPhone } } },
  });
  if (!pro || pro.clients.length === 0) return;
  await db.proPlan.upsert({
    where: { clientPhone_type: { clientPhone, type } },
    update: { content },
    create: { clientPhone, type, content },
  });
  revalidatePath(`/dashboard/pro/${clientPhone}`);
}
