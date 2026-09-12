import { createClient } from "@/supabase/client";

export async function getResearchers() {
  const supabase  = await createClient();
  const { data: researcher, error} = await supabase
  .from('researcher')
  .select("id, name, position, department")
  .eq("publish_status", "published")
  .order("name", {ascending:true})
  .limit(5);

  if(error){
    console.log("Failed to fetch researcher", error);
    return [];
  }
   return researcher;
}
