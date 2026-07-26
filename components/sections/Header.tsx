"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useConsultationModal } from "@/lib/store/consultation-modal";

const navItems = [
  { label: "خانه", href: "/" },
  { label: "محصولات", href: "/products" },
  { label: "پروژه ها", href: "/projects" },
  { label: "خدمات", href: "/services" },
  { label: "درباره ما", href: "/about" },
  { label: "تماس با ما", href: "/contact" },
  { label: "وبلاگ", href: "/blog" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const { open } = useConsultationModal();

  return (
    <header
      dir="rtl"
      className="sticky top-0 z-50 border-b border-gray-100 bg-white"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/parsian-logo.png"
            alt="لوگوی پارسیان"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />

          <div className="leading-tight">
            <p className="hidden text-[11px] text-red-600 sm:block">
              کوره القایی
            </p>

            <p className="text-lg font-bold text-slate-900">
              پارسیان پرتو الوند
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative pb-2 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "text-orange-500"
                    : "text-slate-600 hover:text-orange-500"
                }`}
              >
                {item.label}

                <span
                  className={`absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-orange-500 transition-all duration-300 ${
                    isActive ? "w-6 opacity-100" : "w-0 opacity-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            aria-label="جستجو"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-slate-500 transition hover:border-orange-300 hover:text-orange-500 sm:flex"
          >
            <Search className="h-4 w-4" />
          </button>

          <button
            onClick={() => open("HEADER_BUTTON")}
            className="hidden rounded-full bg-orange-500 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-orange-600 sm:block"
          >
            درخواست مشاوره
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-slate-700 transition hover:bg-gray-50 lg:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 top-20 z-50 border-t border-gray-100 bg-white/95 backdrop-blur-md lg:hidden">
          <nav className="flex flex-col space-y-2 px-6 py-8 text-lg font-medium">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`group flex items-center gap-3 rounded-2xl px-5 py-4 transition-all duration-200 ${
                    isActive
                      ? "bg-orange-50 text-orange-600"
                      : "text-slate-700 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  <span>{item.label}</span>

                  <div
                    className={`ml-auto h-1.5 w-1.5 rounded-full bg-orange-500 transition-opacity duration-300 ${
                      isActive
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  />
                </Link>
              );
            })}

            <div className="px-2 pt-6">
              <button
                onClick={() => {
                  open("HEADER_BUTTON");
                  setMobileOpen(false);
                }}
                className="w-full rounded-2xl bg-orange-500 py-4 text-base font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:bg-orange-600 active:scale-[0.985]"
              >
                درخواست مشاوره رایگان
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}