"use server";

import { db } from "@/db";
import { residents } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getResidents() {
  try {
    return await db.query.residents.findMany({
      orderBy: (residents, { desc }) => [desc(residents.createdAt)],
    });
  } catch (error) {
    console.error("Failed to fetch residents:", error);
    return [];
  }
}

export async function addResident(data: any) {
  try {
    await db.insert(residents).values({
      nik: data.nik,
      name: data.name,
      age: data.age,
      address: data.address,
      kelurahan: data.kelurahan,
      testCount: data.testCount,
      lastTestDate: data.lastTestDate,
      lat: data.lat.toString(),
      lng: data.lng.toString(),
    });
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    console.error("Failed to add resident:", error);
    return { success: false, error: "Gagal menambah data. Pastikan NIK belum terdaftar." };
  }
}

export async function updateResidentTest(id: number, testCount: number, lastTestDate: string) {
  try {
    await db.update(residents)
      .set({ testCount, lastTestDate })
      .where(eq(residents.id, id));
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    console.error("Failed to update resident:", error);
    return { success: false };
  }
}

export async function seedResidents(data: any[]) {
  try {
    for (const item of data) {
      await db.insert(residents).values({
        nik: item.nik,
        name: item.name,
        age: item.age,
        address: item.address,
        kelurahan: item.kelurahan,
        testCount: item.testCount,
        lastTestDate: item.lastTestDate,
        lat: item.lat.toString(),
        lng: item.lng.toString(),
      }).onConflictDoNothing();
    }
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    console.error("Failed to seed residents:", error);
    return { success: false };
  }
}

export async function deleteResident(id: number) {
  try {
    await db.delete(residents).where(eq(residents.id, id));
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete resident:", error);
    return { success: false };
  }
}