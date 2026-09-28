import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ArticleContent } from "@/components/ArticleContent";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 3600;

const dateFormatter = new Intl.DateTimeFormat("fa-IR", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

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
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      publishedTime: article.publishedAt.toISOString(),
      images: [{ url: image, alt: article.title }],
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

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: absoluteUrl(article.coverImage || "/og-image.webp"),
    datePublished: article.publishedAt.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    inLanguage: "fa",
    mainEntityOfPage: `${siteConfig.url}/articles/${slug}`,
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/parsian-logo.webp`,
      },
    },
  };

  return (
    <main dir="rtl" className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <div className="border-b border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-xs text-gray-400">
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
        {article.coverImage && (
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}

        <h1 className="mt-8 text-2xl font-bold leading-10 text-slate-900 sm:text-3xl">
          {article.title}
        </h1>

        <time
          dateTime={article.publishedAt.toISOString()}
          className="mt-3 block text-xs text-gray-400">
          {dateFormatter.format(article.publishedAt)}
        </time>

        <div className="mt-8">
          <ArticleContent content={article.content} />
        </div>

        <div className="mt-12 rounded-2xl border border-orange-100 bg-orange-50 p-6 text-center">
          <p className="text-sm font-bold text-slate-900">
            برای انتخاب کوره یا تجهیزات مناسب، از کارشناسان ما مشاوره بگیرید.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-block rounded-full bg-orange-500 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-orange-600">
            تماس با ما
          </Link>
        </div>
      </article>
    </main>
  );
}