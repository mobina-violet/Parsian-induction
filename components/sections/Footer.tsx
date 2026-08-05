import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
export function Footer() {
  return (
    <>
      {/* فوتر اصلی */}
      <footer dir="rtl" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 text-center sm:grid-cols-2 sm:text-right lg:grid-cols-4">
            {/* لوگو و توضیحات */}
            <div>
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500">
                  <Image
                    src="/parsian-logo.webp"
                    alt="لوگوی پارسیان"
                    width={36}
                    height={36}
                    className="h-10 w-10 object-contain rounded-full"
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
                طراحی و تولید انواع کوره‌های القایی با فناوری روز دنیا برای
                صنایع ذوب فلزات با راندمان بالا و مصرف انرژی بهینه.
              </p>
            </div>

            {/* دسترسی سریع */}
            <div>
              <h4 className="text-sm font-bold text-slate-900">دسترسی سریع</h4>
              <ul className="mt-4 space-y-2.5 text-sm text-gray-500">
                <li>
                  <Link href="/" className="transition hover:text-orange-500">
                    خانه
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    className="transition hover:text-orange-500">
                    محصولات
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects"
                    className="transition hover:text-orange-500">
                    پروژه‌ها
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="transition hover:text-orange-500">
                    خدمات
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="transition hover:text-orange-500">
                    درباره ما
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="transition hover:text-orange-500">
                    تماس با ما
                  </Link>
                </li>
              </ul>
            </div>

            {/* محصولات */}
            <div>
              <h4 className="text-sm font-bold text-slate-900">محصولات</h4>
              <ul className="mt-4 space-y-2.5 text-sm text-gray-500">
                <li>
                  <Link
                    href="/products"
                    className="transition hover:text-orange-500">
                    کوره‌های القایی
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services#parts"
                    className="transition hover:text-orange-500">
                    قطعات و تجهیزات
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services#electrical-panel"
                    className="transition hover:text-orange-500">
                    تابلو برق
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services#cooling"
                    className="transition hover:text-orange-500">
                    سیستم خنک‌کننده
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services#installation"
                    className="transition hover:text-orange-500">
                    نصب و راه‌اندازی
                  </Link>
                </li>
              </ul>
            </div>

            {/* راه‌های ارتباطی */}
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                راه‌های ارتباطی
              </h4>
              <ul className="mt-4 space-y-3 text-sm text-gray-500">
                <li className="flex items-start justify-center gap-2 sm:justify-start">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                  <Link
                    href="https://nshn.ir/ae_bQV-eyx5bku"
                    className="flex flex-col transition hover:text-orange-500">
                    <div className="flex flex-col">
                      {" "}
                      <span>رباط کریم میدان غدیر</span>
                      <span>مجتمع صنعتی و تجاری نور</span>
                      <span>واحد ۱۷</span>
                    </div>
                  </Link>
                </li>

                <li className="flex items-center justify-center gap-2 sm:justify-start">
                  <Phone className="h-4 w-4 shrink-0 text-orange-500" />
                  <a
                    href="tel:09124384191"
                    className="hover:text-orange-500 transition-colors"
                    dir="ltr">
                    ۰۹۱۲۴۳۸۴۱۹۱
                  </a>
                </li>
                <li className="flex items-center justify-center gap-2 sm:justify-start">
                  <a
                    href="https://instagram.com/parsian-partoalvand-induction"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-orange-500 transition-colors">
                    <FaInstagram className="h-4 w-4 shrink-0 text-orange-500" />
                    <span>Parsian_partoalvand_induction</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
