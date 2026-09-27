import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await prisma.product.findUnique({ where: { slug } });

  if (!item) {
    return { title: "یافت نشد" };
  }

  return { title: `مشخصات فنی ${item.name}` };
}

export default async function ServiceSpecsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const item = await prisma.product.findUnique({ where: { slug } });

  if (!item) {
    notFound();
  }

  const components = Array.isArray(item.components)
    ? (item.components as { title: string; description: string }[])
    : [];

  return (
    <main dir="rtl" className="bg-white">
      <div className="border-b border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-xs text-gray-400">
            <Link href="/" className="transition hover:text-orange-500">
              خانه
            </Link>
            <ChevronLeft className="h-3 w-3" />
            <Link href="/services" className="transition hover:text-orange-500">
              خدمات
            </Link>
            <ChevronLeft className="h-3 w-3" />
            <Link
              href={`/services/${slug}`}
              className="transition hover:text-orange-500">
              {item.name}
            </Link>
            <ChevronLeft className="h-3 w-3" />
            <span className="text-slate-600">مشخصات فنی</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href={`/services/${slug}`}
          className="inline-flex items-center gap-1 text-sm text-orange-600 transition hover:text-orange-700">
          <ChevronLeft className="h-4 w-4 rotate-180" />
          بازگشت به {item.name}
        </Link>

        <h1 className="mt-4 text-xl font-bold text-slate-900 sm:text-2xl">
          مشخصات فنی {item.name}
        </h1>

        {components.length > 0 ? (
          <div className="mt-8 space-y-3">
            {components.map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <p className="text-sm font-bold text-slate-900">{c.title}</p>
                <p className="mt-1 text-xs leading-6 text-gray-500">
                  {c.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-8 rounded-2xl border border-dashed border-gray-200 py-10 text-center text-sm text-gray-400">
            مشخصات فنی این مورد به‌زودی تکمیل می‌شود.
          </p>
        )}
      </div>
    </main>
  );
}