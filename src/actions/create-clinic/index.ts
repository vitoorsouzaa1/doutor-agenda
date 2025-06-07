"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { db } from "@/src/db";
import { clinicsTable, usersToClinicsTable } from "@/src/db/schema";

export const createClinic = async (name: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  const [clinic] = await db.insert(clinicsTable).values({ name }).returning();
  await db.insert(usersToClinicsTable).values({
    userId: session.user.id,
    clinicId: clinic.id,
  });
  redirect("/dashboard");
};
