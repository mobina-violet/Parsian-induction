import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ProductCarousel } from "@/components/sections/ProductCarousel";

export async function PopularProducts() {
  const products = await prisma.product.findMany({
    orderBy: { order: "asc" },
    take: 8,
  });

  return (
    <section dir="rtl" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <h2 className="text-lg font-bold text-slate-900 sm:text-2xl">
            محصولات پرطرفدار
          </h2>
          <Link
            href="/products"
            className="flex shrink-0 items-center gap-1 text-xs font-medium text-orange-500 transition hover:text-orange-600 sm:text-sm">
            مشاهده همه محصولات
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8">
          {products.length > 0 ? (
            <ProductCarousel products={products} />
          ) : (
            <p className="rounded-xl border border-dashed border-gray-200 py-12 text-center text-sm text-gray-400">
              هنوز محصولی ثبت نشده است.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
