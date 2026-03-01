import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { email: true, name: true } },
    },
  });

  return Response.json({ ok: true, bookings });
}
