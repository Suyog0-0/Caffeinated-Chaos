// src/app/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import { createClient } from "@/supabase/client";
import { ProjectDetailHero } from "@/components/projects/project-detail-hero";
import { ProjectOverview } from "@/components/projects/project-overview";
import { ProjectSidebar } from "@/components/projects/project-sidebar";

export default async function ProjectSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = createClient();

  // Fetch the project with its research area, team and linked publications
  const { data: p } = await supabase
    .from("project")
    .select(`
      id, slug, status, title, description, start_date, end_date,
      research_area(name),
      project_researcher(role, researcher(id, name, photo_url)),
      publication(id, title, publication_type, year, summary)
    `)
    .eq("slug", slug)
    .eq("publish_status", "published")
    .single();

  if (!p) notFound();

  // Partners collaborating on this project.
  const { data: partnerRows } = await supabase
    .from("project_partner")
    .select("partner(id, name, logo_url, website)")
    .eq("project_id", p.id);

  type PartnerRow = { partner: { id: string; name: string; logo_url: string | null; website: string | null } | null };
  const partners = (partnerRows as unknown as PartnerRow[] | null)
    ?.map((row) => row.partner)
    .filter((partner): partner is { id: string; name: string; logo_url: string | null; website: string | null } => Boolean(partner)) ?? [];

  // Events linked to this project.
  const { data: eventRows } = await supabase
    .from("event")
    .select("id, title, event_type, start_at")
    .eq("project_id", p.id)
    .eq("publish_status", "published")
    .order("start_at", { ascending: true });

  const relatedEvents = eventRows ?? [];

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

  type PRRow = { role: string; researcher: { id: string; name: string; photo_url: string | null } };
  const toResearcher = (r: PRRow) => ({
    id: r.researcher.id,
    initials: r.researcher.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase(),
    name: r.researcher.name,
    photoUrl: r.researcher.photo_url,
  });
  const prRows = p.project_researcher as unknown as PRRow[];
  const leadResearchers = prRows.filter((r) => r.role === "lead").map(toResearcher);
  const researchers = prRows.filter((r) => r.role !== "lead").map(toResearcher);

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
        <ProjectSidebar
          project={project}
          researchers={researchers}
          leadResearchers={leadResearchers}
          partners={partners}
          events={relatedEvents}
        />
      </div>
    </main>
  );
}