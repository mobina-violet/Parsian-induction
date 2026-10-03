"use client";

import { useState, useTransition } from "react";
import { updateLeadStatus } from "@/app/actions/admin";

const statusLabels: Record<string, string> = {
  NEW: "جدید",
  CONTACTED: "تماس گرفته شد",
  IN_PROGRESS: "در حال پیگیری",
  WON: "موفق",
  LOST: "ناموفق",
};

const statusColors: Record<string, string> = {
  NEW: "bg-orange-50 text-orange-600",
  CONTACTED: "bg-blue-50 text-blue-600",
  IN_PROGRESS: "bg-amber-50 text-amber-600",
  WON: "bg-green-50 text-green-600",
  LOST: "bg-gray-100 text-gray-500",
};

export function LeadStatusSelect({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const [current, setCurrent] = useState(status);
  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value;
    setCurrent(next);
    startTransition(async () => {
      await updateLeadStatus(id, next);
    });
  }

  return (
    <select
      value={current}
      onChange={handleChange}
      disabled={isPending}
      className={`rounded-full border-0 px-3 py-1.5 text-xs font-medium outline-none ${
        statusColors[current] ?? "bg-gray-100 text-gray-500"
      }`}>
      {Object.entries(statusLabels).map(([value, label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}