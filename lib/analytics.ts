// ابزارهای کمکی گوگل آنالیتیکس (GA4)
// اگر NEXT_PUBLIC_GA_ID تنظیم نشده باشد، همه‌ی این توابع بی‌اثرند.

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params: GtagParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function")
    return;
  window.gtag("event", name, params);
}
