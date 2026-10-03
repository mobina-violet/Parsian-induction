import { LoginForm } from "@/components/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <main
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <div className="text-center">
          <p className="text-sm font-bold text-slate-900">
            پارسیان پرتو الوند
          </p>
          <p className="mt-1 text-xs text-gray-400">پنل مدیریت</p>
        </div>

        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}