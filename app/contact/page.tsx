import {getPublicSettings} from "@/lib/cms-public";
import Image from "next/image";
import { heroBlur } from "@/lib/hero-blur";
import Link from "next/link";
import {
  MessageCircle,
  ShieldCheck,
  Headset,
  MapPin,
  Phone,
  Clock,
  ArrowLeft,
  Navigation,
} from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { ContactForm } from "@/components/ContactForm";

export const metadata = {
  alternates: { canonical: "/contact" },
  title: "تماس با ما",
  description: "راه‌های ارتباطی با تیم پارسیان — تلفن، اینستاگرام، آدرس و فرم تماس",
};

const heroFeatures = [
  { icon: MessageCircle, title: "پاسخ سریع", desc: "کمتر از ۲۴ ساعت" },
  { icon: ShieldCheck, title: "مشاوره تخصصی", desc: "رایگان" },
  { icon: Headset, title: "پشتیبانی فنی", desc: "در تمام مراحل پروژه" },
];

const makeContactInfo = (s: Awaited<ReturnType<typeof getPublicSettings>>) => [
  {
    icon: MapPin,
    title: "آدرس شرکت",
    lines: [s.address],
    link: { label: "مشاهده در نقشه", href: "#map" },
  },
  {
    icon: Phone,
    title: "تلفن تماس",
    lines: [s.phone],
    href: `tel:${s.phone}`,
  },
  {
    icon: FaInstagram,
    title: "اینستاگرام",
    lines: [`@${s.instagram.split("/").filter(Boolean).at(-1)}`],
    href: s.instagram,
    external: true,
  },
  {
    icon: Clock,
    title: "ساعات کاری",
    lines: s.hours.split("\n"),
  },
];

const urgentFeatures = [
  "مشاوره تخصصی رایگان",
  "بازدید و بررسی پروژه",
  "پشتیبانی و همراهی",
];

