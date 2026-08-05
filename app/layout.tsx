import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/sections/Header";

import { cn } from "@/lib/utils";
import { Footer } from "@/components/sections/Footer";
import { ConsultationModal } from "../components/ConsultationModal";


//FONT IRAN SANS
const iranSans = localFont({
  src: "../fonts/A-Iranian-Sans/Iranian Sans.ttf",
  variable: "--font-iransans",
  weight: "400",
  style: "normal",
  display: "swap",
});
export const metadata: Metadata = {
  title: {
    default: "پارسیان پرتو الوند",
    template: "%s | پارسیان پرتو الوند",
  },
  description: "تولیدکننده کوره‌های القایی و تجهیزات صنعتی",
  icons: {
    icon: "/favicon.webp",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={cn(
        "antialiased",
        iranSans.variable,
        "font-sans",

      )}>
      <body className="min-h-screen font-iransans">
        <Header />
        {children}
        <ConsultationModal />
        <Footer/>
      </body>
    </html>
  );
}
