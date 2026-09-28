"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const gallery =
    images.length > 0 ? images : ["/images/placeholder-furnace.webp"];
  const [activeIndex, setActiveIndex] = useState(0);
  const active = gallery[activeIndex];

  const goTo = (index: number) => {
    setActiveIndex((index + gallery.length) % gallery.length);
  };

  return (
    <div className="mx-auto w-full min-w-0 max-w-md">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
        <Image
          src={active}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 448px) 100vw, 448px"
          priority
        />

        {gallery.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              aria-label="عکس قبلی"
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md transition hover:bg-orange-500 hover:text-white">
              <ChevronRight className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              aria-label="عکس بعدی"
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md transition hover:bg-orange-500 hover:text-white">
              <ChevronLeft className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {gallery.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {gallery.map((img, index) => (
            <button
              key={img}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={
                activeIndex === index
                  ? "h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 border-orange-500 sm:h-16 sm:w-16"
                  : "h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-gray-200 sm:h-16 sm:w-16"
              }>
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
  );
}