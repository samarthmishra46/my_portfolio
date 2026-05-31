"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: e.target.user.value,
          pass: e.target.pass.value,
        }),
      });
      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Login failed.");
      }
    } catch {
      setError("Network error.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#121212] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-[#33353F] bg-[#181818] p-8"
      >
        <h1 className="text-2xl font-bold text-white mb-1">Admin Login</h1>
        <p className="text-[#ADB7BE] text-sm mb-6">
          Sign in to view contacts and service requests.
        </p>
        <label className="block text-sm text-gray-300 mb-1">Username</label>
        <input
          name="user"
          required
          className="w-full mb-4 bg-[#121212] border border-[#33353F] text-gray-100 text-sm rounded-lg p-2.5"
        />
        <label className="block text-sm text-gray-300 mb-1">Password</label>
        <input
          name="pass"
          type="password"
          required
          className="w-full mb-4 bg-[#121212] border border-[#33353F] text-gray-100 text-sm rounded-lg p-2.5"
        />
        {error ? <p className="text-red-400 text-sm mb-3">{error}</p> : null}
        <button
          type="submit"
          disabled={submitting}
          className="w-full px-4 py-2.5 rounded-lg bg-primary-500 hover:bg-primary-600 disabled:opacity-60 text-white font-medium transition-colors"
        >
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
