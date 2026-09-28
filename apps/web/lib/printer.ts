"use client";

export type Receipt = { receiptNo: string; member: string; total: number; method: string };
export async function printReceipt(receipt: Receipt) {
  const url = process.env.NEXT_PUBLIC_PRINTER_AGENT_URL ?? "http://127.0.0.1:9100";
  const token = process.env.NEXT_PUBLIC_PRINTER_AGENT_TOKEN ?? "change-me";
  try { const response = await fetch(`${url}/printreceipt`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify(receipt) }); if (!response.ok) throw new Error("Agent unavailable"); return { printed: true }; } catch { window.print(); return { printed: false }; }
}
