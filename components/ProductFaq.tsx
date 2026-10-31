"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

type Faq = { q: string; a: ReactNode };

export function ProductFaq({
  faqs,
  columns = 2,
}: {
  faqs: Faq[];
  columns?: 1 | 2;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div
      className={`mt-6 grid items-start gap-3 ${
        columns === 2 ? "sm:grid-cols-2" : ""
      }`}>
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div
            key={index}
            className={`rounded-xl border transition-colors ${
              isOpen
                ? "border-orange-200 bg-orange-50/40"
                : "border-gray-100 bg-white hover:border-orange-100"
            }`}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-3 px-5 py-4 text-start text-sm font-medium text-slate-900">
                <span>{faq.q}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-orange-500" : "text-gray-400"
                  }`}
                />
              </button>
            </h3>

            {/* انیمیشن باز و بسته شدن بدون جاوااسکریپت اضافه */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}>
              <div className="overflow-hidden">
                <p className="px-5 pb-4 text-start text-sm leading-7 text-gray-500">
                  {faq.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
