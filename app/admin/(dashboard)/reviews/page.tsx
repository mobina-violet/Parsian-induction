import { prisma } from "@/lib/prisma";
import { ReviewModerationActions } from "@/components/admin/ReviewModerationActions";

const dateFormatter = new Intl.DateTimeFormat("fa-IR", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

export default async function AdminReviewsPage() {
  const reviews = await prisma.review.findMany({
    orderBy: [{ approved: "asc" }, { createdAt: "desc" }],
    include: { product: { select: { name: true } } },
  });

  return (
    <div>
      <h1 className="text-lg font-bold text-slate-900">
        نظرات ({reviews.length})
      </h1>

      {reviews.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-dashed border-gray-200 py-16 text-center text-sm text-gray-400">
          هنوز نظری ثبت نشده.
        </p>
      ) : (
        <div className="mt-6 space-y-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className={`rounded-2xl border p-5 shadow-sm ${
                review.approved
                  ? "border-gray-100 bg-white"
                  : "border-orange-200 bg-orange-50/40"
              }`}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    {review.name || "کاربر ناشناس"} — {review.product.name}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-400">
                    {dateFormatter.format(review.createdAt)} · {review.email} ·{" "}
                    {"⭐".repeat(review.rating)}
                  </p>
                </div>

                {!review.approved && (
                  <span className="rounded-full bg-orange-100 px-2.5 py-1 text-[11px] font-medium text-orange-700">
                    در انتظار تأیید
                  </span>
                )}
              </div>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {review.message}
              </p>

              <div className="mt-4">
                <ReviewModerationActions
                  id={review.id}
                  approved={review.approved}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}