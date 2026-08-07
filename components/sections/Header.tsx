"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X, Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useConsultationModal } from "@/lib/store/consultation-modal";

const navItems = [
  { label: "خانه", href: "/" },
  { label: "محصولات", href: "/products" },
  { label: "پروژه ها", href: "/projects" },
  { label: "خدمات", href: "/services" },
  { label: "درباره ما", href: "/about" },
  { label: "تماس با ما", href: "/contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { open } = useConsultationModal();

  // فوکوس خودکار وقتی سرچ باز می‌شه
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      router.push(`/products?search=${encodeURIComponent(q)}`);
      setSearchOpen(false);
      setSearchQuery("");
      setMobileOpen(false);
    }
  };

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
            width={48}
            height={48}
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
          {/* Search Button + Input */}
          <div className="relative hidden sm:flex items-center">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  ref={searchInputRef}
                  type="search"
                  aria-label="جستجوی محصول"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="جستجوی محصول..."
                  className="h-10 w-48 rounded-full border border-orange-300 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 lg:w-56"
                />
                <button
                  type="submit"
                  aria-label="جستجو"
                  className="mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white transition hover:bg-orange-600">
                  <Search className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="mr-1 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-gray-100 hover:text-slate-600">
                  <X className="h-4 w-4" />
                </button>
              </form>
            ) : (
              <button
                aria-label="جستجو"
                onClick={() => setSearchOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-slate-500 transition hover:border-orange-300 hover:text-orange-500">
                <Search className="h-4 w-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => open("HEADER_BUTTON")}
            className="hidden rounded-full bg-orange-500 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-orange-600 sm:block">
            درخواست مشاوره
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
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
        <div className="fixed inset-0 top-20 z-50 border-t border-gray-100 bg-white/95 backdrop-blur-md lg:hidden">
          <nav className="flex flex-col space-y-2 px-6 py-8 text-lg font-medium">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4 flex gap-2">
              <input
                type="search"
                aria-label="جستجوی محصول"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجوی محصول..."
                className="h-12 flex-1 rounded-2xl border border-gray-200 bg-white px-4 text-base text-slate-700 outline-none focus:border-orange-400"
              />
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "بستن منو" : "باز کردن منو"}
                aria-expanded={mobileOpen}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-slate-700 transition hover:bg-gray-50 lg:hidden">
                {mobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </form>

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
