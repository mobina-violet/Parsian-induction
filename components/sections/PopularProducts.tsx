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
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
            محصولات پرطرفدار
          </h2>
          <Link
            href="/products"
            className="flex items-center gap-1 text-sm font-medium text-orange-500 transition hover:text-orange-600">
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
