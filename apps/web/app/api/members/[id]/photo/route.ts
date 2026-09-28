import { prisma } from "@gymorbit/db";
import { auth } from "../../../../../auth";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const maxBytes = 3 * 1024 * 1024;
export async function POST(request: Request, { params }: { params: { id: string } }) {
  if (!(await auth())?.user) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const form = await request.formData(); const file = form.get("photo");
  if (!(file instanceof File) || !file.type.startsWith("image/") || file.size > maxBytes) return Response.json({ error: "Upload a valid image smaller than 3 MB" }, { status: 400 });
  const extension = file.type === "image/png" ? "png" : "jpg"; const filename = `${params.id}-${crypto.randomUUID()}.${extension}`;
  const directory = join(process.cwd(), "public", "uploads"); await mkdir(directory, { recursive: true }); await writeFile(join(directory, filename), Buffer.from(await file.arrayBuffer()));
  const member = await prisma.member.update({ where: { id: params.id }, data: { photoUrl: `/uploads/${filename}` } });
  return Response.json({ photoUrl: member.photoUrl });
}
