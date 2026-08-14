import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { Product } from "@/lib/generated/prisma/client";
import { toPersianDigits } from "@/lib/format";

type ProductVariant = {
  capacityKg: number;
  powerKw: number;
  frequencyHz: number;
};

const SERVICE_CATEGORIES = new Set(["SERVICE_EQUIPMENT", "SPARE_PARTS"]);

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const isService = SERVICE_CATEGORIES.has(product.category);
  const href = isService
    ? `/services/${product.slug}`
    : `/products/${product.slug}`;
  const buttonLabel = isService ? "مشاهده بیشتر" : "مشاهده مشخصات";

  const variants = Array.isArray(product.variants)
    ? (product.variants as unknown as ProductVariant[])
    : [];
  const hasVariants = variants.length > 0;
  const isFurnace = product.capacityKg != null && product.powerKw != null;

  return (
    <div className="group relative flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-4 transition duration-300 hover:border-orange-100 hover:shadow-md">
      {product.featured && (
        <span className="absolute right-3 top-3 z-10 rounded-full bg-orange-500 px-2.5 py-1 text-[10px] font-medium text-white">
          پرفروش
        </span>
      )}

      {/* تصویر */}
      <div className="flex h-36 items-center justify-center overflow-hidden rounded-xl bg-gray-50">
        <Image
          src={product.images[0] ?? "/images/placeholder-furnace.webp"}
          alt={product.name}
          width={180}
          height={180}
          priority={priority}
          className="h-full w-auto object-contain transition duration-300 group-hover:scale-105"
        />
      </div>

      {/* عنوان */}
      <h3 className="mt-4 line-clamp-2 text-center text-sm font-bold leading-6 text-slate-900">
        {product.name}
      </h3>

      {/* توضیحات / مشخصات */}
      <div className="mt-2 flex-1">
        {hasVariants ? (
          <div className="space-y-1 text-center text-xs text-gray-400">
            <p>
              ظرفیت: {toPersianDigits(variants[0].capacityKg)} تا{" "}
              {toPersianDigits(variants[variants.length - 1].capacityKg)} کیلوگرم
            </p>
            <p>{toPersianDigits(variants.length)} مدل مختلف</p>
          </div>
        ) : isFurnace ? (
          <div className="space-y-1 text-center text-xs text-gray-400">
            <p>ظرفیت: {toPersianDigits(product.capacityKg!)} کیلوگرم</p>
            <p>توان: {toPersianDigits(product.powerKw!)} کیلووات</p>
            {product.frequencyHz != null && (
              <p>فرکانس: {toPersianDigits(product.frequencyHz)} هرتز</p>
            )}
          </div>
        ) : (
          <p className="line-clamp-2 text-center text-xs leading-5 text-gray-400">
            {product.description}
          </p>
        )}
      </div>

      {/* دکمه */}
      <Link
        href={href}
        className="mt-4 flex items-center justify-center gap-1.5 rounded-full bg-orange-500 py-2.5 text-xs font-medium text-white transition hover:bg-orange-600"
      >
        {buttonLabel}
        <ChevronLeft className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}