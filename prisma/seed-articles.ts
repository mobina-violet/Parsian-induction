import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
  max: 1,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 30_000,
  ssl: { rejectUnauthorized: false },
});

const prisma = new PrismaClient({ adapter });

const articles = [
  {
    slug: "how-induction-melting-furnace-works",
    title: "کوره القایی ذوب چطور کار می‌کند؟",
    excerpt:
      "آشنایی ساده با اصل کار کوره‌های القایی، نقش فرکانس و اهمیت سیستم خنک‌کننده در ذوب فلزات.",
    coverImage: null as string | null,
    published: true,
    publishedAt: new Date("2026-09-28"),
    content: [
      "## اصل کار کوره القایی",
      "کوره القایی برای ذوب فلز از القای الکترومغناطیسی استفاده می‌کند. جریان متناوب از داخل یک سیم‌پیچ مسی عبور می‌کند و میدان مغناطیسی متغیری دور بوته می‌سازد. این میدان در فلز داخل بوته جریان‌های گردابی ایجاد می‌کند و مقاومت خود فلز در برابر این جریان‌ها باعث گرم شدن و ذوب آن می‌شود.",
      "به همین دلیل گرما مستقیم داخل خود فلز تولید می‌شود و از شعله یا المنت به آن منتقل نمی‌شود.",
      "## نقش فرکانس در ذوب",
      "فرکانس کاری روی عمق نفوذ گرما و شدت به‌هم‌خوردن مذاب اثر می‌گذارد. انتخاب فرکانس مناسب به نوع فلز، ظرفیت کوره و نیاز تولید بستگی دارد.",
      "## چرا سیستم خنک‌کننده مهم است؟",
      "سیم‌پیچ کوره هنگام کار جریان زیادی از خود عبور می‌دهد و گرما تولید می‌کند، برای همین آب خنک‌کننده از داخل آن عبور داده می‌شود. اگر جریان یا دمای آب مناسب نباشد، به سیم‌پیچ و تجهیزات برقی آسیب می‌رسد. بررسی منظم سیستم خنک‌کننده بخشی از نگهداری اصولی کوره است.",
      "## انتخاب توان و ظرفیت مناسب",
      "توان و ظرفیت کوره را باید بر اساس مقدار مذاب موردنیاز در هر ساعت و نوع فلز انتخاب کرد. برای راهنمایی دقیق‌تر می‌توانید با کارشناسان ما تماس بگیرید.",
    ].join("\n"),
  },
];

async function main() {
  for (const article of articles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: article,
      create: article,
    });
  }

  console.log(`✅ ${articles.length} مقاله با موفقیت seed شد.`);
}

main()
  .catch((e) => {
    console.error("❌ خطا در اجرای seed مقالات:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());