"use server";

import { auth } from "@/lib/auth";
import { db } from "@/src/db";
import { clinicsTable, usersToClinicsTable } from "@/src/db/schema";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const createClinic = async (name: string) => {
  const clinic = await db.insert(clinicsTable).values({
    name,
  });

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const [clinics] = await db
    .insert(clinicsTable)
    .values({
      name,
    })
    .returning();

  await db.insert(usersToClinicsTable).values({
    userId: session.user.id,
    clinicId: clinics.id,
  });
  redirect("/dashboard");
};
