import { OpportunityForm, type OpportunityOption } from "@/components/admin/opportunity-form";
import { requireAdmin } from "@/app/admin/admin-auth";
import { adminTw } from "@/components/admin/admin-tailwind";

export default async function NewOpportunityPage() {
  const { supabase } = await requireAdmin();
  const [{ data: areas }, { data: grants }, { data: events }, { data: projects }] = await Promise.all([
    supabase.from("research_area").select("id, name").order("name"),
    supabase.from("grant").select("id, title").order("title"),
    supabase.from("event").select("id, title").order("title"),
    supabase.from("project").select("id, title").order("title"),
  ]);

  return (
    <div className={`${adminTw.pageContent} ${adminTw.editorPage}`}>
      <header className={adminTw.pageHeader}><div><p>Opportunities</p><h1>Add opportunity</h1></div></header>
      <OpportunityForm
        events={(events ?? []).map(({ id, title }) => ({ id, label: title })) as OpportunityOption[]}
        grants={(grants ?? []).map(({ id, title }) => ({ id, label: title })) as OpportunityOption[]}
        projects={(projects ?? []).map(({ id, title }) => ({ id, label: title })) as OpportunityOption[]}
        researchAreas={(areas ?? []).map(({ id, name }) => ({ id, label: name })) as OpportunityOption[]}
      />
    </div>
  );
}
