import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Prisma } from "@/lib/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
  max: 1,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 30_000,
  ssl: { rejectUnauthorized: false },
});

const prisma = new PrismaClient({ adapter });

const staleProductSlugs = [
  "p250",
  "p500",
  "p750",
  "p1000",
  "p1500",
  "p2000",
  "frequency-converter",
  "crucible",
  "link",
];

// ========== کوره‌ها ==========
const furnaces: Prisma.ProductCreateInput[] = [
  {
    slug: "melting-furnace",
    name: "کوره القایی ذوب",
    category: "MELTING_FURNACE",
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
    category: "FORGING_FURNACE",
    description:
      "کوره‌های القایی پیش‌گرم (فورج) ساخت شرکت کوره القایی پارسیان پرتوالوند بر اساس سفارش مشتری، توان مورد نیاز و نوع کاربری طراحی و ساخته می‌شوند. این کوره‌ها با دانش روز و سال‌ها تجربه، قطعات فلزی رو تا دمای مشخص پیش‌گرم می‌کنند تا آماده عملیات فورج شوند. مزایای اصلی: اپراتوری بسیار ساده، عدم ایجاد اکسید روی قطعه به دلیل زمان کوتاه حرارت‌دهی، شروع به کار سریع، راندمان بالا، کنترل دقیق دما، اشغال فضای کمتر و قابلیت اتوماسیون با خط تولید.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [
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
    ],
    featured: false,
    order: 2,
  },
  {
    slug: "forming-furnace",
    name: "کوره القایی فورمینگ",
    category: "FORMING_FURNACE",
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
    order: 3,
  },
  {
    slug: "hardening-furnace",
    name: "کوره القایی سخت‌کاری",
    category: "HARDENING_FURNACE",
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
    order: 4,
  },
];

