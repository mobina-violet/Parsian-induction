"use client";

import { useEffect, useRef } from "react";

type AutoPlayVideoProps = {
  src: string;
  poster?: string;
  className?: string;
  /** نوار کنترل (پخش، توقف، صدا) */
  controls?: boolean;
  /** none = تا لحظه‌ی پخش دانلود نمی‌شه، metadata = فقط فریم اول */
  preload?: "none" | "metadata";
  label?: string;
};

/**
 * ویدیوی بی‌صدا که تکرار می‌شه (loop):
 * - وقتی ویدیو روی صفحه دیده بشه خودکار پخش می‌شه
 * - وقتی از دید خارج بشه متوقف می‌شه (برای صرفه‌جویی در اینترنت و باتری)
 * - اگر کاربر "کاهش حرکت" رو در سیستمش روشن کرده باشه، خودکار پخش نمی‌شه
 */
export function AutoPlayVideo({
  src,
  poster,
  className,
  controls = false,
  preload = "none",
  label,
}: AutoPlayVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // مرورگر پخش خودکار رو رد کرد؛ کاربر با کنترل‌ها می‌تونه پخش کنه
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload={preload}
      controls={controls}
      aria-label={label}
      className={className}
    />
  );
}
