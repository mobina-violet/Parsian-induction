import Link from "next/link";
import {
  FileText,
  Package,
  Factory,
  Mail,
  MessageSquare,
  Clock,
  ArrowLeft,
  Plus,
  Images,
  Settings,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [
    articles,
    products,
    projects,
    leads,
    reviews,
    pendingReviews,
  ] = await Promise.all([
    prisma.article.count(),
    prisma.product.count(),
    prisma.project.count(),
    prisma.consultationRequest.count(),
    prisma.review.count(),
    prisma.review.count({
      where: { approved: false },
    }),
  ]);

  const stats = [
    {
      title: "مقالات",
      value: articles,
      icon: FileText,
      href: "/admin/articles",
    },
    {
      title: "محصولات و تجهیزات",
      value: products,
      icon: Package,
      href: "/admin/products",
    },
    {
      title: "پروژه‌ها",
      value: projects,
      icon: Factory,
      href: "/admin/projects",
    },
    {
      title: "درخواست‌های مشاوره",
      value: leads,
      icon: Mail,
      href: "/admin/leads",
    },
    {
      title: "نظرات کاربران",
      value: reviews,
      icon: MessageSquare,
      href: "/admin/reviews",
    },
    {
      title: "نظرات در انتظار تأیید",
      value: pendingReviews,
      icon: Clock,
      href: "/admin/reviews",
    },
  ];

  const quickActions = [
    {
      title: "مدیریت مقالات",
      description: "افزودن و ویرایش محتوای مقالات",
      icon: Plus,
      href: "/admin/articles",
    },
    {
      title: "مدیریت تصاویر",
      description: "آپلود و جایگزینی تصاویر سایت",
      icon: Images,
      href: "/admin/media",
    },
    {
      title: "مدیریت محصولات",
      description: "ویرایش مشخصات فنی و تصاویر",
      icon: Package,
      href: "/admin/products",
    },
    {
      title: "تنظیمات سایت",
      description: "مدیریت اطلاعات عمومی شرکت",
      icon: Settings,
      href: "/admin/settings",
    },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-gray-100 bg-white p-6">
        <p className="mb-2 text-xs font-semibold text-orange-600">
          PARSIAN MANAGEMENT
        </p>

        <h1 className="text-xl font-bold text-slate-900">
          داشبورد مدیریت
        </h1>

        <p className="mt-2 text-sm leading-7 text-slate-500">
          به سیستم مدیریت وب‌سایت پارسیان پرتو الوند خوش آمدید.
          از این بخش می‌توانید محتوای سایت و درخواست‌های
          مشتریان را مدیریت کنید.
        </p>
      </section>

      <section className="grid grid-cols-2 gap-4 xl:grid-cols-3">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="rounded-2xl border border-gray-100 bg-white p-5 transition hover:border-orange-200 hover:shadow-sm"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                <Icon size={22} />
              </div>

              <p className="text-2xl font-bold text-slate-900">
                {item.value.toLocaleString("fa-IR")}
              </p>

              <p className="mt-2 text-xs text-slate-500">
                {item.title}
              </p>
            </Link>
          );
        })}
      </section>

      <section className="rounded-2xl border border-gray-100 bg-white p-6">
        <h2 className="mb-5 font-bold text-slate-900">
          دسترسی سریع
        </h2>

        <div className="grid gap-3 sm:grid-cols-2">
          {quickActions.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-xl border border-gray-100 p-4 transition hover:border-orange-200 hover:bg-orange-50"
              >
                <div className="text-orange-600">
                  <Icon size={22} />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800">
                    {item.title}
                  </p>

                  <p className="mt-1 text-xs leading-6 text-slate-500">
                    {item.description}
                  </p>
                </div>

                <ArrowLeft
                  size={16}
                  className="text-gray-400"
                />
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}