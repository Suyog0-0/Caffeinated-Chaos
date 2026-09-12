import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  OpportunityForm,
  type OpportunityFormValues,
  type OpportunityOption,
} from "@/components/admin/opportunity-form";
import { requireAdmin } from "@/app/admin/admin-auth";
import { adminTw } from "@/components/admin/admin-tailwind";

export default async function EditOpportunityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const [{ data: opportunity, error: opportunityError }, { data: areas }, { data: grants }, { data: events }, { data: projects }] = await Promise.all([
    supabase.from("opportunity").select("id, title, opportunity_type, description, deadline, application_url, status, publish_status, is_demo_data, research_area_id, grant_id, event_id, project_id").eq("id", id).maybeSingle(),
    supabase.from("research_area").select("id, name").order("name"),
    supabase.from("grant").select("id, title").order("title"),
    supabase.from("event").select("id, title").order("title"),
    supabase.from("project").select("id, title").order("title"),
  ]);

  if (opportunityError) {
    throw new Error(`Opportunity could not be loaded: ${opportunityError.message}`);
  }
  if (!opportunity) notFound();

  return (
    <div className={`${adminTw.pageContent} ${adminTw.editorPage}`}>
      <header className={adminTw.pageHeader}><div><Link className={adminTw.headerBackLink} href="/admin/opportunities"><ArrowLeft size={16} /> Opportunities</Link><h1>Edit opportunity</h1></div></header>
      <OpportunityForm
        events={(events ?? []).map(({ id: optionId, title }) => ({ id: optionId, label: title })) as OpportunityOption[]}
        grants={(grants ?? []).map(({ id: optionId, title }) => ({ id: optionId, label: title })) as OpportunityOption[]}
        opportunity={opportunity as OpportunityFormValues}
        projects={(projects ?? []).map(({ id: optionId, title }) => ({ id: optionId, label: title })) as OpportunityOption[]}
        researchAreas={(areas ?? []).map(({ id: optionId, name }) => ({ id: optionId, label: name })) as OpportunityOption[]}
      />
    </div>
  );
}
