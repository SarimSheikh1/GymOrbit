import { describe, expect, it } from "vitest";
import { can } from "./rbac";
describe("RBAC", () => { it("gives owners all permissions", () => expect(can("OWNER", "settings:write")).toBe(true)); it("keeps member portal-only", () => expect(can("MEMBER", "payments:write")).toBe(false)); });
