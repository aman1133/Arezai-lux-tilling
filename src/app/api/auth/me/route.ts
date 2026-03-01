import { cookies } from "next/headers";
import { getUserFromSessionToken } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) return Response.json({ ok: true, user: null });

  const user = await getUserFromSessionToken(token);
  if (!user) return Response.json({ ok: true, user: null });

  return Response.json({
    ok: true,
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
  });
}
