import Link from "next/link";
import Image from "next/image";

import {
  ChevronLeft,
  Gauge,
  Wrench,
  ShieldCheck,
  HeartHandshake,
  Check,
  Headset,
  MessageSquare,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";
import { ConsultationCtaButton } from "@/components/ConsultationCtaButton";
import { toPersianDigits } from "@/lib/format";

export const metadata = {
  title: "محصولات",
  description: "مشاهده کامل انواع کوره‌های القایی و تجهیزات جانبی پارسیان",
};

const validCategories = [
  "MELTING_FURNACE",
  "HOLDING_FURNACE",
  "ELECTRICAL_PANEL",
  "COOLING_SYSTEM",
  "PERIPHERAL_EQUIPMENT",
] as const;

type CategoryValue = (typeof validCategories)[number];

function isValidCategory(value: string | undefined): value is CategoryValue {
  return !!value && (validCategories as readonly string[]).includes(value);
}

const categoryTabs: { value?: CategoryValue; label: string }[] = [
  { value: undefined, label: "همه محصولات" },
  { value: "MELTING_FURNACE", label: "کوره‌های القایی ذوب" },
  { value: "HOLDING_FURNACE", label: "کوره‌های القایی نگه‌دارنده" },
  { value: "ELECTRICAL_PANEL", label: "سیستم‌های تابلو برق" },
  { value: "COOLING_SYSTEM", label: "سیستم خنک‌کننده" },
  { value: "PERIPHERAL_EQUIPMENT", label: "قطعات و تجهیزات جانبی" },
];

const features = [
  { icon: Gauge, title: "راندمان بالا", desc: "مصرف انرژی بهینه" },
  { icon: Wrench, title: "طراحی اختصاصی", desc: "متناسب با نیاز شما" },
  { icon: ShieldCheck, title: "کیفیت پایدار", desc: "استانداردهای جهانی" },
  { icon: HeartHandshake, title: "خدمات کامل", desc: "نصب و پشتیبانی" },
];

const faqs = [
  {
    q: "کوره القایی چه مزیتی نسبت به کوره‌های دیگر دارد؟",
    a: "کوره‌های القایی به دلیل گرمایش مستقیم فلز، راندمان انرژی بالاتر، کنترل دقیق‌تر دما، و آلایندگی کمتری نسبت به کوره‌های سوختی دارند.",
  },
  {
    q: "کوره القایی برای چه نوع فلزاتی مناسب است؟",
    a: "برای فلزات آهنی (فولاد، چدن) و غیرآهنی (آلومینیوم، مس، برنز، روی) قابل استفاده است؛ فرکانس و توان کوره بر اساس نوع فلز و ظرفیت مدنظر تنظیم می‌شود.",
  },
  {
    q: "مدت زمان ساخت و تحویل کوره چقدر است؟",
    a: "بسته به ظرفیت و مشخصات سفارشی متغیر است. برای تاریخ دقیق، از طریق فرم مشاوره با تیم فروش هماهنگ کنید.",
  },
  {
    q: "مصرف برق کوره‌های القایی چقدر است؟",
    a: "مصرف برق مستقیماً به توان و ظرفیت کوره بستگی دارد و برای هر مدل در جدول مشخصات فنی همان صفحه درج شده است.",
  },
  {
    q: "آیا نصب و راه‌اندازی توسط تیم پارسیان انجام می‌شود؟",
    a: "بله، نصب، راه‌اندازی و آموزش بهره‌برداری توسط کارشناسان پارسیان در محل شما انجام می‌شود.",
  },
  {
    q: "خدمات پس از فروش شامل چه مواردی است؟",
    a: "گارانتی، پشتیبانی فنی، تامین قطعات یدکی، و امکان بازدید دوره‌ای از تجهیزات نصب‌شده.",
  },
];

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const category = isValidCategory(params.category)
    ? params.category
    : undefined;

  const [products, totalCount] = await Promise.all([
    prisma.product.findMany({
      where: category ? { category } : undefined,
      orderBy: { order: "asc" },
    }),
    prisma.product.count(),
  ]);

  return (
    <main dir="rtl" className="bg-white">
      {/* بردکرامب + هیرو کوچک */}
      <div className="border-b border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-xs text-gray-400">
            <Link href="/" className="transition hover:text-orange-500">
              خانه
            </Link>
            <ChevronLeft className="h-3 w-3" />
            <span className="text-slate-600">محصولات</span>
          </nav>
        </div>

        <div
          dir="ltr"
          className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:py-14">
          <div dir="rtl" className="text-right">
            <h1 className="text-3xl font-bold text-slate-900 sm:text-3xl">
              محصولات <span className="text-red-600">پارسیان</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-8 text-gray-500 sm:text-base">
              از کوره‌های ذوب و نگه‌دارنده گرفته تا تابلوهای برق صنعتی، سیستم
              خنک‌ کننده و قطعات جانبی؛ پارسیان طیف کاملی از تجهیزات مورد نیاز
              خط تولید ذوب فلزات شما را با ظرفیت‌های ۲۵۰ تا ۲۰۰۰ کیلوگرم و امکان
              سفارشی‌سازی کامل ارائه می‌دهد.
            </p>

            <div
              dir="ltr"
              className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {features.map((f) => (
                <div
                  key={f.title}
                  dir="rtl"
                  className="flex flex-col items-center text-center sm:items-start sm:text-right">
                  <f.icon className="h-7 w-7 mt-4 text-orange-500" />
                  <p className="mt-2 text-xs font-bold text-slate-900">
                    {f.title}
                  </p>
                  <p className="text-[13px] text-gray-400">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* تصویر هیرو با برش هندسی + لایه کمرنگ زیرین */}
          <div className="relative flex justify-center lg:justify-end">
            {/* لایه کمرنگ زیرین (همان تصویر ولی محو و جابه‌جا) */}
            <div
              className="
      absolute
      w-full max-w-[340px] sm:max-w-[400px]
      translate-x-3 translate-y-4
      opacity-40
      blur-[2px]
      lg:-translate-x-5 lg:-translate-y-5
    "
              style={{
                clipPath: "polygon(12% 5%, 90% 0%, 100% 100%, 0% 100%, 0% 18%)",
              }}>
              <Image
                src="/products.png"
                alt=""
                width={420}
                height={420}
                className="h-auto w-full object-cover"
                aria-hidden="true"
              />
            </div>

            {/* تصویر اصلی */}
            <div
              className="
      relative
      w-full max-w-[340px] sm:max-w-[400px]
      overflow-hidden
      shadow-[0_25px_60px_-12px_rgba(249,115,22,0.35)]
    "
              style={{
                clipPath:
                  "polygon(12% 5%, 100% 0%, 100% 100%, 0% 100%, 0% 18%)",
              }}>
              <Image
                src="/products.png"
                alt="کوره القایی پارسیان"
                width={420}
                height={420}
                className="h-auto w-full object-cover"
                priority
              />

              {/* هایلایت و خطوط روی تصویر */}
              <div
                className="pointer-events-none absolute inset-0"
                aria-hidden="true">
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/15 via-transparent to-red-500/10" />
                <div className="absolute -left-4 top-1/3 h-[2px] w-28 rotate-[-18deg] bg-gradient-to-r from-orange-400/90 to-transparent" />
                <div className="absolute right-6 top-1/4 h-[1.5px] w-20 rotate-12 bg-gradient-to-l from-red-400/80 to-transparent" />
                <div className="absolute right-8 top-10 h-2.5 w-2.5 rounded-full bg-orange-300 shadow-[0_0_14px_4px_rgba(251,146,60,0.7)]" />
                <div className="absolute left-10 bottom-14 h-2 w-2 rounded-full bg-red-300 shadow-[0_0_10px_3px_rgba(248,113,113,0.55)]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* تب‌های دسته‌بندی */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-3">
          {categoryTabs.map((tab) => {
            const isActive = category === tab.value;
            const href = tab.value
              ? `/products?category=${tab.value}`
              : "/products";
            return (
              <Link
                key={tab.label}
                href={href}
                scroll={false}
                className={
                  isActive
                    ? "rounded-full bg-orange-500 px-5 py-2.5 text-sm font-medium text-white"
                    : "rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:border-orange-300 hover:text-orange-500"
                }>
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* آمار */}
      <div className="mx-auto max-w-7xl px-4  sm:px-6 lg:px-8 ">
        <div
          dir="ltr"
          className="grid grid-cols-1 gap-6 rounded-2xl border border-gray-100 bg-gray-50  p-6 text-center justify-items-center sm:grid-cols-4 sm:text-right">
          <div dir="rtl">
            <p className="text-lg font-bold text-slate-900">
              {toPersianDigits(totalCount)} مدل محصول
            </p>
            <p className="text-xs text-gray-400">متنوع و تخصصی</p>
          </div>
          <div dir="rtl">
            <p className="text-lg font-bold text-slate-900">
              ۱۰۰+ پروژه اجرا شده
            </p>
            <p className="text-xs text-gray-400">در صنایع مختلف</p>
          </div>
          <div dir="rtl">
            <p className="text-lg font-bold text-slate-900">
              ۲۰۰۰+ کیلوگرم ظرفیت
            </p>
            <p className="text-xs text-gray-400">تولید کوره‌های سفارشی</p>
          </div>

          <div dir="rtl">
            <p className="text-lg font-bold text-slate-900">
              ۲۴/۷ پشتیبانی فنی
            </p>
            <p className="text-xs text-gray-400">خدمات پس از فروش</p>
          </div>
        </div>
      </div>

      {/* گرید محصولات */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-gray-200 py-16 text-center text-sm text-gray-400">
            محصولی در این دسته یافت نشد.
          </p>
        )}
      </div>

      {/* بنر اطلاعات */}
      <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-2xl border border-gray-100 lg:grid-cols-2">
          <div className="relative h-56 lg:h-auto">
            <video
              src="/product.MOV"
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center bg-gray-50 p-8">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
              کوره‌های القایی پارسیان
            </h2>
            <p className="mt-2 text-sm leading-7 text-gray-500">
              محصولات پارسیان با بهره‌گیری از تکنولوژی روز دنیا و تجربه‌ی ۲۵
              ساله، راه‌حل‌های مطمئن و اقتصادی برای صنایع ذوب فلزات ارائه
              می‌دهند.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0 text-orange-500" />
                طراحی و ساخت مطابق با نیاز مشتری
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0 text-orange-500" />
                مصرف انرژی کمتر و راندمان بالاتر
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0 text-orange-500" />
                استفاده از قطعات با کیفیت اروپایی
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0 text-orange-500" />
                نصب، راه‌اندازی و پشتیبانی کامل
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* سوالات متداول */}
      <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-orange-500 sm:text-2xl">
          سوالات متداول
        </h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-xl border border-gray-100 px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium text-slate-900">
                {faq.q}
                <ChevronLeft className="h-4 w-4 shrink-0 text-gray-400 transition group-open:-rotate-90" />
              </summary>
              <p className="mt-3 text-sm leading-7 text-gray-500">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* بنر پایین */}
      <div className="bg-gradient-to-l from-orange-50 via-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 rounded-3xl border border-orange-100 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-orange-100 p-3">
                <Headset className="h-7 w-7 text-orange-500" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  نیاز به راهنمایی برای انتخاب کوره دارید؟
                </h3>

                <p className="mt-2 max-w-xl text-sm leading-7 text-gray-500">
                  کارشناسان پارسیان بر اساس ظرفیت تولید، نوع فلز و شرایط کاری،
                  مناسب‌ترین تجهیزات را پیشنهاد می‌دهند.
                </p>

                <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-600">
                  <span>✓ مشاوره تخصصی</span>
                  <span>✓ طراحی سفارشی</span>
                  <span>✓ پشتیبانی فنی</span>
                </div>
              </div>
            </div>

            <ConsultationCtaButton
              label="دریافت مشاوره رایگان"
              source="PRODUCT_PAGE"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
