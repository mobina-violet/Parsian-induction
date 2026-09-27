"use client";

import { useState ,useEffect } from "react";
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (gallery.length <= 1) return;

      if (event.key === "ArrowLeft") {
        goTo(activeIndex + 1);
      }

      if (event.key === "ArrowRight") {
        goTo(activeIndex - 1);
      }

      if (event.key === "ArrowUp") {
        goTo(activeIndex - 1);
      }

      if (event.key === "ArrowDown") {
        goTo(activeIndex + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, gallery.length]);

  return (
    <div>
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
        <Image
          src={active}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
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
        <div className="mt-3 flex gap-2">
          {gallery.map((img, index) => (
            <button
              key={img}
              onClick={() => setActiveIndex(index)}
              className={
                activeIndex === index
                  ? "h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 border-orange-500"
                  : "h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-gray-200"
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