// ========== لوازم یدکی (SPARE_PARTS) ==========
const spareParts: Prisma.ProductCreateInput[] = [
  {
    slug: "phase-control-thyristor",
    name: "تریستور کنترل فاز",
    category: "SPARE_PARTS",
    subCategory: "thyristor",
    description:
      "تریستور کنترل فاز (Phase Control Thyristor) رایج‌ترین نوع تریستور برای کنترل توان در مدارهای قدرت است. این تریستورها معمولاً در فرکانس خط (۵۰/۶۰ هرتز) کار می‌کنند و با کموتاسیون طبیعی خاموش می‌شوند. زمان خاموشی آن‌ها در محدوده ۵۰ تا ۱۰۰ میکروثانیه است و برای کلیدزنی در سرعت‌های پایین مناسب هستند. نام‌های دیگر این محصول تریستور مبدل (Converter Thyristor) و یکسوکننده کنترل‌شده سیلیکونی (SCR) می‌باشد. تریستورهای کنترل فاز در رکتیفایرها، دستگاه‌های جوش، شارژرها، منابع تغذیه و کوره‌های القایی به‌طور گسترده استفاده می‌شوند.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [],
    images: ["/images/services/phase-control-thyristor.webp"],
    featured: false,
    order: 10,
  },
  {
    slug: "fast-switching-thyristor",
    name: "تریستور فست (Fast Switching)",
    category: "SPARE_PARTS",
    subCategory: "thyristor",
    description:
      "تریستور فست یا Fast Switching Thyristor یک قطعه نیمه‌هادی با سرعت عملکرد بسیار بالا است. این تریستور با نام Thyristor Inverter نیز شناخته می‌شود و قابلیت کار در فرکانس‌های ۵۰۰ تا ۱۰۰۰۰ هرتز را دارد. به همین دلیل برای تجهیزات فرکانس متوسط و سیستم‌های اینورتر بسیار مناسب است. تریستورهای فست معمولاً از نوع کپسولی (دیسکی) هستند. در برند وست‌کد (Westcode) معمولاً با کد R و در برند تکسم (Tecsem) با کد KK شروع می‌شوند. زمان خاموشی بسیار کوتاه این تریستورها باعث می‌شود در مدارهای قدرت کوره‌های القایی با راندمان بالا عمل کنند.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [],
    images: ["/images/services/fast-switching-thyristor.webp"],
    featured: false,
    order: 11,
  },
  {
    slug: "high-frequency-thyristor",
    name: "تریستور فرکانس بالا (High Frequency)",
    category: "SPARE_PARTS",
    subCategory: "thyristor",
    description:
      "تریستور فرکانس بالا (High Frequency Thyristor) برای سیستم‌های اینورتر با فرکانس کاری بالا طراحی شده است. این تریستورها دارای زمان سوئیچینگ سریع و زمان خاموشی بسیار کوتاه هستند و در کوره‌های القایی فرکانس متوسط و بالا، اینورترهای قدرت و مدارهای رزونانس استفاده می‌شوند. عملکرد پایدار در فرکانس‌های بالا، تلفات کم و قابلیت اطمینان بالا از ویژگی‌های اصلی این محصول است.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [],
    images: ["/images/services/high-frequency-thyristor.webp"],
    featured: false,
    order: 12,
  },
  {
    slug: "rectifier-diode",
    name: "دیود یکسوساز (Rectifier Diode)",
    category: "SPARE_PARTS",
    subCategory: "diode",
    description:
      "دیود یکسوساز قدرت (Rectifier Diode) از نوع دیسکی (کپسولی) برای مدارهای یکسوسازی تابلوهای مبدل فرکانس کوره‌های القایی. این دیودها تحمل جریان و ولتاژ بسیار بالا دارند و در رکتیفایرها، منابع تغذیه صنعتی، دستگاه‌های جوش و کوره‌های القایی کاربرد گسترده‌ای دارند.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [],
    images: ["/images/services/rectifier-diode.webp"],
    featured: false,
    order: 13,
  },
  {
    slug: "fast-recovery-diode",
    name: "دیود Fast Recovery",
    category: "SPARE_PARTS",
    subCategory: "diode",
    description:
      "دیود Fast Recovery با زمان بازیابی بسیار سریع برای مدارهای حفاظتی، اسنابر و یکسوسازی فرکانس بالا. این دیودها در تابلوهای مبدل فرکانس کوره‌های القایی، اینورترها و مدارهای قدرت با سوئیچینگ سریع استفاده می‌شوند و تلفات سوئیچینگ را به حداقل می‌رسانند.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [],
    images: ["/images/services/fast-recovery-diode.webp"],
    featured: false,
    order: 14,
  },
  {
    slug: "thyristor-module",
    name: "ماژول تریستوری",
    category: "SPARE_PARTS",
    subCategory: "module",
    description:
      "ماژول تریستوری آماده نصب با طراحی فشرده، تحمل جریان بالا و نصب آسان روی هیت‌سینک. مناسب تابلوهای مبدل فرکانس کوره‌های القایی.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [],
    images: ["/images/services/thyristor-module.webp"],
    featured: false,
    order: 15,
  },
  {
    slug: "diode-module",
    name: "ماژول دیودی",
    category: "SPARE_PARTS",
    subCategory: "module",
    description:
      "ماژول دیودی قدرت مناسب مدارهای یکسوسازی و پل دیودی در تابلوهای مبدل فرکانس کوره‌های القایی.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [],
    images: ["/images/services/diode-module.webp"],
    featured: false,
    order: 16,
  },
  {
    slug: "igbt-module",
    name: "ماژول IGBT",
    category: "SPARE_PARTS",
    subCategory: "igbt",
    description:
      "ماژول IGBT صنعتی با تلفات کم و سرعت سوئیچینگ بالا، مناسب اینورترهای مدرن کوره‌های القایی و سیستم‌های قدرت پیشرفته.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [],
    images: ["/images/services/igbt-module.webp"],
    featured: false,
    order: 17,
  },
  {
    slug: "capacitor",
    name: "خازن ",
    category: "SPARE_PARTS",
    subCategory: "capacitor",
    description:
      "خازن آب‌خنک قدرت با تحمل جریان بسیار بالا برای بانک خازن کوره‌های القایی و مدارهای رزونانس. طراحی آب‌خنک باعث عملکرد پایدار در توان‌های بالا می‌شود.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [],
    images: [
      "/images/services/capacitor1.webp",
      "/images/services/capacitor2.webp",
      "/images/services/capacitor3.webp",
    ],
    featured: false,
    order: 18,
  },
  {
    slug: "snubber-capacitor",
    name: "خازن اسنابر (Snubber Capacitor)",
    category: "SPARE_PARTS",
    subCategory: "capacitor",
    description:
      "خازن اسنابر قدرت برای جذب و کنترل ولتاژهای گذرا و Spike ناشی از کلیدزنی در مدارهای قدرت. این خازن در مدارهای اسنابر تریستور و IGBT، مدارهای اینورتر و تابلوهای مبدل فرکانس کوره‌های القایی استفاده می‌شود و با کاهش dv/dt و محدود کردن اضافه‌ولتاژهای لحظه‌ای، از قطعات نیمه‌هادی قدرت محافظت می‌کند. خازن‌های اسنابر با توجه به فرکانس کاری، ولتاژ، جریان و انرژی مدار انتخاب می‌شوند.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [],
    images: [
      "/images/services/snubber-capacitor-1.webp",
      "/images/services/snubber-capacitor-2.webp",
      "/images/services/snubber-capacitor-3.webp",
      "/images/services/snubber-capacitor-4.webp",
    ],
    featured: false,
    order: 19,
  },

  {
    slug: "power-fuse",
    name: "فیوز قدرت",
    category: "SPARE_PARTS",
    subCategory: "fuse",
    description:
      "فیوز قدرت با قطع سریع و تحمل جریان بالا برای حفاظت مدارهای قدرت کوره‌های القایی.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [],
    images: [
      "/images/services/power-fuse-1.webp",
      "/images/services/power-fuse-2.webp",
    ],
    featured: false,
    order: 20,
  },
  {
    slug: "control-board-1",
    name: "برد کنترل  MPU11",
    category: "SPARE_PARTS",
    subCategory: "board",
    description:
      "برد کنترل و درایور اختصاصی پارسیان، سازگار با تابلوهای مبدل فرکانس و دارای حفاظت‌های کامل.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [],
    images: ["/images/services/control-board-1.webp"],
    featured: false,
    order: 21,
  },
  {
    slug: "control-board-2",
    name: "برد کنترل",
    category: "SPARE_PARTS",
    subCategory: "board",
    description:
      "برد کنترل و درایور اختصاصی پارسیان، سازگار با تابلوهای مبدل فرکانس و دارای حفاظت‌های کامل.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [],
    images: [
      "/images/services/control-board-2.webp",
      "/images/services/control-board-3.webp",
      "/images/services/control-board-4.webp",
    ],
    featured: false,
    order: 22,
  },
  {
    slug: "control-board-3",
    name: "برد کنترل",
    category: "SPARE_PARTS",
    subCategory: "board",
    description:
      "برد کنترل و درایور اختصاصی پارسیان، سازگار با تابلوهای مبدل فرکانس و دارای حفاظت‌های کامل.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [],
    images: [
      "/images/services/control-board-2.webp",
      "/images/services/control-board-3.webp",
      "/images/services/control-board-4.webp",
    ],
    featured: false,
    order: 23,
  },
  {
    slug: "control-board-4",
    name: "برد کنترل",
    category: "SPARE_PARTS",
    subCategory: "board",
    description:
      "برد کنترل و درایور اختصاصی پارسیان، سازگار با تابلوهای مبدل فرکانس و دارای حفاظت‌های کامل.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [],
    images: [
      "/images/services/control-board-2.webp",
      "/images/services/control-board-3.webp",
      "/images/services/control-board-4.webp",
    ],
    featured: false,
    order: 24,
  },
  {
    slug: "copper-coil",
    name: "کویل مسی",
    category: "SPARE_PARTS",
    subCategory: "coil",
    description:
      "کویل مسی با خلوص بالا و طراحی دقیق بر اساس توان و فرکانس کوره برای حداکثر راندمان.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [],
    images: [
      "/images/services/copper-coil-1.webp",
      "/images/services/copper-coil-2.webp",
      "/images/services/copper-coil-3.webp",
      "/images/services/copper-coil-4.webp",
    ],
    featured: false,
    order: 25,
  },

  {
    slug: "snubber_resistor",
    name: "مقاومت هیت سینک دار",
    category: "SPARE_PARTS",
    subCategory: "resistor",
    description:
      "مقاومت قدرت آب‌خنک با تحمل توان بالا برای مدارهای دشارژ، اسنابر و محدودکننده جریان در تابلوهای قدرت.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [],
    images: [
      "/images/services/snubber-resistor-1.webp",
      "/images/services/snubber-resistor-2.webp",
    ],
    featured: false,
    order: 26,
  },
  {
    slug: "bobbin-choke",
    name: "بوبین چوک",
    category: "SPARE_PARTS",
    subCategory: "choke",
    description:
      "بوبین چوک یک سیم‌پیچ القایی روی هسته مغناطیسی است که در مدار کوره القایی برای محدود کردن جریان، کاهش هارمونیک‌ها و محافظت در برابر نوسانات ناگهانی به کار می‌رود. در توان‌های بالا از طراحی آب‌خنک استفاده می‌شود تا حرارت به‌خوبی منتقل شود، دما کنترل گردد و عملکرد پایدار و طولانی‌مدت تضمین شود.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [],
    images: [
      "/images/services/bobbin-choke1.webp",
      "/images/services/bobbin-choke2.webp",
    ],
    featured: false,
    order: 27,
  },
];

