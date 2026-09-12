import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  ResearcherForm,
  type ResearcherFormValues,
} from "@/components/admin/researcher-form";
import { requireAdmin } from "@/src/app/admin/admin-auth";

export default async function EditResearcherPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const { data } = await supabase
    .from("researcher")
    .select("id, name, position, department, email, biography, photo_url, google_scholar_url, publish_status, is_demo_data")
    .eq("id", id)
    .maybeSingle();

  if (!data) notFound();

  return (
    <div className="admin-page-content admin-editor-page">
      <header className="admin-page-header">
        <div>
          <Link className="admin-header-back-link" href="/admin/researchers">
            <ArrowLeft size={16} /> Researchers
          </Link>
          <h1>Edit profile</h1>
        </div>
      </header>
      <ResearcherForm researcher={data as ResearcherFormValues} />
    </div>
  );
}
