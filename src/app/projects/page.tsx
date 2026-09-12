import { createClient } from "@/supabase/client";
import { ProjectFilters } from "@/components/projects/project-filters";
import { ProjectList } from "@/components/projects/project-list";
import { ProjectsHero } from "@/components/projects/projects-hero";

export default async function ProjectsPage() {
  const supabase = createClient();

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
      <ProjectFilters />
      <section className="mx-auto w-[min(calc(100%_-_48px),1240px)] max-sm:w-[calc(100%_-_32px)] pt-6">
        <ProjectList projects={projects} />
      </section>
    </main>
  );
}
