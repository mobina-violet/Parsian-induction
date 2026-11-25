import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import { cache } from "react";

import { prisma } from "@/lib/prisma";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductDescription } from "@/components/ProductDescription";
import { siteConfig } from "@/lib/site-config";

// ISR: به‌روزرسانی کش پس از یک ساعت
export const revalidate = 3600;

// امکان نمایش خدمات جدید بدون Build مجدد
export const dynamicParams = true;

const categoryLabels: Record<string, string> = {
  SPARE_PARTS: "لوازم یدکی",
  SERVICE_EQUIPMENT: "قطعات و تجهیزات جانبی",
};

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

const PLACEHOLDER_IMAGE =
  "/images/placeholder-project.webp";

// دریافت اطلاعات خدمات و جلوگیری از درخواست تکراری
const getService = cache(async (slug: string) => {
  return prisma.product.findFirst({
    where: {
      slug,
      category: {
        in: ["SPARE_PARTS", "SERVICE_EQUIPMENT"],
      },
    },
  });
});

// جلوگیری از ساخت تمام صفحات خدمات هنگام Build
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

// دریافت تصاویر معتبر
function getServiceImages(images: string[]) {
  const validImages = images.filter(
    (image) => image.trim().length > 0
  );

  return validImages.length > 0
    ? validImages
    : [PLACEHOLDER_IMAGE];
}

// تنظیمات SEO اختصاصی هر خدمت
export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;

  const item = await getService(slug);

  if (!item) {
    return {
      title: "خدمات یا قطعه موردنظر یافت نشد",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = item.name;

  const description =
    item.description?.slice(0, 160) ||
    `${title} — ${
      categoryLabels[item.category] ?? ""
    } پارسیان پرتو الوند.`;

  const images = getServiceImages(item.images);

  const imageUrl = getAbsoluteImageUrl(images[0]);

  const serviceUrl = new URL(
    `/services/${slug}`,
    siteConfig.url
  ).toString();

  return {
    title,
    description,

    alternates: {
      canonical: serviceUrl,
    },

    openGraph: {
      type: "website",
      locale: "fa_IR",
      siteName: siteConfig.name,
      url: serviceUrl,
      title,
      description,

      images: [
        {
          url: imageUrl,
          alt: item.name,
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

// صفحه جزئیات خدمات و قطعات
export default async function ServiceDetailPage({
  params,
}: ServicePageProps) {
  const { slug } = await params;

  const item = await getService(slug);

  if (!item) {
    notFound();
  }

  const hasSpecs =
    Array.isArray(item.components) &&
    item.components.length > 0;

  const images = getServiceImages(item.images);

  // داده‌های ساختاریافته برای موتورهای جستجو
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",

    name: item.name,

    description: item.description ?? undefined,

    image: images.map(getAbsoluteImageUrl),

    category:
      categoryLabels[item.category] ?? undefined,

    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
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
              href="/services"
              className="transition hover:text-orange-500"
            >
              خدمات
            </Link>

            <ChevronLeft className="h-3 w-3" />

            <span
              aria-current="page"
              className="text-slate-600"
            >
              {item.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Service Content */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Product Gallery */}
          <ProductGallery
            images={images}
            alt={item.name}
          />

          {/* Service Information */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              {/* Category */}
              <span className="inline-block rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
                {categoryLabels[item.category] ?? "خدمات"}
              </span>

              {/* Technical Specifications */}
              {hasSpecs && (
                <Link
                  href={`/services/${slug}/specs`}
                  className="inline-block rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600 transition hover:bg-orange-100"
                >
                  مشخصات فنی
                </Link>
              )}

              {/* Reviews */}
              <Link
                href={`/services/${slug}/reviews`}
                className="inline-block rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600 transition hover:bg-orange-100"
              >
                نظرات و پیشنهادات
              </Link>
            </div>

            {/* Service Title */}
            <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
              {item.name}
            </h1>

            {/* Service Description */}
            {item.description && (
              <ProductDescription
                text={item.description}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}