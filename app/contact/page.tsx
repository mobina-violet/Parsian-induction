import Image from "next/image";
import Link from "next/link";
import {
  MessageCircle,
  ShieldCheck,
  Headset,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowLeft,
  Navigation,
} from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

export const metadata = {
  title: "تماس با ما",
  description: "راه‌های ارتباطی با تیم پارسیان — تلفن، ایمیل، آدرس و فرم تماس",
};

const heroFeatures = [
  { icon: MessageCircle, title: "پاسخ سریع", desc: "کمتر از ۲۴ ساعت" },
  { icon: ShieldCheck, title: "مشاوره تخصصی", desc: "رایگان" },
  { icon: Headset, title: "پشتیبانی فنی", desc: "در تمام مراحل پروژه" },
];

const contactInfo = [
  {
    icon: MapPin,
    title: "آدرس شرکت",
    lines: ["رباط کریم میدان غدیر مجتمع صنعتی تجاری نور"],
    link: { label: "مشاهده در نقشه", href: "#map" },
  },
  {
    icon: Phone,
    title: "تلفن تماس",
    lines: ["۰۹۱۲۴۳۸۴۱۹۱"],
    href: "tel:+989124384191",
  },
  {
    icon: Mail,
    title: "ایمیل",
    lines: ["info@parsian-induction.com"],
    href: "mailto:info@parsian-induction.com",
  },
  {
    icon: Clock,
    title: "ساعات کاری",
    lines: ["شنبه تا چهارشنبه: ۸ تا ۱۷", "پنجشنبه: ۸ تا ۱۳"],
  },
];

const urgentFeatures = [
  "مشاوره تخصصی رایگان",
  "بازدید و بررسی پروژه",
  "پشتیبانی و همراهی",
];

export default function ContactPage() {
  return (
    <main className="bg-white">
      {/* هیرو*/}
      <section className="relative overflow-hidden">
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
          src="/images/contact-us.png"
          alt="تماس با پارسیان"
          fill
          priority
          className="object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Optional Orange Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/60" />
        {/* Content */}
        <div className="relative z-10 mx-auto flex min-h-[500px] max-w-7xl items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
          <div dir="rtl" className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-4xl">
              همیشه آماده پاسخ‌گویی و همراهی با شما
            </h1>

            <p className="mx-auto mt-10 max-w-2xl text-base leading-8 text-gray-200">
              از مشاوره تخصصی تا طراحی، ساخت و راه‌اندازی سیستم‌های کوره القایی،
              تیم پارسیان در تمامی مراحل پروژه در کنار شماست تا بهترین راهکار
              متناسب با نیاز صنعت شما را ارائه دهد.
            </p>

            <div
              dir="ltr"
              className="mt-15 flex flex-wrap justify-center gap-8">
              {heroFeatures.map((f) => (
                <div
                  key={f.title}
                  dir="rtl"
                  className="flex items-center gap-3">
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

      {/* بنر نیاز فوری */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
          <div
            dir="ltr"
            className="flex flex-col gap-6 rounded-2xl bg-orange-500 hover:bg-orange-600 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div dir="rtl" className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15">
                <Headset className="h-6 w-6 text-white" />
              </span>
              <div className="text-right">
                <p className="text-sm font-bold text-white">
                  نیاز به مشاوره فوری دارید؟
                </p>
                <p className="mt-0.5 text-xs text-white/80">
                  کارشناسان ما همین حالا در کنار شما هستند.
                </p>
              </div>
              <Link
                href="tel:+989124384191"
                className="mr-2 flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white px-4 py-2 text-xs font-medium text-orange-600 transition hover:bg-orange-50">
                <Phone className="h-3.5 w-3.5" />
                تماس سریع
              </Link>
            </div>

            <div
              dir="rtl"
              className="flex flex-wrap gap-4 text-xs text-white/90">
              {urgentFeatures.map((f) => (
                <span key={f} className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
