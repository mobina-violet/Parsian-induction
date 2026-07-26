import { PrismaClient } from '../lib/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

// ⚠️ مشخصات فنی (ظرفیت/توان/فرکانس) اینجا فقط placeholder هستن — قبل از انتشار نهایی
// حتماً با مشخصات واقعی مهندسی که کارفرما تایید کرده جایگزینشون کن.
const products = [
  {
    slug: 'p250',
    name: 'P250',
    category: 'MELTING_FURNACE' as const,
    capacityKg: 250,
    powerKw: 250,
    frequencyHz: 1000,
    description:
      'کوره القایی ذوب P250 مناسب کارگاه‌های کوچک و متوسط با نیاز به ذوب سریع فلزات آهنی و غیرآهنی در حجم پایین است. طراحی جمع‌وجور آن امکان نصب در فضای محدود را فراهم می‌کند.',
    images: [],
    order: 1,
  },
  {
    slug: 'p750',
    name: 'P750',
    category: 'MELTING_FURNACE' as const,
    capacityKg: 750,
    powerKw: 500,
    frequencyHz: 500,
    description:
      'کوره القایی ذوب P750 برای واحدهای تولیدی با حجم ذوب متوسط طراحی شده و تعادل مناسبی بین ظرفیت، مصرف انرژی و سرعت ذوب ارائه می‌دهد.',
    images: [],
    order: 2,
  },
  {
    slug: 'p1000',
    name: 'P1000',
    category: 'MELTING_FURNACE' as const,
    capacityKg: 1000,
    powerKw: 650,
    frequencyHz: 250,
    description:
      'کوره القایی ذوب P1000 پرکاربردترین مدل پارسیان برای صنایع ریخته‌گری است؛ ترکیبی از راندمان بالا، پایداری در کارکرد مداوم، و سهولت نگهداری.',
    images: [],
    featured: true,
    order: 3,
  },
  {
    slug: 'p1500',
    name: 'P1500',
    category: 'MELTING_FURNACE' as const,
    capacityKg: 1500,
    powerKw: 900,
    frequencyHz: 150,
    description:
      'کوره القایی ذوب P1500 برای خطوط تولید با ظرفیت بالاتر مناسب است و برای ذوب پیوسته در واحدهای صنعتی متوسط تا بزرگ استفاده می‌شود.',
    images: [],
    order: 4,
  },
  {
    slug: 'p2000',
    name: 'P2000',
    category: 'MELTING_FURNACE' as const,
    capacityKg: 2000,
    powerKw: 1200,
    frequencyHz: 100,
    description:
      'کوره القایی ذوب P2000 بزرگ‌ترین مدل استاندارد پارسیان، مناسب صنایع فولاد و ریخته‌گری سنگین با نیاز به ظرفیت ذوب بالا در هر سیکل کاری.',
    images: [],
    order: 5,
  },
  {
    slug: 'electrical-panel',
    name: 'تابلو برق صنعتی',
    category: 'ELECTRICAL_PANEL' as const,
    description:
      'طراحی و ساخت تابلوهای برق کنترل و قدرت، مخصوص کوره‌های القایی، مطابق با استانداردهای ایمنی و قابلیت مانیتورینگ از راه دور.',
    images: [],
    order: 6,
  },
  {
    slug: 'cooling-system',
    name: 'سیستم خنک‌کننده',
    category: 'COOLING_SYSTEM' as const,
    description:
      'سیستم‌های خنک‌کننده پیشرفته با کارایی بالا و مصرف انرژی بهینه، برای حفظ دمای ایمن کویل و قطعات الکتریکی کوره در کارکرد مداوم.',
    images: [],
    order: 7,
  },
  {
    slug: 'peripheral-equipment',
    name: 'قطعات و تجهیزات جانبی',
    category: 'PERIPHERAL_EQUIPMENT' as const,
    description:
      'تامین قطعات اصلی و مصرفی (کویل، رفرکتوری، اتصالات) با کیفیت بالا و طول عمر بالا، برای کاهش زمان توقف خط تولید.',
    images: [],
    order: 8,
  },
]

const projects = [
  {
    slug: 'aluminum-smelter-arak',
    title: 'کارخانه ذوب آلومینیوم اراک',
    industry: 'ALUMINUM' as const,
    capacityKg: 1500,
    image: '/images/projects/placeholder-project.jpg',
    featured: true,
    order: 1,
    completedAt: new Date('2024-06-01'),
  },
  {
    slug: 'khouzestan-steel-complex',
    title: 'مجتمع فولاد خوزستان',
    industry: 'STEEL' as const,
    capacityKg: 2000,
    image: '/images/projects/placeholder-project.jpg',
    featured: true,
    order: 2,
    completedAt: new Date('2023-11-01'),
  },
  {
    slug: 'sarcheshmeh-copper',
    title: 'کارخانه مس سرچشمه',
    industry: 'COPPER' as const,
    capacityKg: 1000,
    image: '/images/projects/placeholder-project.jpg',
    featured: true,
    order: 3,
    completedAt: new Date('2022-04-01'),
  },
  {
    slug: 'pars-khodro-metal',
    title: 'صنایع فلزی پارس خودرو',
    industry: 'OTHER' as const,
    capacityKg: 750,
    image: '/images/projects/placeholder-project.jpg',
    featured: true,
    order: 4,
    completedAt: new Date('2022-01-01'),
  },
]

async function main() {
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    })
  }

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())