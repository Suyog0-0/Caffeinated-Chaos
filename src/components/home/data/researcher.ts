import { createClient } from "@/supabase/client";

export type Researcher = {
  id: string;
  name: string;
  position: string | null;
  department: string | null;
  photo_url: string | null;
};

export async function getResearchers(): Promise<Researcher[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("researcher")
    .select("id, name, position, department, photo_url")
    .eq("publish_status", "published")
    .order("name", { ascending: true })
    .limit(3);

  if (error) {
    console.error("Failed to fetch researchers:", error);
    return [];
  }

  return data as Researcher[];
}
