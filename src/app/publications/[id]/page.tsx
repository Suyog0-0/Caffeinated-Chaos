import { notFound } from "next/navigation";
import { createClient } from "@/supabase/client";
import { PublicationDetailHero } from "@/components/publications/publication-detail-hero";
import { PublicationOverview } from "@/components/publications/publication-overview";
import { PublicationSidebar } from "@/components/publications/publication-sidebar";

type ResearcherRow = { id: string; name: string; photo_url: string | null };
type PublicationAuthorRow = { author_order: number; researcher: ResearcherRow | null };
type PublicationRow = {
  id: string;
  publication_type: string;
  year: number;
  title: string;
  summary: string;
  venue: string;
  doi: string | null;
  research_area: { name: string } | null;
  project: { slug: string; title: string; status: string; description: string } | null;
  publication_author: PublicationAuthorRow[];
};

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default async function PublicationIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createClient();

  const { data } = await supabase
    .from("publication")
    .select(
      `
      id,
      publication_type,
      year,
      title,
      summary,
      venue,
      doi,
      research_area:research_area_id ( name ),
      project:project_id ( slug, title, status, description ),
      publication_author (
        author_order,
        researcher:researcher_id ( id, name, photo_url )
      )
    `
    )
    .eq("id", id)
    .eq("publish_status", "published")
    .maybeSingle();

  const row = data as unknown as PublicationRow | null;

  if (!row) {
    notFound();
  }

  const orderedAuthors = [...row.publication_author]
    .sort((a, b) => a.author_order - b.author_order)
    .map((pa) => pa.researcher)
    .filter((r): r is ResearcherRow => Boolean(r));

  const publication = {
    type: row.publication_type,
    title: row.title,
    authors: orderedAuthors.map((r) => r.name).join(", "),
    year: row.year,
    venue: row.venue,
    area: row.research_area?.name ?? "Unassigned",
    doi: row.doi,
  };

  const researchers = orderedAuthors.map((r) => ({
    id: r.id,
    name: r.name,
    photoUrl: r.photo_url,
    initials: getInitials(r.name),
  }));

  const project = row.project
    ? {
      slug: row.project.slug,
      status: row.project.status,
      title: row.project.title,
      summary: row.project.description,
    }
    : undefined;

  return (
    <main>
      <PublicationDetailHero publication={publication} />
      <div className="mx-auto grid w-[min(calc(100%_-_48px),1240px)] grid-cols-[1fr_320px] gap-16 py-16 max-sm:w-[calc(100%_-_32px)] max-sm:grid-cols-1">
        <PublicationOverview summary={row.summary} project={project} />
        <PublicationSidebar publication={publication} researchers={researchers} />
      </div>
    </main>
  );
}