import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// ⚠️ مشخصات فنی (ظرفیت/توان/فرکانس) اینجا فقط placeholder هستن — قبل از انتشار نهایی
// حتماً با مشخصات واقعی مهندسی که کارفرما تایید کرده جایگزینشون کن.
const products = [
  {
    slug: "p250",
    name: "P250",
    category: "MELTING_FURNACE" as const,
    description:
      "کوره القایی ذوب پارسیان مدل P250 مناسب کارگاه‌های کوچک و متوسط تولید قطعات ریخته‌گری، با راندمان بالا و مصرف انرژی بهینه طراحی و ساخته شده است.",
    capacityKg: 250,
    powerKw: 160,
    frequencyHz: 1000,
    images: [],
    featured: false,
    order: 1,
  },
  {
    slug: "p500",
    name: "P500",
    category: "MELTING_FURNACE" as const,
    description:
      "کوره القایی ذوب پارسیان مدل P500، انتخابی مطمئن برای خطوط تولید با ظرفیت ذوب متوسط، با کنترل دقیق دما و پایداری بالا در کار مداوم.",
    capacityKg: 500,
    powerKw: 250,
    frequencyHz: 1000,
    images: [],
    featured: true,
    order: 2,
  },
  {
    slug: "p750",
    name: "P750",
    category: "MELTING_FURNACE" as const,
    description:
      "کوره القایی ذوب پارسیان مدل P750 برای صنایع ریخته‌گری با نیاز به ظرفیت ذوب بالاتر، همراه با سیستم خنک‌کننده و کنترل هوشمند طراحی شده است.",
    capacityKg: 750,
    powerKw: 350,
    frequencyHz: 500,
    images: [],
    featured: false,
    order: 3,
  },
  {
    slug: "p1000",
    name: "P1000",
    category: "MELTING_FURNACE" as const,
    description:
      "کوره القایی ذوب پارسیان مدل P1000، مناسب خطوط تولید صنعتی با نیاز به ذوب حجم بالا در زمان کوتاه، با راندمان انرژی بالا.",
    capacityKg: 1000,
    powerKw: 450,
    frequencyHz: 500,
    images: [],
    featured: true,
    order: 4,
  },
  {
    slug: "p1500",
    name: "P1500",
    category: "MELTING_FURNACE" as const,
    description:
      "کوره القایی ذوب پارسیان مدل P1500 برای کارخانه‌های بزرگ ریخته‌گری فلزات آهنی و غیرآهنی، با ساختار مقاوم و عمر مفید طولانی.",
    capacityKg: 1500,
    powerKw: 630,
    frequencyHz: 250,
    images: [],
    featured: false,
    order: 5,
  },
  {
    slug: "p2000",
    name: "P2000",
    category: "MELTING_FURNACE" as const,
    description:
      "کوره القایی ذوب پارسیان مدل P2000، بزرگ‌ترین مدل خط تولید، مخصوص واحدهای صنعتی با نیاز به ظرفیت ذوب بسیار بالا و تولید انبوه.",
    capacityKg: 2000,
    powerKw: 800,
    frequencyHz: 250,
    images: [],
    featured: false,
    order: 6,
  },
  {
    slug: "forging-furnace",
    name: "کوره القایی فورج",
    category: "FORGING_FURNACE" as const,
    description:
      "کوره القایی پارسیان با بکارگیری دانش روز دنیا، در ساخت کوره های فورج کامل و موضعی، گام های بلندی برداشته است. یکی از کاربردهای کوره القایی، استفاده از آنها به عنوان کوره پیشگرم میباشد. در مواردی که لازم است قطعات فلزی به درجه حرارتی برسند که جهت انجام عملیات آهنگری مناسب باشند، از این نوع کوره ها استفاده می شود. مزایای زیادی باعث می شود که در بسیاری از موارد استفاده کوره القایی پیشگرم در اولویت قرار گیرد.این مزایا شامل اپراتوری آسان و راحت، عدم ایجاد اکسید روی قطعه بار به علت کمبود زمان فرمان حرارت دهی، بالا بودن راندمان، عدم تغییر آلودگی محیط زیست، امکان گرمایش موضعی، اختلاف دما بین سطح و مرکز قطعه، کاهش آلودگی و افزایش ایمنی محیط کار، یکنواختی گرمایش قطعات در فرآیند تولید انبوه، و سادگی عمل تغذیه و تخلیه میباشد.",
    images: [],
    order: 7,
  },
  {
    slug: "hardening-furnace",
    name: "کوره القایی سخت‌کاری",
    category: "HARDENING_FURNACE" as const,
    description:
      "در بعضی از صنایع برای این که فلزات به خصوصیات فیزیکی و عملکردی قابل قبول برسند، باید بر روی آنها عملیات حرارتی انجام گیرد. عملیات گرمایش فلزات یکی از شاخه های متالورژی است که در صنعت دارای اهمیت بسزایی است. کوره القایی ساختکاری پارسیان با قابلیت کنترل دما در عمق نفوذ مورد نظر، با تأثیر در ساختار کریستالی فلزات به عنوان ابزاری کارآمد در اختیار مهندسی متالورژی قرار دارد.",
    images: [],
    order: 8,
  },
  {
    slug: "cooling-system",
    name: "سیستم خنک‌کننده",
    category: "COOLING_SYSTEM" as const,
    description:
      "برج خنک کننده گالوانیزه به نوعی از برج خنک کننده می گویند که بدنه و سازه ی آن از جنس فلزات گالوانیزه ساخته شده باشد. مهم‌ترین مشکل در برج خنک کننده گالوانیزه خوردگی و زنگ زدگی فلز می باشد. این برج ها معمولاً به صورت برج خنک کننده مکعبی، جریان مخالف و جریان متقاطع ساخته می شوند. در اکثر مواقع فن سانتریفیوژ در محیط ورود هوا قرار دارد و جریان اجباری به وجود می آورد.",
    images: [],
    order: 9,
  },
  {
    slug: "frequency-converter",
    name: "سیستم مبدل فرکانس",
    category: "FREQUENCY_CONVERTER" as const,
    description: "سیستم‌های مبدل فرکانس مخصوص کوره‌های القایی.",
    images: [],
    order: 10,
  },
  {
    slug: "crucible",
    name: "بوته",
    category: "CRUCIBLE" as const,
    description:
      "انواع بوته های کوره القایی پارسیان شامل بوته با بدنه آلومینیومی، بوته با بدنه فولادی، بوته با بدنه استیل می باشد.",
    images: [],
    order: 11,
  },
  {
    slug: "link",
    name: "لینک",
    category: "LINK" as const,
    description: "لینک‌های قدرت و اتصالات مربوط به کوره القایی.",
    images: [],
    order: 12,
  },
  {
    slug: "peripheral-equipment",
    name: "قطعات و تجهیزات جانبی",
    category: "PERIPHERAL_EQUIPMENT" as const,
    description: "...",
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
    image: "/images/projects/placeholder-project.webp",
    featured: true,
    order: 1,
    completedAt: new Date("2023-11-01"),
  },
  {
    slug: "sarcheshmeh-copper",
    title: "کارخانه مس سرچشمه",
    industry: "COPPER" as const,
    capacityKg: 1000,
    image: "/images/projects/placeholder-project.webp",
    featured: true,
    order: 2,
    completedAt: new Date("2022-04-01"),
  },
  {
    slug: "aluminum-smelter-arak",
    title: "کارخانه ذوب آلومینیوم اراک",
    industry: "ALUMINUM" as const,
    capacityKg: 1500,
    image: "/images/projects/placeholder-project.webp",
    featured: true,
    order: 3,
    completedAt: new Date("2024-06-01"),
  },
  {
    slug: "pars-khodro-metal",
    title: "صنایع فلزی پارس خودرو",
    industry: "AUTOMOTIVE" as const,
    capacityKg: 750,
    image: "/images/projects/placeholder-project.webp",
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