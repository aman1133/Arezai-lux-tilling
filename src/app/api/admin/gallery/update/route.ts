import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json();
  const { id, title, description, sortOrder, isPublished } = body ?? {};

  if (!id)
    return Response.json({ ok: false, error: "Missing id" }, { status: 400 });

  const updated = await prisma.galleryItem.update({
    where: { id },
    data: {
      ...(title !== undefined ? { title } : {}),
      ...(description !== undefined ? { description } : {}),
      ...(sortOrder !== undefined ? { sortOrder: Number(sortOrder) } : {}),
      ...(isPublished !== undefined
        ? { isPublished: Boolean(isPublished) }
        : {}),
    },
  });

  return Response.json({ ok: true, item: updated });
}
