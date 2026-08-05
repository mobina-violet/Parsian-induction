"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function ProjectFilterControls({ years }: { years: number[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/projects?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex flex-wrap gap-3">
      <select
        aria-label="فیلتر بر اساس سال"
        defaultValue={searchParams.get("year") ?? ""}
        onChange={(e) => updateParam("year", e.target.value)}
        className="rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm text-slate-600 focus:border-orange-400 focus:outline-none">
        <option value="">همه سال‌ها</option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      <select
        aria-label="مرتب‌سازی"
        defaultValue={searchParams.get("sort") ?? "newest"}
        onChange={(e) => updateParam("sort", e.target.value)}
        className="rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm text-slate-600 focus:border-orange-400 focus:outline-none">
        <option value="newest">جدیدترین</option>
        <option value="oldest">قدیمی‌ترین</option>
      </select>
    </div>
  );
}
