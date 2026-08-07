
import { Hero } from "@/components/sections/Hero";
import { PopularProducts } from "@/components/sections/PopularProducts";

import { ServicesGrid } from "@/components/sections/servicesGrid";
import { WhyUsSection } from "@/components/sections/WhyUsSection";

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
