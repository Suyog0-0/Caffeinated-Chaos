import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PublicationForm, type PublicationFormValues } from "@/components/admin/publication-form";
import { requireAdmin } from "@/app/admin/admin-auth";

export default async function EditPublicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const [publicationResult, projectsResult, areasResult, researchersResult, authorsResult] = await Promise.all([
    supabase
      .from("publication")
      .select("id, research_area_id, project_id, title, publication_type, year, date_of_issue, summary, venue, doi, external_url, publish_status, is_ijmr, is_demo_data")
      .eq("id", id)
      .maybeSingle(),
    supabase.from("project").select("id, title").order("title"),
    supabase.from("research_area").select("id, name").order("name"),
    supabase.from("researcher").select("id, name").order("name"),
    supabase.from("publication_author").select("author_order, researcher:researcher_id(id, name)").eq("publication_id", id).order("author_order"),
  ]);

  if (!publicationResult.data) notFound();

  const authors = (authorsResult.data ?? [])
    .filter((row) => row.researcher)
    .map((row) => ({ id: (row.researcher as unknown as { id: string }).id, name: (row.researcher as unknown as { name: string }).name }));

  return (
    <div className="admin-page-content admin-editor-page">
      <header className="admin-page-header">
        <div>
          <Link className="admin-header-back-link" href="/admin/publications"><ArrowLeft size={16} /> Publications</Link>
          <h1>Edit publication</h1>
        </div>
      </header>
      <PublicationForm
        publication={publicationResult.data as PublicationFormValues}
        projects={projectsResult.data ?? []}
        researchAreas={areasResult.data ?? []}
        researchers={researchersResult.data ?? []}
        authors={authors}
      />
    </div>
  );
}