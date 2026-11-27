import {getPublicSettings} from "@/lib/cms-public";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/sections/Header";

import { cn } from "@/lib/utils";
import { Footer } from "@/components/sections/Footer";
import { ConsultationModalLoader } from "@/components/ConsultationModalLoader";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
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
  telephone: siteConfig.phoneE164,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address,
    addressCountry: "IR",
  },
  sameAs: [siteConfig.instagram],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings=await getPublicSettings();
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify({...organizationJsonLd,telephone:settings.phone,address:{...organizationJsonLd.address,streetAddress:settings.address},sameAs:[settings.instagram]}).replace(/</g,"\\u003c") }}
        />
        <Header />
        {children}
        <ConsultationModalLoader />
        <FloatingWhatsApp number={settings.whatsapp} />
        <Footer settings={settings}/>
        <GoogleAnalytics />
      </body>
    </html>
  );
}