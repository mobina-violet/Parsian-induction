"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

type Suggestion = {
  label: string;
  href: string;
  type: "category" | "product" | "service" | "article";
};

const shortcuts: Suggestion[] = [
  { label: "کوره القایی ذوب", href: "/products?category=MELTING_FURNACE#products", type: "category" },
  { label: "کوره القایی فورج", href: "/products?category=FORGING_FURNACE#products", type: "category" },
  { label: "کوره القایی سخت‌کاری", href: "/products?category=HARDENING_FURNACE#products", type: "category" },
  { label: "کوره القایی فورمینگ", href: "/products?category=FORMING_FURNACE#products", type: "category" },
  { label: "لوازم یدکی", href: "/services?category=SPARE_PARTS&sub=all#services-catalog", type: "category" },
  { label: "قطعات و تجهیزات جانبی", href: "/services?category=SERVICE_EQUIPMENT&sub=all#services-catalog", type: "category" },
  { label: "مقالات", href: "/articles", type: "category" },
];

const typeLabels: Record<Suggestion["type"], string> = {
  category: "دسته",
  product: "محصول",
  service: "قطعه",
  article: "مقاله",
};

// یکسان‌سازی «ي» و «ك» عربی با «ی» و «ک» فارسی
function normalizeQuery(text: string) {
  return text.replace(/ي/g, "ی").replace(/ك/g, "ک").trim();
}

// برای مقایسه: نیم‌فاصله و فاصله رو حذف می‌کنه تا «سخت کاری» و «سخت‌کاری» یکی حساب بشن
function compact(text: string) {
  return normalizeQuery(text).replace(/[\u200c\s]/g, "").toLowerCase();
}

export function SearchBox() {
  const router = useRouter();

  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const [apiItems, setApiItems] = useState<Suggestion[]>([]);
  const [showList, setShowList] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const cleaned = normalizeQuery(query);
  const compactQuery = compact(query);
  const searchAllHref = `/products?search=${encodeURIComponent(cleaned)}`;

  const shortcutMatches = compactQuery
    ? shortcuts
        .filter((s) => compact(s.label).includes(compactQuery))
        .sort(
          (a, b) =>
            Number(compact(b.label).startsWith(compactQuery)) -
            Number(compact(a.label).startsWith(compactQuery)),
        )
        .slice(0, 4)
    : [];

  const visibleApiItems = cleaned.length >= 2 ? apiItems : [];

  const suggestions = [...shortcutMatches, ...visibleApiItems]
    .filter((s, i, all) => all.findIndex((x) => x.href === s.href) === i)
    .slice(0, 8);

  // گرفتن پیشنهادها از دیتابیس (با ۲۵۰ میلی‌ثانیه تأخیر)
  useEffect(() => {
    if (cleaned.length < 2) return;

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(cleaned)}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        setApiItems(data.suggestions ?? []);
      } catch {
        // درخواست لغو شد یا خطا داد؛ پیشنهادهای ثابت همچنان کار می‌کنن
      }
    }, 250);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [cleaned]);

  // بستن با کلیک بیرون از باکس
  useEffect(() => {
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setShowList(false);
        setExpanded(false);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, []);

  // فوکوس خودکار وقتی کارت سرچ باز می‌شه
  useEffect(() => {
    if (expanded) inputRef.current?.focus();
  }, [expanded]);

  function reset() {
    setQuery("");
    setApiItems([]);
    setShowList(false);
    setActiveIndex(-1);
    setExpanded(false);
  }

  function go(href: string) {
    router.push(href);
    reset();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const selected = suggestions[activeIndex];
    if (selected) {
      go(selected.href);
      return;
    }

    if (!cleaned) return;
    go(searchAllHref);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const lastIndex = suggestions.length; // ردیف «جستجو در همه محصولات» هم آخر لیسته

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setShowList(true);
      setActiveIndex((i) => Math.min(i + 1, lastIndex));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Escape") {
      setShowList(false);
      setActiveIndex(-1);
      setExpanded(false);
    }
  }

  const rows = suggestions.map((s, i) => (
    <li key={s.href} role="option" aria-selected={i === activeIndex}>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => go(s.href)}
        onMouseEnter={() => setActiveIndex(i)}
        className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-right text-sm transition ${
          i === activeIndex
            ? "bg-orange-50 text-orange-600"
            : "text-slate-700 hover:bg-orange-50"
        }`}>
        <span className="truncate">{s.label}</span>
        <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-500">
          {typeLabels[s.type]}
        </span>
      </button>
    </li>
  ));

  const panelBody = (
    <>
      <form onSubmit={handleSubmit} className="relative">
        <Search className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          ref={inputRef}
          type="search"
          role="combobox"
          aria-label="جستجوی محصول"
          aria-expanded={expanded}
          aria-controls="search-suggestions"
          aria-autocomplete="list"
          autoComplete="off"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(-1);
            setShowList(true);
          }}
          onFocus={() => setShowList(true)}
          onKeyDown={handleKeyDown}
          placeholder="جستجوی محصول..."
          className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pr-10 pl-4 text-sm text-slate-700 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
        />
      </form>

      <div className="mt-3">
        {cleaned ? (
          <>
            {suggestions.length > 0 && (
              <ul id="search-suggestions" role="listbox" className="space-y-0.5">
                {rows}
              </ul>
            )}

            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => go(searchAllHref)}
              onMouseEnter={() => setActiveIndex(suggestions.length)}
              className={`mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-right text-sm transition ${
                activeIndex === suggestions.length
                  ? "bg-orange-50 text-orange-600"
                  : "text-slate-500 hover:bg-orange-50 hover:text-orange-600"
              }`}>
              <Search className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">
                جستجوی «{cleaned}» در همه محصولات
              </span>
            </button>
          </>
        ) : (
          <div>
            <p className="mb-2 px-1 text-xs text-gray-400">جستجوی سریع</p>
            <div className="flex flex-wrap gap-2">
              {shortcuts.map((s) => (
                <button
                  key={s.href}
                  type="button"
                  onClick={() => go(s.href)}
                  className="rounded-full bg-orange-50 px-3 py-1.5 text-xs font-medium text-orange-600 transition hover:bg-orange-100">
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-label="جستجو"
        aria-expanded={expanded}
        onClick={() => setExpanded((v) => !v)}
        className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
          expanded
            ? "border-orange-300 bg-orange-50 text-orange-500"
            : "border-gray-200 text-slate-500 hover:border-orange-300 hover:text-orange-500"
        }`}>
        <Search className="h-4 w-4" />
      </button>

      {expanded && (
        <>
          {/* موبایل: کارت تمام‌عرض، ثابت زیر هدر (به مختصات دکمه وابسته نیست) */}
          <div className="fixed inset-x-4 top-24 z-[60] rounded-2xl border border-gray-100 bg-white p-3 shadow-xl shadow-black/10 sm:hidden">
            {panelBody}
          </div>

          {/* دسکتاپ: کارت کوچیک درست زیر خود آیکون */}
          <div className="absolute left-0 top-full z-[60] mt-3 hidden w-[22rem] rounded-2xl border border-gray-100 bg-white p-3 shadow-xl shadow-black/5 sm:block">
            {panelBody}
          </div>
        </>
      )}
    </div>
  );
}