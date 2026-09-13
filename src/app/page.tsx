import { CTA } from "@/components/home/cta";
import { FeaturedProject } from "@/components/home/home-featured-project";
import { Hero } from "@/components/home/home-hero";
import { Metrics } from "@/components/home/home-metrics";
import { People } from "@/components/home/home-people";
import { HomePartners } from "@/components/home/home-partners";
import { Publications } from "@/components/home/home-publications";
import { ResearchAreas } from "@/components/home/home-research-areas";

export default function Home() {
  return (
    <main>
      <Hero />
      <Metrics />
      <ResearchAreas />
      <FeaturedProject />
      <Publications />
      <People />
      <HomePartners />
      <CTA />
    </main>
  );
}
