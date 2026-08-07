import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ProjectShowcaseGrid } from "@/components/ProjectShowcaseGrid";
import { ProjectHeroSlideshow } from "@/components/ProjectHeroSlideshow";
import { StrategicCapabilityBanner } from "@/components/StrategicCapabilityBanner";

export const metadata = {
  title: "پروژه‌ها",
  description: "نمونه‌ای از پروژه‌های اجرایی پارسیان در صنایع مختلف",
};

const industryTabs = [
  { value: undefined, label: "همه پروژه‌ها" },
  { value: "STEEL", label: "صنعت فولاد" },
  { value: "COPPER", label: "صنعت مس" },
  { value: "ALUMINUM", label: "صنعت آلومینیوم" },
  { value: "AUTOMOTIVE", label: "صنعت خودرو" },
  { value: "NON_FERROUS", label: "صنعت فلزات رنگی" },
  { value: "PRECISION_CASTING", label: "صنعت ریخته‌گری دقیق" },
] as const;

const validIndustries = [
  "STEEL",
  "COPPER",
  "ALUMINUM",
  "AUTOMOTIVE",
  "NON_FERROUS",
  "PRECISION_CASTING",
] as const;

type IndustryValue = (typeof validIndustries)[number];

function isValidIndustry(v?: string): v is IndustryValue {
  return !!v && (validIndustries as readonly string[]).includes(v);
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ industry?: string }>;
}) {
  const params = await searchParams;
  const industry = isValidIndustry(params.industry)
    ? params.industry
    : undefined;

  const projects = await prisma.project.findMany({
    where: {
      featured: true,
      ...(industry ? { industry } : {}),
    },
    orderBy: { order: "asc" },
    take: 8,
  });

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
            <span className="text-slate-600">پروژه‌ها</span>
          </nav>
        </div>

        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:py-14">
          <div dir="rtl" className="text-right">
            <span className="text-xs font-medium text-orange-400">
              نمونه پروژه‌ها
            </span>
            <h1 className="mt-2 text-2xl font-bold leading-tight text-black sm:text-4xl">
              نمونه پروژه‌های اجرایی{" "}
              <span className="text-orange-500">پارسیان</span>
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
              اجرای موفق پروژه‌های صنعتی در صنایع فولاد، مس، آلومینیوم، خودرو،
              فلزات رنگی و ریخته‌گری دقیق با استفاده از کوره‌های القایی پیشرفته،
              طراحی مهندسی و فناوری روز دنیا.
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
                "/images/projects/project1.webp",
                "/images/projects/project2.webp",
                "/images/projects/project3.webp",
                "/images/projects/project4.webp",
                "/images/projects/project5.webp",
              ]}
              alt="پروژه‌های اجرایی پارسیان"
            />
          </div>
        </div>
      </div>

      {/* فقط تب‌های صنعت */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-3">
          {industryTabs.map((tab) => {
            const isActive = industry === tab.value;
            const href = tab.value
              ? `/projects?industry=${tab.value}`
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
      </div>

      {/* گالری */}
      <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <p className="mb-4 text-sm leading-7 text-gray-500">
          نمونه‌ای از پروژه‌های موفق ما در بیش از ۲۰ سال فعالیت — به دلیل تنوع
          بالای پروژه‌های اجراشده، تنها بخشی از شناخته‌شده‌ترین آن‌ها را اینجا
          نمایش می‌دهیم.
        </p>
        <ProjectShowcaseGrid projects={projects} />
      </div>

      <StrategicCapabilityBanner />
    </main>
  );
}
