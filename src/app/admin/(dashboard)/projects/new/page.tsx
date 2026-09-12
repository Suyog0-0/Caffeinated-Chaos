import { ProjectForm } from "@/components/admin/project-form";
import { requireAdmin } from "@/app/admin/admin-auth";
import { adminTw } from "@/components/admin/admin-tailwind";

export default async function NewProjectPage() {
  const { supabase } = await requireAdmin();
  const [{ data: areas }, { data: researchers }] = await Promise.all([
    supabase.from("research_area").select("id, name").order("name"),
    supabase.from("researcher").select("id, name").order("name"),
  ]);

  return (
    <div className={`${adminTw.pageContent} ${adminTw.editorPage}`}>
      <header className={adminTw.pageHeader}><div><p>Projects</p><h1>Add project</h1></div></header>
      <ProjectForm researchAreas={areas ?? []} researchers={researchers ?? []} />
    </div>
  );
}
