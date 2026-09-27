"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import { Star } from "lucide-react";
import {
  reviewSchema,
  type ReviewFormInput,
  type ReviewFormOutput,
} from "@/lib/validations/review";
import { submitReview } from "@/app/actions/review";

export function ReviewForm({ productId }: { productId: string }) {
  const pathname = usePathname();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormInput, unknown, ReviewFormOutput>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { productId, rating: 5 },
  });

  const rating = watch("rating") ?? 5;

  async function onSubmit(data: ReviewFormOutput) {
    const result = await submitReview(data, pathname);
    if (result.success) {
      setStatus("success");
      reset({ productId, rating: 5 });
    } else {
      setStatus("error");
      setErrorMessage(result.error ?? "مشکلی در ثبت نظر پیش آمد.");
    }
  }

  if (status === "success") {
    return (
      <p className="rounded-2xl border border-green-100 bg-green-50 p-4 text-sm text-green-700">
        نظر شما با موفقیت ثبت شد. ممنون از وقتی که گذاشتید!
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input type="hidden" {...register("productId")} />
      <input type="hidden" {...register("rating", { valueAsNumber: true })} />

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          placeholder="نام (اختیاری)"
          aria-label="نام"
          {...register("name")}
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm placeholder:text-gray-300 focus:border-orange-400 focus:outline-none"
        />
        <div>
          <input
            type="email"
            placeholder="ایمیل"
            aria-label="ایمیل"
            {...register("email")}
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm placeholder:text-gray-300 focus:border-orange-400 focus:outline-none"
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setValue("rating", value, { shouldValidate: true })}
            aria-label={`امتیاز ${value} از ۵`}
            className="p-0.5">
            <Star
              className={`h-5 w-5 ${
                value <= rating
                  ? "fill-orange-500 text-orange-500"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>

      <div>
        <textarea
          placeholder="نظر یا پیشنهاد شما..."
          aria-label="نظر شما"
          rows={4}
          {...register("message")}
          className="w-full resize-none rounded-lg border border-gray-200 px-4 py-2.5 text-sm placeholder:text-gray-300 focus:border-orange-400 focus:outline-none"
        />
        {errors.message && (
          <p className="mt-1.5 text-xs text-red-500">{errors.message.message}</p>
        )}
      </div>

      {status === "error" && (
        <p className="text-xs text-red-500">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-full bg-orange-500 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-orange-600 disabled:opacity-50">
        {isSubmitting ? "در حال ارسال..." : "ثبت نظر"}
      </button>
    </form>
  );
}