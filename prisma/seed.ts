import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

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
];

const products = [
  // ========== کوره‌ها ==========
  {
    slug: "melting-furnace",
    name: "کوره القایی ذوب",
    category: "MELTING_FURNACE" as const,
    description:
      "کوره‌های القایی ذوب پارسیان با طراحی اینورتر رزونانس موازی، ذوب تمیز و بدون آلودگی فلزات آهنی و غیرآهنی (فولاد، چدن، آلومینیوم و مس) رو با راندمان بالا و کنترل دقیق دما فراهم می‌کنن. این روش یکی از مفیدترین و تمیزترین روش‌های گرمایش بدون تماس مواد است و باعث ایجاد ناخالصی یا آلودگی در ذوب نمی‌شود. در طراحی سیستم اینورتر رزونانس موازی، انتخاب خازن مناسب بر اساس فرکانس رزونانس، توان خروجی، ضریب قدرت، کیفیت و کارایی کوره بسیار مهم است. این خط تولید از ظرفیت‌های کوچک کارگاهی تا واحدهای صنعتی بزرگ رو پوشش می‌ده.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [
      {
        powerKw: 75,
        frequencyHzMin: 1700,
        frequencyHzMax: 1800,
        ironKgHr: 55,
        steelKgHr: 50,
        bronzeKgHr: 80,
      },
      {
        powerKw: 100,
        frequencyHzMin: 1700,
        frequencyHzMax: 1800,
        ironKgHr: 120,
        steelKgHr: 110,
        bronzeKgHr: 190,
      },
      {
        powerKw: 150,
        frequencyHzMin: 1500,
        frequencyHzMax: 1700,
        ironKgHr: 220,
        steelKgHr: 200,
        bronzeKgHr: 350,
      },
      {
        powerKw: 250,
        frequencyHzMin: 1500,
        frequencyHzMax: 1700,
        ironKgHr: 440,
        steelKgHr: 400,
        bronzeKgHr: 700,
      },
      {
        powerKw: 350,
        frequencyHzMin: 1300,
        frequencyHzMax: 1500,
        ironKgHr: 600,
        steelKgHr: 540,
        bronzeKgHr: 900,
      },
      {
        powerKw: 500,
        frequencyHzMin: 1300,
        frequencyHzMax: 1500,
        ironKgHr: 900,
        steelKgHr: 820,
        bronzeKgHr: 1400,
      },
      {
        powerKw: 600,
        frequencyHzMin: 1300,
        frequencyHzMax: 1500,
        ironKgHr: 1100,
        steelKgHr: 1000,
        bronzeKgHr: 1800,
      },
      {
        powerKw: 900,
        frequencyHzMin: 900,
        frequencyHzMax: 1200,
        ironKgHr: 1800,
        steelKgHr: 1650,
        bronzeKgHr: 3000,
      },
      {
        powerKw: 1200,
        frequencyHzMin: 900,
        frequencyHzMax: 1200,
        ironKgHr: 2400,
        steelKgHr: 2100,
        bronzeKgHr: 3600,
      },
      {
        powerKw: 1800,
        frequencyHzMin: 600,
        frequencyHzMax: 800,
        ironKgHr: 3600,
        steelKgHr: 3200,
        bronzeKgHr: 4500,
      },
      {
        powerKw: 2000,
        frequencyHzMin: 600,
        frequencyHzMax: 800,
        ironKgHr: 4000,
        steelKgHr: 3500,
        bronzeKgHr: 6200,
      },
      {
        powerKw: 2500,
        frequencyHzMin: 600,
        frequencyHzMax: 800,
        ironKgHr: 5000,
        steelKgHr: 4600,
        bronzeKgHr: 7600,
      },
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
    name: "کوره القایی فورج (پیش‌گرم)",
    category: "FORGING_FURNACE" as const,
    description:
      "کوره‌های القایی پیش‌گرم و فورج پارسیان بر اساس سفارش مشتری، توان مورد نیاز و نوع کاربری طراحی و ساخته می‌شن. این کوره‌ها با دانش روز و سال‌ها تجربه، قطعات فلزی رو تا دمای مشخص پیش‌گرم می‌کنن تا آماده عملیات فورج بشن. مزایای اصلی: اپراتوری بسیار ساده، عدم ایجاد اکسید روی قطعه به دلیل زمان کوتاه حرارت‌دهی، شروع به کار سریع، راندمان بالا، کنترل دقیق دما، اشغال فضای کمتر و قابلیت اتوماسیون با خط تولید.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [
      {
        powerKw: 100,
        frequencyHzMin: 0,
        frequencyHzMax: 0,
        kgHr: 300,
        temperature: 1200,
        metal: "STEEL",
        diameterMm: 50,
      },
      {
        powerKw: 150,
        frequencyHzMin: 0,
        frequencyHzMax: 0,
        kgHr: 400,
        temperature: 1200,
        metal: "STEEL",
        diameterMm: 50,
      },
      {
        powerKw: 250,
        frequencyHzMin: 0,
        frequencyHzMax: 0,
        kgHr: 700,
        temperature: 1200,
        metal: "STEEL",
        diameterMm: 50,
      },
      {
        powerKw: 350,
        frequencyHzMin: 0,
        frequencyHzMax: 0,
        kgHr: 1100,
        temperature: 1200,
        metal: "STEEL",
        diameterMm: 50,
      },
      {
        powerKw: 500,
        frequencyHzMin: 0,
        frequencyHzMax: 0,
        kgHr: 1500,
        temperature: 1200,
        metal: "STEEL",
        diameterMm: 50,
      },
      {
        powerKw: 600,
        frequencyHzMin: 0,
        frequencyHzMax: 0,
        kgHr: 1800,
        temperature: 1200,
        metal: "STEEL",
        diameterMm: 50,
      },
      {
        powerKw: 1000,
        frequencyHzMin: 0,
        frequencyHzMax: 0,
        kgHr: 3000,
        temperature: 1200,
        metal: "STEEL",
        diameterMm: 50,
      },
      {
        powerKw: 100,
        frequencyHzMin: 0,
        frequencyHzMax: 0,
        kgHr: 600,
        temperature: 750,
        metal: "BRASS",
        diameterMm: 50,
      },
      {
        powerKw: 150,
        frequencyHzMin: 0,
        frequencyHzMax: 0,
        kgHr: 900,
        temperature: 750,
        metal: "BRASS",
        diameterMm: 50,
      },
      {
        powerKw: 250,
        frequencyHzMin: 0,
        frequencyHzMax: 0,
        kgHr: 1450,
        temperature: 750,
        metal: "BRASS",
        diameterMm: 50,
      },
      {
        powerKw: 350,
        frequencyHzMin: 0,
        frequencyHzMax: 0,
        kgHr: 2000,
        temperature: 750,
        metal: "BRASS",
        diameterMm: 50,
      },
      {
        powerKw: 500,
        frequencyHzMin: 0,
        frequencyHzMax: 0,
        kgHr: 2900,
        temperature: 750,
        metal: "BRASS",
        diameterMm: 50,
      },
    ],
    components: [
      {
        title: "سیستم خنک‌کننده",
        description:
          "شامل مبدل حرارتی، قطره‌گیر برج خنک‌کننده، الکتروپمپ‌ها، فن، بدنه گالوانیزه و سختی‌گیر مغناطیسی.",
      },
      {
        title: "سیستم مبدل فرکانس",
        description:
          "تابلو مبدل فرکانس مجهز به PLC و HMI برای کنترل دقیق و ساده تمام بخش‌ها.",
      },
      {
        title: "کویل و یوک",
        description:
          "طراحی شده بر اساس قطر و نوع قطعه کار برای حداکثر راندمان پیش‌گرم.",
      },
    ],
    images: ["/images/products/forging-furnace-1.webp"],
    featured: false,
    order: 2,
  },
  {
    slug: "hardening-furnace",
    name: "کوره القایی سخت‌کاری",
    category: "HARDENING_FURNACE" as const,
    description:
      "کوره‌های سخت‌کاری القایی پارسیان در دو رنج فرکانس متوسط (MF) و فرکانس بالا (HF) تولید می‌شن. عملیات سخت‌کاری القایی یکی از شاخه‌های مهم متالورژی است که به دلیل تغییر خواص فیزیکی و افزایش راندمان قطعات، در بسیاری از صنایع استفاده می‌شود. این کوره‌ها قابلیت کنترل دقیق دما و عمق نفوذ سخت‌کاری رو دارن و برای قطعاتی مثل محورها، یاتاقان‌ها، میل‌بادامک، پین‌ها، پیستون‌ها، چرخ‌دنده‌ها، شفت‌ها و میل‌لنگ موتور مناسب هستن.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [
      {
        powerKw: 100,
        frequencyRange: "MF",
        workFrequencyKHz: "7-15",
        type: "MF",
      },
      {
        powerKw: 100,
        frequencyRange: "MF",
        workFrequencyKHz: "7-9",
        type: "MF",
      },
      {
        powerKw: 150,
        frequencyRange: "MF",
        workFrequencyKHz: "7-9",
        type: "MF",
      },
      {
        powerKw: 150,
        frequencyRange: "MF",
        workFrequencyKHz: "2-3",
        type: "MF",
      },
      {
        powerKw: 250,
        frequencyRange: "MF",
        workFrequencyKHz: "2-3",
        type: "MF",
      },
      {
        powerKw: 500,
        frequencyRange: "MF",
        workFrequencyKHz: "1-2",
        type: "MF",
      },
      {
        powerKw: 6,
        frequencyRange: "HF",
        workFrequencyKHz: "800-1000",
        type: "HF",
      },
      {
        powerKw: 18,
        frequencyRange: "HF",
        workFrequencyKHz: "300-450",
        type: "HF",
      },
      {
        powerKw: 45,
        frequencyRange: "HF",
        workFrequencyKHz: "250-400",
        type: "HF",
      },
      {
        powerKw: 75,
        frequencyRange: "HF",
        workFrequencyKHz: "250-350",
        type: "HF",
      },
      {
        powerKw: 120,
        frequencyRange: "HF",
        workFrequencyKHz: "250-350",
        type: "HF",
      },
      {
        powerKw: 250,
        frequencyRange: "HF",
        workFrequencyKHz: "200-300",
        type: "HF",
      },
    ],
    components: [
      {
        title: "سیستم کنترل هوشمند",
        description:
          "کنترل توان از طریق مانیتور HMI، تنظیم سرعت خطی و دورانی، برنامه‌ریزی و زمان‌بندی عملیات کوئنچ، مانیتورینگ موقعیت اینداکتور.",
      },
      {
        title: "سیستم مبدل فرکانس",
        description:
          "قابلیت تولید در دو رنج MF و HF با کنترل دقیق عمق سخت‌کاری.",
      },
    ],
    images: [
      "/images/products/hardening-furnace-1.webp",
      "/images/products/hardening-furnace-2.webp",
      "/images/products/hardening-furnace-3.webp",
      "/images/products/hardening-furnace-4.webp",
    ],
    featured: false,
    order: 3,
  },
  {
    slug: "forming-furnace",
    name: "کوره القایی فورمینگ",
    category: "FORMING_FURNACE" as const,
    description:
      "کوره‌های القایی فورمینگ پارسیان برای گرم کردن موضعی یا کامل قطعات قبل از عملیات شکل‌دهی و فرمینگ طراحی شدن. این کوره‌ها با کنترل دقیق دما و راندمان بالا، امکان تولید قطعات با کیفیت یکنواخت در خط تولید انبوه رو فراهم می‌کنن و فضای کمتری نسبت به کوره‌های سنتی اشغال می‌کنن.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [
      {
        powerKw: 100,
        frequencyHzMin: 0,
        frequencyHzMax: 0,
        kgHr: 300,
        temperature: 1200,
        metal: "STEEL",
        diameterMm: 50,
      },
      {
        powerKw: 150,
        frequencyHzMin: 0,
        frequencyHzMax: 0,
        kgHr: 400,
        temperature: 1200,
        metal: "STEEL",
        diameterMm: 50,
      },
      {
        powerKw: 250,
        frequencyHzMin: 0,
        frequencyHzMax: 0,
        kgHr: 700,
        temperature: 1200,
        metal: "STEEL",
        diameterMm: 50,
      },
      {
        powerKw: 350,
        frequencyHzMin: 0,
        frequencyHzMax: 0,
        kgHr: 1100,
        temperature: 1200,
        metal: "STEEL",
        diameterMm: 50,
      },
      {
        powerKw: 500,
        frequencyHzMin: 0,
        frequencyHzMax: 0,
        kgHr: 1500,
        temperature: 1200,
        metal: "STEEL",
        diameterMm: 50,
      },
      {
        powerKw: 600,
        frequencyHzMin: 0,
        frequencyHzMax: 0,
        kgHr: 1800,
        temperature: 1200,
        metal: "STEEL",
        diameterMm: 50,
      },
      {
        powerKw: 1000,
        frequencyHzMin: 0,
        frequencyHzMax: 0,
        kgHr: 3000,
        temperature: 1200,
        metal: "STEEL",
        diameterMm: 50,
      },
      {
        powerKw: 100,
        frequencyHzMin: 0,
        frequencyHzMax: 0,
        kgHr: 600,
        temperature: 750,
        metal: "BRASS",
        diameterMm: 50,
      },
      {
        powerKw: 150,
        frequencyHzMin: 0,
        frequencyHzMax: 0,
        kgHr: 900,
        temperature: 750,
        metal: "BRASS",
        diameterMm: 50,
      },
      {
        powerKw: 250,
        frequencyHzMin: 0,
        frequencyHzMax: 0,
        kgHr: 1450,
        temperature: 750,
        metal: "BRASS",
        diameterMm: 50,
      },
      {
        powerKw: 350,
        frequencyHzMin: 0,
        frequencyHzMax: 0,
        kgHr: 2000,
        temperature: 750,
        metal: "BRASS",
        diameterMm: 50,
      },
      {
        powerKw: 500,
        frequencyHzMin: 0,
        frequencyHzMax: 0,
        kgHr: 2900,
        temperature: 750,
        metal: "BRASS",
        diameterMm: 50,
      },
    ],
    components: [
      {
        title: "سیستم خنک‌کننده",
        description:
          "شامل مبدل حرارتی، قطره‌گیر برج خنک‌کننده، الکتروپمپ‌ها، فن، بدنه گالوانیزه و سختی‌گیر مغناطیسی.",
      },
      {
        title: "سیستم مبدل فرکانس",
        description:
          "تابلو مبدل فرکانس مجهز به PLC و HMI برای کنترل دقیق و ساده تمام بخش‌ها.",
      },
      {
        title: "کویل و یوک",
        description:
          "طراحی شده بر اساس قطر و نوع قطعه کار برای حداکثر راندمان پیش‌گرم.",
      },
    ],
    images: ["/images/products/forging-furnace-1.webp"],
    featured: false,
    order: 4,
  },

  // ========== خدمات ==========
  {
    slug: "spare-parts",
    name: "لوازم یدکی و قطعات مصرفی",
    category: "SPARE_PARTS" as const,
    description:
      "پارسیان تمام قطعات مصرفی و یدکی کوره‌های القایی رو با کیفیت اصلی تأمین می‌کنه. از تریستور و خازن‌های آب‌خنک گرفته تا بردهای الکترونیکی پارسیان، کویل مسی، یوک، شیلنگ‌های بدون کربن و مواد عایق‌کاری. همه قطعات با استانداردهای اصلی کوره سازگار هستن و باعث افزایش طول عمر و کاهش زمان توقف تولید می‌شن.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [
      {
        title: "تریستور و نیمه‌هادی‌ها",
        description: "تریستورهای قدرت با کیفیت بالا و قطعات الکترونیکی مصرفی.",
      },
      {
        title: "خازن‌های آب‌خنک فرکانس متوسط",
        description: "خازن‌های آب‌خنک ساخت پارس یا وارداتی با استاندارد اصلی.",
      },
      {
        title: "کویل مسی و متعلقات",
        description: "حلقه‌های مسی، شین‌ها و متعلقات مسی کوره.",
      },
      {
        title: "شیلنگ‌های بدون کربن",
        description: "شیلنگ‌های آب‌گرد بدون کربن مقاوم در برابر حرارت و فشار.",
      },
      {
        title: "مواد عایق‌کاری",
        description: "مواد عایق باکیفیت برای افزایش ایمنی و طول عمر کوره.",
      },
      {
        title: "بردهای الکترونیکی پارسیان",
        description: "بردهای کنترل و قدرت اختصاصی پارسیان.",
      },
    ],
    images: [],
    featured: false,
    order: 10,
  },
  {
    slug: "peripheral-equipment",
    name: "قطعات و تجهیزات جانبی",
    category: "PERIPHERAL_EQUIPMENT" as const,
    description:
      "تجهیزات جانبی کامل کوره‌های القایی پارسیان شامل کابل‌های آب‌خنک، یوک و دی‌سی چوک، بلوک‌های بالای کوره، کلید چنج‌اور، ترانس‌های جریان و کنترل، تجهیزات هیدرولیک و سایر اجزای مورد نیاز. همه این قطعات با طراحی استاندارد و کیفیت بالا تولید و تأمین می‌شن تا عملکرد پایدار و ایمن کوره تضمین بشه.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [
      {
        title: "کابل‌های آب‌خنک (Water Cooled Cables)",
        description:
          "کابل‌های قدرت آب‌خنک با کیفیت بالا برای انتقال جریان ایمن.",
      },
      {
        title: "یوک و دی‌سی چوک",
        description: "یوک‌های لایه‌ای و چوک‌های جریان مستقیم.",
      },
      {
        title: "بلوک‌های بالای کوره",
        description: "Coil Cradle Assemblies و بلوک‌های استیل و مسی.",
      },
      {
        title: "کلید چنج‌اور القایی",
        description: "کلیدهای تعویض قدرت برای کوره‌های چندبوته.",
      },
      {
        title: "ترانس‌های جریان و کنترل",
        description: "C.T.ها و ترانس‌های کنترل دقیق.",
      },
      {
        title: "تجهیزات هیدرولیک",
        description: "هیدرولیک کوره، قطعات و تجهیزات یدکی مربوطه.",
      },
    ],
    images: [],
    featured: false,
    order: 11,
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
