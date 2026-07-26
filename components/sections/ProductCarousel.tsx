'use client'

import { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronRight, ChevronLeft } from 'lucide-react'
 import type { Product } from '@/lib/generated/prisma/client'
import { ProductCard } from '@/components/ProductCard'

export function ProductCarousel({ products }: { products: Product[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    direction: 'rtl',
    align: 'start',
    dragFree: true,
  })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <div className="relative">
      {/* دکمه سمت راست: چون محتوا راست‌چین است، این دکمه به سمت آیتم‌های قبلی می‌رود */}
      <button
        onClick={scrollPrev}
        aria-label="محصول قبلی"
        className="absolute -right-4 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition hover:border-orange-300 lg:flex"
      >
        <ChevronRight className="h-5 w-5 text-slate-600" />
      </button>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-[75%] flex-none sm:min-w-[45%] lg:min-w-[19%]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* دکمه سمت چپ: به سمت آیتم‌های بعدی می‌رود */}
      <button
        onClick={scrollNext}
        aria-label="محصول بعدی"
        className="absolute -left-4 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition hover:border-orange-300 lg:flex"
      >
        <ChevronLeft className="h-5 w-5 text-slate-600" />
      </button>
    </div>
  )
}