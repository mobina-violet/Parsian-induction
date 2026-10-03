"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { logoutAdmin } from "@/app/actions/admin-auth";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await logoutAdmin();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-gray-50">
      <LogOut className="h-3.5 w-3.5" />
      خروج
    </button>
  );
}