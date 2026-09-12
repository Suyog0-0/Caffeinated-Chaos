import { createClient } from "@/supabase/client"

export type Publication = {
  id: string;
  title: string;
  publication_type: string | null;
  year: number | null;
  venue: string | null;
};

export async function getPublications(): Promise<Publication[]> {
  const supabase = await createClient();

  const { data, error} = await supabase
  .from("publication")
  .select("id, title, publication_type, year, venue")
  .eq("publish_status", "published")
  .order("year", {ascending: false})
  .limit(3);

  if (error) {
    console.error("Failed to fetch publications:", error);
    return [];
  }

  return data as Publication[];
}