export default async function ContactPage() {
 const s=await getPublicSettings(); const contactInfo=makeContactInfo(s);
  return (
    <main className="bg-white">
      {/* هیرو*/}
      <section className="relative overflow-hidden bg-slate-900">
        {/* بردکرامب + هیرو */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-1.5 text-xs text-gray-400">
              <Link href="/" className="transition hover:text-orange-500">
                خانه
              </Link>
              <ChevronLeft className="h-3 w-3" />
              <Link
                href="/contact"
                className="transition hover:text-orange-500">
                تماس با ما{" "}
              </Link>
            </nav>
          </div>
        </div>
        {/* Background Image */}
        <Image
          src="/images/contact.webp"
          alt="تماس با پارسیان"
          fill
          priority
          placeholder="blur"
          blurDataURL={heroBlur.contact}
          quality={75}
          sizes="100vw"
          className="object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Optional Orange Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/60" />
        {/* Content */}
        <div className="relative z-10 mx-auto flex min-h-[500px] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
          <div dir="rtl" className="max-w-2xl text-right">
            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-4xl">
              آماده <span className="text-orange-400">پاسخ‌گویی</span> و همراهی
              با شما
            </h1>

            <p className="mt-6 text-sm leading-7 text-gray-200 sm:text-base lg:text-lg lg:leading-8">
              از مشاوره تخصصی تا طراحی، ساخت و راه‌اندازی کوره القایی، تیم
              پارسیان در تمام مراحل پروژه کنار شماست تا بهترین راهکار متناسب با
              نیاز صنعت شما را ارائه دهد.
            </p>

            <div className="mt-10 flex flex-wrap gap-8">
              {heroFeatures.map((f) => (
                <div key={f.title} className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500/20 backdrop-blur">
                    <f.icon className="h-5 w-5 text-orange-400" />
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-bold text-white">{f.title}</p>
                    <p className="text-xs text-gray-300">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* راه‌های ارتباطی */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
          <div
            dir="rtl"
            className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <div className="text-right">
              <h2 className="text-lg font-bold text-white sm:text-xl">
                راه‌های ارتباطی
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                از طریق یکی از روش‌های زیر با ما در تماس باشید.
              </p>
            </div>

            <div
              dir="ltr"
              className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {contactInfo.map((item) => (
                <div
                  key={item.title}
                  dir="rtl"
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 text-right">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10">
                    <item.icon className="h-5 w-5 text-orange-400" />
                  </span>
                  <h3 className="mt-3 text-sm font-bold text-white">
                    {item.title}
                  </h3>
                  <div className="mt-1.5 space-y-0.5 text-xs leading-6">
                    {item.lines.map((line) =>
                      item.href ? (
                        <Link
                          key={line}
                          href={item.href}
                          {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="block text-slate-400 transition hover:text-orange-400">
                          {line}
                        </Link>
                      ) : (
                        <p key={line} className="text-slate-400">
                          {line}
                        </p>
                      ),
                    )}
                  </div>
                  {item.link && (
                    <Link
                      href={item.link.href}
                      className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-orange-400 hover:text-orange-300">
                      {item.link.label}
                      <ArrowLeft className="h-3 w-3" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* فرم تماس + نقشه */}
      <section id="map" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div dir="ltr" className="grid gap-8 lg:grid-cols-2">
            {/* نقشه استایلیزه‌شده — فعلاً placeholder، بعداً با Google Maps واقعی جایگزین میشه */}
            <div className="relative h-72 overflow-hidden rounded-2xl bg-slate-900 lg:h-full">
              <iframe
                title="map-iframe"
                src="https://neshan.org/maps/iframe/places/ae535b9cf55e085ce4060ea9c9848b93#c35.472-51.066-19z-0p/35.47187961575133/51.066129023257254"
                width="600"
                height="450"
                allowFullScreen
                loading="lazy"></iframe>

              <div
                dir="rtl"
                className="absolute bottom-4 right-4 left-4 flex items-center gap-3 rounded-2xl bg-slate-900 p-4 text-right sm:right-4 sm:left-auto sm:max-w-xs">
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-white">بازدید حضوری</h3>
                  <p className="mt-1 text-xs leading-6 text-slate-400">
                    امکان بازدید حضوری از کارخانه و دفتر فنی با هماهنگی قبلی
                    برای کارفرمایان و شرکت‌های محترم فراهم است.
                  </p>
                  <Link
                    href="https://nshn.ir/ae_bQV-eyx5bku"
                    className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-orange-400 hover:text-orange-300">
                    دریافت مسیر
                    <Navigation className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* بنر نیاز فوری (اول موبایل؛ از sm و lg به بالا بازتر می‌شود) */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
          <div
            dir="rtl"
            className="flex flex-col gap-5 rounded-2xl bg-gradient-to-l from-orange-500 to-orange-600 p-5 text-right shadow-lg shadow-orange-500/20 sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:p-8">
            {/* تیتر */}
            <div className="flex items-start gap-3 sm:items-center sm:gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 sm:h-12 sm:w-12">
                <Headset className="h-5 w-5 text-white sm:h-6 sm:w-6" />
              </span>
              <div className="min-w-0">
                <p className="text-base font-bold leading-7 text-white sm:text-lg">
                  نیاز به مشاوره فوری دارید؟
                </p>
                <p className="mt-0.5 text-sm leading-7 text-white/85">
                  در ساعات کاری، کارشناسان ما پاسخگوی سؤال‌های فنی شما هستند.
                </p>
              </div>
            </div>

            {/* مزیت‌ها: موبایل زیر هم با خط جداکننده، از sm به بعد کنار هم */}
            <ul className="grid gap-2.5 border-t border-white/20 pt-4 text-sm text-white/90 sm:flex sm:flex-wrap sm:gap-x-5 sm:gap-y-2 sm:border-t-0 sm:pt-0 lg:flex-1 lg:justify-center">
              {urgentFeatures.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {/* دکمه: موبایل تمام‌عرض */}
            <Link
              href={`tel:${s.phone}`}
              className="flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-orange-600 shadow-sm transition hover:bg-orange-50 sm:inline-flex sm:w-auto sm:self-start lg:self-auto">
              <Phone className="h-4 w-4" />
              تماس سریع
              <span dir="ltr" className="font-medium text-orange-500">
                {s.phone}
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
