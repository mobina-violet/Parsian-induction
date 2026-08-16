import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone } from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
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

              <div className="mt-4 space-y-3">
                {/* لینک اصلی */}
                <Link
                  href="/products"
                  className="block text-sm font-medium text-slate-800 transition hover:text-orange-500">
                  کوره‌های القایی
                </Link>

                {/* زیرمجموعه‌ها */}
                <ul className="space-y-2 border-r border-gray-100 pr-3 text-sm text-gray-500">
                  <li>
                    <Link
                      href="/services"
                      className="transition hover:text-orange-500">
                      قطعات و تجهیزات
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/projects"
                      className="transition hover:text-orange-500">
                      نصب و راه‌اندازی
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
                {/* 
                <li className="flex items-center justify-center gap-2 sm:justify-start">
                  <a
                    href="https://wa.me/989124384191?text=%D8%B3%D9%84%D8%A7%D9%85%D8%8C%20%D9%85%DB%8C%E2%80%8C%D8%AE%D9%88%D8%A7%D8%B3%D8%AA%D9%85%20%D8%AF%D8%B1%D8%A8%D8%A7%D8%B1%D9%87%20%DA%A9%D9%88%D8%B1%D9%87%20%D8%A7%D9%84%D9%82%D8%A7%DB%8C%DB%8C%20%D8%B3%D9%88%D8%A7%D9%84%20%D8%A8%D9%BE%D8%B1%D8%B3%D9%85"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-orange-500 transition-colors">
                    <FaWhatsapp className="h-4 w-4 shrink-0 text-orange-500" />
                    <span>پیام در واتساپ</span>
                  </a>
                </li>
                */}
                <li className="flex items-center justify-center gap-2 sm:justify-start">
                  <a
                    href="https://instagram.com/parsian_partoalvand"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-orange-500 transition-colors">
                    <FaInstagram className="h-4 w-4 shrink-0 text-orange-500" />
                    <span>parsian_partoalvand</span>
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
