import { ProjectForm } from "@/components/admin/project-form";
import { requireAdmin } from "@/app/admin/admin-auth";

export default async function NewProjectPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("research_area").select("id, name").order("name");

  return (
    <div className="admin-page-content admin-editor-page">
      <header className="admin-page-header"><div><p>Projects</p><h1>Add project</h1></div></header>
      <ProjectForm researchAreas={data ?? []} />
    </div>
  );
}
