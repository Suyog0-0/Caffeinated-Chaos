import { createClient } from "@/supabase/client";

export type ResearchArea = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  project_count: number;
  publication_count: number;
};

export async function getResearchAreas(): Promise<ResearchArea[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("research_area")
    .select(`
      id,
      slug,
      name,
      description,
      publication:publication(count),
      project:project(count)
    `)
    .eq("is_active", true)
    .eq("publish_status", "published")
    .order("name", { ascending: true })
    .limit(3);
    
  if (error) {
    console.error("Failed to fetch research areas:", error);
    return [];
  }

  return data.map((area) => ({
    id: area.id,
    slug: area.slug,
    name: area.name,
    description: area.description,
    project_count: area.project?.[0]?.count ?? 0,
    publication_count: area.publication?.[0]?.count ?? 0,
  }));
}

