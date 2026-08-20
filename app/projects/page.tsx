import Link from "next/link";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { StrategicCapabilityBanner } from "@/components/StrategicCapabilityBanner";

export const metadata = {
  title: "پروژه‌ها",
  description: "نمونه‌ای از پروژه‌های اجرایی پارسیان در صنایع مختلف",
};

const galleryImages = [
  {
    src: "/images/projects/project1.webp",
    alt: "پروژه صنعتی ۱",
  },
  {
    src: "/images/projects/project2.webp",
    alt: "پروژه صنعتی ۲",
  },
  {
    src: "/images/projects/project3.webp",
    alt: "پروژه صنعتی ۳",
  },
  {
    src: "/images/projects/project4.webp",
    alt: "پروژه صنعتی ۴",
  },
  {
    src: "/images/projects/project5.webp",
    alt: "پروژه صنعتی ۵",
  },
  {
    src: "/images/projects/project1.webp",
    alt: "پروژه صنعتی ۶",
  },
];

const videos = [
  {
    src: "/videos/melting-process.mp4",
    poster: "/images/projects/melting-process.webp",
    title: "فرآیند ذوب القایی",
  },
  {
    src: "/videos/forging-process.mp4",
    poster: "/images/projects/forging-process.webp",
    title: "عملیات فورج و شکل‌دهی",
  },
];

export default function ProjectsPage() {
  return (
    <main dir="rtl" className="bg-white">
      {/* هیرو - هم‌اندازه با بقیه صفحات */}
      {/* هیرو - عکس بزرگ تمام‌عرض + متن روی عکس */}
      <section className="relative overflow-hidden">
        {/* عکس پس‌زمینه */}
        <div className="absolute inset-0">
          <Image
            src="/images/projects/project5.webp"
            alt="پروژه‌های پارسیان"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* لایه تیره برای خوانایی متن */}
          <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/60 to-black/40" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          {/* بردکرامب */}
          <nav className="mb-8 flex items-center gap-1.5 text-xs text-white/70">
            <Link href="/" className="transition hover:text-orange-400">
              خانه
            </Link>
            <ChevronLeft className="h-3 w-3" />
            <span className="text-white">پروژه‌ها</span>
          </nav>

          {/* متن روی عکس */}
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-orange-500/20 px-3 py-1 text-xs font-medium text-orange-300">
              پروژه‌های اجرایی
            </span>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-4xl">
              پروژه‌های <span className="text-orange-400">کوره القایی</span>{" "}
              پارسیان
            </h1>
            <p className="mt-5 text-sm leading-7 text-white/80 sm:text-base lg:text-lg lg:leading-8">
              بیش از دو دهه طراحی، ساخت و راه‌اندازی کوره القایی در صنایع فولاد،
              مس، آلومینیوم و قطعه‌سازی. در این صفحه نمونه‌ای از پروژه‌های واقعی
              اجراشده را مشاهده می‌کنید.
            </p>
          </div>
        </div>
      </section>
      {/* گالری عکس */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
            گالری پروژه‌ها
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            نگاهی به بخشی از پروژه‌های پارسیان پرتو الوند
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:gap-5">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ویدیوها */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              ویدیوهای عملیاتی
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              مشاهده فرآیند واقعی کار تجهیزات پارسیان پرتو الوند
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {videos.map((video) => (
              <div
                key={video.title}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                <div className="relative aspect-video bg-black">
                  <video
                    src={video.src}
                    poster={video.poster}
                    controls
                    playsInline
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="px-5 py-4">
                  <h3 className="text-sm font-semibold text-slate-900">
                    {video.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StrategicCapabilityBanner />
    </main>
  );
}
