"use client";

import { useState, useTransition } from "react";
import { approveReview, deleteReview } from "@/app/actions/admin";

export function ReviewModerationActions({
  id,
  approved,
}: {
  id: string;
  approved: boolean;
}) {
  const [isApproved, setIsApproved] = useState(approved);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (isDeleted) {
    return <p className="text-xs text-gray-400">حذف شد.</p>;
  }

  return (
    <div className="flex gap-2">
      {!isApproved && (
        <button
          type="button"
          disabled={isPending}
          onClick={() =>
            startTransition(async () => {
              const result = await approveReview(id);
              if (result.success) setIsApproved(true);
            })
          }
          className="rounded-full bg-green-500 px-4 py-1.5 text-xs font-medium text-white transition hover:bg-green-600 disabled:opacity-50">
          تأیید نمایش
        </button>
      )}

      <button
        type="button"
        disabled={isPending}
        onClick={() => {
          if (!confirm("این نظر برای همیشه حذف بشه؟")) return;
          startTransition(async () => {
            const result = await deleteReview(id);
            if (result.success) setIsDeleted(true);
          });
        }}
        className="rounded-full border border-gray-200 px-4 py-1.5 text-xs font-medium text-gray-500 transition hover:border-red-200 hover:text-red-600 disabled:opacity-50">
        حذف
      </button>
    </div>
  );
}