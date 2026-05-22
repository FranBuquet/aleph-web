"use server";

import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";

export async function deleteRoutine(id: string) {
  const session = await getSession();
  if (!session) return;
  await db.routine.deleteMany({ where: { id, phone: session.phone } });
  revalidatePath("/dashboard/rutina");
}

export async function setActiveRoutine(id: string) {
  const session = await getSession();
  if (!session) return;
  await db.routine.updateMany({ where: { phone: session.phone }, data: { isActive: false } });
  await db.routine.updateMany({ where: { id, phone: session.phone }, data: { isActive: true } });
  revalidatePath("/dashboard/rutina");
}

export async function logWorkoutSession(payload: {
  routineName: string;
  dayName: string;
  exercises: { name: string; sets: number; reps: number; weight: number }[];
  notes?: string;
}) {
  const session = await getSession();
  if (!session) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  await db.workoutSession.create({
    data: {
      id: randomUUID(),
      phone: session.phone,
      date: today,
      dayName: payload.dayName,
      routineName: payload.routineName,
      notes: payload.notes || null,
      data: {
        exercises: payload.exercises.map(ex => ({
          name: ex.name,
          sets: Array.from({ length: ex.sets }, () => ({ reps: ex.reps, weight: ex.weight })),
        })),
      } as any,
    },
  });

  revalidatePath("/dashboard/rutina");
  revalidatePath("/dashboard/entrenamiento");
}
