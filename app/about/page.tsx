import Image from "next/image";
import Link from "next/link";
import {
  Play,
  Users,
  Gauge,
  Settings,
  Headset,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  Lightbulb,
  HeartHandshake,
  TrendingUp,
  ChevronLeft,
} from "lucide-react";

export const metadata = {
  title: "درباره ما",
  description: "تجربه، تخصص و نوآوری پارسیان در صنعت کوره‌های القایی",
};

const stats = [
  { icon: Gauge, value: "راندمان بالا", label: "مصرف انرژی بهینه" },
  { icon: Settings, value: "طراحی سفارشی", label: "متناسب با نیاز شما" },
  { icon: ShieldCheck, value: "کیفیت پایدار", label: "استاندارد صنعتی" },
  { icon: Headset, value: "پشتیبانی کامل", label: "نصب تا بهره‌برداری" },
];

const credentials = [
  {
    icon: GraduationCap,
    title: "کارشناسی ارشد مهندسی برق",
    desc: "دانشگاه رجائی",
  },
  {
    icon: Briefcase,
    title: "بیش از ۲۰ سال تجربه",
    desc: "در صنعت کوره القایی",
  },
];

const values = [
  {
    icon: ShieldCheck,
    title: "کیفیت برتر",
    desc: "تضمین کیفیت در طراحی، ساخت و خدمات پس از فروش",
  },
  {
    icon: Lightbulb,
    title: "نوآوری",
    desc: "استفاده از فناوری‌های روز برای ارائه راهکارهای بهینه",
  },
  {
    icon: HeartHandshake,
    title: "تعهد و مسئولیت‌پذیری",
    desc: "پایبندی به تعهدات و همراهی در تمام مراحل پروژه",
  },
  {
    icon: Users,
    title: "تیم متخصص",
    desc: "تکیه بر دانش و تجربه تیمی متخصص و متعهد",
  },
  {
    icon: TrendingUp,
    title: "بهبود مستمر",
    desc: "جست‌وجو و اجرای راهکارهای بهتر برای پیشرفت پایدار",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-white">
      {/* هیرو تیره */}
      <section className="relative overflow-hidden bg-slate-950 pb-24">
        {/* بردکرامب + هیرو */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-1.5 text-xs text-gray-400">
              <Link href="/" className="transition hover:text-orange-500">
                خانه
              </Link>
              <ChevronLeft className="h-3 w-3" />
              <Link href="/about" className="transition hover:text-orange-500">
                درباره ما{" "}
              </Link>
            </nav>
          </div>
        </div>
        <Image
          src="/images/services/hero-section-services.webp"
          alt="کارخانه پارسیان"
          fill
          quality={75}
          sizes="100vw"
          className="object-cover opacity-40"
        />

        {/* لایه تیره برای خوانایی متن */}
        <div className="absolute inset-0 bg-slate-950/10" />

        <div
          dir="ltr"
          className="relative z-10 mx-auto grid max-w-7xl gap-8 px-4 pt-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8 lg:pt-20">
          <div className="hidden lg:block" />
<div dir="rtl" className="text-right">
  <h1 className="mt-2 text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
    تجربه و تخصص
    <br />
    <span className="text-orange-500">در صنعت کوره القایی</span>
  </h1>

  <p className="mt-4 max-w-lg text-sm leading-7 text-slate-300 sm:text-base lg:text-lg lg:leading-8">
    پارسیان پرتو الوند متخصص طراحی، ساخت و راه‌اندازی کوره القایی است.
    ما با دانش فنی و تیمی مجرب، راهکارهای مطمئن برای صنایع فولاد، مس و
    آلومینیوم ارائه می‌دهیم.
  </p>

  <button className="mt-7 flex items-center gap-3 rounded-full border border-white/15 py-2 pl-2 pr-5 text-sm font-medium text-white transition hover:border-orange-400 hover:text-orange-400">
    تماشای ویدیو معرفی
    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500">
      <Play className="h-4 w-4 fill-white text-white" />
    </span>
  </button>
</div>
        </div>
      </section>

      {/* کارت شناور: ماموریت + آمار */}
      <div className="relative -mt-16 px-4 sm:px-6 lg:px-8">
        <div
          dir="rtl"
          className="mx-auto grid max-w-7xl gap-8 rounded-3xl border border-gray-100 bg-white p-8 shadow-lg lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:p-10">
          <div className="text-right">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
              ماموریت ما
            </h2>
            <p className="mt-2 text-sm leading-7 text-gray-500">
              ارائه راهکارهای مهندسی نوین و قابل اعتماد در حوزه‌ی سیستم‌های
              القایی، برای افزایش بهره‌وری، کیفیت و رقابت‌پذیری صنایع کشور.
            </p>
          </div>

          <div dir="ltr" className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                dir="rtl"
                className="flex flex-col items-center text-center">
                <stat.icon className="h-6 w-6 text-orange-500" />
                <p className="mt-2 text-lg font-bold text-slate-900">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* نگاهی به فعالیت‌های ما */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-center text-xl font-bold text-slate-900 sm:text-2xl">
            نگاهی به فعالیت‌های ما
          </h2>

          <div dir="ltr" className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <button className="group relative h-64 overflow-hidden rounded-2xl sm:h-full">
              <Image
                src="/images/about/about-photo.webp"
                alt="ویدیوی فعالیت‌های پارسیان"
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
              />
            </button>

            <div className="grid grid-cols-2 gap-4">
              {[
                "activity-1.jpg",
                "activity-2.jpg",
                "activity-3.jpg",
                "activity-4.jpg",
              ].map((img) => (
                <div
                  key={img}
                  className="relative h-32 overflow-hidden rounded-2xl sm:h-40">
                  <video
                    src="/images/about/about-video.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="object-cover "
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* بنیان‌گذار و مدیرعامل */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div dir="rtl" className="grid gap-8 lg:grid-cols-3 lg:items-center">
            <div className="relative h-72 overflow-hidden rounded-2xl lg:h-96">
              <Image
                src="/images/about/founder.webp"
                alt="بنیان‌گذار و مدیرعامل پارسیان"
                fill
                className="object-cover"
              />
            </div>

            <div className="text-right">
              <span className="text-xs font-medium text-orange-500">
                بنیان‌گذار و مدیرعامل
              </span>
              <h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
                مهندس جواد محققی
              </h2>
              <p className="mt-3 text-sm leading-7 text-gray-500">
                با بیش از ۲۰ سال تجربه در صنعت القایی و اجرای پروژه‌های متعدد در
                صنایع مختلف فلزی، مهندس محققی با رویکردی نوآورانه و مهندسی، شرکت
                پارسیان پرتو الوند را با هدف ارائه راهکارهای تخصصی و قابل اعتماد
                بنیان‌گذاری کرد.
              </p>
              <p className="mt-3 text-sm leading-7 text-gray-500">
                ایشان همواره کیفیت، تعهد و توسعه فناوری را به‌عنوان اصول اساسی
                در توسعه‌ی پایدار شرکت تاکید دارند.
              </p>
            </div>

            <div dir="rtl" className="rounded-2xl bg-slate-900 p-6">
              <div className="space-y-5">
                {credentials.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start justify-start gap-3 text-right">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500/10">
                      <item.icon className="h-4 w-4 text-orange-400" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-white">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-400">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ارزش‌های ما */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-center text-xl font-bold text-slate-900 sm:text-2xl">
            ارزش‌های ما
          </h2>

          <div
            dir="ltr"
            className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {values.map((value) => (
              <div
                key={value.title}
                dir="rtl"
                className="rounded-2xl border border-gray-100 p-5 text-center transition hover:shadow-md">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
                  <value.icon className="h-6 w-6 text-orange-500" />
                </span>
                <h3 className="mt-3 text-sm font-bold text-slate-900">
                  {value.title}
                </h3>
                <p className="mt-1.5 text-xs leading-6 text-gray-400">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
