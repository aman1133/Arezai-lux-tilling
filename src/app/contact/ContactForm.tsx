"use client";

import { useState } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | "ok" | "err">(null);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    setError("");

    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      message: String(form.get("message") || ""),
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok && data.ok) {
      setStatus("ok");
      (e.target as HTMLFormElement).reset();
    } else {
      setStatus("err");
      setError(data?.error || "Something went wrong");
    }

    setLoading(false);
  }

  return (
    <div className="rounded-2xl border bg-white p-6">
      <h2 className="text-xl font-semibold">Request a Free Consultation</h2>
      <p className="text-gray-600 text-sm mt-2">
        Tell us about your project. We’ll reply as soon as possible.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <input
          name="name"
          placeholder="Full name *"
          className="w-full border rounded-lg p-3"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email *"
          className="w-full border rounded-lg p-3"
          required
        />
        <input
          name="phone"
          placeholder="Phone (optional)"
          className="w-full border rounded-lg p-3"
        />
        <textarea
          name="message"
          placeholder="Message *"
          className="w-full border rounded-lg p-3 min-h-[150px]"
          required
        />

        <button
          disabled={loading}
          className="bg-black text-white rounded-lg px-5 py-3 text-sm disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send message"}
        </button>

        {status === "ok" && (
          <p className="text-green-600 text-sm">
            Thanks! We received your message.
          </p>
        )}
        {status === "err" && (
          <p className="text-red-600 text-sm">Error: {error}</p>
        )}
      </form>
    </div>
  );
}
