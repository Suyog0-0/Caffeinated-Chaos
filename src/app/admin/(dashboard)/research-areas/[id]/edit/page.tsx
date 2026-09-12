import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  ResearchAreaForm,
  type ResearchAreaFormValues,
} from "@/components/admin/research-area-form";
import { requireAdmin } from "@/src/app/admin/admin-auth";

const postgresUuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function EditResearchAreaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!postgresUuidPattern.test(id)) notFound();

  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("research_area")
    .select("id, slug, name, description, is_active, publish_status, is_demo_data")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) notFound();

  return (
    <div className="admin-page-content admin-editor-page">
      <header className="admin-page-header">
        <div>
          <Link className="admin-header-back-link" href="/admin/research-areas">
            <ArrowLeft size={16} /> Research Areas
          </Link>
          <h1>Edit research area</h1>
        </div>
      </header>
      <ResearchAreaForm researchArea={data as ResearchAreaFormValues} />
    </div>
  );
}
