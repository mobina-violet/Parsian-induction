import Link from "next/link";
import { Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function ArticleCta() {
  return (
    <div className="mt-12 rounded-2xl border border-orange-100 bg-orange-50 p-6 text-center sm:p-8">
      <h2 className="text-base font-bold text-slate-900 sm:text-lg">
        برای کوره‌ی مناسب کارگاه‌تان مشاوره بگیرید
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-7 text-gray-600">
        کارشناسان {siteConfig.name} در انتخاب توان و ظرفیت، تأمین قطعات یدکی و
        بررسی مدار خنک‌کاری کنار شما هستند.
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/contact"
          className="rounded-full bg-orange-500 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-orange-600">
          درخواست مشاوره
        </Link>
        <Link
          href="/projects"
          className="rounded-full border border-orange-200 bg-white px-6 py-2.5 text-sm font-medium text-orange-600 transition hover:border-orange-300">
          نمونه پروژه‌ها
        </Link>
        <a
          href={`tel:${siteConfig.phone}`}
          className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium text-slate-700 transition hover:border-orange-300 hover:text-orange-600">
          <Phone className="h-4 w-4" />
          <span dir="ltr">{siteConfig.phoneDisplay}</span>
        </a>
      </div>
    </div>
  );
}
