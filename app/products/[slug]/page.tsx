import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";

import { prisma } from "@/lib/prisma";
import { ProductGallery } from "@/components/ProductGallery";
import { toPersianDigits } from "@/lib/format";
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

const metalLabels: Record<string, string> = {
  STEEL: "فولاد",
  BRASS: "برنج",
  IRON: "آهن",
  BRONZE: "برنز",
  COPPER: "مس",
  ALUMINUM: "آلومینیوم",
  CAST_IRON: "چدن",
};

type ProductComponent = {
  title: string;
  description: string;
};

type ProductVariant = Record<string, unknown>;

export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    select: {
      slug: true,
    },
  });

  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
  });

  if (!product) {
    return {
      title: "محصول یافت نشد",
    };
  }

  const title = product.name;

  const description =
    product.description?.slice(0, 160) ||
    `${title} — ${
      categoryLabels[product.category] ?? ""
    } پارسیان پرتو الوند.`;

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
      images: [
        {
          url: imageUrl,
          alt: product.name,
        },
      ],
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

  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
  });

  if (!product) {
    notFound();
  }

  const variants: ProductVariant[] = Array.isArray(product.variants)
    ? (product.variants as ProductVariant[])
    : [];

  const components: ProductComponent[] = Array.isArray(product.components)
    ? (product.components as ProductComponent[])
    : [];

  const isMelting = product.category === "MELTING_FURNACE";

  const isPreheating =
    product.category === "FORGING_FURNACE" ||
    product.category === "FORMING_FURNACE";

  const isHardening = product.category === "HARDENING_FURNACE";

  const isParts =
    product.category === "SPARE_PARTS" ||
    product.category === "PERIPHERAL_EQUIPMENT";

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
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    category: categoryLabels[product.category] ?? product.category,
  };

  return (
    <main dir="rtl" className="bg-white">
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />

      {/* Breadcrumb */}
      <div className="border-b border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-xs text-gray-400">
            <Link
              href="/"
              className="transition hover:text-orange-500"
            >
              خانه
            </Link>

            <ChevronLeft className="h-3 w-3" />

            <Link
              href="/products"
              className="transition hover:text-orange-500"
            >
              محصولات
            </Link>

            <ChevronLeft className="h-3 w-3" />

            <span className="text-slate-600">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Product */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Gallery */}
          <ProductGallery
            images={product.images}
            alt={product.name}
          />

          {/* Information */}
          <div>
            <span className="inline-block rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
              {categoryLabels[product.category] ??
                product.category}
            </span>

            <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
              {product.name}
            </h1>

            {product.description && (
              <p className="mt-6 text-sm leading-7 text-gray-500">
                {product.description}
              </p>
            )}

            {/* Technical Specifications */}
            {variants.length > 0 && (
              <div className="mt-8">
                <h2 className="text-base font-bold text-slate-900">
                  مشخصات فنی
                </h2>

                <div className="mt-3 overflow-x-auto rounded-2xl border border-gray-100">
                  {/* Melting Furnace */}
                  {isMelting && (
                    <table className="w-full min-w-[500px] text-center text-sm">
                      <thead>
                        <tr className="bg-gray-50 text-xs text-gray-500">
                          <th className="px-3 py-3">
                            توان (kW)
                          </th>

                          <th className="px-3 py-3">
                            فرکانس (Hz)
                          </th>

                          <th className="px-3 py-3">
                            آهن ۱۶۰۰°C
                          </th>

                          <th className="px-3 py-3">
                            فولاد ۱۶۰۰°C
                          </th>

                          <th className="px-3 py-3">
                            برنز ۱۱۷۵°C
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {variants.map((v, i) => (
                          <tr
                            key={i}
                            className={
                              i % 2 === 1
                                ? "border-t border-gray-100 bg-gray-50/60"
                                : "border-t border-gray-100"
                            }
                          >
                            <td className="px-3 py-3 font-bold">
                              {toPersianDigits(
                                v.powerKw as number
                              )}
                            </td>

                            <td className="whitespace-nowrap px-3 py-3">
                              {toPersianDigits(
                                v.frequencyHzMin as number
                              )}
                              –
                              {toPersianDigits(
                                v.frequencyHzMax as number
                              )}
                            </td>

                            <td className="px-3 py-3">
                              {toPersianDigits(
                                v.ironKgHr as number
                              )}
                            </td>

                            <td className="px-3 py-3">
                              {toPersianDigits(
                                v.steelKgHr as number
                              )}
                            </td>

                            <td className="px-3 py-3">
                              {toPersianDigits(
                                v.bronzeKgHr as number
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

                  {/* Forging / Forming Furnace */}
                  {isPreheating && (
                    <table className="w-full min-w-[480px] text-center text-sm">
                      <thead>
                        <tr className="bg-gray-50 text-xs text-gray-500">
                          <th className="px-3 py-3">
                            توان (kW)
                          </th>

                          <th className="px-3 py-3">
                            فلز
                          </th>

                          <th className="px-3 py-3">
                            دما (°C)
                          </th>

                          <th className="px-3 py-3">
                            قطر (mm)
                          </th>

                          <th className="px-3 py-3">
                            نرخ (kg/hr)
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {variants.map((v, i) => (
                          <tr
                            key={i}
                            className={
                              i % 2 === 1
                                ? "border-t border-gray-100 bg-gray-50/60"
                                : "border-t border-gray-100"
                            }
                          >
                            <td className="px-3 py-3 font-bold">
                              {toPersianDigits(
                                v.powerKw as number
                              )}
                            </td>

                            <td className="px-3 py-3">
                              {metalLabels[
                                v.metal as string
                              ] ?? String(v.metal ?? "")}
                            </td>

                            <td className="px-3 py-3">
                              {toPersianDigits(
                                v.temperature as number
                              )}
                            </td>

                            <td className="px-3 py-3">
                              ≥{" "}
                              {toPersianDigits(
                                v.diameterMm as number
                              )}
                            </td>

                            <td className="px-3 py-3">
                              {toPersianDigits(
                                v.kgHr as number
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

                  {/* Hardening Furnace */}
                  {isHardening && (
                    <table className="w-full min-w-[400px] text-center text-sm">
                      <thead>
                        <tr className="bg-gray-50 text-xs text-gray-500">
                          <th className="px-3 py-3">
                            توان (kW)
                          </th>

                          <th className="px-3 py-3">
                            نوع فرکانس
                          </th>

                          <th className="px-3 py-3">
                            فرکانس کاری (kHz)
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {variants.map((v, i) => (
                          <tr
                            key={i}
                            className={
                              i % 2 === 1
                                ? "border-t border-gray-100 bg-gray-50/60"
                                : "border-t border-gray-100"
                            }
                          >
                            <td className="px-3 py-3 font-bold">
                              {toPersianDigits(
                                v.powerKw as number
                              )}
                            </td>

                            <td className="px-3 py-3">
                              {String(
                                v.frequencyRange ?? ""
                              )}
                            </td>

                            <td className="px-3 py-3">
                              {toPersianDigits(
                                String(
                                  v.workFrequencyKHz ?? ""
                                )
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>

                <p className="mt-2 text-xs text-gray-400">
                  مشخصات دقیق بر اساس نیاز تولید شما قابل تنظیم است.
                </p>
              </div>
            )}

            {/* Components */}
            {components.length > 0 && (
              <div className="mt-8">
                <h2 className="text-base font-bold text-slate-900">
                  {isParts
                    ? "اقلام و تجهیزات قابل تأمین"
                    : "این سیستم شامل چه اجزایی می‌شود؟"}
                </h2>

                <div className="mt-3 space-y-3">
                  {components.map((component) => (
                    <div
                      key={component.title}
                      className="rounded-2xl border border-gray-100 bg-gray-50 p-4"
                    >
                      <p className="text-sm font-bold text-slate-900">
                        {component.title}
                      </p>

                      <p className="mt-1 text-xs leading-6 text-gray-500">
                        {component.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}