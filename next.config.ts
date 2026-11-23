import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 80],
    formats: ["image/webp"],
    // نسخه‌های بهینه‌شده‌ی عکس ۳۰ روز کش شوند (قبلاً ۴ ساعت بود؛ هر بازدید دوباره پردازش می‌شد)
    // اگر عکسی را عوض کردی، اسم فایل را هم عوض کن تا کش قدیمی نماند.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // فایل‌های ثابت public (عکس، ویدیو، pdf): ۱ روز کش مرورگر + بازخوانی در پس‌زمینه
      {
        source: "/:all*(webp|jpg|jpeg|png|svg|mp4|pdf|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
