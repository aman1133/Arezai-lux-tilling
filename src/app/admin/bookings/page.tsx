"use client";

import { useEffect, useState } from "react";
import AdminShell from "../../../../components/admin/AdminShell";

type Booking = {
  id: string;
  serviceType: string;
  address: string;
  notes: string | null;
  startAt: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  createdAt: string;
  user: { email: string; name: string | null };
};

const statuses: Booking["status"][] = [
  "PENDING",
  "CONFIRMED",
  "COMPLETED",
  "CANCELLED",
];

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLoading(true);
    const res = await fetch("/api/admin/bookings/list");
    const data = await res.json();
    setBookings(data.bookings || []);
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  async function updateStatus(id: string, status: Booking["status"]) {
    const res = await fetch("/api/admin/bookings/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    const data = await res.json();
    if (!res.ok || !data.ok) {
      alert(data?.error || "Update failed");
      return;
    }
    await refresh();
  }

  return (
    <AdminShell title="Bookings">
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <h1 className="text-3xl font-semibold">Admin • Bookings</h1>
          <p className="text-gray-600 mt-2">
            Review booking requests and update status.
          </p>
        </div>
        <a
          className="text-sm underline"
          href="/account"
          target="_blank"
          rel="noreferrer"
        >
          View customer account page
        </a>
      </div>

      {loading ? (
        <div className="mt-6 text-gray-600">Loading…</div>
      ) : bookings.length === 0 ? (
        <div className="mt-6 rounded-2xl border bg-gray-50 p-8">
          No bookings found.
        </div>
      ) : (
        <div className="mt-6 grid gap-4">
          {bookings.map((b) => (
            <div key={b.id} className="rounded-2xl border bg-white p-6">
              <div className="flex justify-between gap-6 flex-wrap">
                <div>
                  <div className="text-lg font-semibold">{b.serviceType}</div>
                  <div className="text-sm text-gray-600 mt-1">{b.address}</div>
                  {b.notes && (
                    <div className="text-sm text-gray-600 mt-1">
                      Notes: {b.notes}
                    </div>
                  )}

                  <div className="mt-3 text-sm text-gray-600">
                    Customer:{" "}
                    <span className="font-medium text-gray-800">
                      {b.user.name ? `${b.user.name} • ` : ""}
                      {b.user.email}
                    </span>
                  </div>
                </div>

                <div className="text-sm">
                  <div className="text-gray-600">
                    Preferred:{" "}
                    <span className="font-medium text-gray-800">
                      {new Date(b.startAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="text-gray-600 mt-1">
                    Created: {new Date(b.createdAt).toLocaleString()}
                  </div>

                  <div className="mt-3 flex items-center gap-3">
                    <span className="text-gray-600">Status</span>
                    <select
                      value={b.status}
                      onChange={(e) =>
                        updateStatus(b.id, e.target.value as Booking["status"])
                      }
                      className="border rounded-lg p-2"
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-3">
                    <span className="inline-flex border rounded px-2 py-1 text-xs bg-gray-50">
                      {b.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
