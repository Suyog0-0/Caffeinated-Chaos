"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { LoaderCircle, Save } from "lucide-react";
import {
  createOpportunityAction,
  updateOpportunityAction,
} from "@/app/opportunity-actions";
import { adminTw } from "@/components/admin/admin-tailwind";

export type OpportunityFormValues = {
  id: string;
  title: string;
  opportunity_type: string | null;
  description: string | null;
  deadline: string | null;
  application_url: string | null;
  status: string | null;
  publish_status: string | null;
  is_demo_data: boolean | null;
  research_area_id: string | null;
  grant_id: string | null;
  event_id: string | null;
  project_id: string | null;
};

export type OpportunityOption = { id: string; label: string };

export function OpportunityForm({
  opportunity,
  researchAreas,
  grants,
  events,
  projects,
}: {
  opportunity?: OpportunityFormValues;
  researchAreas: OpportunityOption[];
  grants: OpportunityOption[];
  events: OpportunityOption[];
  projects: OpportunityOption[];
}) {
  const saveAction = opportunity
    ? updateOpportunityAction.bind(null, opportunity.id)
    : createOpportunityAction;
  const [state, action, pending] = useActionState(saveAction, undefined);
  const [values, setValues] = useState({
    title: opportunity?.title ?? "",
    opportunity_type: opportunity?.opportunity_type ?? "",
    description: opportunity?.description ?? "",
    deadline: opportunity?.deadline?.slice(0, 10) ?? "",
    application_url: opportunity?.application_url ?? "",
    status: opportunity?.status === "closed" ? "closed" : "open",
    publish_status: opportunity?.publish_status ?? "draft",
    is_demo_data: opportunity?.is_demo_data ?? false,
    research_area_id: opportunity?.research_area_id ?? "",
    grant_id: opportunity?.grant_id ?? "",
    event_id: opportunity?.event_id ?? "",
    project_id: opportunity?.project_id ?? "",
  });

  function update(name: keyof typeof values, value: string | boolean) {
    setValues((current) => ({ ...current, [name]: value }));
  }

  return (
    <form action={action} className={adminTw.editorForm}>
      <section>
        <div className={adminTw.formHeading}>
          <div><h2>Opportunity details</h2><p>Information shown on the public opportunities page.</p></div>
        </div>
        <div className={adminTw.formGrid}>
          <label className={adminTw.fieldFull}>
            Title <span className={adminTw.required}>Required</span>
            <input name="title" onChange={(event) => update("title", event.target.value)} placeholder="Research assistantship in applied AI" required value={values.title} />
          </label>
          <label>
            Opportunity type
            <input list="opportunity-types" name="opportunity_type" onChange={(event) => update("opportunity_type", event.target.value)} placeholder="Research assistantship" value={values.opportunity_type} />
            <datalist id="opportunity-types"><option value="Research assistantship" /><option value="Internship" /><option value="Call for papers" /><option value="Collaboration" /><option value="Fellowship" /><option value="Student job" /></datalist>
          </label>
          <label>
            Deadline
            <input name="deadline" onChange={(event) => update("deadline", event.target.value)} type="date" value={values.deadline} />
            <small className={adminTw.fieldHelp}>Leave blank for a rolling opportunity.</small>
          </label>
          <label>
            Opportunity status
            <select name="status" onChange={(event) => update("status", event.target.value)} value={values.status}><option value="open">Open</option><option value="closed">Closed</option></select>
          </label>
          <label>
            Publication status
            <select name="publish_status" onChange={(event) => update("publish_status", event.target.value)} value={values.publish_status}><option value="draft">Draft</option><option value="preview">Preview</option><option value="published">Published</option></select>
          </label>
          <label className={adminTw.fieldFull}>
            Description
            <textarea name="description" onChange={(event) => update("description", event.target.value)} placeholder="A concise overview of the opportunity." rows={6} value={values.description} />
          </label>
          <label className={adminTw.fieldFull}>
            Application URL
            <input name="application_url" onChange={(event) => update("application_url", event.target.value)} placeholder="https://…" type="url" value={values.application_url} />
          </label>
          <label className={`${adminTw.checkbox} ${adminTw.fieldFull}`}>
            <input checked={values.is_demo_data} name="is_demo_data" onChange={(event) => update("is_demo_data", event.target.checked)} type="checkbox" />
            <span><strong>Demo data</strong><small>Mark this opportunity as seeded sample content.</small></span>
          </label>
        </div>
      </section>

      <section>
        <div className={adminTw.formHeading}>
          <div><h2>Linked context</h2><p>Connect this opportunity to the most relevant research and activity records.</p></div>
        </div>
        <div className={adminTw.formGrid}>
          <RelationSelect label="Research area" name="research_area_id" onChange={(value) => update("research_area_id", value)} options={researchAreas} value={values.research_area_id} />
          <RelationSelect label="Project" name="project_id" onChange={(value) => update("project_id", value)} options={projects} value={values.project_id} />
          <RelationSelect label="Grant" name="grant_id" onChange={(value) => update("grant_id", value)} options={grants} value={values.grant_id} />
          <RelationSelect label="Event" name="event_id" onChange={(value) => update("event_id", value)} options={events} value={values.event_id} />
        </div>
      </section>

      {state?.error && <p className={adminTw.editorError} role="alert">{state.error}</p>}
      <footer className={adminTw.formActions}>
        <Link href="/admin/opportunities">Cancel</Link>
        <button disabled={pending} type="submit">
          {pending ? <LoaderCircle className={adminTw.spin} size={18} /> : <Save size={18} />}
          {pending ? "Saving…" : opportunity ? "Save changes" : "Create opportunity"}
        </button>
      </footer>
    </form>
  );
}

function RelationSelect({
  label,
  name,
  value,
  options,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  options: OpportunityOption[];
  onChange: (value: string) => void;
}) {
  return (
    <label>
      {label}
      <select name={name} onChange={(event) => onChange(event.target.value)} value={value}>
        <option value="">Not linked</option>
        {options.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
      </select>
    </label>
  );
}
