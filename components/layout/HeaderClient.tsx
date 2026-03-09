"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type User = {
  id: string;
  email: string;
  name: string | null;
  role: "ADMIN" | "CUSTOMER";
} | null;

type HeaderClientProps = {
  siteName: string;
  serviceArea: string;
  phoneDisplay: string;
  phoneHref: string;
  user: User;
};

const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
  { href: "/book", label: "Book" },
];

export default function HeaderClient({
  siteName,
  serviceArea,
  phoneDisplay,
  phoneHref,
  user,
}: HeaderClientProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-3"
            onClick={() => setOpen(false)}
          >
            <div className="overflow-hidden rounded-xl border bg-white p-1 shadow-sm">
              <Image
                src="/logo.png"
                alt={siteName}
                width={44}
                height={44}
                className="rounded-lg object-cover"
                priority
              />
            </div>

            <div className="leading-tight">
              <div className="font-semibold text-base sm:text-lg">
                {siteName}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                {serviceArea}
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
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

          {/* Desktop right side */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${phoneHref}`}
              className="text-sm border rounded-lg px-3 py-2 hover:bg-gray-50"
            >
              {phoneDisplay}
            </a>

            {!user && (
              <>
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
              </>
            )}

            {user && (
              <>
                {user.role === "ADMIN" && (
                  <Link
                    href="/admin"
                    className="text-sm border rounded-lg px-4 py-2 hover:bg-gray-50"
                  >
                    Admin
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
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center rounded-lg border p-2"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="sr-only">Open menu</span>
            {!open ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden mt-4 rounded-2xl border bg-white shadow-sm">
            <nav className="p-3 space-y-1">
              {nav.map((i) => (
                <Link
                  key={i.href}
                  href={i.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-sm hover:bg-gray-50"
                >
                  {i.label}
                </Link>
              ))}

              <div className="border-t my-2" />

              <a
                href={`tel:${phoneHref}`}
                className="block rounded-lg px-3 py-3 text-sm hover:bg-gray-50"
              >
                Call: {phoneDisplay}
              </a>

              {!user && (
                <>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-sm hover:bg-gray-50"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    className="block rounded-lg bg-black text-white px-3 py-3 text-sm"
                  >
                    Register
                  </Link>
                </>
              )}

              {user && (
                <>
                  {user.role === "ADMIN" && (
                    <Link
                      href="/admin"
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-3 py-3 text-sm hover:bg-gray-50"
                    >
                      Admin Dashboard
                    </Link>
                  )}

                  <Link
                    href="/account"
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-sm hover:bg-gray-50"
                  >
                    My Account
                  </Link>

                  <form action="/api/auth/logout" method="post">
                    <button
                      type="submit"
                      className="mt-1 w-full rounded-lg bg-black text-white px-3 py-3 text-sm text-left"
                    >
                      Logout
                    </button>
                  </form>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
