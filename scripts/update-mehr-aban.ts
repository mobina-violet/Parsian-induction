/**
 * Run at project root (without editing .env):
 *   node --env-file=.env --import tsx scripts/update-mehr-aban.ts --dry-run
 *   node --env-file=.env --import tsx scripts/update-mehr-aban.ts
 * If your project uses .env.local, use --env-file=.env.local instead.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { prisma } from "../lib/prisma";

const articles = [
  {
    slug: "how-induction-melting-furnace-works",
    title: "کوره القایی ذوب چطور کار می‌کند؟",
    file: "content/mehr.md",
    excerpt: "کوره القایی ذوب چگونه کار می‌کند؟ از کویل و جریان گردابی تا فرکانس، مصرف برق، انتخاب توان و نکات ایمنی را در این راهنمای فنی بخوانید.",
  },
  {
    slug: "induction-furnace-winter-preparation",
    title: "آماده‌سازی کوره القایی برای زمستان",
    file: "content/aban.md",
    excerpt: "راهنمای نگهداری کوره القایی در زمستان؛ جلوگیری از یخ‌زدگی مدار خنک‌کاری، میعان، رطوبت شارژ و مشکلات قطع برق همراه با چک‌لیست.",
  },
] as const;

async function main() {
  const prepared = articles.map((article) => {
    const content = readFileSync(resolve(process.cwd(), article.file), "utf8").trim();
    const links = [...content.matchAll(/\[([^\]]+)\]\(([^)\s]+)\)/g)];
    const questions = content.match(/^### .+$/gm) ?? [];
    if (!content.includes("## پرسش‌های متداول") || questions.length !== 8) {
      throw new Error(`FAQ validation failed: ${article.file}`);
    }
    if (links.length > 3 || links.some((match) => !match[2].startsWith("/"))) {
      throw new Error(`Internal link validation failed: ${article.file}`);
    }
    return { ...article, content, links: links.length, questions: questions.length };
  });

  const existing = await prisma.article.findMany({
    where: { slug: { in: prepared.map((a) => a.slug) } },
    select: { slug: true },
  });
  const existingSlugs = new Set(existing.map((a) => a.slug));
  const missing = prepared.filter((a) => !existingSlugs.has(a.slug));
  if (missing.length) throw new Error(`Existing article not found: ${missing.map((a) => a.slug).join(", ")}. Nothing updated.`);

  for (const a of prepared) console.log(`${a.slug}: ${a.content.length} chars, ${a.links} internal links, ${a.questions} FAQs`);
  if (process.argv.includes("--dry-run")) {
    console.log("Dry run successful. No database changes made.");
    return;
  }

  await prisma.$transaction(prepared.map((a) => prisma.article.update({
    where: { slug: a.slug },
    data: { title: a.title, excerpt: a.excerpt, content: a.content },
  })));
  console.log("Both existing articles updated successfully.");
}

main().catch((error) => { console.error(error); process.exitCode = 1; }).finally(async () => { await prisma.$disconnect(); });
