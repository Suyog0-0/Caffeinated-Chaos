import { PartnersHero } from "@/components/partners/partner-hero";
import { PartnerList } from "@/components/partners/partner-list";
import { IJMRSection } from "@/components/partners/partner-ijmr-section";
import { getPartners } from "@/components/partners/partner-actions";

export const metadata = {
  title: "Partners | Islington Research",
  description:
    "Communities, industry sponsors, academic networks, and public institutions we work alongside.",
};

export default async function PartnersPage() {
  const partners = await getPartners();
  const categoryCount = new Set(
    partners.map((p) => p.partner_type).filter(Boolean)
  ).size;

  return (
    <main className="bg-[#f4f2ec]">
      <PartnersHero
        totalPartners={partners.length}
        totalCategories={categoryCount}
      />
      <PartnerList partners={partners} />
      <IJMRSection />
    </main>
  );
}
