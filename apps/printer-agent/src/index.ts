import { createServer } from "node:http";

const host = "127.0.0.1";
const port = Number(process.env.PORT ?? 9100);
const token = process.env.PRINTER_AGENT_TOKEN ?? "change-me";
const allowedOrigin = process.env.ALLOWED_ORIGIN ?? "http://localhost:3000";
type Job = { id: string; type: string; createdAt: string; status: "printed" | "failed"; payload: unknown };
const jobs: Job[] = [];

function reply(response: import("node:http").ServerResponse, status: number, body: unknown) { response.writeHead(status, { "Content-Type": "application/json" }); response.end(JSON.stringify(body)); }
function authorized(request: import("node:http").IncomingMessage) { return request.headers.authorization === `Bearer ${token}`; }
async function json(request: import("node:http").IncomingMessage) { const chunks: Buffer[] = []; let size = 0; for await (const chunk of request) { size += chunk.length; if (size > 100_000) throw new Error("Payload too large"); chunks.push(chunk); } return JSON.parse(Buffer.concat(chunks).toString() || "{}"); }

createServer(async (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", allowedOrigin); response.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
  if (request.method === "OPTIONS") { response.writeHead(204); response.end(); return; }
  if (request.url === "/health" && request.method === "GET") { reply(response, 200, { ok: true, version: "0.1.0", jobs: jobs.length }); return; }
  if (!authorized(request)) { reply(response, 401, { error: "Unauthorized" }); return; }
  if (request.url === "/printers" && request.method === "GET") { reply(response, 200, { printers: [{ name: "Browser fallback", type: "browser" }] }); return; }
  if (request.method === "POST" && ["/printreceipt", "/printcard", "/printpdf", "/printreport", "/printtest", "/draweropen"].includes(request.url ?? "")) {
    try { const payload = await json(request); const job: Job = { id: crypto.randomUUID(), type: request.url!.slice(1), createdAt: new Date().toISOString(), status: "printed", payload }; jobs.unshift(job); reply(response, 201, { jobId: job.id, status: job.status, fallback: "No native printer adapter configured" }); } catch (error) { reply(response, 400, { error: error instanceof Error ? error.message : "Invalid request" }); }
    return;
  }
  reply(response, 404, { error: "Not found" });
}).listen(port, host, () => console.info(`GymOrbit printer agent listening on http://${host}:${port}`));
