import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const SERVICE_CATEGORIES = new Set(["SPARE_PARTS", "SERVICE_EQUIPMENT"]);

type Suggestion = {
  label: string;
  href: string;
  type: "product" | "service" | "article";
};

function normalize(text: string) {
  return text.replace(/ي/g, "ی").replace(/ك/g, "ک").trim();
}

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

export async function GET(request: Request) {
  const q = normalize(new URL(request.url).searchParams.get("q") ?? "");

  if (q.length < 2) {
    return NextResponse.json({ suggestions: [] });
  }

  const [products, articles] = await Promise.all([
    safe(
      () =>
        prisma.product.findMany({
          where: { name: { contains: q, mode: "insensitive" } },
          select: { name: true, slug: true, category: true },
          orderBy: { order: "asc" },
          take: 6,
        }),
      [],
    ),
    safe(
      () =>
        prisma.article.findMany({
          where: {
            published: true,
            title: { contains: q, mode: "insensitive" },
          },
          select: { title: true, slug: true },
          orderBy: { publishedAt: "desc" },
          take: 3,
        }),
      [],
    ),
  ]);

  const suggestions: Suggestion[] = [
    ...products.map((p) => {
      const isService = SERVICE_CATEGORIES.has(p.category);
      return {
        label: p.name,
        href: isService ? `/services/${p.slug}` : `/products/${p.slug}`,
        type: isService ? ("service" as const) : ("product" as const),
      };
    }),
    ...articles.map((a) => ({
      label: a.title,
      href: `/articles/${a.slug}`,
      type: "article" as const,
    })),
  ];

  return NextResponse.json({ suggestions });
}