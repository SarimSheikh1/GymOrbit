"use server";

import { prisma } from "@gymorbit/db";
import { revalidatePath } from "next/cache";
import { requireStaff } from "../../lib/guards";

export async function checkIn(form: FormData) {
  await requireStaff();
  const lookup = String(form.get("lookup") ?? "").trim();
  if (!lookup) throw new Error("Enter a member code or phone number");
  const member = await prisma.member.findFirst({ where: { OR: [{ memberCode: lookup }, { phone: lookup }] }, include: { subscriptions: { where: { status: "ACTIVE" }, orderBy: { endDate: "desc" }, take: 1 } } });
  if (!member) throw new Error("Member not found");
  const subscription = member.subscriptions[0];
  if (!subscription || subscription.endDate < new Date()) throw new Error("Membership is expired or inactive");
  await prisma.attendance.create({ data: { memberId: member.id, branchId: member.branchId, method: lookup === member.memberCode ? "CODE" : "PHONE" } });
  revalidatePath("/attendance");
}
