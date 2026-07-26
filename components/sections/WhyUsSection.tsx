import { ClipboardCheck, Award, Users, Headset } from 'lucide-react'

const highlights = [
  { icon: ClipboardCheck, value: '۲۵+', label: 'سال تجربه' },
  { icon: Award, value: '۴۰۰+', label: 'پروژه موفق' },
  { icon: Users, value: '۱۰۰۰+', label: 'مشتری راضی' },
  { icon: Headset, value: '۲۴/۷', label: 'پشتیبانی و خدمات' },
]

export function WhyUsSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* dir="rtl" روی کل کارت: چون فرزند اول (متن) باید راست بیفتد و فرزند دوم (آمار) چپ —
            دقیقاً همان چیزی است که برگشت طبیعی RTL انجام می‌دهد، پس نیازی به override نیست */}
        <div
          dir="rtl"
          className="grid gap-10 rounded-3xl bg-slate-50 p-8 lg:grid-cols-2 lg:items-center lg:p-12"
        >
          {/* متن */}
          <div className="text-right">
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">چرا پارسیان؟</h2>
            <p className="mt-3 text-sm leading-7 text-gray-500 sm:text-base">
              ما با تکیه بر دانش فنی روز و تجربه طولانی، بهترین راهکارها را برای صنایع شما ارائه
              می‌دهیم.
            </p>
            <a
              href="/about"
              className="mt-6 inline-block rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:border-orange-300 hover:text-orange-500"
            >
              درباره ما بیشتر بدانید
            </a>
          </div>

          {/* آمار — dir="ltr" چون ترتیب فیزیکی آیتم‌ها (کلیپ‌بورد ... پشتیبانی) چپ‌به‌راست طراحی شده */}
          <div dir="ltr" className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {highlights.map((item) => (
              <div key={item.label} className="flex flex-col items-center text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                  <item.icon className="h-5 w-5 text-orange-500" />
                </span>
                <p dir="rtl" className="mt-3 text-lg font-bold text-slate-900">
                  {item.value}
                </p>
                <p dir="rtl" className="text-xs text-gray-400">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}