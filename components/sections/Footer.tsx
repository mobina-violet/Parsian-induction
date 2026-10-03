"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, ChevronDown } from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

const quickLinks = [
  { label: "خانه", href: "/" },
  { label: "محصولات", href: "/products" },
  { label: "پروژه‌ها", href: "/projects" },
  { label: "خدمات", href: "/services" },
  { label: "مقالات", href: "/articles" },
  { label: "درباره ما", href: "/about" },
  { label: "تماس با ما", href: "/contact" },
];

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer dir="rtl" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* لوگو و توضیحات — همیشه و همه‌جا دیده می‌شه */}
        <div className="text-center sm:hidden">
          <div className="flex items-center justify-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500">
              <Image
                src="/parsian-logo.webp"
                alt="لوگوی پارسیان"
                width={36}
                height={36}
                className="h-10 w-10 rounded-full object-contain"
              />
            </span>
            <div>
              <p className="text-[11px] text-red-600">کوره القایی</p>
              <p className="text-base font-bold text-slate-900">
                پارسیان پرتو الوند
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-7 text-gray-500">
            طراحی و تولید انواع کوره‌های القایی با فناوری روز دنیا برای صنایع
            ذوب فلزات با راندمان بالا و مصرف انرژی بهینه.
          </p>
        </div>

        {/* =========================
            موبایل: آکاردئون
        ========================== */}
        <div className="mt-8 divide-y divide-gray-100 border-t border-gray-100 sm:hidden">
          <details className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold text-slate-900 [&::-webkit-details-marker]:hidden">
              دسترسی سریع
              <ChevronDown className="h-4 w-4 text-gray-400 transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <ul className="mt-4 space-y-3 text-sm text-gray-500">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block transition hover:text-orange-500">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </details>

          <details className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold text-slate-900 [&::-webkit-details-marker]:hidden">
              محصولات و خدمات
              <ChevronDown className="h-4 w-4 text-gray-400 transition-transform duration-200 group-open:rotate-180" />
            </summary>

            <div className="mt-4 space-y-4">
              <div>
                <Link
                  href="/products"
                  className="block text-sm font-medium text-slate-800 transition hover:text-orange-500">
                  کوره‌های القایی
                </Link>
                <ul className="mt-2 space-y-2.5 text-sm text-gray-500">
                  <li>
                    <Link
                      href="/products?category=MELTING_FURNACE#products"
                      className="transition hover:text-orange-500">
                      کوره‌های القایی ذوب
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products?category=FORGING_FURNACE#products"
                      className="transition hover:text-orange-500">
                      کوره‌های القایی فورج
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products?category=HARDENING_FURNACE#products"
                      className="transition hover:text-orange-500">
                      کوره‌های القایی سخت‌کاری
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products?category=FORMING_FURNACE#products"
                      className="transition hover:text-orange-500">
                      کوره‌های القایی فورمینگ
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <Link
                  href="/services"
                  className="block text-sm font-medium text-slate-800 transition hover:text-orange-500">
                  خدمات
                </Link>
                <ul className="mt-2 space-y-2.5 text-sm text-gray-500">
                  <li>
                    <Link
                      href="/services?category=SPARE_PARTS&sub=all#services-catalog"
                      className="transition hover:text-orange-500">
                      لوازم یدکی
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services?category=SERVICE_EQUIPMENT&sub=all#services-catalog"
                      className="transition hover:text-orange-500">
                      قطعات و تجهیزات جانبی
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </details>

          <details className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold text-slate-900 [&::-webkit-details-marker]:hidden">
              راه‌های ارتباطی
              <ChevronDown className="h-4 w-4 text-gray-400 transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <ul className="mt-4 space-y-3 text-sm text-gray-500">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                <Link
                  href="https://nshn.ir/ae_bQV-eyx5bku"
                  className="flex flex-col transition hover:text-orange-500">
                  <span>رباط کریم میدان غدیر</span>
                  <span>مجتمع صنعتی و تجاری نور</span>
                  <span>واحد ۱۷</span>
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-orange-500" />
                <a
                  href="tel:09124384191"
                  className="transition-colors hover:text-orange-500"
                  dir="ltr">
                  ۰۹۱۲۴۳۸۴۱۹۱
                </a>
              </li>
              <li className="flex items-center gap-2">
                <a
                  href="https://instagram.com/parsian_partoalvand"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-orange-500">
                  <FaInstagram className="h-4 w-4 shrink-0 text-orange-500" />
                  <span>parsian_partoalvand</span>
                </a>
              </li>
            </ul>
          </details>
        </div>

        {/* =========================
            دسکتاپ و تبلت: گرید ثابت (بدون تغییر)
        ========================== */}
        <div className="hidden sm:grid sm:grid-cols-2 sm:gap-10 sm:text-right lg:grid-cols-4">
          {/* لوگو و توضیحات */}
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500">
                <Image
                  src="/parsian-logo.webp"
                  alt="لوگوی پارسیان"
                  width={36}
                  height={36}
                  className="h-10 w-10 rounded-full object-contain"
                  priority
                />
              </span>
              <div>
                <p className="text-[11px] text-red-600">کوره القایی</p>
                <p className="text-base font-bold text-slate-900">
                  پارسیان پرتو الوند
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-gray-500">
              طراحی و تولید انواع کوره‌های القایی با فناوری روز دنیا برای صنایع
              ذوب فلزات با راندمان بالا و مصرف انرژی بهینه.
            </p>
          </div>

          {/* دسترسی سریع */}
          <div>
            <h4 className="text-sm font-bold text-slate-900">دسترسی سریع</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-gray-500">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition hover:text-orange-500">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* محصولات و خدمات */}
          <div>
            <div className="space-y-3">
              <Link
                href="/products"
                className="block text-sm font-bold text-slate-900 transition hover:text-orange-500">
                محصولات
              </Link>
              <ul className="space-y-2 sm:border-r sm:border-gray-200 sm:pr-3">
                <li>
                  <Link
                    href="/products?category=MELTING_FURNACE#products"
                    className="block text-sm text-gray-500 transition hover:text-orange-500">
                    کوره‌های القایی ذوب
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products?category=FORGING_FURNACE#products"
                    className="block text-sm text-gray-500 transition hover:text-orange-500">
                    کوره‌های القایی فورج
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products?category=HARDENING_FURNACE#products"
                    className="block text-sm text-gray-500 transition hover:text-orange-500">
                    کوره‌های القایی سخت‌کاری
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products?category=FORMING_FURNACE#products"
                    className="block text-sm text-gray-500 transition hover:text-orange-500">
                    کوره‌های القایی فورمینگ
                  </Link>
                </li>
              </ul>

              <Link
                href="/services"
                className="block pt-2 text-sm font-bold text-slate-900 transition hover:text-orange-500">
                خدمات
              </Link>
              <ul className="space-y-2 sm:border-r sm:border-gray-200 sm:pr-3">
                <li>
                  <Link
                    href="/services?category=SPARE_PARTS&sub=all#services-catalog"
                    className="block text-sm text-gray-500 transition hover:text-orange-500">
                    لوازم یدکی
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services?category=SERVICE_EQUIPMENT&sub=all#services-catalog"
                    className="block text-sm text-gray-500 transition hover:text-orange-500">
                    قطعات و تجهیزات جانبی
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* راه‌های ارتباطی */}
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              راه‌های ارتباطی
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-gray-500">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                <Link
                  href="https://nshn.ir/ae_bQV-eyx5bku"
                  className="flex flex-col transition hover:text-orange-500">
                  <span>رباط کریم میدان غدیر</span>
                  <span>مجتمع صنعتی و تجاری نور</span>
                  <span>واحد ۱۷</span>
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-orange-500" />
                <a
                  href="tel:09124384191"
                  className="transition-colors hover:text-orange-500"
                  dir="ltr">
                  ۰۹۱۲۴۳۸۴۱۹۱
                </a>
              </li>
              <li className="flex items-center gap-2">
                <a
                  href="https://instagram.com/parsian_partoalvand"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-orange-500">
                  <FaInstagram className="h-4 w-4 shrink-0 text-orange-500" />
                  <span>parsian_partoalvand</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
