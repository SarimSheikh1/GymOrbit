"use server";
import { prisma } from "@gymorbit/db";
import { revalidatePath } from "next/cache";
import { requireStaff } from "../../lib/guards";
export async function createPlan(form: FormData) { await requireStaff(); const name = String(form.get("name") ?? "").trim(); const durationDays = Number(form.get("durationDays")); const price = Math.round(Number(form.get("price")) * 100); if (!name || !Number.isInteger(durationDays) || durationDays < 1 || !Number.isInteger(price) || price < 0) throw new Error("Enter a valid plan name, duration, and price"); await prisma.plan.create({ data: { name, durationDays, price, joiningFee: Math.round(Number(form.get("joiningFee") || 0) * 100), description: String(form.get("description") ?? "") || null } }); revalidatePath("/plans"); }
