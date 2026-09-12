import { createClient } from "@/supabase/client";

export type ResearchMetrics = {
  researchers: number;
  projects: number;
  publications: number;
  researchAreas: number;
};

export async function getResearchMetrics(): Promise<ResearchMetrics> {
  const supabase = await createClient();

  const [
    researchersResult,
    projectsResult,
    publicationsResult,
    researchAreasResult,
  ] = await Promise.all([
    supabase
      .from("researcher")
      .select("*", { count: "exact", head: true })
      .eq("publish_status", "published"),

    supabase
      .from("project")
      .select("*", { count: "exact", head: true })
      .eq("publish_status", "published"),

    supabase
      .from("publication")
      .select("*", { count: "exact", head: true })
      .eq("publish_status", "published"),

    supabase
      .from("research_area")
      .select("*", { count: "exact", head: true })
      .eq("publish_status", "published")
      .eq("is_active", true),
  ]);

  if (researchersResult.error) {
    console.error("Failed to count researchers:", researchersResult.error);
  }

  if (projectsResult.error) {
    console.error("Failed to count projects:", projectsResult.error);
  }

  if (publicationsResult.error) {
    console.error("Failed to count publications:", publicationsResult.error);
  }

  if (researchAreasResult.error) {
    console.error(
      "Failed to count research areas:",
      researchAreasResult.error,
    );
  }

  return {
    researchers: researchersResult.count ?? 0,
    projects: projectsResult.count ?? 0,
    publications: publicationsResult.count ?? 0,
    researchAreas: researchAreasResult.count ?? 0,
  };
}
