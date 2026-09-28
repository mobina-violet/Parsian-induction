import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "مقالات",
  description:
    "مقالات تخصصی درباره کوره‌های القایی، انتخاب توان و ظرفیت، نگهداری و تجهیزات جانبی از پارسیان پرتو الوند.",
};

const dateFormatter = new Intl.DateTimeFormat("fa-IR", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default async function ArticlesPage() {
  const articles = await prisma.article.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <main dir="rtl" className="bg-white">
      <section className="border-b border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            مقالات
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-500">
            راهنماها و مطالب تخصصی درباره کوره‌های القایی، انتخاب تجهیزات و
            نگهداری از آن‌ها.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {articles.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-gray-200 py-16 text-center text-sm text-gray-400">
            به‌زودی مقالات تخصصی اینجا منتشر می‌شود.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition hover:border-orange-200 hover:shadow-md">
                <div className="relative aspect-[16/10] w-full bg-gray-50">
                  <Image
                    src={article.coverImage || "/images/placeholder-project.webp"}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                <div className="p-5">
                  <time
                    dateTime={article.publishedAt.toISOString()}
                    className="text-xs text-gray-400">
                    {dateFormatter.format(article.publishedAt)}
                  </time>
                  <h2 className="mt-2 text-base font-bold text-slate-900 transition group-hover:text-orange-600">
                    {article.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-xs leading-6 text-gray-500">
                    {article.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}