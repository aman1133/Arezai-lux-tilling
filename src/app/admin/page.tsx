import AdminShell from "../../../components/admin/AdminShell";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export default async function AdminDashboardPage() {
  const [pendingBookings, totalBookings, totalGallery] = await Promise.all([
    prisma.booking.count({ where: { status: "PENDING" } }),
    prisma.booking.count(),
    prisma.galleryItem.count(),
  ]);

  return (
    <AdminShell title="Dashboard">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card title="Pending bookings" value={pendingBookings} />
        <Card title="Total bookings" value={totalBookings} />
        <Card title="Gallery items" value={totalGallery} />
      </div>

      <div className="mt-8 rounded-2xl border bg-gray-50 p-6">
        <h2 className="font-semibold">Quick actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            className="bg-black text-white px-4 py-2 rounded-lg text-sm"
            href="/admin/bookings"
          >
            Review bookings
          </a>
          <a
            className="border px-4 py-2 rounded-lg text-sm"
            href="/admin/gallery"
          >
            Manage gallery
          </a>
        </div>
      </div>
    </AdminShell>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <div className="text-sm text-gray-600">{title}</div>
      <div className="text-3xl font-semibold mt-2">{value}</div>
    </div>
  );
}
