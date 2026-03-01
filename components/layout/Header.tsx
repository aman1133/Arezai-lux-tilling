import Link from "next/link";
import { site } from "../../lib/site";
import { getCurrentUser } from "@/lib/current-user";

const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
  { href: "/book", label: "Book" },
];

export default async function Header() {
  const user = await getCurrentUser();

  return (
    <header className="w-full border-b bg-white">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-10 w-10 rounded bg-black" />
          <div className="leading-tight">
            <div className="font-semibold">{site.name}</div>
            <div className="text-xs text-gray-600">{site.serviceArea}</div>
          </div>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6">
          {nav.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="text-sm hover:underline"
            >
              {i.label}
            </Link>
          ))}
        </nav>

        {/* Right Side (Auth + CTA) */}
        <div className="flex items-center gap-3">
          {/* Phone */}
          <a
            href={`tel:${site.phoneHref}`}
            className="hidden sm:inline-flex text-sm border rounded-lg px-3 py-2"
          >
            {site.phoneDisplay}
          </a>

          {/* If NOT logged in */}
          {!user && (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="text-sm border rounded-lg px-4 py-2 hover:bg-gray-50"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-black text-white text-sm px-4 py-2 rounded-lg"
              >
                Register
              </Link>
            </div>
          )}

          {/* If logged in */}
          {/* If logged in */}
          {user && (
            <div className="flex items-center gap-2">
              {/* 👇 ADMIN LINK (only visible to admins) */}
              {user.role === "ADMIN" && (
                <Link
                  href="/admin/gallery"
                  className="text-sm border rounded-lg px-4 py-2 hover:bg-gray-50"
                >
                  Admin Dashboard
                </Link>
              )}

              <Link
                href="/account"
                className="text-sm border rounded-lg px-4 py-2 hover:bg-gray-50"
              >
                My Account
              </Link>

              <form action="/api/auth/logout" method="post">
                <button
                  type="submit"
                  className="bg-black text-white text-sm px-4 py-2 rounded-lg"
                >
                  Logout
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
