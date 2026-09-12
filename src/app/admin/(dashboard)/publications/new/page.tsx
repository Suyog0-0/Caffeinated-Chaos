import { PublicationForm } from "@/components/admin/publication-form";
import { requireAdmin } from "@/app/admin/admin-auth";

export default async function NewPublicationPage() {
  const { supabase } = await requireAdmin();
  const [projectsResult, areasResult] = await Promise.all([
    supabase.from("project").select("id, title").order("title"),
    supabase.from("research_area").select("id, name").order("name"),
  ]);

  return (
    <div className="admin-page-content admin-editor-page">
      <header className="admin-page-header">
        <div><p>Publications</p><h1>Add publication</h1></div>
      </header>
      <PublicationForm projects={projectsResult.data ?? []} researchAreas={areasResult.data ?? []} />
    </div>
  );
}
