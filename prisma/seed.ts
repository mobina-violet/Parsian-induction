import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// ⚠️ مشخصات فنی تقریبی هستن. قبل از انتشار نهایی حتماً با اعداد تایید شده مهندسی جایگزین کن.
const products = [
  {
    slug: "p250",
    name: "P250",
    category: "MELTING_FURNACE" as const,
    description:
      "کوره القایی ذوب پارسیان مدل P250 مناسب کارگاه‌های کوچک و متوسط ریخته‌گری است. با طراحی اینورتر رزونانس موازی، ذوب تمیز و بدون آلودگی فلزات آهنی و غیرآهنی را با راندمان بالا و کنترل دقیق دما فراهم می‌کند. مشخصات نهایی توان و فرکانس بر اساس نوع فلز و نیاز تولید مشتری تنظیم می‌شود.",
    capacityKg: 250,
    powerKw: 150,
    frequencyHz: 1500,
    images: [],
    featured: false,
    order: 1,
  },
  {
    slug: "p500",
    name: "P500",
    category: "MELTING_FURNACE" as const,
    description:
      "کوره القایی ذوب پارسیان مدل P500 انتخابی مطمئن برای خطوط تولید با ظرفیت متوسط است. دارای کنترل دقیق دما، پایداری بالا در کار مداوم و مصرف انرژی بهینه بوده و برای ذوب فولاد، چدن، آلومینیوم و مس مناسب است. مشخصات نهایی توان و فرکانس بر اساس نوع فلز و نیاز تولید مشتری تنظیم می‌شود.",
    capacityKg: 500,
    powerKw: 250,
    frequencyHz: 1300,
    images: [],
    featured: true,
    order: 2,
  },
  {
    slug: "p750",
    name: "P750",
    category: "MELTING_FURNACE" as const,
    description:
      "کوره القایی ذوب پارسیان مدل P750 برای صنایع ریخته‌گری با نیاز به ظرفیت بالاتر طراحی شده است. مجهز به سیستم خنک‌کننده هوشمند و کنترل کامل فرآیند ذوب از طریق HMI و PLC می‌باشد. مشخصات نهایی توان و فرکانس بر اساس نوع فلز و نیاز تولید مشتری تنظیم می‌شود.",
    capacityKg: 750,
    powerKw: 350,
    frequencyHz: 1000,
    images: [],
    featured: false,
    order: 3,
  },
  {
    slug: "p1000",
    name: "P1000",
    category: "MELTING_FURNACE" as const,
    description:
      "کوره القایی ذوب پارسیان مدل P1000 مناسب خطوط تولید صنعتی با نیاز به ذوب حجم بالا در زمان کوتاه است. راندمان انرژی بالا، کنترل اتوماتیک توان از بار سرد تا ذوب کامل و حفاظت‌های الکترونیکی پیشرفته از ویژگی‌های این مدل است. مشخصات نهایی توان و فرکانس بر اساس نوع فلز و نیاز تولید مشتری تنظیم می‌شود.",
    capacityKg: 1000,
    powerKw: 500,
    frequencyHz: 900,
    images: [],
    featured: true,
    order: 4,
  },
  {
    slug: "p1500",
    name: "P1500",
    category: "MELTING_FURNACE" as const,
    description:
      "کوره القایی ذوب پارسیان مدل P1500 برای کارخانه‌های بزرگ ریخته‌گری فلزات آهنی و غیرآهنی طراحی شده است. ساختار مقاوم، عمر مفید طولانی و قابلیت کار مداوم در شرایط صنعتی سنگین از مزایای اصلی این مدل محسوب می‌شود. مشخصات نهایی توان و فرکانس بر اساس نوع فلز و نیاز تولید مشتری تنظیم می‌شود.",
    capacityKg: 1500,
    powerKw: 750,
    frequencyHz: 600,
    images: [],
    featured: false,
    order: 5,
  },
  {
    slug: "p2000",
    name: "P2000",
    category: "MELTING_FURNACE" as const,
    description:
      "کوره القایی ذوب پارسیان مدل P2000 بزرگ‌ترین مدل خط تولید، مخصوص واحدهای صنعتی با نیاز به ظرفیت ذوب بسیار بالا و تولید انبوه است. با کنترل هوشمند PLC و HMI، راندمان بالا و مصرف برق بهینه ارائه می‌شود. مشخصات نهایی توان و فرکانس بر اساس نوع فلز و نیاز تولید مشتری تنظیم می‌شود.",
    capacityKg: 2000,
    powerKw: 1000,
    frequencyHz: 500,
    images: [],
    featured: false,
    order: 6,
  },
  {
    slug: "forging-furnace",
    name: "کوره القایی فورج",
    category: "FORGING_FURNACE" as const,
    description:
      "کوره القایی فورج پارسیان با بهره‌گیری از دانش روز دنیا در ساخت کوره‌های فورج کامل و موضعی طراحی شده است. این کوره به عنوان پیش‌گرم‌کن قطعات فلزی قبل از عملیات آهنگری استفاده می‌شود و به دلیل زمان کوتاه حرارت‌دهی، اکسید بسیار کمی روی قطعه ایجاد می‌کند. از مزایای آن می‌توان به اپراتوری آسان، راندمان بالا، کنترل دقیق دما، امکان گرمایش موضعی، اشغال فضای کمتر و سازگاری با محیط زیست اشاره کرد.",
    images: ["/images/products/forging-furnace-1.webp"],
    order: 7,
  },
  {
    slug: "hardening-furnace",
    name: "کوره القایی سخت‌کاری",
    category: "HARDENING_FURNACE" as const,
    description:
      "کوره القایی سخت‌کاری پارسیان برای انجام عملیات حرارتی دقیق روی قطعات فلزی طراحی شده است. با قابلیت کنترل دما در عمق نفوذ مورد نظر و تأثیرگذاری بر ساختار کریستالی فلز، ابزاری کارآمد در اختیار مهندسین متالورژی قرار می‌دهد. کنترل توان، سرعت حرکت خطی و دورانی قطعه، برنامه‌ریزی عملیات کوئنچ و مانیتورینگ موقعیت اینداکتور همگی از طریق HMI انجام می‌شود. کاربردهای رایج شامل محورها، یاتاقان‌ها، میل‌بادامک، پین‌ها، پیستون‌ها، بوش سیلندر، چرخ‌دنده‌ها، شفت‌ها و میل‌لنگ است.",
    images: [
      "/images/products/hardening-furnace-1.webp",
      "/images/products/hardening-furnace-2.webp",
      "/images/products/hardening-furnace-3.webp",
      "/images/products/hardening-furnace-4.webp",
    ],
    order: 8,
  },
  {
    slug: "cooling-system",
    name: "سیستم خنک‌کننده",
    category: "COOLING_SYSTEM" as const,
    description:
      "سیستم خنک‌کننده پارسیان به‌صورت مدار بسته و هوشمند طراحی شده است تا دمای آب کویل بوته‌ها، تابلوی مبدل فرکانس و بانک خازن را به‌طور دقیق کنترل کند. این سیستم با حفاظت‌های چندگانه آب، کاهش مقاومت الکتریکی و جریان آب را مانیتور کرده و از آسیب به تجهیزات جلوگیری می‌کند. طراحی فشرده و راندمان بالا، فضای کمتری نسبت به سیستم‌های سنتی اشغال می‌کند.",
    images: [],
    order: 9,
  },
  {
    slug: "frequency-converter",
    name: "سیستم مبدل فرکانس",
    category: "FREQUENCY_CONVERTER" as const,
    description:
      "تابلو مبدل فرکانس پارسیان مجهز به PLC و HMI است تا کنترل تمامی بخش‌های کوره با دقت و سهولت انجام شود. استفاده از PLC باعث کاهش حجم مدار فرمان، کاهش مصرف انرژی، کاهش خرابی‌های مکانیکی و ساده‌تر شدن عیب‌یابی می‌گردد. این سیستم امکان برنامه‌ریزی منطقی، مانیتورینگ خطاها و انتخاب زبان فارسی را فراهم کرده و در مقایسه با سیستم‌های رله و کنتاکتور، فضای کمتر، سیم‌کشی کمتر و قابلیت توسعه بالاتری دارد.",
    images: [
      "/images/products/frequency-converter-1.webp",
      "/images/products/frequency-converter-2.webp",
      "/images/products/frequency-converter-3.webp",
    ],
    order: 10,
  },
  {
    slug: "crucible",
    name: "بوته",
    category: "CRUCIBLE" as const,
    description:
      "بوته‌های کوره القایی پارسیان در سه نوع اصلی عرضه می‌شوند: بوته با بدنه آلومینیومی، بوته با بدنه فولادی (یوک) و بوته با بدنه استیل. انتخاب نوع بوته بر اساس نوع فلز، ظرفیت ذوب و شرایط کاری انجام می‌شود تا بالاترین راندمان و عمر مفید حاصل گردد.",
    images: [],
    order: 11,
  },
  {
    slug: "link",
    name: "لینک",
    category: "LINK" as const,
    description:
      "لینک‌های قدرت و اتصالات مخصوص کوره‌های القایی پارسیان با طراحی استاندارد و کیفیت بالا تولید می‌شوند تا انتقال جریان با حداقل تلفات و حداکثر ایمنی انجام گیرد.",
    images: [],
    order: 12,
  },
  {
    slug: "peripheral-equipment",
    name: "قطعات و تجهیزات جانبی",
    category: "PERIPHERAL_EQUIPMENT" as const,
    description:
      "تجهیزات جانبی کوره‌های القایی پارسیان شامل قطعات مصرفی و کنترلی مانند تریستور، مقاومت، خازن، متعلقات مسی و برد الکترونیکی پارسیان است. این قطعات با کیفیت بالا و سازگاری کامل با سیستم‌های پارسیان عرضه می‌شوند تا عملکرد پایدار و طولانی‌مدت کوره تضمین گردد.",
    images: [],
    order: 13,
  },
];

const projects = [
  {
    slug: "khouzestan-steel-complex",
    title: "مجتمع فولاد خوزستان",
    industry: "STEEL" as const,
    capacityKg: 2000,
    image: "/images/projects/project1.webp",
    featured: true,
    order: 1,
    completedAt: new Date("2023-11-01"),
  },
  {
    slug: "sarcheshmeh-copper",
    title: "کارخانه مس سرچشمه",
    industry: "COPPER" as const,
    capacityKg: 1000,
    image: "/images/projects/project2.webp",
    featured: true,
    order: 2,
    completedAt: new Date("2022-04-01"),
  },
  {
    slug: "aluminum-smelter-arak",
    title: "کارخانه ذوب آلومینیوم اراک",
    industry: "ALUMINUM" as const,
    capacityKg: 1500,
    image: "/images/projects/project3.webp",
    featured: true,
    order: 3,
    completedAt: new Date("2024-06-01"),
  },
  {
    slug: "pars-khodro-metal",
    title: "صنایع فلزی پارس خودرو",
    industry: "AUTOMOTIVE" as const,
    capacityKg: 750,
    image: "/images/projects/project4.webp",
    featured: true,
    order: 4,
    completedAt: new Date("2022-01-01"),
  },
];

async function main() {
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());