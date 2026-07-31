"use client";

import Image from "next/image";
import { Award, Users, Trophy, Target } from "lucide-react";
import { Phone } from "lucide-react";
export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-52 md:pt-32 md:pb-44 lg:min-h-[90vh] lg:flex lg:items-center">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-section.png"
          alt="کوره القایی"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute left-0 top-0 bottom-0 hidden lg:block w-1/2 bg-gradient-to-r from-white/25 via-white/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto  w-full max-w-7xl px-6 lg:px-8 ">
        <div className="max-w-xl mx-auto" dir="rtl">
          <p className="mb-3 text-xs sm:text-sm tracking-[0.3em] text-orange-400">
            طراحی و ساخت انواع
          </p>

          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-[3.2rem]">
            کوره های القایی
            <br />
            <span className="text-orange-500">با تکنولوژی روز دنیا</span>
          </h1>

          <p className="mt-5 text-sm leading-7 text-gray-200 sm:text-base lg:text-lg">
            بیش از ۲۰ سال تجربه در طراحی و ساخت کوره های القایی صنعتی
            <br className="hidden sm:block" />
            با کیفیت بالا، راندمان عالی و خدمات پس از فروش مطمئن
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="/products"
              className="flex h-12 items-center justify-center rounded-full bg-orange-600 px-8 text-white transition hover:bg-orange-700 shadow-lg">
              مشاهده محصولات
            </a>

            <button className="flex h-12 items-center justify-center rounded-full border border-white/40 bg-white/10 px-8 text-white backdrop-blur transition hover:bg-white/20">
              <Phone className="h-4 w-4 shrink-0  text-orange-500" />
              <a
                href="tel:09124384191"
                className="hover:text-orange-500 p-2 transition-colors"
                dir="ltr">
                تماس با ما
              </a>
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="absolute bottom-6 left-1/2 z-20 w-full max-w-6xl -translate-x-1/2 px-4 sm:px-6">
        <div
          dir="rtl"
          className="grid grid-cols-2 gap-4 justify-center items-center rounded-3xl border border-white/60 bg-white/95 p-5 shadow-2xl backdrop-blur-xl md:grid-cols-4 md:gap-6 md:p-7">
          <Stat
            icon={<Target className="w-5 h-5 md:w-6 md:h-6" />}
            number="۲۴/۷"
            title=" پشتیبانی فنی"
          />

          <Stat
            icon={<Users className="w-5 h-5 md:w-6 md:h-6" />}
            number="۱۰۰+"
            title="مشتری وفادار"
          />

          <Stat
            icon={<Trophy className="w-5 h-5 md:w-6 md:h-6" />}
            number="۲۰+"
            title="سال فعالیت مستمر"
          />

          <Stat
            icon={<Award className="w-5 h-5 md:w-6 md:h-6" />}
            number="۱۰+"
            title="محصول متنوع"
          />
        </div>
      </div>
    </section>
  );
}

function Stat({
  icon,
  number,
  title,
}: {
  icon: React.ReactNode;
  number: string;
  title: string;
}) {
  return (
    <div className="group flex items-center gap-3">
      <div className="flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 transition group-hover:scale-105">
        {icon}
      </div>

      <div>
        <p className="text-xl font-bold text-slate-900 md:text-2xl">{number}</p>

        <p className="text-xs text-gray-600 md:text-sm">{title}</p>
      </div>
    </div>
  );
}