// ========== خدمات و تجهیزات (SERVICE_EQUIPMENT) ==========
const serviceEquipment: Prisma.ProductCreateInput[] = [
  {
    slug: "cooling-system",
    name: "سیستم خنک‌کننده",
    category: "SERVICE_EQUIPMENT",
    subCategory: "cooling",
    description:
      "سیستم خنک‌کننده مدار بسته کامل شامل مبدل حرارتی، برج خنک‌کننده، پمپ‌ها، فن و کنترل دما برای کوره‌های القایی.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [],
    images: [
      "/images/services/cooling-system-1.webp",
      "/images/services/cooling-system-2.webp",
      "/images/services/cooling-system-3.webp",
      "/images/services/cooling-system-4.webp",
      "/images/services/cooling-system-5.webp",
    ],
    featured: false,
    order: 40,
  },
  {
    slug: "cable-connections",
    name: "کابل و اتصالات",
    category: "SERVICE_EQUIPMENT",
    subCategory: "cable",
    description:
      "کابل آب و برق ویژه انتقال قدرت الکتریکی از لوله‌های مسی به سر کویل القایی است.این کابل همزمان جریان الکتریکی بالا را منتقل می‌کند و با گردش آب داخل خود، حرارت ناشی از جریان سنگین را دفع می‌نماید تا عملکرد پایدار و ایمن در کوره‌های القایی توان بالا تضمین شود.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [],
    images: [
      "/images/services/cable-connections_1.webp",
      "/images/services/cable-connections_2.webp",
    ],
    featured: false,
    order: 45,
  },
  {
    slug: "current-transformer",
    name: " اندازه‌گیری دستگاه ",
    category: "SERVICE_EQUIPMENT",
    subCategory: "control_measurement",
    description:
      "در کوره‌های القایی برای کنترل دقیق فرآیند ذوب و ایمنی سیستم، از چندین دستگاه و سنسور اندازه‌گیری استفاده می‌شود.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [],
    images: [
      "/images/services/current-transformer1.webp",
      "/images/services/current-transformer2.webp",
    ],
    featured: false,
    order: 48,
  },
  {
    slug: "crucible-body",
    name: "بدنه بوته",
    category: "SERVICE_EQUIPMENT",
    subCategory: "crucible",
    description:
      "بدنه بوته در انواع آلومینیومی، فولادی (یوک) و استیل با طراحی مقاوم و عمر بالا.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [],
    images: [
      "/images/services/crucible-body-1.webp",
      "/images/services/crucible-body-2.webp",
    ],
    featured: false,
    order: 51,
  },
  {
    slug: "hydraulic-parts",
    name: "تجهیزات هیدرولیک",
    category: "SERVICE_EQUIPMENT",
    subCategory: "hydraulic",
    description:
      "سیلندر، پمپ، شیرآلات و اتصالات سیستم هیدرولیک برای تیلت و جابجایی بوته.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [],
    images: [
      "/images/services/hydraulic-parts1.webp",
      "/images/services/hydraulic-parts2.webp",
      "/images/services/hydraulic-parts3.webp",
      "/images/services/hydraulic-parts4.webp",
    ],
    featured: false,
    order: 53,
  },
  {
    slug: "changeover-switch",
    name: "کلید چنج",
    category: "SERVICE_EQUIPMENT",
    subCategory: "changeover",
    description:
      "کلید چنج یا سوئیچ انتخاب بوته در کوره القایی برای تغییر سریع وضعیت و اتصال منبع تغذیه به بوته‌های مختلف استفاده می‌شود. این کلید امکان تعویض سریع بوته را فراهم می‌کند تا زمان توقف کوره کاهش یابد و بهره‌وری تولید افزایش پیدا کند.",
    capacityKg: null,
    powerKw: null,
    frequencyHz: null,
    variants: [],
    components: [],
    images: ["/images/services/changeover-switch_1.webp"],
    featured: false,
    order: 54,
  },
];
const products = [...furnaces, ...spareParts, ...serviceEquipment];

function assertUniqueSlugs(items: { slug: string }[]) {
  const seen = new Set<string>();
  for (const item of items) {
    if (seen.has(item.slug)) {
      throw new Error(`❌ اسلاگ تکراری پیدا شد: "${item.slug}"`);
    }
    seen.add(item.slug);
  }
}
async function main() {
  assertUniqueSlugs(products);

  const currentSlugs = products.map((p) => p.slug);

  try {
    const deleted = await prisma.product.deleteMany({
      where: { slug: { notIn: currentSlugs } },
    });
    if (deleted.count > 0) {
      console.log(
        `🗑️  ${deleted.count} محصول قدیمی/اضافه (که دیگه توی کد نیست) پاک شد.`,
      );
    }
  } catch (err) {
    console.warn("⚠️ حذف محصولات منسوخ انجام نشد، ادامه می‌دهیم...", err);
  }

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }

  console.log(`✅ ${products.length} محصول با موفقیت seed شد.`);
}
main()
  .catch((e) => {
    console.error("❌ خطا در اجرای seed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
