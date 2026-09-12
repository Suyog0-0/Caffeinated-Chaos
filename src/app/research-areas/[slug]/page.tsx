import { notFound } from "next/navigation";
import { createClient } from "@/supabase/client";
import { ResearchAreaDetailHeader } from "@/components/research_area/research-area-detail-header";
import { ResearchAreaProjects } from "@/components/research_area/research-area-projects";
import { ResearchAreaSidebar } from "@/components/research_area/research-area-sidebar";

export default async function ResearchAreaSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = createClient();

  const { data: a } = await supabase
    .from("research_area")
    .select(`
      name, description, is_active,
      project(slug, title, description, status, publish_status),
      publication(id, title, publication_type, year, publish_status),
      researcher_research_area(researcher(id, name, photo_url, publish_status))
    `)
    .eq("slug", slug)
    .eq("publish_status", "published")
    .single();

  if (!a) notFound();

  console.log("DEBUG research_area row:", a);

  type ProjectRow = {
    slug: string;
    title: string;
    description: string | null;
    status: string;
    publish_status: string;
  };
  const projects = (a.project as unknown as ProjectRow[])
    .filter((p) => p.publish_status === "published")
    .map((p) => ({ slug: p.slug, title: p.title, summary: p.description ?? "", status: p.status }));

  type PubRow = {
    id: string;
    title: string;
    publication_type: string | null;
    year: number | null;
    publish_status: string;
  };
  const publications = (a.publication as unknown as PubRow[])
    .filter((p) => p.publish_status === "published")
    .map((p) => ({ id: p.id, title: p.title, type: p.publication_type ?? "Publication", year: p.year ?? 0 }));

  type LinkRow = { researcher: { id: string; name: string; photo_url: string | null; publish_status: string } };
  const researchers = (a.researcher_research_area as unknown as LinkRow[])
    .filter((r) => r.researcher.publish_status === "published")
    .map((r) => ({
      id: r.researcher.id,
      name: r.researcher.name,
      photoUrl: r.researcher.photo_url,
      initials: r.researcher.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
    }));

  const area = {
    name: a.name,
    description: a.description ?? "",
    status: a.is_active ? "Active" : "Inactive",
    projects: projects.length,
    publications: publications.length,
  };
  return (
    <main className="pb-24">
      <ResearchAreaDetailHeader area={area} />
      <div className="mx-auto grid w-[min(calc(100%_-_48px),1240px)] grid-cols-[1fr_330px] gap-[9vw] pt-16 max-lg:grid-cols-1 max-sm:w-[calc(100%_-_32px)]">
        <ResearchAreaProjects projects={projects} />
        <ResearchAreaSidebar researchers={researchers} publications={publications} />
      </div>
    </main>
  );
}