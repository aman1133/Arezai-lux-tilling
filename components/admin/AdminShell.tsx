import Link from "next/link";

export default function AdminShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const nav = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/gallery", label: "Gallery" },
    { href: "/admin/bookings", label: "Bookings" },
  ];

  return (
    <div className="min-h-[calc(100vh-0px)] bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid gap-6 md:grid-cols-[240px_1fr]">
          {/* Sidebar */}
          <aside className="rounded-2xl border bg-white p-4 h-fit md:sticky md:top-6">
            <div className="font-semibold text-lg">Admin Panel</div>
            <div className="text-xs text-gray-600 mt-1">
              Lux Tiling & Stone Services
            </div>

            <nav className="mt-6 space-y-1">
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-50 border border-transparent hover:border-gray-200"
                >
                  {n.label}
                </Link>
              ))}
            </nav>

            <div className="mt-6 border-t pt-4">
              <a
                href="/"
                className="block text-sm underline text-gray-700"
                target="_blank"
                rel="noreferrer"
              >
                View website
              </a>

              <form action="/api/auth/logout" method="post" className="mt-3">
                <button className="w-full bg-black text-white text-sm px-4 py-2 rounded-lg">
                  Logout
                </button>
              </form>
            </div>
          </aside>

          {/* Main */}
          <main className="rounded-2xl border bg-white p-6">
            <div className="flex items-center justify-between gap-4">
              <h1 className="text-2xl font-semibold">{title}</h1>
            </div>

            <div className="mt-6">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
