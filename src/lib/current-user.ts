import { cookies } from "next/headers";
import { getUserFromSessionToken } from "@/lib/auth";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) return null;

  const user = await getUserFromSessionToken(token);
  return user;
}
