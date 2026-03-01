import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { getUserFromSessionToken } from "@/lib/auth";
import { sendEmail, escapeHtml } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    if (!token) {
      return Response.json(
        { ok: false, error: "Not signed in" },
        { status: 401 },
      );
    }

    const user = await getUserFromSessionToken(token);
    if (!user) {
      return Response.json(
        { ok: false, error: "Invalid session" },
        { status: 401 },
      );
    }

    const body = await req.json();
    const serviceType = String(body?.serviceType ?? "").trim();
    const address = String(body?.address ?? "").trim();
    const notes = String(body?.notes ?? "").trim();
    const startAtStr = String(body?.startAt ?? "").trim();

    if (!serviceType || !address || !startAtStr) {
      return Response.json(
        { ok: false, error: "serviceType, address and startAt are required" },
        { status: 400 },
      );
    }

    const startAt = new Date(startAtStr);
    if (Number.isNaN(startAt.getTime())) {
      return Response.json(
        { ok: false, error: "Invalid date/time" },
        { status: 400 },
      );
    }

    // Simple default duration: 2 hours
    const endAt = new Date(startAt.getTime() + 2 * 60 * 60 * 1000);

    // 1) Save booking to DB
    const created = await prisma.booking.create({
      data: {
        userId: user.id,
        serviceType,
        address,
        notes: notes || null,
        startAt,
        endAt,
        status: "PENDING",
      },
    });

    // 2) Send emails (admin + customer)
    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail) {
      console.warn("ADMIN_EMAIL is not set. Skipping email sending.");
      return Response.json({ ok: true, id: created.id, emailSent: false });
    }

    const preferred = startAt.toLocaleString();

    // Email to admin
    await sendEmail({
      to: adminEmail,
      subject: `New Booking Request: ${serviceType}`,
      replyTo: user.email,
      html: `
        <h2>New booking request</h2>
        <p><b>Customer:</b> ${escapeHtml(user.name || "-")} • ${escapeHtml(user.email)}</p>
        <p><b>Service:</b> ${escapeHtml(serviceType)}</p>
        <p><b>Preferred date/time:</b> ${escapeHtml(preferred)}</p>
        <p><b>Address:</b> ${escapeHtml(address)}</p>
        <p><b>Notes:</b><br/>${escapeHtml(notes || "-").replaceAll("\n", "<br/>")}</p>
        <p><b>Status:</b> PENDING</p>
        <p><b>Booking ID:</b> ${escapeHtml(created.id)}</p>
      `,
    });

    // Email to customer
    await sendEmail({
      to: user.email,
      subject: "Booking request received — Lux Tiling & Stone",
      html: `
    <p>Hi${user.name ? " " + escapeHtml(user.name) : ""},</p>
    <p>Thanks — we received your booking request and will confirm availability shortly.</p>

    <p><b>Service:</b> ${escapeHtml(serviceType)}</p>
    <p><b>Preferred date/time:</b> ${escapeHtml(preferred)}</p>
    <p><b>Address:</b> ${escapeHtml(address)}</p>

    <p>You can reply to this email with photos or additional details.</p>
    <p>Lux Tiling & Stone Services</p>
  `,
      replyTo: process.env.REPLY_TO_EMAIL || adminEmail, // ⭐ THIS is the correct placement
    });

    return Response.json({ ok: true, id: created.id, emailSent: true });
  } catch (err: any) {
    console.error(err);
    return Response.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
