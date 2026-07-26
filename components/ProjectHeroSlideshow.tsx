'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export function ProjectHeroSlideshow({
  images,
  alt,
  intervalMs = 4000,
}: {
  images: string[]
  alt: string
  intervalMs?: number
}) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length)
    }, intervalMs)
    return () => clearInterval(timer)
  }, [images.length, intervalMs])

  return (
    <div className="relative h-72 w-full max-w-[520px] overflow-hidden rounded-2xl sm:h-96">
      {images.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt={alt}
          fill
          priority={index === 0}
          className={
            index === active
              ? 'object-cover opacity-100 transition-opacity duration-700'
              : 'object-cover opacity-0 transition-opacity duration-700'
          }
        />
      ))}

      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              aria-label={`تصویر ${index + 1}`}
              className={
                index === active
                  ? 'h-1.5 w-5 rounded-full bg-orange-500 transition-all'
                  : 'h-1.5 w-1.5 rounded-full bg-white/70 transition-all'
              }
            />
          ))}
        </div>
      )}
    </div>
  )
}