"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";

type Tab = {
  value: string;
  label: string;
};

type SubFilter = {
  value: string;
  label: string;
};

export function ServiceCategoryMenu({
  tabs,
  activeValue,
  subFilters,
  activeSub,
}: {
  tabs: readonly Tab[];
  activeValue: string;
  subFilters: Record<string, SubFilter[]>;
  activeSub: string;
}) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <div className="flex flex-wrap items-start gap-3">
      {tabs.map((tab) => {
        const isActive = tab.value === activeValue;
        const isOpen = openMenu === tab.value;

        const currentSubFilters =
          subFilters[tab.value] ?? [];

        return (
          <div
            key={tab.value}
            className="relative"
          >
            {/* دکمه اصلی */}
            <button
              type="button"
              onClick={() =>
                setOpenMenu(
                  isOpen ? null : tab.value,
                )
              }
              aria-haspopup="menu"
              aria-expanded={isOpen}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition ${
                isOpen
                  ? "bg-orange-500 text-white"
                  : "bg-white text-slate-700 ring-1 ring-gray-200 hover:bg-orange-50 hover:text-orange-600 hover:ring-orange-200"
              }`}
            >
              <span>{tab.label}</span>

              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* زیرمنوی همین دکمه */}
            {isOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setOpenMenu(null)}
                />

                <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 shadow-xl shadow-black/10">
                  {currentSubFilters.map((sub) => {
                    const isActiveSub =
                      isActive &&
                      sub.value === activeSub;

                    return (
                      <Link
                        key={sub.value}
                        href={`/services?category=${tab.value}&sub=${sub.value}`}
                        scroll={false}
                        onClick={() => setOpenMenu(null)}
                        className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm transition ${
                          isActiveSub
                            ? "bg-orange-50 font-medium text-orange-600"
                            : "text-slate-600 hover:bg-orange-50 hover:text-orange-600"
                        }`}
                      >
                        <span>{sub.label}</span>

                        {isActiveSub && (
                          <Check className="h-4 w-4 text-orange-500" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}