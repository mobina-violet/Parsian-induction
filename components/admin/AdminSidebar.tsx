"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Package,
  Wrench,
  Factory,
  Images,
  LayoutTemplate,
  MessageSquare,
  Mail,
  Settings,
  ExternalLink,
} from "lucide-react";

const items = [
  { title: "داشبورد", href: "/admin", icon: LayoutDashboard },
  { title: "مقالات", href: "/admin/articles", icon: FileText },
  { title: "محصولات", href: "/admin/products", icon: Package },
  { title: "قطعات و خدمات", href: "/admin/services", icon: Wrench },
  { title: "پروژه‌ها", href: "/admin/projects", icon: Factory },
  { title: "کتابخانه تصاویر", href: "/admin/media", icon: Images },
  { title: "محتوای صفحات", href: "/admin/pages", icon: LayoutTemplate },
  { title: "درخواست‌ها", href: "/admin/leads", icon: Mail },
  { title: "نظرات کاربران", href: "/admin/reviews", icon: MessageSquare },
  { title: "تنظیمات", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full rounded-2xl border border-gray-100 bg-white p-4 lg:sticky lg:top-6 lg:w-64">
      <div className="mb-6 border-b border-gray-100 pb-4">
        <p className="text-sm font-bold text-slate-900">
          پارسیان پرتو الوند
        </p>

        <p className="mt-1 text-xs text-gray-400">
          سیستم مدیریت محتوا
        </p>
      </div>

      <nav className="grid grid-cols-2 gap-1 lg:grid-cols-1">
        {items.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            (item.href !== "/admin" &&
              pathname.startsWith(`${item.href}/`));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                active
                  ? "bg-orange-50 text-orange-600"
                  : "text-slate-600 hover:bg-gray-50 hover:text-orange-600"
              }`}
            >
              <Icon size={19} />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 border-t border-gray-100 pt-4">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-600 hover:bg-orange-50 hover:text-orange-600"
        >
          <ExternalLink size={18} />
          مشاهده وب‌سایت
        </Link>
      </div>
    </aside>
  );
}