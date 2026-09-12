import { AboutHero } from "@/components/about/about-hero";
import { ImpactStats } from "@/components/about/impact-stats";
import { Leadership } from "@/components/about/leadership";
import { MissionStatements } from "@/components/about/mission-statements";
import { Partners } from "@/components/about/partners";

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <ImpactStats />
      <MissionStatements />
      <Leadership />
      <Partners />
    </main>
  );
}