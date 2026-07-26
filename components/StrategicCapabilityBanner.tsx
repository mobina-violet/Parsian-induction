import { Search, Cpu, Wrench } from 'lucide-react'
import { ConsultationCtaButton } from '@/components/ConsultationCtaButton'

const steps = [
  { icon: Search, title: 'تحلیل نیاز شما', desc: 'بررسی دقیق فرآیند تولید و اهداف صنعتی شما' },
  {
    icon: Cpu,
    title: 'طراحی اختصاصی',
    desc: 'بر اساس تکنولوژی روز دنیا، متناسب با خط تولید شما',
  },
  { icon: Wrench, title: 'اجرا و پشتیبانی', desc: 'از نصب و راه‌اندازی تا خدمات پس از فروش' },
]

export function StrategicCapabilityBanner() {
  return (
    <section dir="rtl" className="bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-white sm:text-3xl">
          هر پروژه، <span className="text-orange-500">یک راهکار مهندسی‌شده</span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
          فارغ از نوع و مقیاس درخواست شما، تیم فنی پارسیان با بهره‌گیری از تکنولوژی روز دنیا،
          راهکاری اختصاصی برایتان طراحی و اجرا می‌کند.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10">
                <step.icon className="h-6 w-6 text-orange-500" />
              </span>
              <h3 className="mt-4 text-sm font-bold text-white">{step.title}</h3>
              <p className="mt-1.5 text-xs leading-6 text-slate-400">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <ConsultationCtaButton label="درخواست مشاوره تخصصی" source="PROJECT_PAGE" />
        </div>
      </div>
    </section>
  )
}