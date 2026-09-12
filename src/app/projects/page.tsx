import { createServerClient } from "@/src/supabase/server";
import { ProjectFilters } from "@/src/components/projects/project-filters";
import { ProjectList } from "@/src/components/projects/project-list";
import { ProjectsHero } from "@/src/components/projects/projects-hero";

export default async function ProjectsPage() {
  const supabase = createServerClient();

  const { data } = await supabase
    .from("project")
    .select("slug, status, title, description, research_area(name), project_researcher(role, researcher(name))")
    .eq("publish_status", "published")
    .order("created_at", { ascending: false });

  const projects = (data ?? []).map((p) => ({
    slug: p.slug,
    status: p.status,
    area: (p.research_area as unknown as { name: string } | null)?.name ?? "—",
    title: p.title,
    summary: p.description ?? "",
    lead:
      (p.project_researcher as unknown as { role: string; researcher: { name: string } }[])
        ?.find((r) => r.role === "lead")?.researcher?.name ?? "—",
  }));

  return (
    <main className="pb-24">
      <ProjectsHero />
      <section className="mx-auto w-[min(calc(100%_-_48px),1240px)] max-sm:w-[calc(100%_-_32px)]">
        <ProjectFilters />
        <ProjectList projects={projects} />
      </section>
    </main>
  );
}
