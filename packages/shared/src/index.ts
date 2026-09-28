import { z } from "zod";

export const userRoles = ["OWNER", "MANAGER", "FRONT_DESK", "TRAINER", "MEMBER"] as const;
export const userRoleSchema = z.enum(userRoles);
export type UserRole = z.infer<typeof userRoleSchema>;

export const moneySchema = z.number().int().nonnegative();
export const memberStatusSchema = z.enum(["ACTIVE", "EXPIRING", "EXPIRED", "FROZEN", "ARCHIVED"]);
