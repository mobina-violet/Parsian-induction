import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// ⚠️ مشخصات فنی تقریبی هستن. قبل از انتشار نهایی حتماً با اعداد تایید شده مهندسی جایگزین کن.
// این محصولات دیگه به‌صورت جدا وجود ندارن (به «کوره القایی ذوب» ادغام شدن)، پس اول حذف می‌شن:
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
      "کوره‌های القایی ذوب پارسیان با طراحی اینورتر رزونانس موازی، ذوب تمیز و بدون آلودگی فلزات آهنی و غیرآهنی (فولاد، چدن، آلومینیوم و مس) رو با راندمان بالا و کنترل دقیق دما فراهم می‌کنن. این خط تولید از ظرفیت ۲۵۰ کیلوگرم برای کارگاه‌های کوچک تا ۵ تن برای واحدهای صنعتی بزرگ رو پوشش می‌ده؛ کنترل اتوماتیک توان از بار سرد تا ذوب کامل، حفاظت‌های الکترونیکی پیشرفته و مدیریت کامل فرآیند از طریق HMI و PLC از ویژگی‌های مشترک همه‌ی مدل‌هاست. مشخصات نهایی هر ظرفیت بر اساس نوع فلز و نیاز تولید مشتری تنظیم می‌شود.",
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
          "به‌صورت مدار بسته و هوشمند طراحی شده تا دمای آب کویل بوته، تابلوی مبدل فرکانس و بانک خازن رو به‌طور دقیق کنترل کنه. با حفاظت‌های چندگانه، مقاومت الکتریکی و جریان آب رو مانیتور کرده و از آسیب به تجهیزات جلوگیری می‌کنه.",
      },
      {
        title: "سیستم مبدل فرکانس",
        description:
          "تابلو مبدل فرکانس مجهز به PLC و HMI برای کنترل دقیق و ساده‌ی تمام بخش‌های کوره. کاهش حجم مدار فرمان، کاهش مصرف انرژی، کاهش خرابی‌های مکانیکی و عیب‌یابی ساده‌تر از مزایای اصلی اون‌هاست.",
      },
      {
        title: "بوته",
        description:
          "در سه نوع اصلی عرضه می‌شه: بدنه آلومینیومی، بدنه فولادی (یوک) و بدنه استیل. انتخاب نوع بوته بر اساس نوع فلز، ظرفیت ذوب و شرایط کاری انجام می‌شه تا بالاترین راندمان و عمر مفید حاصل بشه.",
      },
      {
        title: "لینک",
        description:
          "لینک‌های قدرت و اتصالات با طراحی استاندارد و کیفیت بالا تولید می‌شن تا انتقال جریان با حداقل تلفات و حداکثر ایمنی انجام بگیره.",
      },
      {
        title: "قطعات و تجهیزات جانبی",
        description:
          "شامل قطعات مصرفی و کنترلی مثل تریستور، مقاومت، خازن، متعلقات مسی و برد الکترونیکی — همه با کیفیت بالا و سازگاری کامل با سیستم پارسیان، برای عملکرد پایدار و طولانی‌مدت کوره.",
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
      "کوره القایی فورج پارسیان با بهره‌گیری از دانش روز دنیا در ساخت کوره‌های فورج کامل و موضعی طراحی شده است. این کوره به عنوان پیش‌گرم‌کن قطعات فلزی قبل از عملیات آهنگری استفاده می‌شود و به دلیل زمان کوتاه حرارت‌دهی، اکسید بسیار کمی روی قطعه ایجاد می‌کند. از مزایای آن می‌توان به اپراتوری آسان، راندمان بالا، کنترل دقیق دما، امکان گرمایش موضعی، اشغال فضای کمتر و سازگاری با محیط زیست اشاره کرد.",
    images: ["/images/products/forging-furnace-1.webp"],
    order: 2,
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
    order: 3,
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
  // محصولاتی که به «کوره القایی ذوب» ادغام شدن رو حذف کن
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