import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  ClipboardCheck,
  Cpu,
  Factory,
  Settings,
  ClipboardList,
  Headset,
  ShieldCheck,
  Clock,
  Users,
  Lightbulb,
  MessageCircle,
  Compass,
  Wrench,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";

export const metadata = {
  title: "خدمات",
  description:
    "خدمات تخصصی پارسیان در مشاوره، طراحی، ساخت، نصب و پشتیبانی سیستم‌های کوره های القایی",
};

const serviceTabs = [
  { value: "SPARE_PARTS", label: "لوازم یدکی" },
  { value: "PERIPHERAL_EQUIPMENT", label: "قطعات و تجهیزات جانبی" },
] as const;

type ServiceCategory = (typeof serviceTabs)[number]["value"];

const services = [
  {
    icon: ClipboardCheck,
    title: "مشاوره و امکان‌سنجی",
    desc: "بررسی نیاز شما و ارائه راهکارهای بهینه و فنی پیش از هر تصمیم",
    color: "bg-blue-50 text-blue-500",
  },
  {
    icon: Factory,
    title: "ساخت و تولید",
    desc: "ساخت دستگاه‌ها و قطعات با دقت بالا در کارگاه‌های تخصصی",
    color: "bg-sky-50 text-sky-500",
  },
  {
    icon: Cpu,
    title: "طراحی و مهندسی",
    desc: "طراحی مهندسی دقیق و تجهیزات اختصاصی متناسب با خط تولید مشتری",
    color: "bg-emerald-50 text-emerald-500",
  },
  {
    icon: Settings,
    title: "نصب و راه‌اندازی",
    desc: "نصب، راه‌اندازی و آموزش کامل تجهیزات در محل مشتری",
    color: "bg-orange-50 text-orange-500",
  },
  {
    icon: ClipboardList,
    title: "تست و کنترل کیفیت",
    desc: "انجام تست‌های دقیق و کنترل کیفیت پیش از تحویل نهایی",
    color: "bg-rose-50 text-rose-500",
  },
  {
    icon: Headset,
    title: "پشتیبانی و خدمات پس از فروش",
    desc: "پشتیبانی ۲۴/۷ و تامین قطعات برای عملکرد بهتر و پایدارتر دستگاه‌ها",
    color: "bg-purple-50 text-purple-500",
  },
];

const whyUs = [
  {
    icon: ShieldCheck,
    title: "کیفیت و قابلیت اطمینان",
    desc: "استفاده از استانداردهای بین‌المللی و فناوری‌های روز دنیا",
  },
  {
    icon: Clock,
    title: "سرعت در اجرا",
    desc: "تحویل به‌موقع پروژه‌ها با سیستم مدیریت نوین",
  },
  {
    icon: Users,
    title: "تیم متخصص",
    desc: "متخصصین مجرب و متعهد در کنار شما",
  },
  {
    icon: Lightbulb,
    title: "راهکارهای نوآورانه",
    desc: "ارائه راهکارهای حرفه‌ای و به‌روز برای صنایع مختلف",
  },
];

