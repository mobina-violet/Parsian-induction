import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/lib/site-config";

const SERVICE_CATEGORIES = new Set(["SPARE_PARTS", "SERVICE_EQUIPMENT"]);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await prisma.product.findMany({
    select: { slug: true, category: true },
  });

  const articles = await prisma.article.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/products`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteConfig.url}/projects`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteConfig.url}/services`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/articles`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteConfig.url}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteConfig.url}/contact`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products
    .filter((p) => !SERVICE_CATEGORIES.has(p.category))
    .map((p) => ({
      url: `${siteConfig.url}/products/${p.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  const serviceRoutes: MetadataRoute.Sitemap = products
    .filter((p) => SERVICE_CATEGORIES.has(p.category))
    .map((p) => ({
      url: `${siteConfig.url}/services/${p.slug}`,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${siteConfig.url}/articles/${a.slug}`,
    lastModified: a.updatedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...productRoutes,
    ...serviceRoutes,
    ...articleRoutes,
  ];
}