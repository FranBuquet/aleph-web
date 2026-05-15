"use server";

import { redirect } from "next/navigation";
import { createAlephSubscription } from "@/lib/mercadopago";

export async function subscribeAction(formData: FormData) {
  const name  = (formData.get("name")  as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim().replace(/\D/g, "");
  const email = (formData.get("email") as string)?.trim();

  if (!name || !phone || !email) throw new Error("Completá todos los campos.");
  if (!/^\d{10,15}$/.test(phone)) throw new Error("Teléfono inválido (solo números, sin +).");
  if (!email.includes("@")) throw new Error("Email inválido.");

  const initPoint = await createAlephSubscription(phone, name, email);
  redirect(initPoint);
}
