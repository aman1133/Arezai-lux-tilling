import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { createSession } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body?.email ?? "")
      .trim()
      .toLowerCase();
    const password = String(body?.password ?? "");
    const name = String(body?.name ?? "").trim();

    if (!email || !password) {
      return Response.json(
        { ok: false, error: "Email and password are required" },
        { status: 400 },
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return Response.json(
        { ok: false, error: "Email is already registered" },
        { status: 409 },
      );
    }

    const hash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: { email, password: hash, name: name || null },
    });

    const { token } = await createSession(user.id);

    const cookieStore = await cookies();
    cookieStore.set("session", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return Response.json({ ok: true });
  } catch (err: any) {
    console.error(err);
    return Response.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
