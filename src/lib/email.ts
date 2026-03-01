import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function mustEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is not set`);
  return v;
}

export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const from = mustEnv("FROM_EMAIL");
  const defaultReplyTo = process.env.REPLY_TO_EMAIL; // ✅ new

  return resend.emails.send({
    from,
    to,
    subject,
    html,
    replyTo: replyTo || defaultReplyTo, // ✅ use default if not provided
  });
}

export function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
