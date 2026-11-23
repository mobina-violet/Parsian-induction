import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/lib/generated/prisma/client";

/**
 * لیست محصولات برای صفحه‌های /products و /services.
 * این دو صفحه به‌خاطر searchParams هر بار روی سرور رندر می‌شوند؛ کش کردن کوئری
 * دیتابیس باعث می‌شود بیشتر بازدیدها اصلاً به دیتابیس نروند (سریع‌تر و کم‌هزینه‌تر).
 * محصولات فقط با seed عوض می‌شوند، پس یک ساعت کش کاملاً امن است.
 * اگر بعد از seed می‌خواهی فوری عوض شود، revalidateTag("products") صدا بزن
 * یا یک بار دیپلوی کن.
 */
const cachedFindProducts = unstable_cache(
  async (
    where: Prisma.ProductWhereInput,
    orderBy: Prisma.ProductOrderByWithRelationInput,
  ) => prisma.product.findMany({ where, orderBy }),
  ["catalog-products"],
  { revalidate: 3600, tags: ["products"] },
);

export function findProducts(
  where: Prisma.ProductWhereInput,
  orderBy: Prisma.ProductOrderByWithRelationInput = { order: "asc" },
  { cache = true }: { cache?: boolean } = {},
) {
  // جستجوی متنی کاربر کش نمی‌شود (کلیدهای بی‌نهایت می‌سازد)
  if (!cache) return prisma.product.findMany({ where, orderBy });
  return cachedFindProducts(where, orderBy);
}
