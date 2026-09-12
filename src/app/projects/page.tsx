import { Suspense } from "react";
import { createServerClient } from "@/supabase/server";
import { ProjectFilters } from "@/components/projects/project-filters";
import { ProjectList } from "@/components/projects/project-list";
import { ProjectsHero } from "@/components/projects/projects-hero";

// Nothing on this page is request-specific (page.tsx never reads searchParams),
// so cache it and revalidate periodically instead of fetching on every request.
export const revalidate = 300;

export default async function ProjectsPage() {
  const supabase = createServerClient();

  const { data } = await supabase
    .from("project")
    .select("slug, status, title, description, research_area(name, slug), project_researcher(role, researcher(name))")
    .eq("publish_status", "published")
    .order("created_at", { ascending: false });

  const projects = (data ?? []).map((p) => ({
    slug: p.slug,
    status: p.status,
    area: (p.research_area as unknown as { slug: string } | null)?.slug ?? "—",
    title: p.title,
    summary: p.description ?? "",
    lead:
      (p.project_researcher as unknown as { role: string; researcher: { name: string } }[])
        ?.find((r) => r.role === "lead")?.researcher?.name ?? "—",
  }));

  // Build the area filter options from the actual data instead of a hardcoded
  // guess, so the "Research Area" filter always matches real project data.
  const areaOptions = Array.from(
    new Map(projects.filter((p) => p.areaSlug).map((p) => [p.areaSlug, p.area])).entries()
  ).map(([slug, name]) => ({ slug, name }));

  return (
    <main className="pb-24">
      <ProjectsHero />
      <Suspense fallback={null}>
        <ProjectFilters areaOptions={areaOptions} />
      </Suspense>
      <section className="mx-auto w-[min(calc(100%_-_48px),1240px)] max-sm:w-[calc(100%_-_32px)] pt-6">
        <Suspense fallback={null}>
          <ProjectList projects={projects} />
        </Suspense>
      </section>
    </main>
  );
}
