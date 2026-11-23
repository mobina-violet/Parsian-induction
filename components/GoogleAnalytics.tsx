"use client";

import { useEffect } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";

/**
 * گوگل آنالیتیکس 4.
 * - فقط وقتی NEXT_PUBLIC_GA_ID ست شده باشد و در حالت production اجرا می‌شود.
 * - روی پنل ادمین هیچ اسکریپتی لود نمی‌شود (بازدید خودت آمار را خراب نمی‌کند).
 * - تغییر صفحه‌ها را خود GA4 (Enhanced Measurement) از روی history دنبال می‌کند.
 * - رویدادهای سفارشی: تماس تلفنی، واتساپ و دانلود کاتالوگ با کلیک.
 */
export function GoogleAnalytics() {
  const gaId = siteConfig.gaId;
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const enabled =
    Boolean(gaId) && process.env.NODE_ENV === "production" && !isAdmin;

  useEffect(() => {
    if (!enabled) return;

    function onClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest?.("a");
      const href = link?.getAttribute("href");
      if (!href) return;

      if (href.startsWith("tel:")) {
        trackEvent("click_phone", { link_url: href });
      } else if (href.includes("wa.me")) {
        trackEvent("click_whatsapp", { link_url: href });
      } else if (href.endsWith(".pdf")) {
        trackEvent("file_download", { link_url: href });
      }
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${gaId}');`}
      </Script>
    </>
  );
}
