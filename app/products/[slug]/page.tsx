import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import { cache } from "react";

import { prisma } from "@/lib/prisma";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductDescription } from "@/components/ProductDescription";
import { siteConfig } from "@/lib/site-config";

// ISR: به‌روزرسانی کش صفحات پس از یک ساعت
export const revalidate = 3600;

// امکان نمایش محصولات جدید بدون Build مجدد
export const dynamicParams = true;

// جلوگیری از دریافت تکراری اطلاعات محصول
const getProduct = cache(async (slug: string) => {
  return prisma.product.findUnique({
    where: { slug },
  });
});

const categoryLabels: Record<string, string> = {
  MELTING_FURNACE: "کوره القایی ذوب",
  FORGING_FURNACE: "کوره القایی فورج",
  HARDENING_FURNACE: "کوره القایی سخت‌کاری",
  FORMING_FURNACE: "کوره القایی فورمینگ",
  SPARE_PARTS: "لوازم یدکی و قطعات مصرفی",
  PERIPHERAL_EQUIPMENT: "قطعات و تجهیزات جانبی",
  SERVICE_EQUIPMENT: "تجهیزات خدماتی",
  COOLING_SYSTEM: "سیستم خنک‌کننده",
  FREQUENCY_CONVERTER: "سیستم مبدل فرکانس",
  CRUCIBLE: "بوته",
  LINK: "لینک",
};

type ProductComponent = {
  title: string;
  description: string;
};

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

// جلوگیری از دریافت تمام محصولات هنگام Build
// صفحات در اولین بازدید ساخته و کش می‌شوند
export async function generateStaticParams() {
  return [];
}

// تبدیل مسیر تصویر به آدرس کامل
function getAbsoluteImageUrl(image: string) {
  if (
    image.startsWith("https://") ||
    image.startsWith("http://")
  ) {
    return image;
  }

  return new URL(image, siteConfig.url).toString();
}

// تنظیمات SEO اختصاصی هر محصول
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;

  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "محصول یافت نشد",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = product.name;

  const description =
    product.description?.slice(0, 160) ||
    `${title} — ${
      categoryLabels[product.category] ?? ""
    } پارسیان پرتو الوند.`;

  const image =
    product.images[0] ??
    "/images/placeholder-furnace.webp";

  const imageUrl = getAbsoluteImageUrl(image);

  const productUrl = new URL(
    `/products/${slug}`,
    siteConfig.url
  ).toString();

  return {
    title,
    description,

    alternates: {
      canonical: productUrl,
    },

    openGraph: {
      type: "website",
      locale: "fa_IR",
      siteName: siteConfig.name,
      url: productUrl,
      title,
      description,

      images: [
        {
          url: imageUrl,
          alt: product.name,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

// صفحه جزئیات محصول
export default async function ProductDetailPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const components: ProductComponent[] =
    Array.isArray(product.components)
      ? (product.components as ProductComponent[])
      : [];

  const isParts =
    product.category === "SPARE_PARTS" ||
    product.category === "PERIPHERAL_EQUIPMENT";

  const hasSpecs =
    Array.isArray(product.variants) &&
    product.variants.length > 0;

  const productImage = getAbsoluteImageUrl(
    product.images[0] ??
      "/images/placeholder-furnace.webp"
  );

  // داده‌های ساختاریافته محصول برای موتورهای جستجو
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",

    name: product.name,

    description: product.description ?? undefined,

    image: productImage,

    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },

    category:
      categoryLabels[product.category] ??
      product.category,
  };

  return (
    <main dir="rtl" className="bg-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      {/* Breadcrumb */}
      <div className="border-b border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <nav
            aria-label="مسیر صفحه"
            className="flex items-center gap-1.5 text-xs text-gray-400"
          >
            <Link
              href="/"
              className="transition hover:text-orange-500"
            >
              خانه
            </Link>

            <ChevronLeft className="h-3 w-3" />

            <Link
              href="/products"
              className="transition hover:text-orange-500"
            >
              محصولات
            </Link>

            <ChevronLeft className="h-3 w-3" />

            <span
              aria-current="page"
              className="text-slate-600"
            >
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Product */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Product Gallery */}
          <ProductGallery
            images={
              product.images.length > 0
                ? product.images
                : ["/images/placeholder-furnace.webp"]
            }
            alt={product.name}
          />

          {/* Product Information */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              {/* Category */}
              <span className="inline-block rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
                {categoryLabels[product.category] ??
                  product.category}
              </span>

              {/* Technical Specifications */}
              {hasSpecs && (
                <Link
                  href={`/products/${slug}/specs`}
                  className="inline-block rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600 transition hover:bg-orange-100"
                >
                  مشخصات فنی
                </Link>
              )}

              {/* Reviews */}
              <Link
                href={`/products/${slug}/reviews`}
                className="inline-block rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600 transition hover:bg-orange-100"
              >
                نظرات و پیشنهادات
              </Link>
            </div>

            {/* Product Title */}
            <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
              {product.name}
            </h1>

            {/* Product Description */}
            {product.description && (
              <ProductDescription
                text={product.description}
              />
            )}

            {/* Product Components */}
            {components.length > 0 && (
              <div className="mt-8">
                <h2 className="text-base font-bold text-slate-900">
                  {isParts
                    ? "اقلام و تجهیزات قابل تأمین"
                    : "این سیستم شامل چه اجزایی می‌شود؟"}
                </h2>

                <div className="mt-3 space-y-3">
                  {components.map((component, index) => (
                    <div
                      key={`${component.title}-${index}`}
                      className="rounded-2xl border border-gray-100 bg-gray-50 p-4"
                    >
                      <p className="text-sm font-bold text-slate-900">
                        {component.title}
                      </p>

                      <p className="mt-1 text-xs leading-6 text-gray-500">
                        {component.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}