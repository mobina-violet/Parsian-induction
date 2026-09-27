import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";

import { prisma } from "@/lib/prisma";
import { toPersianDigits } from "@/lib/format";

const metalLabels: Record<string, string> = {
  STEEL: "فولاد",
  BRASS: "برنج",
  IRON: "آهن",
  BRONZE: "برنز",
  COPPER: "مس",
  ALUMINUM: "آلومینیوم",
  CAST_IRON: "چدن",
};

type ProductComponent = { title: string; description: string };
type ProductVariant = Record<string, unknown>;

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

  return { title: `مشخصات فنی ${product.name}` };
}

export default async function ProductSpecsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({ where: { slug } });

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

  return (
    <main dir="rtl" className="bg-white">
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
            <Link
              href={`/products/${slug}`}
              className="transition hover:text-orange-500">
              {product.name}
            </Link>
            <ChevronLeft className="h-3 w-3" />
            <span className="text-slate-600">مشخصات فنی</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href={`/products/${slug}`}
          className="inline-flex items-center gap-1 text-sm text-orange-600 transition hover:text-orange-700">
          <ChevronLeft className="h-4 w-4 rotate-180" />
          بازگشت به {product.name}
        </Link>

        <h1 className="mt-4 text-xl font-bold text-slate-900 sm:text-2xl">
          مشخصات فنی {product.name}
        </h1>

        {variants.length > 0 && (
          <div className="mt-8">
            <div className="overflow-x-auto rounded-2xl border border-gray-100">
              {/* Melting Furnace */}
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
                    {variants.map((v, i) => (
                      <tr
                        key={i}
                        className={
                          i % 2 === 1
                            ? "border-t border-gray-100 bg-gray-50/60"
                            : "border-t border-gray-100"
                        }>
                        <td className="px-3 py-3 font-bold">
                          {toPersianDigits(v.powerKw as number)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                          {toPersianDigits(v.frequencyHzMin as number)}–
                          {toPersianDigits(v.frequencyHzMax as number)}
                        </td>
                        <td className="px-3 py-3">
                          {toPersianDigits(v.ironKgHr as number)}
                        </td>
                        <td className="px-3 py-3">
                          {toPersianDigits(v.steelKgHr as number)}
                        </td>
                        <td className="px-3 py-3">
                          {toPersianDigits(v.bronzeKgHr as number)}
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
                      <th className="px-3 py-3">توان (kW)</th>
                      <th className="px-3 py-3">فلز</th>
                      <th className="px-3 py-3">دما (°C)</th>
                      <th className="px-3 py-3">قطر (mm)</th>
                      <th className="px-3 py-3">نرخ (kg/hr)</th>
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
                        }>
                        <td className="px-3 py-3 font-bold">
                          {toPersianDigits(v.powerKw as number)}
                        </td>
                        <td className="px-3 py-3">
                          {metalLabels[v.metal as string] ?? String(v.metal ?? "")}
                        </td>
                        <td className="px-3 py-3">
                          {toPersianDigits(v.temperature as number)}
                        </td>
                        <td className="px-3 py-3">
                          ≥ {toPersianDigits(v.diameterMm as number)}
                        </td>
                        <td className="px-3 py-3">
                          {toPersianDigits(v.kgHr as number)}
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
                      <th className="px-3 py-3">توان (kW)</th>
                      <th className="px-3 py-3">نوع فرکانس</th>
                      <th className="px-3 py-3">فرکانس کاری (kHz)</th>
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
                        }>
                        <td className="px-3 py-3 font-bold">
                          {toPersianDigits(v.powerKw as number)}
                        </td>
                        <td className="px-3 py-3">
                          {String(v.frequencyRange ?? "")}
                        </td>
                        <td className="px-3 py-3">
                          {toPersianDigits(String(v.workFrequencyKHz ?? ""))}
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
                  className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
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

        {variants.length === 0 && components.length === 0 && (
          <p className="mt-8 rounded-2xl border border-dashed border-gray-200 py-10 text-center text-sm text-gray-400">
            مشخصات فنی این محصول به‌زودی تکمیل می‌شود.
          </p>
        )}
      </div>
    </main>
  );
}