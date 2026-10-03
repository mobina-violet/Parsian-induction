"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/app/actions/admin-auth";

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await loginAdmin(password);

    if (result.success) {
      router.push("/admin/leads");
      router.refresh();
    } else {
      setError(result.error ?? "رمز اشتباه است");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          رمز عبور
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-orange-400"
        />
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-orange-500 py-2.5 text-sm font-medium text-white transition hover:bg-orange-600 disabled:opacity-50">
        {loading ? "در حال ورود..." : "ورود"}
      </button>
    </form>
  );
}