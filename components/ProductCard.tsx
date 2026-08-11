import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import type { Product } from '@/lib/generated/prisma/client'
import { toPersianDigits } from '@/lib/format'

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product
  priority?: boolean
}) {
  const isFurnace = product.capacityKg != null && product.powerKw != null

  return (
    <div className="group relative flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-4 transition hover:shadow-md">
      {product.featured && (
        <span className="absolute right-4 top-4 rounded-full bg-orange-500 px-3 py-1 text-[11px] font-medium text-white">
          پرفروش
        </span>
      )}

      <div className="flex h-36 items-center justify-center">
        <Image
          src={product.images[0] ?? '/images/placeholder-furnace.webp'}
          alt={product.name}
          width={200}
          height={200}
          priority={priority}
          className="h-full w-auto object-contain"
        />
      </div>

      <h3 className="mt-3 text-center text-sm font-bold text-slate-900">
        {isFurnace ? `کوره القایی ذوب ${product.name}` : product.name}
      </h3>

      <div className="flex-1">
        {isFurnace ? (
          <div className="mt-2 space-y-1 text-center text-xs text-gray-400">
            <p>ظرفیت ذوب: {toPersianDigits(product.capacityKg!)} کیلوگرم</p>
            <p>توان: {toPersianDigits(product.powerKw!)} کیلووات</p>
            {product.frequencyHz != null && (
              <p>فرکانس کاری: {toPersianDigits(product.frequencyHz)} هرتز</p>
            )}
          </div>
        ) : (
          <p className="mt-2 line-clamp-3 text-center text-xs leading-5 text-gray-400">
            {product.description}
          </p>
        )}
      </div>

      <Link
        href={`/products/${product.slug}`}
        className="mt-4 flex items-center justify-center gap-1.5 rounded-full bg-orange-500 py-2.5 text-xs font-medium text-white transition hover:bg-orange-600"
      >
        مشاهده مشخصات
        <ChevronLeft className="h-3.5 w-3.5" />
      </Link>
    </div>
  )
}