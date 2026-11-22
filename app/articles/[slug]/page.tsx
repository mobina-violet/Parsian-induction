import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Clock, Calendar, Building2 } from "lucide-react";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ArticleContent } from "@/components/ArticleContent";
import { ArticleCta } from "@/components/ArticleCta";
import { extractFaq, readingMinutes, stripMarkup } from "@/lib/article-markup";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 3600;

const dateFormatter = new Intl.DateTimeFormat("fa-IR", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const numberFormatter = new Intl.NumberFormat("fa-IR");

function absoluteUrl(path: string) {
  return path.startsWith("http") ? path : `${siteConfig.url}${path}`;
}

export async function generateStaticParams() {
  const articles = await prisma.article.findMany({
    where: { published: true },
    select: { slug: true },
  });

  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.article.findUnique({ where: { slug } });

  if (!article || !article.published) {
    return { title: "مقاله یافت نشد" };
  }

  const image = absoluteUrl(article.coverImage || "/og-image.webp");

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/articles/${slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url: `/articles/${slug}`,
      publishedTime: article.publishedAt.toISOString(),
      modifiedTime: article.updatedAt.toISOString(),
      authors: [siteConfig.name],
      images: [{ url: image, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [image],
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const article = await prisma.article.findUnique({ where: { slug } });

  if (!article || !article.published) {
    notFound();
  }

  const related = await prisma.article.findMany({
    where: { published: true, NOT: { slug } },
    orderBy: { publishedAt: "desc" },
    take: 2,
  });

  const url = `${siteConfig.url}/articles/${slug}`;
  const minutes = readingMinutes(article.content);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: absoluteUrl(article.coverImage || "/og-image.webp"),
    datePublished: article.publishedAt.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    inLanguage: "fa",
    mainEntityOfPage: url,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/parsian-logo.webp`,
      },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "خانه", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "مقالات",
        item: `${siteConfig.url}/articles`,
      },
      { "@type": "ListItem", position: 3, name: article.title, item: url },
    ],
  };

  const faqItems = extractFaq(article.content);
  const faqJsonLd =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: stripMarkup(item.a),
            },
          })),
        }
      : null;

  const showUpdated =
    article.updatedAt.getTime() - article.publishedAt.getTime() >
    1000 * 60 * 60 * 24 * 2;

  return (
    <main dir="rtl" className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <div className="border-b border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <nav
            aria-label="مسیر صفحه"
            className="flex items-center gap-1.5 text-xs text-gray-400">
            <Link href="/" className="transition hover:text-orange-500">
              خانه
            </Link>
            <ChevronLeft className="h-3 w-3" />
            <Link href="/articles" className="transition hover:text-orange-500">
              مقالات
            </Link>
            <ChevronLeft className="h-3 w-3" />
            <span className="text-slate-600">{article.title}</span>
          </nav>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
          <Image
            src={
              article.slug === "how-induction-melting-furnace-works"
                ? "/images/articles/mehr-cover.webp"
                : article.slug === "induction-furnace-winter-preparation"
                  ? "/images/articles/aban-cover.webp"
                  : article.coverImage || "/images/placeholder.webp"
            }
            alt={article.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        <h1 className="mt-8 text-2xl font-bold leading-10 text-slate-900 sm:text-3xl">
          {article.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <Building2 className="h-4 w-4 text-orange-500" />
            تهیه‌شده توسط تیم فنی {siteConfig.name}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-orange-500" />
            <time dateTime={article.publishedAt.toISOString()}>
              انتشار: {dateFormatter.format(article.publishedAt)}
            </time>
          </span>
          {showUpdated && (
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-orange-500" />
              <time dateTime={article.updatedAt.toISOString()}>
                به‌روزرسانی: {dateFormatter.format(article.updatedAt)}
              </time>
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-orange-500" />
            زمان مطالعه: {numberFormatter.format(minutes)} دقیقه
          </span>
        </div>

        <div className="mt-8">
          <ArticleContent content={article.content} />
        </div>

        <ArticleCta />

        {related.length > 0 && (
          <section className="mt-14" aria-labelledby="related-articles">
            <h2
              id="related-articles"
              className="text-lg font-bold text-slate-900 sm:text-xl">
              مقالات مرتبط
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/articles/${item.slug}`}
                  className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition hover:border-orange-200 hover:shadow-md">
                  <div className="relative aspect-[16/9] w-full bg-gray-50">
                    <Image
                      src={
                        item.coverImage || "/images/placeholder-project.webp"
                      }
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 360px"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-slate-900 transition group-hover:text-orange-600">
                      {item.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-xs leading-6 text-gray-500">
                      {item.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
