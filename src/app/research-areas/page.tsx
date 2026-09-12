import { createClient } from "@/supabase/client";
import { ResearchAreaLibrary } from "@/components/research_area/research-area-library";
import { ResearchAreasHeader } from "@/components/research_area/research-areas-header";

export default async function ResearchAreasPage() {
  const supabase = createClient();

  const { data } = await supabase
    .from("research_area")
    .select("slug, name, description, is_active, project(publish_status), publication(publish_status)")
    .eq("publish_status", "published")
    .order("name", { ascending: true });

  const areas = (data ?? []).map((a) => ({
    slug: a.slug,
    name: a.name,
    description: a.description ?? "",
    active: a.is_active as boolean,
    projects: (a.project as unknown as { publish_status: string }[]).filter(
      (p) => p.publish_status === "published",
    ).length,
    publications: (a.publication as unknown as { publish_status: string }[]).filter(
      (p) => p.publish_status === "published",
    ).length,
  }));

  return (
    <main className="pb-24">
      <ResearchAreasHeader />
      <ResearchAreaLibrary areas={areas} />
    </main>
  );
}