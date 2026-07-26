import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ProductGallery } from "@/components/ProductGallery";
import { ConsultationCtaButton } from "@/components/ConsultationCtaButton";
import { toPersianDigits } from "@/lib/format";

const categoryLabels: Record<string, string> = {
  MELTING_FURNACE: "کوره القایی ذوب",
  HOLDING_FURNACE: "کوره القایی نگه‌دارنده",
  ELECTRICAL_PANEL: "سیستم‌های تابلو برق",
  COOLING_SYSTEM: "سیستم خنک‌کننده",
  PERIPHERAL_EQUIPMENT: "قطعات و تجهیزات جانبی",
};

export async function generateStaticParams() {
  const products = await prisma.product.findMany({ select: { slug: true } });
  return products.map((p) => ({ slug: p.slug }));
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

  const isFurnace = product.capacityKg != null && product.powerKw != null;

  return (
    <main dir="rtl" className="bg-white">
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

      {/* گالری + اطلاعات */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <ProductGallery images={product.images} alt={product.name} />

          <div>
            <span className="inline-block rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
              {categoryLabels[product.category]}
            </span>
            <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
              {isFurnace ? `کوره القایی ذوب ${product.name}` : product.name}
            </h1>

            {isFurnace && (
              <div className="mt-6 grid grid-cols-3 gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4 text-center">
                <div>
                  <p className="text-lg font-bold text-slate-900">
                    {toPersianDigits(product.capacityKg!)}
                  </p>
                  <p className="text-xs text-gray-400">ظرفیت ذوب (کیلوگرم)</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-900">
                    {toPersianDigits(product.powerKw!)}
                  </p>
                  <p className="text-xs text-gray-400">توان (کیلووات)</p>
                </div>
                {product.frequencyHz != null && (
                  <div>
                    <p className="text-lg font-bold text-slate-900">
                      {toPersianDigits(product.frequencyHz)}
                    </p>
                    <p className="text-xs text-gray-400">فرکانس کاری (هرتز)</p>
                  </div>
                )}
              </div>
            )}

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
