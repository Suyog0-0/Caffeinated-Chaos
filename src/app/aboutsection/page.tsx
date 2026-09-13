import { AboutHero } from "@/components/about/about-hero";
import { ImpactStats } from "@/components/about/impact-stats";
import { Leadership } from "@/components/about/leadership";
import { MissionStatements } from "@/components/about/mission-statements";
import { Partners } from "@/components/about/partners";
import { Methodology } from "@/components/about/methodology";
import { EngageCTA } from "@/components/about/engage-cta";
import { Inter } from "next/font/google";

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
});

export default function AboutPage() {
  return (
    <main className={inter.className}>
      <AboutHero />
      <ImpactStats />
      <MissionStatements />
      <Leadership />
      <Methodology />
      <Partners />
      <EngageCTA />
    </main>
  );
}
