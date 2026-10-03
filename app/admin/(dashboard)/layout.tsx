import type { Metadata } from "next";
import Link from "next/link";
import { LogoutButton } from "@/components/admin/LogoutButton";

export const metadata: Metadata = {
  title: "پنل مدیریت",
  robots: { index: false, follow: false },
};

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div dir="rtl" className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <p className="text-sm font-bold text-slate-900">پنل مدیریت</p>
            <p className="text-xs text-gray-400">پارسیان پرتو الوند</p>
          </div>
          <LogoutButton />
        </div>
        <nav className="mx-auto flex max-w-5xl gap-1 px-4 pb-2 text-sm font-medium sm:px-6">
          <Link
            href="/admin/leads"
            className="rounded-lg px-4 py-2 text-slate-600 transition hover:bg-orange-50 hover:text-orange-600">
            درخواست‌ها
          </Link>
          <Link
            href="/admin/reviews"
            className="rounded-lg px-4 py-2 text-slate-600 transition hover:bg-orange-50 hover:text-orange-600">
            نظرات
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}