import { Suspense } from "react";
import { createServerClient } from "@/supabase/server";
import { OpportunitiesHero } from "@/components/opportunities/opportunities-hero";
import { OpportunitiesList } from "@/components/opportunities/opportunities-list";
import { OpportunitiesCTA } from "@/components/opportunities/opportunities-cta";

export const revalidate = 300;

export default async function OpportunitiesPage() {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("opportunity")
    .select("id, title, opportunity_type, description, deadline, status, research_area!opportunity_research_area_id_fkey(name, slug)")
    .or("publish_status.eq.published,status.eq.open")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase opportunity fetch error:", error);
  }

  const opportunities = (data ?? []).map((op) => ({
    id: op.id,
    title: op.title,
    type: op.opportunity_type || 'Opportunity',
    description: op.description || '',
    deadline: op.deadline || null,
    status: op.status || 'open',
    areaSlug: (op.research_area as unknown as { slug: string } | null)?.slug ?? "general",
    areaName: (op.research_area as unknown as { name: string } | null)?.name ?? "General Research",
  }));

  return (
    <main>
      <OpportunitiesHero />
      <Suspense fallback={null}>
        <OpportunitiesList opportunities={opportunities} />
      </Suspense>
      <OpportunitiesCTA />
    </main>
  );
}
