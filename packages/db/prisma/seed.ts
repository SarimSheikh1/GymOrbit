import bcrypt from "bcryptjs";
import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("ChangeMe123!", 12);
  const branch = await prisma.branch.upsert({ where: { id: "demo-branch" }, update: {}, create: { id: "demo-branch", name: "GymOrbit Fitness", timezone: "Asia/Karachi" } });
  await prisma.user.upsert({ where: { email: "owner@gymorbit.test" }, update: {}, create: { name: "Demo Owner", email: "owner@gymorbit.test", passwordHash, role: Role.OWNER } });
  for (const plan of [{ name: "Monthly", durationDays: 30, price: 500000 }, { name: "Quarterly", durationDays: 90, price: 1350000 }, { name: "Annual", durationDays: 365, price: 4800000 }]) {
    await prisma.plan.upsert({ where: { name: plan.name }, update: plan, create: plan });
  }
  for (let index = 1; index <= 30; index++) {
    await prisma.member.upsert({ where: { memberCode: `GO-${String(index).padStart(6, "0")}` }, update: {}, create: { memberCode: `GO-${String(index).padStart(6, "0")}`, branchId: branch.id, name: `Demo Member ${index}`, phone: `0300${String(index).padStart(7, "0")}` } });
  }
}
main().finally(() => prisma.$disconnect());
