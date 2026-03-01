"use client";

import { useState } from "react";

const services = [
  "Bathroom Tiling",
  "Kitchen Splashbacks",
  "Floor & Wall Tiling",
  "Stone Installation",
  "Waterproofing",
  "Re-grouting & Repairs",
];

export default function BookPage() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setOk(false);
    setErr("");

    const form = new FormData(e.currentTarget);

    const payload = {
      serviceType: String(form.get("serviceType") || ""),
      startAt: String(form.get("startAt") || ""), // datetime-local string
      address: String(form.get("address") || ""),
      notes: String(form.get("notes") || ""),
    };

    const res = await fetch("/api/bookings/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok && data.ok) {
      setOk(true);
      (e.target as HTMLFormElement).reset();
    } else {
      // If not logged in, send them to login
      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }
      setErr(data?.error || "Booking failed");
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Book a Service</h1>
      <p className="text-gray-600 mt-2">
        Request a preferred date/time. We’ll confirm availability and reply.
      </p>

      <form
        onSubmit={submit}
        className="mt-8 space-y-4 border p-6 rounded-2xl bg-white"
      >
        <div>
          <label className="text-sm text-gray-600">Service *</label>
          <select
            name="serviceType"
            className="w-full border rounded-lg p-3 mt-1"
            required
          >
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600">
            Preferred date & time *
          </label>
          <input
            name="startAt"
            type="datetime-local"
            className="w-full border rounded-lg p-3 mt-1"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Address *</label>
          <input
            name="address"
            className="w-full border rounded-lg p-3 mt-1"
            placeholder="Street, suburb"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Notes (optional)</label>
          <textarea
            name="notes"
            className="w-full border rounded-lg p-3 mt-1 min-h-[120px]"
            placeholder="Anything we should know? (tile size, area, photos available, etc.)"
          />
        </div>

        <button
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded-lg disabled:opacity-60"
        >
          {loading ? "Sending..." : "Submit booking request"}
        </button>

        {ok && (
          <p className="text-green-600 text-sm">
            Booking request sent! We’ll contact you to confirm.
          </p>
        )}
        {err && <p className="text-red-600 text-sm">Error: {err}</p>}
      </form>
    </div>
  );
}
