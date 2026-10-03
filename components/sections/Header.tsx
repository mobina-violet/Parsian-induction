"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { SearchBox } from "@/components/SearchBox";
import { useConsultationModal } from "@/lib/store/consultation-modal";

type NavGrandchild = { label: string; href: string };
type NavChild = { label: string; href: string; children?: NavGrandchild[] };
type NavItem = { label: string; href: string; children?: NavChild[] };

const navItems: NavItem[] = [
  { label: "خانه", href: "/" },
  {
    label: "محصولات",
    href: "/products",
    children: [
      {
        label: "کوره‌های القایی ذوب",
        href: "/products?category=MELTING_FURNACE#products",
      },
      {
        label: "کوره‌های القایی فورج",
        href: "/products?category=FORGING_FURNACE#products",
      },
      {
        label: "کوره‌های القایی سخت‌کاری",
        href: "/products?category=HARDENING_FURNACE#products",
      },
      {
        label: "کوره‌های القایی فورمینگ",
        href: "/products?category=FORMING_FURNACE#products",
      },
    ],
  },
  { label: "پروژه ها", href: "/projects" },
  {
    label: "خدمات",
    href: "/services",
    children: [
      {
        label: "لوازم یدکی",
        href: "/services?category=SPARE_PARTS&sub=all#services-catalog",
        children: [
          { label: "تریستورها", href: "/services?category=SPARE_PARTS&sub=thyristor#services-catalog" },
          { label: "دیودها", href: "/services?category=SPARE_PARTS&sub=diode#services-catalog" },
          { label: "ماژول‌ها", href: "/services?category=SPARE_PARTS&sub=module#services-catalog" },
          { label: "IGBT", href: "/services?category=SPARE_PARTS&sub=igbt#services-catalog" },
          { label: "خازن‌ها", href: "/services?category=SPARE_PARTS&sub=capacitor#services-catalog" },
          { label: "برد و الکترونیکی", href: "/services?category=SPARE_PARTS&sub=board#services-catalog" },
          { label: "کویل و عایق", href: "/services?category=SPARE_PARTS&sub=coil#services-catalog" },
          { label: "مقاومت‌ها", href: "/services?category=SPARE_PARTS&sub=resistor#services-catalog" },
          { label: "بوبین و چوک", href: "/services?category=SPARE_PARTS&sub=choke#services-catalog" },
        ],
      },
      {
        label: "قطعات و تجهیزات جانبی",
        href: "/services?category=SERVICE_EQUIPMENT&sub=all#services-catalog",
        children: [
          { label: "سیستم خنک‌کننده", href: "/services?category=SERVICE_EQUIPMENT&sub=cooling#services-catalog" },
          { label: "کابل و اتصالات", href: "/services?category=SERVICE_EQUIPMENT&sub=cable#services-catalog" },
          { label: "کنترل و اندازه‌گیری", href: "/services?category=SERVICE_EQUIPMENT&sub=control_measurement#services-catalog" },
          { label: "بوته و بدنه", href: "/services?category=SERVICE_EQUIPMENT&sub=crucible#services-catalog" },
          { label: "هیدرولیک", href: "/services?category=SERVICE_EQUIPMENT&sub=hydraulic#services-catalog" },
          { label: "کلید چنج", href: "/services?category=SERVICE_EQUIPMENT&sub=changeover#services-catalog" },
        ],
      },
    ],
  },
  { label: "درباره ما", href: "/about" },
  { label: "تماس با ما", href: "/contact" },
  { label: "مقالات", href: "/articles" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
  const [openMobileSubChild, setOpenMobileSubChild] = useState<string | null>(null);
  const [openDesktopSubmenu, setOpenDesktopSubmenu] = useState<string | null>(null);
  const [openDesktopSubChild, setOpenDesktopSubChild] = useState<string | null>(null);

  const pathname = usePathname();
  const { open } = useConsultationModal();
if (pathname.startsWith("/admin")) {
  return null;
}
  return (
    <header
      dir="rtl"
      className="sticky top-0 z-50 border-b border-gray-100 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/parsian-logo.webp"
            alt="لوگوی پارسیان"
            width={40}
            height={40}
            quality={80}
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
            if (item.children) {
              const isSubmenuOpen = openDesktopSubmenu === item.href;

              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setOpenDesktopSubmenu(item.href)}
                  onMouseLeave={() => {
                    setOpenDesktopSubmenu(null);
                    setOpenDesktopSubChild(null);
                  }}>
                  <Link
                    href={item.href}
                    className={`relative flex items-center gap-1 pb-2 text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "text-orange-500"
                        : "text-slate-600 hover:text-orange-500"
                    }`}>
                    {item.label}

                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${
                        isSubmenuOpen ? "-rotate-180" : ""
                      }`}
                    />

                    <span
                      className={`absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-orange-500 transition-all duration-300 ${
                        isActive ? "w-6 opacity-100" : "w-0 opacity-0"
                      }`}
                    />
                  </Link>

                  <div
                    className={`absolute right-0 top-full z-50 w-64 pt-3 transition-all duration-200 ${
                      isSubmenuOpen
                        ? "visible opacity-100"
                        : "pointer-events-none invisible opacity-0"
                    }`}>
                    <div className="rounded-2xl border border-gray-100 bg-white p-2 shadow-lg shadow-black/5">
                      {item.children.map((child) =>
                        child.children ? (
                          <div
                            key={child.href}
                            className="relative"
                            onMouseEnter={() => setOpenDesktopSubChild(child.href)}
                            onMouseLeave={() => setOpenDesktopSubChild(null)}>
                            <Link
                              href={child.href}
                              onClick={() => {
                                setOpenDesktopSubmenu(null);
                                setOpenDesktopSubChild(null);
                              }}
                              className="flex items-center justify-between gap-2 rounded-xl px-4 py-2.5 text-sm text-slate-600 transition hover:bg-orange-50 hover:text-orange-600">
                              {child.label}
                              <ChevronLeft className="h-3.5 w-3.5 text-gray-300" />
                            </Link>

                            <div
                              className={`absolute right-full top-0 z-50 w-60 pr-2 transition-all duration-150 ${
                                openDesktopSubChild === child.href
                                  ? "visible opacity-100"
                                  : "pointer-events-none invisible opacity-0"
                              }`}>
                              <div className="rounded-2xl border border-gray-100 bg-white p-2 shadow-lg shadow-black/5">
                                {child.children.map((grandchild) => (
                                  <Link
                                    key={grandchild.href}
                                    href={grandchild.href}
                                    onClick={() => {
                                      setOpenDesktopSubmenu(null);
                                      setOpenDesktopSubChild(null);
                                    }}
                                    className="block rounded-xl px-4 py-2.5 text-sm text-slate-600 transition hover:bg-orange-50 hover:text-orange-600">
                                    {grandchild.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setOpenDesktopSubmenu(null)}
                            className="block rounded-xl px-4 py-2.5 text-sm text-slate-600 transition hover:bg-orange-50 hover:text-orange-600">
                            {child.label}
                          </Link>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative pb-2 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "text-orange-500"
                    : "text-slate-600 hover:text-orange-500"
                }`}>
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
          <SearchBox />

          <button
            onClick={() => open("HEADER_BUTTON")}
            className="hidden rounded-full bg-orange-500 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-orange-600 sm:block">
            درخواست مشاوره
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "بستن منو" : "باز کردن منو"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-slate-700 transition hover:bg-gray-50 lg:hidden">
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
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="منوی موبایل"
          className="fixed inset-0 top-20 z-50 overflow-y-auto border-t border-gray-100 bg-white/95 backdrop-blur-md lg:hidden">
          <nav className="flex flex-col space-y-2 px-6 py-8 text-lg font-medium">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              if (item.children) {
                const isOpen = openMobileSubmenu === item.href;
                return (
                  <div key={item.href}>
                    <div
                      className={`flex items-center gap-2 rounded-2xl px-2 py-1 transition-all duration-200 ${
                        isActive
                          ? "bg-orange-50 text-orange-600"
                          : "text-slate-700"
                      }`}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex-1 rounded-2xl px-3 py-3">
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setOpenMobileSubmenu((prev) =>
                            prev === item.href ? null : item.href,
                          );
                          setOpenMobileSubChild(null);
                        }}
                        aria-label={
                          isOpen
                            ? `بستن زیرمنوی ${item.label}`
                            : `باز کردن زیرمنوی ${item.label}`
                        }
                        aria-expanded={isOpen}
                        className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-orange-50 hover:text-orange-600">
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>

                    {isOpen && (
                      <div className="mr-5 mt-1 flex flex-col space-y-1 border-r-2 border-orange-100 pr-4">
                        {item.children.map((child) =>
                          child.children ? (
                            <div key={child.href}>
                              <div className="flex items-center gap-1">
                                <Link
                                  href={child.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="flex-1 rounded-xl px-4 py-3 text-base font-normal text-slate-600 transition hover:bg-orange-50 hover:text-orange-600">
                                  {child.label}
                                </Link>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setOpenMobileSubChild((prev) =>
                                      prev === child.href ? null : child.href,
                                    )
                                  }
                                  aria-label={
                                    openMobileSubChild === child.href
                                      ? `بستن زیرمنوی ${child.label}`
                                      : `باز کردن زیرمنوی ${child.label}`
                                  }
                                  aria-expanded={openMobileSubChild === child.href}
                                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-orange-50 hover:text-orange-600">
                                  <ChevronDown
                                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                                      openMobileSubChild === child.href ? "rotate-180" : ""
                                    }`}
                                  />
                                </button>
                              </div>

                              {openMobileSubChild === child.href && (
                                <div className="mr-4 mt-1 flex flex-col space-y-1 border-r-2 border-orange-50 pr-3">
                                  {child.children.map((grandchild) => (
                                    <Link
                                      key={grandchild.href}
                                      href={grandchild.href}
                                      onClick={() => setMobileOpen(false)}
                                      className="rounded-lg px-4 py-2.5 text-sm font-normal text-slate-500 transition hover:bg-orange-50 hover:text-orange-600">
                                      {grandchild.label}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ) : (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="rounded-xl px-4 py-3 text-base font-normal text-slate-600 transition hover:bg-orange-50 hover:text-orange-600">
                              {child.label}
                            </Link>
                          ),
                        )}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`group flex items-center gap-3 rounded-2xl px-5 py-4 transition-all duration-200 ${
                    isActive
                      ? "bg-orange-50 text-orange-600"
                      : "text-slate-700 hover:bg-orange-50 hover:text-orange-600"
                  }`}>
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
                className="w-full rounded-2xl bg-orange-500 py-4 text-base font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:bg-orange-600 active:scale-[0.985]">
                درخواست مشاوره رایگان
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}