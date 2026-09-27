import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";

import { prisma } from "@/lib/prisma";
import { ProductGallery } from "@/components/ProductGallery";
import { siteConfig } from "@/lib/site-config";

const categoryLabels: Record<string, string> = {
  MELTING_FURNACE: "کوره القایی ذوب",
  FORGING_FURNACE: "کوره القایی فورج",
  HARDENING_FURNACE: "کوره القایی سخت‌کاری",
  FORMING_FURNACE: "کوره القایی فورمینگ",
  SPARE_PARTS: "لوازم یدکی و قطعات مصرفی",
  PERIPHERAL_EQUIPMENT: "قطعات و تجهیزات جانبی",
  COOLING_SYSTEM: "سیستم خنک‌کننده",
  FREQUENCY_CONVERTER: "سیستم مبدل فرکانس",
  CRUCIBLE: "بوته",
  LINK: "لینک",
};

export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    select: { slug: true },
  });

  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const product = await prisma.product.findUnique({ where: { slug } });

  if (!product) {
    return { title: "محصول یافت نشد" };
  }

  const title = product.name;

  const description =
    product.description?.slice(0, 160) ||
    `${title} — ${categoryLabels[product.category] ?? ""} پارسیان پرتو الوند.`;

  const image = product.images[0] ?? "/images/placeholder-furnace.webp";

  const imageUrl = image.startsWith("http")
    ? image
    : `${siteConfig.url}${image}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: imageUrl, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({ where: { slug } });

  if (!product) {
    notFound();
  }

  const hasSpecs =
    (Array.isArray(product.variants) && product.variants.length > 0) ||
    (Array.isArray(product.components) && product.components.length > 0);

  const productImage = product.images[0]
    ? product.images[0].startsWith("http")
      ? product.images[0]
      : `${siteConfig.url}${product.images[0]}`
    : `${siteConfig.url}/images/placeholder-furnace.webp`;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description ?? undefined,
    image: productImage,
    brand: { "@type": "Brand", name: siteConfig.name },
    category: categoryLabels[product.category] ?? product.category,
  };

  return (
    <main dir="rtl" className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="border-b border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-xs text-gray-400">
            <Link href="/" className="transition hover:text-orange-500">
              خانه
            </Link>
            <ChevronLeft className="h-3 w-3" />
            <Link href="/products" className="transition hover:text-orange-500">
              محصولات
            </Link>
            <ChevronLeft className="h-3 w-3" />
            <span className="text-slate-600">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <ProductGallery images={product.images} alt={product.name} />

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-block rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
                {categoryLabels[product.category] ?? product.category}
              </span>

              {hasSpecs && (
                <Link
                  href={`/products/${slug}/specs`}
                  className="inline-block rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600 transition hover:bg-orange-100">
                  مشخصات فنی
                </Link>
              )}

              <Link
                href={`/products/${slug}/reviews`}
                className="inline-block rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600 transition hover:bg-orange-100">
                نظرات و پیشنهادات
              </Link>
            </div>

            <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
              {product.name}
            </h1>

            {product.description && (
              <p className="mt-6 text-sm leading-7 text-gray-500">
                {product.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}