import { createClient } from "@/supabase/client";

export type FeaturedProjectData = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  status: string;
  research_area: {
    name: string;
  } | null;
};

export async function getRandomProject(): Promise<FeaturedProjectData | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("project")
    .select(`
      id,
      slug,
      title,
      description,
      status,
      research_area (
        name
      )
    `)
    .eq("publish_status", "published")
    .eq("status", "ongoing")
    .limit(20);

  if (error) {
    console.error("Failed to fetch featured project:", error);
    return null;
  }

  if (!data || data.length === 0) {
    return null;
  }

  const project = data[Math.floor(Math.random() * data.length)];

  return {
    id: project.id,
    slug: project.slug,
    title: project.title,
    description: project.description,
    status: project.status,
    research_area: project.research_area?.[0] ?? null,
  };
}
