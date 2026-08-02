import Link from "next/link";

import { ChevronLeft } from "lucide-react";
import { ProjectHeroSlideshow } from "@/components/ProjectHeroSlideshow";
import {
  ArrowLeft,
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
  Phone,
} from "lucide-react";

export const metadata = {
  title: "خدمات",
  description:
    "خدمات تخصصی پارسیان در مشاوره، طراحی، ساخت، نصب و پشتیبانی سیستم‌های کوره های القایی",
};

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

const faqs = [
  {
    q: "مدت زمان اجرای یک پروژه چقدر است؟",
    a: "بسته به نوع و مقیاس پروژه متغیر است. بعد از جلسه‌ی مشاوره و نیازسنجی، یه بازه‌ی زمانی دقیق به شما اعلام می‌شود.",
  },
  {
    q: "آیا امکان سفارشی‌سازی تجهیزات وجود دارد؟",
    a: "بله، طراحی و مهندسی تمام محصولات پارسیان بر اساس نیاز مشخص هر مشتری قابل تنظیم است.",
  },
  {
    q: "آیا خدمات پس از فروش ارائه می‌دهید؟",
    a: "بله، پشتیبانی فنی، تامین قطعات یدکی و بازدید دوره‌ای بخشی از خدمات پس از فروش پارسیان است.",
  },
  {
    q: "گارانتی محصولات و خدمات شما چیست؟",
    a: "تمام محصولات و خدمات پارسیان دارای گارانتی مشخص هستند که جزئیات آن در قرارداد همکاری ذکر می‌شود.",
  },
  {
    q: "چه صنایعی می‌توانند از محصولات و خدمات شما استفاده کنند؟",
    a: "صنایع ذوب فلزات آهنی و غیرآهنی از جمله فولاد، چدن، آلومینیوم و مس، در مقیاس‌های مختلف.",
  },
  {
    q: "نحوه‌ی درخواست مشاوره چگونه است؟",
    a: "کافیست از طریق دکمه‌ی «درخواست مشاوره» فرم کوتاهی پر کنید تا کارشناسان ما در سریع‌ترین زمان با شما تماس بگیرند.",
  },
];

export default function ServicesPage() {
  return (
    <main dir="rtl" className="bg-white">
      {/* بردکرامب + هیرو */}
      <div className="border-b border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-xs text-gray-400">
            <Link href="/" className="transition hover:text-orange-500">
              خانه
            </Link>
            <ChevronLeft className="h-3 w-3" />
            <span className="text-slate-600">خدمات</span>
          </nav>
        </div>

        <div
          dir="ltr"
          className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:py-14">
          <div dir="rtl" className="text-right">
            <span className="text-xs font-medium text-orange-400">
              خدمات ما
            </span>
            <h1 className="mt-2 text-2xl font-bold leading-tight text-black sm:text-4xl">
              خدمات{" "}
              <span className="text-orange-500">تخصصی کوره القایی پارسیان</span>
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
              فراتر از ساخت تجهیزات، شریک فنی پروژه‌های شما هستیم. با ارائه
              خدمات مهندسی، طراحی، ساخت، نصب و پشتیبانی، عملکرد سیستم‌های القایی
              را به حداکثر می‌رسانیم.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-orange-600">
                مشاهده نمونه پروژه‌ها
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
              aria-hidden="true">
              <div className="h-64 w-64 rounded-full border border-orange-100 sm:h-80 sm:w-80" />
              <div className="absolute h-48 w-48 rounded-full bg-orange-50 sm:h-60 sm:w-60" />
            </div>

            <ProjectHeroSlideshow
              images={[
                "/images/services/services1.jpg",
                "/images/services/services2.jpg",
                "/images/services/services3.jpg",
                "/images/services/services4.jpg",
              ]}
              alt="خدمات تخصصی پارسیان"
            />
          </div>
        </div>
      </div>

      {/* خدمات ما */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-center text-xl font-bold text-slate-900 sm:text-2xl">
            خدمات ما
          </h2>

          <div
            dir="ltr"
            className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
            {services.map((service) => (
              <div
                key={service.title}
                dir="rtl"
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

          <div
            dir="ltr"
            className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((item) => (
              <div
                key={item.title}
                dir="rtl"
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

      {/* فرآیند همکاری با ما */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-center text-xl font-bold text-slate-900 sm:text-2xl">
            فرآیند همکاری با ما
          </h2>

          <div
            dir="ltr"
            className="relative mt-10 grid grid-cols-1 gap-8 sm:grid-cols-5">
            <div className="pointer-events-none absolute inset-x-0 top-6 hidden h-px bg-gray-200 sm:block" />
            {process.map((step) => (
              <div
                key={step.title}
                dir="rtl"
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

      {/* سوالات متداول + کارت تماس */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div
            dir="rtl"
            className="grid gap-8 items-start lg:grid-cols-[1.6fr_0.9fr]">
            <div>
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                سوالات متداول
              </h2>
              <div className="mt-6 space-y-3">
                {faqs.map((faq) => (
                  <details
                    key={faq.q}
                    className="group rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm transition hover:shadow-md [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium text-slate-900">
                      <span>{faq.q}</span>
                      <ArrowLeft className="h-4 w-4 shrink-0 text-gray-400 transition-transform duration-300 group-open:-rotate-90" />
                    </summary>
                    <p className="mt-3 text-sm leading-7 text-gray-500">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50">
                <Headset className="h-5 w-5 text-orange-500" />
              </span>
              <h3 className="mt-3 text-sm font-bold text-slate-900">
                سوالی دارید؟
              </h3>
              <p className="mt-1 max-w-xs text-xs leading-6 text-gray-400">
                کارشناسان ما آماده پاسخگویی و راهنمایی شما هستند.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-xs font-medium text-white transition hover:bg-orange-600">
                <Phone className="h-3.5 w-3.5" />
                تماس با ما
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
