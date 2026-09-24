"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_NUMBER = "989124384191";
const DEFAULT_MESSAGE =
  "سلام، درباره کوره القایی پارسیان پرتو الوند نیاز به مشاوره دارم";
const APPEAR_DELAY_MS = 1500;

export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), APPEAR_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    DEFAULT_MESSAGE,
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="ارتباط از طریق واتساپ"
      className={`fixed bottom-5 left-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-all duration-500 sm:h-14 sm:w-14 ${
        visible
          ? "translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-4 scale-75 opacity-0"
      }`}>
      <FaWhatsapp className="h-6 w-6 sm:h-7 sm:w-7" />
      {visible && (
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-40" />
      )}
    </a>
  );
}
