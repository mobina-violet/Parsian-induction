"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { loginAdmin } from "@/app/actions/admin-auth";

export function LoginForm() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const result = await loginAdmin(password);

      if (result.success) {
        router.replace("/admin");
        router.refresh();
      } else {
        setError(result.error ?? "رمز عبور صحیح نیست.");
      }
    } catch {
      setError("خطایی رخ داده است. مجدداً تلاش کنید.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="admin-password"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          رمز عبور مدیریت
        </label>

        <div className="relative">
          <input
            id="admin-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            autoFocus
            required
            maxLength={256}
            dir="ltr"
            placeholder="••••••••••"
            className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={
              showPassword ? "مخفی کردن رمز" : "نمایش رمز"
            }
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500"
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-lg bg-red-50 p-3 text-xs text-red-600"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading || !password}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 py-3 text-sm font-medium text-white transition hover:bg-orange-600 disabled:opacity-50"
      >
        <LockKeyhole size={16} />

        {loading ? "در حال ورود..." : "ورود به پنل مدیریت"}
      </button>
    </form>
  );
}