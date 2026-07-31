import Link from 'next/link'
import { services } from '@/lib/data/services'

export function ServicesGrid() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* dir="ltr" روی خود گرید، تا ترتیب فیزیکی کارت‌ها (نصب و راه‌اندازی چپ ... کوره القایی راست)
            دقیقاً مطابق دیزاین تایید‌شده بماند و برعکس نشود */}
        <div dir="ltr" className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              dir="rtl"
              className={
                service.highlighted
                  ? 'flex flex-col items-center rounded-2xl bg-orange-50 px-4 py-8 text-center transition hover:shadow-md'
                  : 'flex flex-col items-center rounded-2xl border border-gray-100 px-4 py-8 text-center transition hover:border-orange-200 hover:shadow-md'
              }
            >
              <span
                className={
                  service.highlighted
                    ? 'flex h-12 w-12 items-center justify-center rounded-full bg-orange-100'
                    : 'flex h-12 w-12 items-center justify-center rounded-full bg-gray-50'
                }
              >
                <service.icon
                  className={service.highlighted ? 'h-6 w-6 text-orange-600' : 'h-6 w-6 text-slate-700'}
                />
              </span>
              <h3
                className={
                  service.highlighted
                    ? 'mt-4 text-sm font-bold text-orange-600'
                    : 'mt-4 text-sm font-bold text-slate-900'
                }
              >
                {service.title}
              </h3>
              <p className="mt-1.5 text-xs leading-5 text-gray-400">{service.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}