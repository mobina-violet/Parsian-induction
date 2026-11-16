"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useConsultationModal } from "@/lib/store/consultation-modal";

// فرم مشاوره (react-hook-form + zod + dialog) فقط وقتی اولین بار مودال باز شد
// دانلود می‌شه. با این کار جاوااسکریپت اولیه‌ی همه‌ی صفحه‌ها سبک‌تر می‌شه.
const ConsultationModal = dynamic(
  () =>
    import("@/components/ConsultationModal").then((m) => m.ConsultationModal),
  { ssr: false },
);

export function ConsultationModalLoader() {
  const isOpen = useConsultationModal((state) => state.isOpen);
  const [shouldLoad, setShouldLoad] = useState(false);

  // اولین باری که مودال باز می‌شه، کامپوننت لود می‌شه و بعد همیشه می‌مونه
  if (isOpen && !shouldLoad) setShouldLoad(true);

  return shouldLoad ? <ConsultationModal /> : null;
}
