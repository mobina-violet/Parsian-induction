import { Settings, Snowflake, CircuitBoard, Wrench, Factory, type LucideIcon } from 'lucide-react'

export interface Service {
  icon: LucideIcon
  title: string
  description: string
  href: string
  highlighted?: boolean
}

export const services: Service[] = [
  {
    icon: Settings,
    title: 'نصب و راه‌اندازی',
    description: 'نصب و راه‌اندازی توسط متخصصین',
    href: '/services',
  },
  {
    icon: Snowflake,
    title: 'سیستم خنک‌کننده',
    description: 'سیستم‌های خنک‌کننده پیشرفته و کارآمد',
    href: '/products?category=COOLING_SYSTEM',
  },
  {
    icon: CircuitBoard,
    title: 'تابلو برق',
    description: 'طراحی و ساخت تابلوهای برق صنعتی',
    href: '/products?category=ELECTRICAL_PANEL',
  },
  {
    icon: Wrench,
    title: 'قطعات و تجهیزات',
    description: 'تامین قطعات اصلی با کیفیت بالا',
    href: '/products?category=PERIPHERAL_EQUIPMENT',
  },
  {
    icon: Factory,
    title: 'کوره القایی',
    description: 'انواع کوره‌های القایی با ظرفیت‌های مختلف',
    href: '/products',
    highlighted: true,
  },
]