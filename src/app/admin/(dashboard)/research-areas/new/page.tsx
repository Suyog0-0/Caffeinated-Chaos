import { ResearchAreaForm } from "@/components/admin/research-area-form";
import { requireAdmin } from "@/app/admin/admin-auth";

export default async function NewResearchAreaPage() {
  await requireAdmin();

  return (
    <div className="admin-page-content admin-editor-page">
      <header className="admin-page-header">
        <div><p>Research Areas</p><h1>Add research area</h1></div>
      </header>
      <ResearchAreaForm />
    </div>
  );
}
