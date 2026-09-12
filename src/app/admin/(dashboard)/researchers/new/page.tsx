import { ResearcherForm } from "@/components/admin/researcher-form";

export default function NewResearcherPage() {
  return (
    <div className="admin-page-content admin-editor-page">
      <header className="admin-page-header">
        <div><p>Researchers</p><h1>Add researcher</h1></div>
      </header>
      <ResearcherForm />
    </div>
  );
}
