import Link from "next/link";
import { ChevronLeft, Award, ShieldCheck, HeartHandshake } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ProjectFilterControls } from "@/components/ProjectFilterControls";
import { ProjectShowcaseGrid } from "@/components/ProjectShowcaseGrid";
import { ProjectHeroSlideshow } from "@/components/ProjectHeroSlideshow";
import { StrategicCapabilityBanner } from "@/components/StrategicCapabilityBanner";

export const metadata = {
  title: "پروژها",
  description: "نمونه‌ای از پروژه‌های اجرایی پارسیان در صنایع مختلف",
};

const industryTabs = [
  { value: undefined, label: "همه پروژه‌ها" },
  { value: "STEEL", label: "صنعت فولاد" },
  { value: "CAST_IRON", label: "صنعت چدن" },
  { value: "COPPER", label: "صنعت مس" },
  { value: "ALUMINUM", label: "صنعت آلومینیوم" },
  { value: "OTHER", label: "سایر صنایع" },
] as const;

const validIndustries = [
  "STEEL",
  "CAST_IRON",
  "COPPER",
  "ALUMINUM",
  "OTHER",
] as const;
type IndustryValue = (typeof validIndustries)[number];

function isValidIndustry(v?: string): v is IndustryValue {
  return !!v && (validIndustries as readonly string[]).includes(v);
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ industry?: string; year?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const industry = isValidIndustry(params.industry)
    ? params.industry
    : undefined;
  const year = params.year ? Number(params.year) : undefined;
  const sortOrder = params.sort === "oldest" ? "asc" : "desc";

  // برای پر کردن دراپ‌داون سال‌ها، از کل پروژه‌های featured استفاده می‌کنیم
  const allFeatured = await prisma.project.findMany({
    where: { featured: true },
    select: { completedAt: true },
  });
  const years = Array.from(
    new Set(
      allFeatured
        .map((p) => p.completedAt?.getFullYear())
        .filter((y): y is number => !!y),
    ),
  ).sort((a, b) => b - a);

  const projects = await prisma.project.findMany({
    where: {
      featured: true,
      ...(industry ? { industry } : {}),
      ...(year
        ? {
            completedAt: {
              gte: new Date(`${year}-01-01`),
              lt: new Date(`${year + 1}-01-01`),
            },
          }
        : {}),
    },
    orderBy: { completedAt: sortOrder },
    take: 8,
  });

  return (
    <main dir="rtl" className="bg-white">
      {/* بردکرامب */}
      <div className="border-b border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-xs text-gray-400">
            <Link href="/" className="transition hover:text-orange-500">
              خانه
            </Link>
            <ChevronLeft className="h-3 w-3" />
            <span className="text-slate-600"> پروژه‌ها</span>
          </nav>
        </div>

        {/* هیرو: متن راست، تصویر چپ */}
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:py-14">
          <div dir="rtl" className="text-right">
            <span className="text-xs font-medium text-orange-400">
              نمونه پروژه‌ها{""}
            </span>
            <h1 className="mt-2 text-2xl font-bold leading-tight text-black sm:text-4xl">
              نمونه پروژه‌های اجرایی {""}
              <span className="text-orange-500 ">پارسیان</span>
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
              اجرای موفق پروژه‌های صنعتی در صنایع فولاد، چدن، مس و آلومینیوم با
              استفاده از کوره‌های القایی پیشرفته، طراحی مهندسی و فناوری روز
              دنیا.
            </p>
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
                "/images/projects/project1.jpg",
                "/images/projects/project2.jpg",
                "/images/projects/project3.jpg",
                "/images/projects/project4.jpg",
                "/images/projects/project5.jpg",
              ]}
              alt="پروژه‌های اجرایی پارسیان"
            />
          </div>
        </div>
      </div>

      {/* فیلترها: تب‌های صنعت + سال/مرتب‌سازی */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-3">
          {industryTabs.map((tab) => {
            const isActive = industry === tab.value;
            const qs = new URLSearchParams();
            if (tab.value) qs.set("industry", tab.value);
            if (params.year) qs.set("year", params.year);
            if (params.sort) qs.set("sort", params.sort);
            const href = qs.toString()
              ? `/projects?${qs.toString()}`
              : "/projects";
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

        <div className="mt-4">
          <ProjectFilterControls years={years} />
        </div>
      </div>

      {/* گالری منتخب — بدون کارت/لینک */}
      <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <p className="mb-4 text-sm leading-7 text-gray-500">
          نمونه‌ای از پروژه‌های موفق ما در بیش از ۲۵ سال فعالیت — به دلیل تنوع
          بالای پروژه‌های اجراشده، تنها بخشی از شناخته‌شده‌ترین آن‌ها را اینجا
          نمایش می‌دهیم.
        </p>
        <ProjectShowcaseGrid projects={projects} />
      </div>

      {/* بنر قابلیت راهبردی */}
      <StrategicCapabilityBanner />
    </main>
  );
}
