"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErr("");

    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      password: String(form.get("password") || ""),
    };

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok && data.ok) {
      window.location.href = "/account";
    } else {
      setErr(data?.error || "Register failed");
    }
  }

  return (
    <div className="max-w-md mx-auto py-16 px-4">
      <h1 className="text-3xl font-semibold">Create Account</h1>
      <p className="text-gray-600 mt-2">
        Track bookings and manage your requests.
      </p>

      <form
        onSubmit={submit}
        className="mt-8 space-y-4 border p-6 rounded-2xl bg-white"
      >
        <input
          name="name"
          placeholder="Name (optional)"
          className="w-full border p-3 rounded-lg"
        />
        <input
          name="email"
          type="email"
          placeholder="Email *"
          className="w-full border p-3 rounded-lg"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password *"
          className="w-full border p-3 rounded-lg"
          required
        />

        <button
          disabled={loading}
          className="w-full bg-black text-white px-6 py-3 rounded-lg disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create account"}
        </button>

        {err && <p className="text-red-600 text-sm">Error: {err}</p>}

        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <a className="underline" href="/login">
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
}
