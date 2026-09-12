import { ResearcherForm } from "@/components/admin/researcher-form";
import { adminTw } from "@/components/admin/admin-tailwind";

export default function NewResearcherPage() {
  return (
    <div className={`${adminTw.pageContent} ${adminTw.editorPage}`}>
      <header className={adminTw.pageHeader}>
        <div><p>Researchers</p><h1>Add researcher</h1></div>
      </header>
      <ResearcherForm />
    </div>
  );
}
