import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ProductGallery } from "@/components/ProductGallery";
import { ConsultationCtaButton } from "@/components/ConsultationCtaButton";

const categoryLabels: Record<string, string> = {
  SERVICE_EQUIPMENT: "خدمات و تجهیزات",
  SPARE_PARTS: "لوازم یدکی",
};

export async function generateStaticParams() {
  const items = await prisma.product.findMany({
    where: {
      category: { in: ["SERVICE_EQUIPMENT", "SPARE_PARTS"] },
    },
    select: { slug: true },
  });

  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await prisma.product.findUnique({ where: { slug } });

  if (!item) {
    return { title: "یافت نشد" };
  }

  const title = item.name;
  const description =
    item.description?.slice(0, 160) ||
    `${title} — ${categoryLabels[item.category] ?? ""} پارسیان پرتو الوند.`;
  const image =
    item.images[0] && item.images[0].length > 0
      ? item.images[0]
      : "/images/placeholder-project.webp";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const item = await prisma.product.findUnique({
    where: { slug },
  });

  if (
    !item ||
    (item.category !== "SERVICE_EQUIPMENT" && item.category !== "SPARE_PARTS")
  ) {
    notFound();
  }

  const images =
    item.images?.length > 0
      ? item.images
      : ["/images/placeholder-project.webp"];

  return (
    <main dir="rtl" className="bg-white">
      {/* بردکرامب - دقیقاً مثل صفحه محصول */}
      <div className="border-b border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-xs text-gray-400">
            <Link href="/" className="transition hover:text-orange-500">
              خانه
            </Link>
            <ChevronLeft className="h-3 w-3" />
            <Link href="/services" className="transition hover:text-orange-500">
              خدمات
            </Link>
            <ChevronLeft className="h-3 w-3" />
            <span className="text-slate-600">{item.name}</span>
          </nav>
        </div>
      </div>

      {/* گالری + اطلاعات - همان چیدمان صفحه محصول */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <ProductGallery images={images} alt={item.name} />

          <div>
            <span className="inline-block rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
              {categoryLabels[item.category] || "خدمات"}
            </span>

            <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
              {item.name}
            </h1>

            {item.description && (
              <p className="mt-6 text-sm leading-7 text-gray-500">
                {item.description}
              </p>
            )}


          </div>
        </div>
      </div>
    </main>
  );
}