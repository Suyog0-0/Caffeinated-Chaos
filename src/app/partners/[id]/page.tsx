import { notFound } from "next/navigation";
import { PartnerDetailHero } from "@/components/partners/partner-detail-hero";
import { PartnerOverview } from "@/components/partners/partner-overview";
import { PartnerSidebar } from "@/components/partners/partner-sidebar";
import {
  getPartnerById,
  getProjectsForPartner,
  getPublicationsForPartner,
} from "@/components/partners/partners-actions";

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
    <main className="bg-[#f4f2ec]">
      <PartnerDetailHero partner={partner} />

      <section className="bg-[#faf9f5] px-6 py-14 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-[1fr_320px]">
          <PartnerOverview partner={partner} />
          <PartnerSidebar projects={projects} publications={publications} />
        </div>
      </section>
    </main>
  );
}
