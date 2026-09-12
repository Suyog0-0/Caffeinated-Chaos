import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ProjectForm, type ProjectFormValues } from "@/components/admin/project-form";
import { requireAdmin } from "@/src/app/admin/admin-auth";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const [{ data: project }, { data: researchAreas }] = await Promise.all([
    supabase.from("project").select("id, slug, research_area_id, title, description, objective, status, start_date, end_date, publish_status, is_demo_data").eq("id", id).maybeSingle(),
    supabase.from("research_area").select("id, name").order("name"),
  ]);

  if (!project) notFound();

  return (
    <div className="admin-page-content admin-editor-page">
      <header className="admin-page-header"><div><Link className="admin-header-back-link" href="/admin/projects"><ArrowLeft size={16} /> Projects</Link><h1>Edit project</h1></div></header>
      <ProjectForm project={project as ProjectFormValues} researchAreas={researchAreas ?? []} />
    </div>
  );
}
