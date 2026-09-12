import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ProjectForm, type ProjectFormValues } from "@/components/admin/project-form";
import { requireAdmin } from "@/app/admin/admin-auth";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const [{ data: project }, { data: researchAreas }, { data: researchers }, { data: team }] = await Promise.all([
    supabase.from("project").select("id, slug, research_area_id, title, description, objective, status, start_date, end_date, publish_status, is_demo_data").eq("id", id).maybeSingle(),
    supabase.from("research_area").select("id, name").order("name"),
    supabase.from("researcher").select("id, name, position, department, email, photo_url").order("name"),
    supabase.from("project_researcher").select("role, researcher:researcher_id(id, name, position, department, email, photo_url)").eq("project_id", id),
  ]);

  if (!project) notFound();

  type TeamResearcher = {
    id: string;
    name: string;
    position: string | null;
    department: string | null;
    email: string | null;
    photo_url: string | null;
  };
  const teamMembers = (team ?? [])
    .filter((row) => row.researcher)
    .map((row) => {
      const r = row.researcher as unknown as TeamResearcher;
      return {
        id: r.id,
        name: r.name,
        role: row.role,
        position: r.position,
        department: r.department,
        email: r.email,
        photo_url: r.photo_url,
      };
    });

  return (
    <div className="admin-page-content admin-editor-page">
      <header className="admin-page-header"><div><Link className="admin-header-back-link" href="/admin/projects"><ArrowLeft size={16} /> Projects</Link><h1>Edit project</h1></div></header>
      <ProjectForm project={project as ProjectFormValues} researchAreas={researchAreas ?? []} researchers={researchers ?? []} teamMembers={teamMembers} />
    </div>
  );
}