"use server";

import { prisma, PaymentMethod } from "@gymorbit/db";
import { revalidatePath } from "next/cache";
import { requireStaff } from "../../lib/guards";

export async function recordPayment(form: FormData) {
  await requireStaff();
  const memberId = String(form.get("memberId") ?? ""); const amount = Math.round(Number(form.get("amount")) * 100); const method = String(form.get("method") ?? "CASH") as PaymentMethod;
  if (!memberId || !Number.isInteger(amount) || amount <= 0 || !Object.values(PaymentMethod).includes(method)) throw new Error("Enter a member, valid amount, and payment method");
  const member = await prisma.member.findUnique({ where: { id: memberId }, include: { subscriptions: { orderBy: { endDate: "desc" }, take: 1 } } });
  if (!member) throw new Error("Member not found"); const subscription = member.subscriptions[0]; const number = `INV-${new Date().getUTCFullYear()}-${String(await prisma.invoice.count() + 1).padStart(6, "0")}`;
  await prisma.$transaction(async (tx) => { const invoice = await tx.invoice.create({ data: { number, memberId, subscriptionId: subscription?.id, subtotal: amount, total: amount, paidAmount: amount, status: "PAID", items: { create: { description: subscription ? "Membership payment" : "Gym payment", unitPrice: amount, total: amount } } } }); const payment = await tx.payment.create({ data: { invoiceId: invoice.id, memberId, amount, method } }); await tx.ledgerEntry.create({ data: { branchId: member.branchId, paymentId: payment.id, type: "PAYMENT", amount, note: `Payment ${number}` } }); });
  revalidatePath("/payments"); revalidatePath("/");
}
