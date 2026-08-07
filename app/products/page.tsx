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
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";
import { ConsultationCtaButton } from "@/components/ConsultationCtaButton";

export const metadata = {
  title: "محصولات",
  description: "مشاهده کامل انواع کوره‌های القایی و تجهیزات جانبی پارسیان",
};

const validCategories = [
  "MELTING_FURNACE",
  "FORGING_FURNACE",
  "HARDENING_FURNACE",
  "COOLING_SYSTEM",
  "FREQUENCY_CONVERTER",
  "CRUCIBLE",
  "LINK",
  "PERIPHERAL_EQUIPMENT",
] as const;

type CategoryValue = (typeof validCategories)[number];

function isValidCategory(value: string | undefined): value is CategoryValue {
  return !!value && (validCategories as readonly string[]).includes(value);
}

// کلمات کلیدی مرتبط با هر دسته‌بندی
const categoryKeywords: Record<CategoryValue, string[]> = {
  MELTING_FURNACE: ["ذوب", "کوره ذوب", "کوره القایی ذوب", "melting"],
  FORGING_FURNACE: ["فورج", "کوره فورج", "forging", "forge"],
  HARDENING_FURNACE: ["سخت کاری", "سخت‌کاری", "سختکاری", "hardening"],
  COOLING_SYSTEM: [
    "خنک",
    "خنک‌کننده",
    "خنک کننده",
    "سیستم خنک",
    "cooling",
    "کولینگ",
  ],
  FREQUENCY_CONVERTER: [
    "مبدل فرکانس",
    "مبدل",
    "فرکانس",
    "اینورتر",
    "frequency",
    "converter",
  ],
  CRUCIBLE: ["بوته", "crucible"],
  LINK: ["لینک", "link"],
  PERIPHERAL_EQUIPMENT: ["جانبی", "قطعات", "تجهیزات جانبی", "peripheral"],
};

// تشخیص دسته‌بندی از روی کلمه سرچ‌شده
function detectCategoryFromSearch(search?: string): CategoryValue | undefined {
  if (!search) return undefined;

  const normalized = search.trim().toLowerCase().replace(/‌/g, " ");

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (
      keywords.some((keyword) => normalized.includes(keyword.toLowerCase()))
    ) {
      return category as CategoryValue;
    }
  }
  return undefined;
}

const categoryTabs: { value?: CategoryValue; label: string }[] = [
  { value: undefined, label: "همه محصولات" },
  { value: "MELTING_FURNACE", label: "کوره‌های القایی ذوب" },
  { value: "FORGING_FURNACE", label: "کوره‌های القایی فورج" },
  { value: "HARDENING_FURNACE", label: "کوره‌های القایی سخت کاری" },
  { value: "COOLING_SYSTEM", label: "سیستم خنک‌کننده" },
  { value: "FREQUENCY_CONVERTER", label: "سیستم‌های مبدل فرکانس" },
  { value: "CRUCIBLE", label: "بوته" },
  { value: "LINK", label: "لینک" },
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
    a: "بله، نصب، راه‌اندازی و آموزش بهره‌برداری توسط کارشناسان کوره القایی پارسیان در محل شما انجام می‌شود.",
  },
  {
    q: "خدمات پس از فروش شامل چه مواردی است؟",
    a: "گارانتی، پشتیبانی فنی، تامین قطعات یدکی، و امکان بازدید دوره‌ای از تجهیزات نصب‌شده.",
  },
];

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const params = await searchParams;
  const search = params.search?.trim() || undefined;

  let category = isValidCategory(params.category) ? params.category : undefined;

  if (!category && search) {
    category = detectCategoryFromSearch(search);
  }

  const products = await prisma.product.findMany({
    where: {
      ...(category ? { category } : {}),
      ...(!category && search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { description: { contains: search, mode: "insensitive" } },
              { slug: { contains: search, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: { order: "asc" },
  });

  return (
    <main dir="rtl" className="bg-white">
      {/* هیرو */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/product-hero.webp"
            alt="کوره القایی پارسیان"
            fill
            priority
            quality={75}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/60 to-black/40" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <nav className="mb-8 flex items-center gap-1.5 text-xs text-white/70">
            <Link href="/" className="transition hover:text-orange-400">
              خانه
            </Link>
            <ChevronLeft className="h-3 w-3" />
            <span className="text-white">محصولات</span>
          </nav>

          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              محصولات <span className="text-orange-400">پارسیان</span>
            </h1>
            <p className="mt-5 text-sm leading-8 text-white/80 sm:text-base">
              از کوره‌های ذوب، فورج و سخت‌کاری گرفته تا سیستم خنک‌کننده، مبدل
              فرکانس، بوته، لینک و قطعات جانبی؛ پارسیان طیف کاملی از تجهیزات مورد
              نیاز خط تولید ذوب فلزات شما را با ظرفیت‌های ۲۵۰ تا ۲۰۰۰ کیلوگرم و
              امکان سفارشی‌سازی کامل ارائه می‌دهد.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {features.map((f) => (
                <div key={f.title} className="text-center sm:text-right">
                  <f.icon className="mx-auto h-7 w-7 text-orange-400 sm:mx-0" />
                  <p className="mt-2 text-xs font-bold text-white">{f.title}</p>
                  <p className="text-[13px] text-white/60">{f.desc}</p>
                </div>
              ))}
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
                }
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* گرید محصولات */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {search && (
          <div className="mb-6 flex items-center justify-between rounded-xl bg-orange-50 px-5 py-3 text-sm">
            <span className="text-slate-700">
              {category ? (
                <>
                  نمایش دسته‌بندی مرتبط با:{" "}
                  <strong className="text-orange-600">«{search}»</strong>
                </>
              ) : (
                <>
                  نتایج جستجو برای:{" "}
                  <strong className="text-orange-600">«{search}»</strong>
                </>
              )}
            </span>
            <Link href="/products" className="text-orange-600 hover:underline">
              پاک کردن جستجو
            </Link>
          </div>
        )}

        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-gray-200 py-16 text-center text-sm text-gray-400">
            {search
              ? `محصولی با عبارت «${search}» یافت نشد.`
              : "محصولی در این دسته یافت نشد."}
          </p>
        )}
      </div>

      {/* توضیحات درباره پارسیان */}
      <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-2xl border border-gray-100 lg:grid-cols-2">
          <div className="relative h-56 lg:h-auto">
            <video
              src="/product.mp4"
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
              محصولات پارسیان با بهره‌گیری از تکنولوژی روز دنیا و تجربه بالای ۲۰
              سال، راه‌حل‌های مطمئن و اقتصادی برای صنایع ذوب فلزات ارائه
              می‌دهند.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0 text-orange-500" />
                استفاده از قطعات با کیفیت
              </li>
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
              className="group rounded-xl border border-gray-100 px-5 py-4 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium text-slate-900">
                {faq.q}
                <ChevronLeft className="h-4 w-4 shrink-0 text-gray-400 transition group-open:-rotate-90" />
              </summary>
              <p className="mt-3 text-sm leading-7 text-gray-500">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* مشاوره */}
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
                  کارشناسان پارسیان پرتوالوند بر اساس ظرفیت تولید، نوع فلز و
                  شرایط کاری، مناسب‌ترین تجهیزات را پیشنهاد می‌دهند.
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