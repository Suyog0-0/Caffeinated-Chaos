// src/app/publications/page.tsx
import { createServerClient } from "@/supabase/server";
import { Inter } from "next/font/google";
import { PublicationsHero } from "@/components/publications/publications-hero";
import { PublicationLibrary } from "@/components/publications/publication-library";

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
});

type ResearcherRow = { name: string };
type PublicationAuthorRow = { author_order: number; researcher: ResearcherRow | null };
type PublicationRow = {
  id: string;
  publication_type: string;
  year: number;
  title: string;
  venue: string;
  research_area: { name: string } | null;
  publication_author: PublicationAuthorRow[];
};


export const revalidate = 300;

export default async function PublicationsPage() {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("publication")
    .select(
      `
      id,
      publication_type,
      year,
      title,
      venue,
      research_area:research_area_id ( name ),
      publication_author (
        author_order,
        researcher:researcher_id ( name )
      )
    `
    )
    .eq("publish_status", "published")
    .order("year", { ascending: false });

  if (error) {
    console.error("Failed to load publications:", error);
  }

  const rows = (data ?? []) as unknown as PublicationRow[];

  const publications = rows.map((row) => {
    const authors = [...row.publication_author]
      .sort((a, b) => a.author_order - b.author_order)
      .map((pa) => pa.researcher?.name)
      .filter((name): name is string => Boolean(name))
      .join(", ");

    return {
      id: row.id,
      type: row.publication_type,
      year: row.year,
      title: row.title,
      authors,
      venue: row.venue,
      area: row.research_area?.name ?? "Unassigned",
    };
  });

  const types = Array.from(new Set(publications.map((p) => p.type))).sort();
  const years = Array.from(new Set(publications.map((p) => p.year))).sort((a, b) => b - a);
  const authors = Array.from(
    new Set(publications.flatMap((p) => p.authors.split(", ").filter(Boolean)))
  ).sort();
  const areas = Array.from(new Set(publications.map((p) => p.area))).sort();

  return (
    <main className={inter.className}>
      <PublicationsHero />
      <PublicationLibrary
        publications={publications}
        types={types}
        years={years}
        authors={authors}
        areas={areas}
      />
    </main>
  );
}
