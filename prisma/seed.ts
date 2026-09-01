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
      "کوره‌های القایی ذوب , ساخت شرکت کوره القایی پارسیان پرتوالوند با طراحی اینورتر رزونانس سری و موازی، ذوب تمیز و بدون آلودگی فلزات آهنی و غیرآهنی (استیل, فولاد، چدن،آلومینیوم, برنج و مس) رو با راندمان بالا و کنترل دقیق دما فراهم می‌کنند. این روش یکی از مفیدترین و تمیزترین روش‌های گرمایش بدون تماس مواد است و باعث ایجاد ناخالصی یا آلودگی در ذوب نمی‌شود. در طراحی سیستم اینورتر رزونانس سری و موازی، انتخاب خازن مناسب بر اساس فرکانس رزونانس، توان خروجی، ضریب قدرت، کیفیت و کارایی کوره بسیار مهم است. این خط تولید از ظرفیت‌های کوچک کارگاهی تا واحدهای صنعتی بزرگ رو پوشش می دهد",
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
          "به‌صورت مدار بسته و هوشمند طراحی شده تا دمای آب کویل بوته، تابلوی مبدل فرکانس و بانک خازن رو به‌طور دقیق کنترل کند",
      },
      {
        title: "سیستم مبدل فرکانس",
        description:
          "تابلو مبدل فرکانس مجهز به PLC و HMI برای کنترل دقیق و ساده‌ی تمام بخش‌های کوره.",
      },
      {
        title: "بوته",
        description:
          "در سه نوع اصلی عرضه می‌شود: بدنه آلومینیومی، بدنه فولادی (یوک) و بدنه استیل",
      },
      {
        title: "لینک",
        description:
          "لینک‌های قدرت و اتصالات با طراحی استاندارد و کیفیت بالا تولید می‌شوند .",
      },
      {
        title: "قطعات و تجهیزات جانبی",
        description:
          "شامل قطعات مصرفی و کنترلی مثل تریستور، مقاومت، خازن و برد الکترونیکی.",
      },
    ],
    images: [
      "/images/products/melting-furnace-1.webp",
      "/images/products/melting-furnace-2.webp",
      "/images/products/melting-furnace-3.webp",
      "/images/products/melting-furnace-4.webp",
      "/images/products/melting-furnace-5.webp",
      "/images/products/melting-furnace-6.webp",
      "/images/products/melting-furnace-7.webp",
    ],
    featured: true,
    order: 1,
  },
  {
    slug: "forging-furnace",
    name: "کوره القایی پیش‌گرم (فورج) ",
    category: "FORGING_FURNACE" as const,
    description:
      "کوره‌های القایی پیش‌گرم (فورج) ساخت شرکت کوره القایی پارسیان پرتوالوند بر اساس سفارش مشتری، توان مورد نیاز و نوع کاربری طراحی و ساخته می‌شوند. این کوره‌ها با دانش روز و سال‌ها تجربه، قطعات فلزی رو تا دمای مشخص پیش‌گرم می‌کنند تا آماده عملیات فورج شوند. مزایای اصلی: اپراتوری بسیار ساده، عدم ایجاد اکسید روی قطعه به دلیل زمان کوتاه حرارت‌دهی، شروع به کار سریع، راندمان بالا، کنترل دقیق دما، اشغال فضای کمتر و قابلیت اتوماسیون با خط تولید.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [
      // فولاد ۱۲۰۰°C
      {
        powerKw: 100,
        kgHr: 300,
        temperature: 1200,
        metal: "STEEL",
        diameterMm: 50,
      },
      {
        powerKw: 150,
        kgHr: 400,
        temperature: 1200,
        metal: "STEEL",
        diameterMm: 50,
      },
      {
        powerKw: 250,
        kgHr: 700,
        temperature: 1200,
        metal: "STEEL",
        diameterMm: 50,
      },
      {
        powerKw: 350,
        kgHr: 1100,
        temperature: 1200,
        metal: "STEEL",
        diameterMm: 50,
      },
      {
        powerKw: 500,
        kgHr: 1500,
        temperature: 1200,
        metal: "STEEL",
        diameterMm: 50,
      },
      {
        powerKw: 600,
        kgHr: 1800,
        temperature: 1200,
        metal: "STEEL",
        diameterMm: 50,
      },
      {
        powerKw: 1000,
        kgHr: 3000,
        temperature: 1200,
        metal: "STEEL",
        diameterMm: 50,
      },

      // برنج ۷۵۰°C
      {
        powerKw: 100,
        kgHr: 600,
        temperature: 750,
        metal: "BRASS",
        diameterMm: 50,
      },
      {
        powerKw: 150,
        kgHr: 900,
        temperature: 750,
        metal: "BRASS",
        diameterMm: 50,
      },
      {
        powerKw: 250,
        kgHr: 1450,
        temperature: 750,
        metal: "BRASS",
        diameterMm: 50,
      },
      {
        powerKw: 350,
        kgHr: 2000,
        temperature: 750,
        metal: "BRASS",
        diameterMm: 50,
      },
      {
        powerKw: 500,
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
        title: "کویل و میزکار",
        description:
          "طراحی شده بر اساس قطر و نوع قطعه کار برای حداکثر راندمان پیش‌گرم.",
      },
    ],
    images: [
      "/images/products/forging-furnace1.webp",
      "/images/products/forging-furnace2.webp",
      "/images/products/forging-furnace3.webp",
      "/images/products/forging-furnace4.webp",
    ],
    featured: false,
    order: 2,
  },
  {
    slug: "forming-furnace",
    name: "کوره القایی فورمینگ",
    category: "FORMING_FURNACE" as const,
    description:
      "کوره‌های القایی فورمینگ پارسیان برای گرم کردن موضعی یا کامل قطعات قبل از عملیات شکل‌دهی و فرمینگ طراحی شدند. این کوره‌ها با کنترل دقیق دما و راندمان بالا، امکان تولید قطعات با کیفیت یکنواخت در خط تولید انبوه رو فراهم می‌کنند و فضای کمتری نسبت به کوره‌های سنتی اشغال می‌کنند",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
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
        title: "کویل ",
        description:
          "طراحی شده بر اساس قطر و نوع قطعه کار برای حداکثر راندمان پیش‌گرم.",
      },
    ],
    images: [
      "/images/products/forming-furnace-1.webp",
      "/images/products/forming-furnace-2.webp",
    ],
    featured: false,
    order: 4,
  },
  {
    slug: "hardening-furnace",
    name: "کوره القایی سخت‌کاری",
    category: "HARDENING_FURNACE" as const,
    description:
      "کوره‌های سخت‌کاری القایی پارسیان در رنج فرکانس متوسط (MF) تولید می‌شوند. عملیات سخت‌کاری القایی یکی از شاخه‌های مهم متالورژی است که به دلیل تغییر خواص فیزیکی و افزایش راندمان قطعات، در بسیاری از صنایع استفاده می‌شود. این کوره‌ها قابلیت کنترل دقیق دما و عمق نفوذ سخت‌کاری را دارند و برای قطعاتی مثل محورها، یاتاقان‌ها، میل‌بادامک، پین‌ها، پیستون‌ها، چرخ‌دنده‌ها، شفت‌ها و میل‌لنگ موتور مناسب هستند.",
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
    ],
    components: [
      {
        title: "سیستم کنترل هوشمند",
        description:
          "کنترل توان از طریق مانیتور HMI، تنظیم سرعت خطی و دورانی، برنامه‌ریزی و زمان‌بندی عملیات کوئنچ، مانیتورینگ موقعیت اینداکتور.",
      },
      {
        title: "سیستم مبدل فرکانس",
        description: "قابلیت تولید در رنج MF  با کنترل دقیق عمق سخت‌کاری.",
      },
    ],
    images: [
      "/images/products/hardening-furnace1.webp",
      "/images/products/hardening-furnace2.webp",
      "/images/products/hardening-furnace3.webp",
      "/images/products/hardening-furnace4.webp",
    ],
    featured: false,
    order: 3,
  },

  // ========== لوازم یدکی و قطعات مصرفی (محصولات جداگانه) ==========
  {
    slug: "thyristor-power",
    name: "تریستور قدرت",
    category: "SPARE_PARTS" as const,
    description:
      "تریستورهای قدرت با کیفیت بالا و تحمل جریان و ولتاژ بالا، مخصوص تابلوهای مبدل فرکانس کوره‌های القایی پارسیان. مناسب برای جایگزینی قطعات اصلی و افزایش طول عمر سیستم.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [],
    images: [],
    featured: false,
    order: 10,
  },
  {
    slug: "water-cooled-capacitor",
    name: "خازن آب‌خنک فرکانس متوسط",
    category: "SPARE_PARTS" as const,
    description:
      "خازن‌های آب‌خنک ساخت پارس یا وارداتی با استاندارد اصلی، مناسب برای بانک خازن کوره‌های القایی. طراحی شده برای تحمل جریان بالا و دفع حرارت موثر.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [],
    images: [],
    featured: false,
    order: 11,
  },
  {
    slug: "copper-coil",
    name: "کویل مسی و متعلقات",
    category: "SPARE_PARTS" as const,
    description:
      "حلقه‌های مسی، شین‌ها و متعلقات مسی کوره با خلوص بالا. طراحی دقیق بر اساس توان و فرکانس کوره برای حداکثر راندمان و حداقل تلفات.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [],
    images: [],
    featured: false,
    order: 12,
  },
  {
    slug: "carbon-free-hose",
    name: "شیلنگ بدون کربن",
    category: "SPARE_PARTS" as const,
    description:
      "شیلنگ‌های آب‌گرد بدون کربن مقاوم در برابر حرارت و فشار بالا. مناسب برای مدارهای خنک‌کننده کویل، خازن و تابلو مبدل فرکانس.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [],
    images: [],
    featured: false,
    order: 13,
  },
  {
    slug: "insulation-materials",
    name: "مواد عایق‌کاری",
    category: "SPARE_PARTS" as const,
    description:
      "مواد عایق باکیفیت برای افزایش ایمنی و طول عمر کوره. شامل ورق‌ها، نوارها و پوشش‌های مقاوم در برابر حرارت و جریان القایی.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [],
    images: [],
    featured: false,
    order: 14,
  },
  {
    slug: "parsian-control-board",
    name: "بردهای الکترونیکی پارسیان",
    category: "SPARE_PARTS" as const,
    description:
      "بردهای کنترل و قدرت اختصاصی پارسیان با طراحی بهینه و قطعات باکیفیت. سازگار کامل با تابلوهای مبدل فرکانس شرکت.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [],
    images: [],
    featured: false,
    order: 15,
  },
  {
    slug: "semiconductor-parts",
    name: "نیمه‌هادی‌ها و قطعات الکترونیکی مصرفی",
    category: "SPARE_PARTS" as const,
    description:
      "مجموعه کامل نیمه‌هادی‌ها، دیودها، مقاومت‌ها و قطعات الکترونیکی مصرفی مورد نیاز تابلوهای قدرت و کنترل کوره‌های القایی.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [],
    images: [],
    featured: false,
    order: 16,
  },
  {
    slug: "yoke-laminated",
    name: "یوک لایه‌ای",
    category: "SPARE_PARTS" as const,
    description:
      "یوک‌های لایه‌ای با کیفیت بالا برای کاهش تلفات هسته و بهبود راندمان کوره. ساخته شده از ورق‌های سیلیکونی استاندارد.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [],
    images: [],
    featured: false,
    order: 17,
  },
  {
    slug: "dc-choke",
    name: "دی‌سی چوک",
    category: "SPARE_PARTS" as const,
    description:
      "چوک‌های جریان مستقیم با طراحی دقیق برای فیلتر کردن ریپل جریان در مدارهای قدرت کوره‌های القایی.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [],
    images: [],
    featured: false,
    order: 18,
  },

  // ========== قطعات و تجهیزات جانبی ==========
  {
    slug: "water-cooled-cable",
    name: "کابل آب‌خنک (Water Cooled Cable)",
    category: "PERIPHERAL_EQUIPMENT" as const,
    description:
      "کابل‌های قدرت آب‌خنک با کیفیت بالا برای انتقال جریان ایمن بین تابلو و کویل. مقاوم در برابر حرارت و جریان‌های بالا.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [],
    images: [],
    featured: false,
    order: 19,
  },
  {
    slug: "coil-cradle",
    name: "بلوک‌های بالای کوره (Coil Cradle)",
    category: "PERIPHERAL_EQUIPMENT" as const,
    description:
      "Coil Cradle Assemblies و بلوک‌های استیل و مسی برای نگه‌داری و هدایت کویل در کوره‌های القایی.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [],
    images: [],
    featured: false,
    order: 20,
  },
  {
    slug: "changeover-switch",
    name: "کلید چنج‌اور القایی",
    category: "PERIPHERAL_EQUIPMENT" as const,
    description:
      "کلیدهای تعویض قدرت برای کوره‌های چندبوته. امکان سوئیچ سریع و ایمن بین بوته‌ها بدون قطع کامل سیستم.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [],
    images: [],
    featured: false,
    order: 21,
  },
  {
    slug: "current-transformer",
    name: "ترانس جریان و کنترل (C.T)",
    category: "PERIPHERAL_EQUIPMENT" as const,
    description:
      "ترانس‌های جریان و کنترل دقیق برای اندازه‌گیری و حفاظت مدارهای قدرت کوره‌های القایی.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [],
    images: [],
    featured: false,
    order: 22,
  },
  {
    slug: "hydraulic-equipment",
    name: "تجهیزات هیدرولیک کوره",
    category: "PERIPHERAL_EQUIPMENT" as const,
    description:
      "هیدرولیک کوره شامل سیلندرها، پمپ‌ها، شیرآلات و قطعات یدکی مربوطه برای سیستم‌های تیلت و جابجایی بوته.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [],
    images: [],
    featured: false,
    order: 23,
  },
  {
    slug: "cooling-tower-parts",
    name: "قطعات برج خنک‌کننده",
    category: "PERIPHERAL_EQUIPMENT" as const,
    description:
      "مبدل حرارتی، قطره‌گیر، الکتروپمپ، فن و بدنه گالوانیزه برج خنک‌کننده مخصوص مدار بسته کوره‌های القایی.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [],
    images: [],
    featured: false,
    order: 24,
  },
  {
    slug: "magnetic-hardener",
    name: "سختی‌گیر مغناطیسی",
    category: "PERIPHERAL_EQUIPMENT" as const,
    description:
      "سختی‌گیر مغناطیسی برای جلوگیری از رسوب‌گذاری در مدار آب خنک‌کننده کویل و خازن‌ها.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [],
    images: [],
    featured: false,
    order: 25,
  },
  {
    slug: "hmi-plc-panel",
    name: "تابلو کنترل HMI و PLC",
    category: "PERIPHERAL_EQUIPMENT" as const,
    description:
      "تابلوهای کنترل مجهز به HMI و PLC برای کنترل دقیق توان، دما، سرعت و تمام پارامترهای کوره القایی.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [],
    images: [],
    featured: false,
    order: 26,
  },
  {
    slug: "power-link",
    name: "لینک قدرت و اتصالات",
    category: "PERIPHERAL_EQUIPMENT" as const,
    description:
      "لینک‌های قدرت و اتصالات استاندارد با کیفیت بالا برای اتصال ایمن بین بخش‌های مختلف سیستم کوره.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [],
    images: [],
    featured: false,
    order: 27,
  },
  {
    slug: "crucible-body",
    name: "بدنه بوته (آلومینیومی / فولادی / استیل)",
    category: "PERIPHERAL_EQUIPMENT" as const,
    description:
      "بدنه بوته در سه نوع اصلی: آلومینیومی، فولادی (یوک) و استیل. طراحی شده برای تحمل دما و تنش‌های مکانیکی بالا.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [],
    images: [],
    featured: false,
    order: 28,
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