import { PublicationForm } from "@/components/admin/publication-form";
import { requireAdmin } from "@/app/admin/admin-auth";
import { adminTw } from "@/components/admin/admin-tailwind";

export default async function NewPublicationPage() {
  const { supabase } = await requireAdmin();
  const [projectsResult, areasResult, researchersResult] = await Promise.all([
    supabase.from("project").select("id, title").order("title"),
    supabase.from("research_area").select("id, name").order("name"),
    supabase.from("researcher").select("id, name").order("name"),
  ]);

  return (
    <div className={`${adminTw.pageContent} ${adminTw.editorPage}`}>
      <header className={adminTw.pageHeader}>
        <div><p>Publications</p><h1>Add publication</h1></div>
      </header>
      <PublicationForm
        projects={projectsResult.data ?? []}
        researchAreas={areasResult.data ?? []}
        researchers={researchersResult.data ?? []}
      />
    </div>
  );
}
