"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";

type Faq = { q: string; a: string };

export function ProductFaq({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <details
            key={faq.q}
            open={isOpen}
            className="group rounded-xl border border-gray-100 px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
            <summary
              onClick={(e) => {
                // خودمون باز/بسته شدن رو کنترل می‌کنیم که مطمئن بشیم همیشه فقط یکی باز می‌مونه
                e.preventDefault();
                setOpenIndex(isOpen ? null : index);
              }}
              className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium text-slate-900">
              {faq.q}
              <ChevronLeft className="h-4 w-4 shrink-0 text-gray-400 transition group-open:-rotate-90" />
            </summary>
            <p className="mt-3 text-sm leading-7 text-gray-500">{faq.a}</p>
          </details>
        );
      })}
    </div>
  );
}