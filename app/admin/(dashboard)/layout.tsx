import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { LogoutButton } from "@/components/admin/LogoutButton";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

import {
  getSessionCookieName,
  isValidSessionToken,
} from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "پنل مدیریت | پارسیان پرتو الوند",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  const token = cookieStore.get(
    getSessionCookieName()
  )?.value;

  if (!isValidSessionToken(token)) {
    redirect("/admin/login");
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6">
          <div>
            <p className="text-base font-bold text-slate-900">
              پنل مدیریت
            </p>

            <p className="mt-1 text-xs text-gray-400">
              شرکت پارسیان پرتو الوند
            </p>
          </div>

          <LogoutButton />
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-6 sm:px-6 lg:flex-row">
        <AdminSidebar />

        <main className="min-w-0 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}