const process = [
  {
    number: "۰۱",
    icon: MessageCircle,
    title: "مشاوره و نیازسنجی",
    desc: "بررسی نیازها و ارائه راهکارهای مناسب توسط تیم متخصص",
  },
  {
    number: "۰۲",
    icon: Compass,
    title: "طراحی و مهندسی",
    desc: "ارائه طرح و مستندات فنی و برآورد هزینه‌ها",
  },
  {
    number: "۰۳",
    icon: Factory,
    title: "ساخت و تولید",
    desc: "تولید قطعات و ساخت دستگاه‌ها با کیفیت بالا و استاندارد",
  },
  {
    number: "۰۴",
    icon: Wrench,
    title: "نصب و راه‌اندازی",
    desc: "نصب، تست و راه‌اندازی تجهیزات در محل مشتری",
  },
  {
    number: "۰۵",
    icon: ShieldCheck,
    title: "تحویل و پشتیبانی",
    desc: "تحویل نهایی و ارائه خدمات پشتیبانی پایدار مداوم",
  },
];

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const activeCategory: ServiceCategory =
    params.category === "PERIPHERAL_EQUIPMENT"
      ? "PERIPHERAL_EQUIPMENT"
      : "SPARE_PARTS";

  const items = await prisma.product.findMany({
    where: { category: activeCategory },
    orderBy: { order: "asc" },
  });

  return (
    <main dir="rtl" className="bg-white">
      {/* هیرو */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/services/hero.webp"
            alt="خدمات پارسیان"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/60 to-black/40" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <nav className="mb-8 flex items-center gap-1.5 text-xs text-white/70">
            <Link href="/" className="transition hover:text-orange-400">
              خانه
            </Link>
            <ChevronLeft className="h-3 w-3" />
            <span className="text-white">خدمات</span>
          </nav>

          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-orange-500/20 px-3 py-1 text-xs font-medium text-orange-300">
              خدمات تخصصی
            </span>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-4xl">
              خدمات <span className="text-orange-400">کوره القایی</span> پارسیان
            </h1>
            <p className="mt-5 text-sm leading-7 text-white/80 sm:text-base lg:text-lg lg:leading-8">
              از مشاوره و طراحی تا ساخت، نصب و پشتیبانی تخصصی. همراه شما هستیم
              تا بهترین عملکرد را از کوره القایی و تجهیزات خط تولید خود بگیرید.
            </p>
          </div>
        </div>
      </section>

      {/* فیلتر + کارت‌ها */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-3">
          {serviceTabs.map((tab) => {
            const isActive = activeCategory === tab.value;
            return (
              <Link
                key={tab.value}
                href={`/services?category=${tab.value}`}
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

        <div className="mt-10">
          {items.length > 0 ? (
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {items.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          ) : (
            <p className="rounded-xl border border-dashed border-gray-200 py-16 text-center text-sm text-gray-400">
              موردی در این دسته ثبت نشده است.
            </p>
          )}
        </div>
      </section>

      {/* خدمات ما */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-center text-xl font-bold text-slate-900 sm:text-2xl">
            خدمات ما
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-2xl border border-gray-100 p-4 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <span
                  className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl ${service.color}`}>
                  <service.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-2 text-[11px] font-bold text-slate-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-xs leading-6 text-gray-400">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* چرا خدمات ما؟ */}
      <section className="relative overflow-hidden bg-[#0D0D0D]">
        <div className="absolute -top-40 right-0 h-[450px] w-[450px] rounded-full bg-orange-500/15 blur-[180px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-red-500/10 blur-[180px]" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center text-xl font-bold text-white sm:text-2xl">
            چرا خدمات ما؟
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-orange-400/40 hover:bg-white/10">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 ring-1 ring-orange-400/20 transition-all duration-300 group-hover:scale-110 group-hover:ring-orange-400/50">
                  <item.icon className="h-6 w-6 text-orange-400" />
                </span>
                <h3 className="mt-5 text-sm font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-6 text-slate-300">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* فرآیند همکاری */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-center text-xl font-bold text-slate-900 sm:text-2xl">
            فرآیند همکاری با ما
          </h2>

          <div className="relative mt-10 grid grid-cols-1 gap-8 sm:grid-cols-5">
            <div className="pointer-events-none absolute inset-x-0 top-6 hidden h-px bg-gray-200 sm:block" />
            {process.map((step) => (
              <div
                key={step.title}
                className="relative flex flex-col items-center text-center">
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm">
                  <step.icon className="h-5 w-5 text-slate-700" />
                </div>
                <span className="absolute -top-1 right-1/3 z-20 flex h-5 w-5 translate-x-1/2 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
                  {step.number}
                </span>
                <h3 className="mt-4 text-sm font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-xs leading-6 text-gray-400">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
