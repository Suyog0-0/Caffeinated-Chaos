import { FeaturedProject } from "@/components/home/home-featured-project";
import { Hero } from "@/components/home/home-hero";
import { Metrics } from "@/components/home/home-metrics";
import { ResearchAreas } from "@/components/home/home-research-areas";

export default function Home() {
  return (
    <main>
      <Hero />
      <Metrics />
      <ResearchAreas />
      <FeaturedProject />

    </main>
  );
}
