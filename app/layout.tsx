import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/sections/Header";

import { cn } from "@/lib/utils";
import { Footer } from "@/components/sections/Footer";
import { ConsultationModal } from "../components/ConsultationModal";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { siteConfig } from "@/lib/site-config";


//FONT IRAN SANS
const iranSans = localFont({
  src: "../fonts/A-Iranian-Sans/Iranian Sans.ttf",
  variable: "--font-iransans",
  weight: "400",
  style: "normal",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s | پارسیان پرتو الوند",
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.webp",
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/og-image.webp"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/parsian-logo.webp`,
  description: siteConfig.description,
  telephone: siteConfig.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address,
    addressCountry: "IR",
  },
  sameAs: [siteConfig.instagram],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Header />
        {children}
        <ConsultationModal />
        <FloatingWhatsApp />
        <Footer/>
      </body>
    </html>
  );
}