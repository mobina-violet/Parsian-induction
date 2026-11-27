import {getPublicSettings} from "@/lib/cms-public";
import type { Metadata } from "next";

import { Hero } from "@/components/sections/Hero";
import { PopularProducts } from "@/components/sections/PopularProducts";

import { ServicesGrid } from "@/components/sections/servicesGrid";
import { WhyUsSection } from "@/components/sections/WhyUsSection";

export async function generateMetadata(): Promise<Metadata> { const s=await getPublicSettings(); return {title:{absolute:s.seoTitle},description:s.seoDescription,alternates:{canonical:"/"},openGraph:{title:s.seoTitle,description:s.seoDescription},twitter:{title:s.seoTitle,description:s.seoDescription}}; }

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
