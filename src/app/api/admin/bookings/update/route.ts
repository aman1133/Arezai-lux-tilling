import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const allowed = new Set(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"]);

export async function POST(req: Request) {
  const body = await req.json();
  const id = String(body?.id ?? "");
  const status = String(body?.status ?? "");

  if (!id) {
    return Response.json({ ok: false, error: "Missing id" }, { status: 400 });
  }
  if (!allowed.has(status)) {
    return Response.json(
      { ok: false, error: "Invalid status" },
      { status: 400 },
    );
  }

  const updated = await prisma.booking.update({
    where: { id },
    data: { status: status as any },
  });

  return Response.json({ ok: true, booking: updated });
}
