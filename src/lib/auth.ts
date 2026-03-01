import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export function newToken() {
  return crypto.randomBytes(32).toString("hex");
}

export async function createSession(userId: string) {
  const token = newToken();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30 days

  await prisma.session.create({
    data: { userId, token, expiresAt },
  });

  return { token, expiresAt };
}

export async function getUserFromSessionToken(token: string) {
  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!session) return null;
  if (session.expiresAt.getTime() < Date.now()) return null;

  return session.user;
}
