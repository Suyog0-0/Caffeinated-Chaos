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
  const supabase = await createClient();

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

  const randomIndex = Math.floor(Math.random() * data.length);

  return data[randomIndex] as FeaturedProjectData;
}

