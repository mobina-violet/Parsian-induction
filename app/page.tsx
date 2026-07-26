import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { PopularProducts } from "@/components/sections/PopularProducts";

import { ServicesGrid } from "@/components/sections/services-grid";
import { WhyUsSection } from "@/components/sections/WhyUsSection";

export default function Home() {
  return (
    <div>
    <main className="">
      <Hero />
      <ServicesGrid />
      <PopularProducts />
      <WhyUsSection/>
    </main>
     <Footer/>
    </div>
   
  );
}
