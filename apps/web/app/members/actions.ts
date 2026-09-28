"use server";

import { prisma } from "@gymorbit/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireStaff } from "../../lib/guards";

function value(form: FormData, key: string) { return String(form.get(key) ?? "").trim(); }
export async function createMember(form: FormData) {
  await requireStaff();
  const name = value(form, "name"); const phone = value(form, "phone"); const planId = value(form, "planId");
  if (!name || !phone || !planId) throw new Error("Name, phone, and plan are required");
  const branch = await prisma.branch.findFirst(); const plan = await prisma.plan.findUnique({ where: { id: planId } });
  if (!branch || !plan) throw new Error("Set up a branch and active plan first");
  const count = await prisma.member.count(); const memberCode = `GO-${String(count + 1).padStart(6, "0")}`;
  const startDate = new Date(); const endDate = new Date(startDate); endDate.setUTCDate(endDate.getUTCDate() + plan.durationDays);
  await prisma.$transaction(async (tx) => {
    const member = await tx.member.create({ data: { name, phone, memberCode, branchId: branch.id, email: value(form, "email") || null, status: "ACTIVE" } });
    await tx.subscription.create({ data: { memberId: member.id, planId: plan.id, startDate, endDate, priceAtPurchase: plan.price } });
  });
  revalidatePath("/members"); redirect("/members");
}
