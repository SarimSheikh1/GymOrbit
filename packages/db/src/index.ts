import { PrismaClient } from "@prisma/client";

export { PrismaClient, PaymentMethod } from "@prisma/client";
const prismaClient = globalThis.__gymorbitPrisma ?? new PrismaClient();
export const prisma: PrismaClient = prismaClient;

if (process.env.NODE_ENV !== "production") globalThis.__gymorbitPrisma = prisma;

declare global {
  var __gymorbitPrisma: PrismaClient | undefined;
}
