import "dotenv/config";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
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

// متن مقاله‌ها فقط در content/*.md نگه‌داری می‌شود (تنها منبع حقیقت).
// بعد از ویرایش md کافیه این seed (یا scripts/update-mehr-aban.ts) رو اجرا کنی.
const articles = [
  {
    slug: "how-induction-melting-furnace-works",
    title: "کوره القایی ذوب چطور کار می‌کند؟",
    excerpt:
      "کوره القایی ذوب چگونه کار می‌کند؟ از کویل و جریان گردابی تا فرکانس، مصرف برق، انتخاب توان و نکات ایمنی را در این راهنمای فنی بخوانید.",
    coverImage: "/images/articles/mehr-cover.webp",
    publishedAt: new Date("2026-09-28"),
    file: "content/mehr.md",
  },
  {
    slug: "induction-furnace-winter-preparation",
    title: "آماده‌سازی کوره القایی برای زمستان",
    excerpt:
      "راهنمای نگهداری کوره القایی در زمستان؛ جلوگیری از یخ‌زدگی مدار خنک‌کاری، میعان، رطوبت شارژ و مشکلات قطع برق همراه با چک‌لیست.",
    coverImage: "/images/articles/aban-cover.webp",
    publishedAt: new Date("2026-10-29"),
    file: "content/aban.md",
  },
  {
    slug: "reduce-induction-furnace-power-consumption",
    title: "کاهش مصرف برق کوره القایی؛ راهنمای عملی برای ارزان‌تر شدن هر تن مذاب",
    excerpt:
      "مصرف برق کوره القایی را با kWh بر تن بسنجید؛ تلفات کجاست، شارژ و درپوش و دمای تخلیه چه اثری دارند و چک‌لیست ۸ مرحله‌ای کاهش مصرف.",
    coverImage: "/images/articles/azar-cover.webp",
    publishedAt: new Date("2026-11-22"),
    file: "content/azar.md",
  },
];

function readContent(file: string, coverImage: string) {
  const content = readFileSync(resolve(process.cwd(), file), "utf8").trim();
  const images = [...content.matchAll(/!\[[^\]]*\]\((\/[^)\s]+)\)/g)].map(
    (m) => m[1]
  );
  for (const src of [...images, coverImage]) {
    if (!existsSync(resolve(process.cwd(), "public" + src))) {
      throw new Error(`Image file not found: public${src} (in ${file})`);
    }
  }
  return content;
}

async function main() {
  for (const { file, ...meta } of articles) {
    const data = {
      ...meta,
      content: readContent(file, meta.coverImage),
      published: true,
    };
    await prisma.article.upsert({
      where: { slug: meta.slug },
      update: data,
      create: data,
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
