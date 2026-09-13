import { notFound } from "next/navigation";
import { PartnerDetailHero } from "@/components/partners/partner-detail-hero";
import { PartnerOverview } from "@/components/partners/partner-overview";
import { PartnerSidebar } from "@/components/partners/partner-sidebar";
import {
  getPartnerById,
  getProjectsForPartner,
  getPublicationsForPartner,
} from "@/components/partners/partner-actions";

interface PartnerPageProps {
  params: Promise<{ id: string }>;
}

export default async function PartnerPage({ params }: PartnerPageProps) {
  const { id } = await params;
  const partner = await getPartnerById(id);

  if (!partner) {
    notFound();
  }

  const [projects, publications] = await Promise.all([
    getProjectsForPartner(id),
    getPublicationsForPartner(id),
  ]);

  return (
    <main className="bg-[#f7f5ef]">
      <PartnerDetailHero partner={partner} />

      <section className="border-b border-[#d7d5cd] py-20 max-sm:py-16">
        <div className="mx-auto grid w-[min(calc(100%_-_48px),1240px)] grid-cols-[minmax(0,1fr)_340px] gap-[9vw] max-lg:grid-cols-1 max-sm:w-[calc(100%_-_32px)]">
          <PartnerOverview partner={partner} />
          <PartnerSidebar projects={projects} publications={publications} />
        </div>
      </section>
    </main>
  );
}
