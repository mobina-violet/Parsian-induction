// components/consultation-modal.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useConsultationModal } from "@/lib/store/consultation-modal";
import {
  consultationSchema,
  type ConsultationFormData,
} from "@/lib/validations/consultation";
import { submitConsultationRequest } from "@/app/actions/consultation";
import { useState } from "react";

export function ConsultationModal() {
  const { isOpen, source, productId, close } = useConsultationModal();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationSchema),
    defaultValues: { source, productId },
  });

  async function onSubmit(data: ConsultationFormData) {
    const result = await submitConsultationRequest({
      ...data,
      source,
      productId,
    });
    if (result.success) {
      setStatus("success");
      reset();
    } else {
      setStatus("error");
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent dir="rtl" className="text-right">
        <DialogHeader>
          <DialogTitle>درخواست مشاوره رایگان</DialogTitle>
        </DialogHeader>

        {status === "success" ? (
          <p className="text-green-600 py-4">
            درخواست شما ثبت شد. کارشناسان ما در سریع‌ترین زمان با شما تماس
            خواهند گرفت.
          </p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              aria-label="نام و نام خانوادگی"
              placeholder="نام و نام خانوادگی (اختیاری)"
              {...register("fullName")}
            />
            <Input
              aria-label="شماره موبایل"
              placeholder="شماره موبایل"
              {...register("phoneNumber")}
            />
            <Input
              aria-label="ایمیل"
              placeholder="ایمیل (اختیاری)"
              {...register("email")}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">
                {errors.phoneNumber.message}
              </p>
            )}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-500">
              {isSubmitting ? "در حال ارسال..." : "درخواست تماس"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
