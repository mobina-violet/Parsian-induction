"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import type { Product } from "@/lib/generated/prisma/client";
import { ProductCard } from "@/components/ProductCard";

export function ProductCarousel({ products }: { products: Product[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    direction: "rtl",
    align: "start",
    dragFree: true,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback((api: NonNullable<typeof emblaApi>) => {
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const raf = requestAnimationFrame(() => onSelect(emblaApi));
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      cancelAnimationFrame(raf);
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // جابه‌جایی با کلیدهای چپ/راست کیبورد در کل صفحه (نه فقط وقتی موس روی کاروسله)
  // فقط وقتی داخل یه اینپوت/تکست‌باکس داری تایپ می‌کنی غیرفعال می‌مونه که تایپینگ خراب نشه
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable) {
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollPrev();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [scrollPrev, scrollNext]);

  return (
    <div
      className="relative"
      role="region"
      aria-label="محصولات پرطرفدار — با کلیدهای چپ و راست کیبورد جابه‌جا کنید">
      {/* دکمه سمت راست: چون محتوا راست‌چین است، این دکمه به سمت آیتم‌های قبلی می‌رود */}
      <button
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        aria-label="محصول قبلی"
        className="absolute -right-4 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition hover:border-orange-300 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-gray-200 lg:flex">
        <ChevronRight className="h-5 w-5 text-slate-600" />
      </button>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="w-[48%] flex-none sm:w-[45%] lg:w-[19%]">
              <ProductCard product={product} priority={index < 4} />
            </div>
          ))}
        </div>
      </div>

      {/* دکمه سمت چپ: به سمت آیتم‌های بعدی می‌رود */}
      <button
        onClick={scrollNext}
        disabled={!canScrollNext}
        aria-label="محصول بعدی"
        className="absolute -left-4 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition hover:border-orange-300 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-gray-200 lg:flex">
        <ChevronLeft className="h-5 w-5 text-slate-600" />
      </button>
    </div>
  );
}