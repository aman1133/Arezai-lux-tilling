import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { id } = await req.json();
  if (!id)
    return Response.json({ ok: false, error: "Missing id" }, { status: 400 });

  await prisma.galleryItem.delete({ where: { id } });
  return Response.json({ ok: true });
}
