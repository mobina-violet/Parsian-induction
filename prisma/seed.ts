import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// ⚠️ مشخصات فنی تقریبی هستن. قبل از انتشار نهایی حتماً با اعداد تایید شده مهندسی جایگزین کن.
const staleProductSlugs = [
  "p250",
  "p500",
  "p750",
  "p1000",
  "p1500",
  "p2000",
  "cooling-system",
  "frequency-converter",
  "crucible",
  "link",
  "peripheral-equipment",
];

const products = [
  {
    slug: "melting-furnace",
    name: "کوره القایی ذوب",
    category: "MELTING_FURNACE" as const,
    description:
      "کوره‌های القایی ذوب پارسیان با طراحی اینورتر رزونانس موازی، ذوب تمیز و بدون آلودگی فلزات آهنی و غیرآهنی (فولاد، چدن، آلومینیوم و مس) رو با راندمان بالا و کنترل دقیق دما فراهم می‌کنن. این خط تولید از ظرفیت ۲۵۰ کیلوگرم برای کارگاه‌های کوچک تا ۵ تن برای واحدهای صنعتی بزرگ رو پوشش می‌ده.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [
      { capacityKg: 250, powerKw: 150, frequencyHz: 1500 },
      { capacityKg: 500, powerKw: 250, frequencyHz: 1300 },
      { capacityKg: 750, powerKw: 350, frequencyHz: 1000 },
      { capacityKg: 1000, powerKw: 500, frequencyHz: 900 },
      { capacityKg: 1500, powerKw: 750, frequencyHz: 600 },
      { capacityKg: 2000, powerKw: 1000, frequencyHz: 500 },
      { capacityKg: 3000, powerKw: 1400, frequencyHz: 400 },
      { capacityKg: 4000, powerKw: 1800, frequencyHz: 300 },
      { capacityKg: 5000, powerKw: 2200, frequencyHz: 250 },
    ],
    components: [
      {
        title: "سیستم خنک‌کننده",
        description:
          "به‌صورت مدار بسته و هوشمند طراحی شده تا دمای آب کویل بوته، تابلوی مبدل فرکانس و بانک خازن رو به‌طور دقیق کنترل کنه.",
      },
      {
        title: "سیستم مبدل فرکانس",
        description:
          "تابلو مبدل فرکانس مجهز به PLC و HMI برای کنترل دقیق و ساده‌ی تمام بخش‌های کوره.",
      },
      {
        title: "بوته",
        description:
          "در سه نوع اصلی عرضه می‌شه: بدنه آلومینیومی، بدنه فولادی (یوک) و بدنه استیل.",
      },
      {
        title: "لینک",
        description:
          "لینک‌های قدرت و اتصالات با طراحی استاندارد و کیفیت بالا تولید می‌شن.",
      },
      {
        title: "قطعات و تجهیزات جانبی",
        description:
          "شامل قطعات مصرفی و کنترلی مثل تریستور، مقاومت، خازن و برد الکترونیکی.",
      },
    ],
    images: [
      "/images/products/frequency-converter-1.webp",
      "/images/products/frequency-converter-2.webp",
      "/images/products/frequency-converter-3.webp",
    ],
    featured: true,
    order: 1,
  },
  {
    slug: "forging-furnace",
    name: "کوره القایی فورج",
    category: "FORGING_FURNACE" as const,
    description:
      "کوره القایی فورج پارسیان برای پیش‌گرم‌کردن قطعات فلزی قبل از عملیات آهنگری طراحی شده است.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [
      { capacityKg: 50, powerKw: 50, frequencyHz: 8000 },
      { capacityKg: 100, powerKw: 80, frequencyHz: 6000 },
      { capacityKg: 200, powerKw: 150, frequencyHz: 4000 },
      { capacityKg: 500, powerKw: 300, frequencyHz: 2500 },
    ],
    images: ["/images/products/forging-furnace-1.webp"],
    order: 2,
  },
  {
    slug: "hardening-furnace",
    name: "کوره القایی سخت‌کاری",
    category: "HARDENING_FURNACE" as const,
    description:
      "کوره القایی سخت‌کاری پارسیان برای انجام عملیات حرارتی دقیق روی قطعات فلزی طراحی شده است.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [
      { capacityKg: 30, powerKw: 40, frequencyHz: 20000 },
      { capacityKg: 80, powerKw: 80, frequencyHz: 15000 },
      { capacityKg: 150, powerKw: 120, frequencyHz: 10000 },
      { capacityKg: 300, powerKw: 200, frequencyHz: 8000 },
    ],
    images: [
      "/images/products/hardening-furnace-1.webp",
      "/images/products/hardening-furnace-2.webp",
      "/images/products/hardening-furnace-3.webp",
      "/images/products/hardening-furnace-4.webp",
    ],
    order: 3,
  },
  {
    slug: "forming-furnace",
    name: "کوره القایی فورمینگ",
    category: "FORMING_FURNACE" as const,
    description:
      "کوره القایی فورمینگ پارسیان برای گرم‌کردن قطعات قبل از عملیات شکل‌دهی و فرم‌دهی طراحی شده است.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [
      { capacityKg: 100, powerKw: 100, frequencyHz: 5000 },
      { capacityKg: 250, powerKw: 200, frequencyHz: 3500 },
      { capacityKg: 500, powerKw: 350, frequencyHz: 2500 },
      { capacityKg: 1000, powerKw: 600, frequencyHz: 1500 },
    ],
    images: ["/images/products/forging-furnace-1.webp"],
    featured: false,
    order: 4,
  },
  // ===== لوازم یدکی =====
  {
    slug: "thyristor-and-power-parts",
    name: "تریستور و قطعات قدرت",
    category: "SPARE_PARTS" as const,
    description:
      "تامین انواع تریستور، دیود، مقاومت و قطعات قدرت اصلی کوره‌های القایی با کیفیت بالا و سازگاری کامل با سیستم‌های پارسیان.",
    images: [

    ],
    order: 10,
  },
  {
    slug: "control-boards",
    name: "بردهای کنترل و الکترونیکی",
    category: "SPARE_PARTS" as const,
    description:
      "بردهای کنترل، کارت‌های الکترونیکی و قطعات مرتبط با سیستم فرمان و مانیتورینگ کوره‌های القایی.",
    images: [

    ],
    order: 11,
  },
  // ===== خدمات و تجهیزات =====
  {
    slug: "installation-and-commissioning",
    name: "نصب و راه‌اندازی",
    category: "SERVICE_EQUIPMENT" as const,
    description:
      "خدمات نصب، راه‌اندازی و آموزش بهره‌برداری کوره‌های القایی در محل مشتری توسط تیم متخصص پارسیان.",
    images: [

    ],
    order: 20,
  },
  {
    slug: "maintenance-and-support",
    name: "تعمیرات و پشتیبانی فنی",
    category: "SERVICE_EQUIPMENT" as const,
    description:
      "خدمات تعمیرات تخصصی، بازدید دوره‌ای و پشتیبانی فنی برای حفظ عملکرد پایدار تجهیزات.",
    images: [

    ],
    order: 21,
  },
];



async function main() {
  await prisma.product.deleteMany({
    where: { slug: { in: staleProductSlugs } },
  });

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
