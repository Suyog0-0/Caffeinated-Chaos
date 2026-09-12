import { notFound } from "next/navigation";
import { createServerClient } from "@/src/supabase/server";
import { ProjectDetailHero } from "@/src/components/projects/project-detail-hero";
import { ProjectOverview } from "@/src/components/projects/project-overview";
import { ProjectSidebar } from "@/src/components/projects/project-sidebar";

export default async function ProjectSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = createServerClient();

  // Fetch the project with its research area, team and linked publications
  const { data: p } = await supabase
    .from("project")
    .select(`
      slug, status, title, description, start_date, end_date,
      research_area(name),
      project_researcher(role, researcher(id, name)),
      publication(id, title, publication_type, year, summary)
    `)
    .eq("slug", slug)
    .eq("publish_status", "published")
    .single();

  if (!p) notFound();

  // Supabase infers FK joins as arrays — cast through unknown to our expected shapes.
  const area =
    (p.research_area as unknown as { name: string } | null)?.name ?? "—";

  const project = {
    status: p.status,
    title: p.title,
    summary: p.description ?? "",
    area,
    start: p.start_date?.slice(0, 4) ?? "—",
    end: p.end_date?.slice(0, 4) ?? "ongoing",
  };

  type PRRow = { role: string; researcher: { id: string; name: string } };
  const researchers = (p.project_researcher as unknown as PRRow[]).map((r) => ({
    id: r.researcher.id,
    initials: r.researcher.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase(),
    name: r.researcher.name,
  }));

  type PubRow = {
    id: string;
    title: string;
    publication_type: string | null;
    year: number | null;
    summary: string | null;
  };
  const publications = (p.publication as unknown as PubRow[]).map((pub) => ({
    id: pub.id,
    type: pub.publication_type ?? "Publication",
    year: pub.year ?? 0,
    title: pub.title,
    authors: pub.summary ?? "",
  }));

  return (
    <main className="pb-24">
      <ProjectDetailHero project={project} />
      <div className="mx-auto grid w-[min(calc(100%_-_48px),1240px)] grid-cols-[1fr_330px] gap-[9vw] pt-16 max-lg:grid-cols-1 max-sm:w-[calc(100%_-_32px)]">
        <ProjectOverview publications={publications} />
        <ProjectSidebar project={project} researchers={researchers} />
      </div>
    </main>
  );
}
