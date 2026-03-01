import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /admin routes
  if (!pathname.startsWith("/admin")) return NextResponse.next();

  // Allow next.js internals
  if (pathname.startsWith("/_next")) return NextResponse.next();

  // If no session cookie, go to normal login
  const session = req.cookies.get("session")?.value;
  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Call /api/auth/me to check role (server-side)
  const meUrl = req.nextUrl.clone();
  meUrl.pathname = "/api/auth/me";

  const meRes = await fetch(meUrl, {
    headers: {
      cookie: `session=${session}`,
    },
  });

  if (!meRes.ok) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  const data = await meRes.json();
  const role = data?.user?.role;

  if (role !== "ADMIN") {
    const url = req.nextUrl.clone();
    url.pathname = "/account";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
