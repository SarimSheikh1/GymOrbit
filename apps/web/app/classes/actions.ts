"use server";
import { prisma } from "@gymorbit/db";
import { revalidatePath } from "next/cache";
import { requireStaff } from "../../lib/guards";
export async function createClass(form: FormData) { await requireStaff(); const name = String(form.get("name") ?? "").trim(); const startsAt = new Date(String(form.get("startsAt") ?? "")); const duration = Number(form.get("duration") ?? 60); const capacity = Number(form.get("capacity") ?? 20); if (!name || Number.isNaN(startsAt.getTime()) || !Number.isInteger(capacity)) throw new Error("Enter valid class details"); const type = await prisma.classType.upsert({ where: { name }, update: { defaultCapacity: capacity }, create: { name, defaultCapacity: capacity } }); const endsAt = new Date(startsAt.getTime() + duration * 60_000); await prisma.classSession.create({ data: { classTypeId: type.id, startsAt, endsAt, room: String(form.get("room") ?? "") || null, capacity } }); revalidatePath("/classes"); }
