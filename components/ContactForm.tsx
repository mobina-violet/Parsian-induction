"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { submitConsultationRequest } from "@/app/actions/consultation";
import {
  consultationSchema,
  type ConsultationFormData,
} from "@/lib/validations/consultation";

const subjects = [
  "مشاوره خرید محصول",
  "پشتیبانی فنی",
  "همکاری تجاری",
  "سایر موارد",
];

export function ContactForm() {
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationSchema),
    defaultValues: { source: "CONTACT_PAGE" },
  });

  async function onSubmit(data: ConsultationFormData) {
    setServerError("");
    const result = await submitConsultationRequest({
      ...data,
      source: "CONTACT_PAGE",
    });

    if (result.success) {
      setSuccess(true);
      reset({ source: "CONTACT_PAGE" });
    } else {
      setServerError(result.error ?? "مشکلی در ارسال پیام پیش آمد");
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center">
        <p className="text-sm leading-7 text-green-600">
          پیام شما با موفقیت ثبت شد. کارشناسان ما در سریع‌ترین زمان با شما تماس
          خواهند گرفت.
        </p>
      </div>
    );
  }

  return (
    <form
      dir="rtl"
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8">
      <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
        برای ما پیام بگذارید
      </h2>
      <p className="mt-1.5 text-sm text-gray-400">
        فرم زیر را تکمیل کنید تا کارشناسان ما با شما تماس بگیرند.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <input
            type="text"
            {...register("phoneNumber")}
            placeholder="شماره تماس"
            aria-label="شماره تماس"
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm placeholder:text-gray-300 focus:border-orange-400 focus:outline-none"
          />
          {errors.phoneNumber && (
            <p className="mt-1.5 text-xs text-red-500">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>
        <input
          type="text"
          {...register("fullName")}
          placeholder="نام و نام خانوادگی"
          aria-label="نام و نام خانوادگی"
          className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm placeholder:text-gray-300 focus:border-orange-400 focus:outline-none"
        />
      </div>

      <div>
        <input
          type="email"
          {...register("email")}
          placeholder="ایمیل"
          aria-label="ایمیل"
          className="mt-4 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm placeholder:text-gray-300 focus:border-orange-400 focus:outline-none"
        />
        {errors.email && (
          <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      <select
        {...register("subject")}
        defaultValue=""
        aria-label="موضوع پیام"
        className="mt-4 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-slate-600 focus:border-orange-400 focus:outline-none">
        <option value="">موضوع پیام</option>
        {subjects.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <textarea
        {...register("message")}
        aria-label="پیام شما"
        placeholder="پیام شما"
        rows={4}
        className="mt-4 w-full resize-none rounded-lg border border-gray-200 px-4 py-2.5 text-sm placeholder:text-gray-300 focus:border-orange-400 focus:outline-none"
      />

      {serverError && (
        <p className="mt-2 text-xs text-red-500">{serverError}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 py-3 text-sm font-medium text-white transition hover:bg-orange-600 disabled:opacity-50">
        {isSubmitting ? "در حال ارسال..." : "ارسال پیام"}
        <Send className="h-4 w-4" />
      </button>

      <p className="mt-3 text-center text-[11px] text-gray-400">
        اطلاعات شما محفوظ است و برای هیچ‌گونه کار تبلیغاتی استفاده نمی‌شود.
      </p>
    </form>
  );
}