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
  COOLING_SYSTEM: "سیستم خنک‌کننده",
  FREQUENCY_CONVERTER: "سیستم مبدل فرکانس",
  CRUCIBLE: "بوته",
  LINK: "لینک",
};

export async function generateStaticParams() {
  const products = await prisma.product.findMany({ select: { slug: true } });
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });

  if (!product) return { title: "محصول یافت نشد" };

  const title = product.name;
  const description =
    product.description?.slice(0, 160) ||
    `${title} — ${categoryLabels[product.category] ?? ""} پارسیان پرتو الوند.`;
  const image = product.images[0] ?? "/images/placeholder-furnace.webp";

  return {
    title,
    description,
    openGraph: { title, description, images: [{ url: image }] },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

type ProductComponent = { title: string; description: string };

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });

  if (!product) notFound();

  const variants = Array.isArray(product.variants) ? product.variants : [];
  const components = Array.isArray(product.components)
    ? (product.components as ProductComponent[])
    : [];

  const isMelting = product.category === "MELTING_FURNACE";
  const isHardening = product.category === "HARDENING_FURNACE";
  const isParts =
    product.category === "SPARE_PARTS" ||
    product.category === "PERIPHERAL_EQUIPMENT";

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description ?? undefined,
    image: product.images[0]
      ? `${siteConfig.url}${product.images[0]}`
      : `${siteConfig.url}/images/placeholder-furnace.webp`,
    brand: { "@type": "Brand", name: siteConfig.name },
    category: categoryLabels[product.category],
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
            <Link href="/products" className="transition hover:text-orange-500">
              محصولات
            </Link>
            <ChevronLeft className="h-3 w-3" />
            <span className="text-slate-600">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <ProductGallery images={product.images} alt={product.name} />

          <div>
            <span className="inline-block rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
              {categoryLabels[product.category] ?? product.category}
            </span>
            <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
              {product.name}
            </h1>

            {product.description && (
              <p className="mt-6 text-sm leading-7 text-gray-500">
                {product.description}
              </p>
            )}

            {/* ========== جدول مشخصات فنی ========== */}
            {variants.length > 0 && (
              <div className="mt-8">
                <h2 className="text-base font-bold text-slate-900">
                  مشخصات فنی
                </h2>
                <div className="mt-3 overflow-x-auto rounded-2xl border border-gray-100">
                  
                  {/* جدول ذوب */}
                  {isMelting && (
                    <table className="w-full min-w-[500px] text-center text-sm">
                      <thead>
                        <tr className="bg-gray-50 text-xs text-gray-500">
                          <th className="px-3 py-3">توان (kW)</th>
                          <th className="px-3 py-3">فرکانس (Hz)</th>
                          <th className="px-3 py-3">آهن ۱۶۰۰°C</th>
                          <th className="px-3 py-3">فولاد ۱۶۰۰°C</th>
                          <th className="px-3 py-3">برنز ۱۱۷۵°C</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(variants as any[]).map((v, i) => (
                          <tr
                            key={i}
                            className={
                              i % 2 === 1
                                ? "bg-gray-50/60 border-t border-gray-100"
                                : "border-t border-gray-100"
                            }
                          >
                            <td className="px-3 py-3 font-bold">
                              {toPersianDigits(v.powerKw)}
                            </td>
                            <td className="px-3 py-3 whitespace-nowrap">
                              {toPersianDigits(v.frequencyHzMin)}–
                              {toPersianDigits(v.frequencyHzMax)}
                            </td>
                            <td className="px-3 py-3">
                              {toPersianDigits(v.ironKgHr)}
                            </td>
                            <td className="px-3 py-3">
                              {toPersianDigits(v.steelKgHr)}
                            </td>
                            <td className="px-3 py-3">
                              {toPersianDigits(v.bronzeKgHr)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

                  {/* جدول سخت‌کاری */}
                  {isHardening && (
                    <table className="w-full min-w-[400px] text-center text-sm">
                      <thead>
                        <tr className="bg-gray-50 text-xs text-gray-500">
                          <th className="px-3 py-3">توان (kW)</th>
                          <th className="px-3 py-3">نوع فرکانس</th>
                          <th className="px-3 py-3">فرکانس کاری (kHz)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(variants as any[]).map((v, i) => (
                          <tr
                            key={i}
                            className={
                              i % 2 === 1
                                ? "bg-gray-50/60 border-t border-gray-100"
                                : "border-t border-gray-100"
                            }
                          >
                            <td className="px-3 py-3 font-bold">
                              {toPersianDigits(v.powerKw)}
                            </td>
                            <td className="px-3 py-3">{v.frequencyRange}</td>
                            <td className="px-3 py-3">{v.workFrequencyKHz}</td>
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

            {/* ========== اجزا ========== */}
            {components.length > 0 && (
              <div className="mt-8">
                <h2 className="text-base font-bold text-slate-900">
                  {isParts
                    ? "اقلام و تجهیزات قابل تأمین"
                    : "این سیستم شامل چه اجزایی می‌شود؟"}
                </h2>
                <div className="mt-3 space-y-3">
                  {components.map((c) => (
                    <div
                      key={c.title}
                      className="rounded-2xl border border-gray-100 bg-gray-50 p-4"
                    >
                      <p className="text-sm font-bold text-slate-900">
                        {c.title}
                      </p>
                      <p className="mt-1 text-xs leading-6 text-gray-500">
                        {c.description}
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