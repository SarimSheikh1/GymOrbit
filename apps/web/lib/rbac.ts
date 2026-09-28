import type { UserRole } from "@gymorbit/shared";
const permissions: Record<UserRole, string[]> = { OWNER: ["*"], MANAGER: ["members:write", "plans:write", "payments:write", "attendance:write"], FRONT_DESK: ["members:read", "attendance:write", "payments:write"], TRAINER: ["members:read", "workouts:write"], MEMBER: ["portal:read"] };
export function can(role: UserRole, permission: string) { return permissions[role].includes("*") || permissions[role].includes(permission); }
export function requirePermission(role: UserRole, permission: string) { if (!can(role, permission)) throw new Error("FORBIDDEN"); }
