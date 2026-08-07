'use client'

import { useState } from 'react'
import Image from 'next/image'

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const gallery = images.length > 0 ? images : ['/images/placeholder-furnace.webp']
  const [active, setActive] = useState(gallery[0])

  return (
    <div>
      <div className="relative flex h-72 items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 sm:h-96">
        <Image
          src={active}
          alt={alt}
          width={400}
          height={400}
          className="h-full w-auto object-contain"
        />
      </div>

      {gallery.length > 1 && (
        <div className="mt-3 flex gap-2">
          {gallery.map((img) => (
            <button
              key={img}
              onClick={() => setActive(img)}
              className={
                active === img
                  ? 'h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 border-orange-500'
                  : 'h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-gray-200'
              }
            >
              <Image
                src={img}
                alt={alt}
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}