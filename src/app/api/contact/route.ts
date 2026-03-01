import { prisma } from "@/lib/prisma";
import { sendEmail, escapeHtml } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Contact API called:", body);

    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const phone = String(body?.phone ?? "").trim();
    const message = String(body?.message ?? "").trim();

    if (!name || !email || !message) {
      return Response.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    // 1) Save to DB
    const saved = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        phone: phone || null,
        message,
      },
    });

    console.log("Saved to DB:", saved);

    // 2) Send emails
    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail) {
      console.warn("ADMIN_EMAIL is not set. Skipping email sending.");
      return Response.json({ ok: true, id: saved.id, emailSent: false });
    }

    // Email to admin (reply-to is the customer)
    await sendEmail({
      to: adminEmail,
      subject: `New Contact Form: ${name}`,
      replyTo: email,
      html: `
        <h2>New contact submission</h2>
        <p><b>Name:</b> ${escapeHtml(name)}</p>
        <p><b>Email:</b> ${escapeHtml(email)}</p>
        <p><b>Phone:</b> ${escapeHtml(phone || "-")}</p>
        <p><b>Message:</b><br/>${escapeHtml(message).replaceAll("\n", "<br/>")}</p>
      `,
    });

    // Confirmation email to customer
    await sendEmail({
      to: email,
      subject: "Thanks for contacting Lux Tiling & Stone",
      html: `
        <p>Hi ${escapeHtml(name)},</p>
        <p>Thanks for your message. We received it and will get back to you soon.</p>
        <p><b>Your message:</b><br/>${escapeHtml(message).replaceAll("\n", "<br/>")}</p>
        <p>Lux Tiling & Stone Services</p>
      `,
    });

    return Response.json({ ok: true, id: saved.id, emailSent: true });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
