import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ProductGallery } from "@/components/ProductGallery";
import { siteConfig } from "@/lib/site-config";

const categoryLabels: Record<string, string> = {
  SPARE_PARTS: "لوازم یدکی",
  SERVICE_EQUIPMENT: "قطعات و تجهیزات جانبی",
};

export async function generateStaticParams() {
  const items = await prisma.product.findMany({
    where: { category: { in: ["SPARE_PARTS", "SERVICE_EQUIPMENT"] } },
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

  const item = await prisma.product.findUnique({ where: { slug } });

  if (
    !item ||
    (item.category !== "SPARE_PARTS" && item.category !== "SERVICE_EQUIPMENT")
  ) {
    notFound();
  }

  const hasSpecs = Array.isArray(item.components) && item.components.length > 0;

  const images =
    item.images?.length > 0 ? item.images : ["/images/placeholder-project.webp"];

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.name,
    description: item.description ?? undefined,
    image: images.map((img) => `${siteConfig.url}${img}`),
    category: categoryLabels[item.category] || undefined,
    brand: { "@type": "Brand", name: siteConfig.name },
  };

  return (
    <main dir="rtl" className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      {/* بردکرامب */}
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

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <ProductGallery images={images} alt={item.name} />

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-block rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
                {categoryLabels[item.category] || "خدمات"}
              </span>

              {hasSpecs && (
                <Link
                  href={`/services/${slug}/specs`}
                  className="inline-block rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600 transition hover:bg-orange-100">
                  مشخصات فنی
                </Link>
              )}

              <Link
                href={`/services/${slug}/reviews`}
                className="inline-block rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600 transition hover:bg-orange-100">
                نظرات و پیشنهادات
              </Link>
            </div>

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