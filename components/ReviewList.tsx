import { Star } from "lucide-react";
import type { Review } from "@/lib/generated/prisma/client";

export function ReviewList({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-gray-200 py-10 text-center text-sm text-gray-400">
        هنوز نظری برای این مورد ثبت نشده. اولین نفر باشید!
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-slate-900">
              {review.name || "کاربر ناشناس"}
            </p>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((value) => (
                <Star
                  key={value}
                  className={`h-3.5 w-3.5 ${
                    value <= review.rating
                      ? "fill-orange-500 text-orange-500"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          <p className="mt-2 text-xs leading-6 text-gray-500">
            {review.message}
          </p>

          <p className="mt-3 text-[11px] text-gray-400">
            {new Intl.DateTimeFormat("fa-IR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(review.createdAt)}
          </p>
        </div>
      ))}
    </div>
  );
}