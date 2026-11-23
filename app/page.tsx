import type { Metadata } from "next";

import { Hero } from "@/components/sections/Hero";
import { PopularProducts } from "@/components/sections/PopularProducts";

import { ServicesGrid } from "@/components/sections/servicesGrid";
import { WhyUsSection } from "@/components/sections/WhyUsSection";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <ServicesGrid />
      <PopularProducts />
      <WhyUsSection />
    </main>
  );
}
