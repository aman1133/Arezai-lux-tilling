"use client";

import { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErr("");

    const form = new FormData(e.currentTarget);
    const payload = {
      email: String(form.get("email") || ""),
      password: String(form.get("password") || ""),
    };

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok && data.ok) {
      window.location.href = "/account";
    } else {
      setErr(data?.error || "Login failed");
    }
  }

  return (
    <div className="max-w-md mx-auto py-16 px-4">
      <h1 className="text-3xl font-semibold">Sign In</h1>
      <p className="text-gray-600 mt-2">Access your account and bookings.</p>

      <form
        onSubmit={submit}
        className="mt-8 space-y-4 border p-6 rounded-2xl bg-white"
      >
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
          {loading ? "Signing in..." : "Sign in"}
        </button>

        {err && <p className="text-red-600 text-sm">Error: {err}</p>}

        <p className="text-sm text-gray-600">
          Don’t have an account?{" "}
          <a className="underline" href="/register">
            Create one
          </a>
        </p>
      </form>
    </div>
  );
}
