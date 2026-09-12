"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { LoaderCircle, Save } from "lucide-react";
import {
  createProjectAction,
  updateProjectAction,
} from "@/app/projects-actions";
import { PeoplePicker, type PersonOption, type SelectedPerson } from "@/components/admin/people-picker";
import { adminTw } from "@/components/admin/admin-tailwind";

export type ProjectFormValues = {
  id: string;
  slug: string;
  research_area_id: string | null;
  title: string;
  description: string | null;
  objective: string | null;
  status: string;
  start_date: string | null;
  end_date: string | null;
  publish_status: string;
  is_demo_data: boolean;
};

type ResearchAreaOption = { id: string; name: string };

export function ProjectForm({
  project,
  researchAreas,
  researchers,
  teamMembers = [],
}: {
  project?: ProjectFormValues;
  researchAreas: ResearchAreaOption[];
  researchers: PersonOption[];
  teamMembers?: SelectedPerson[];
}) {
  const saveAction = project
    ? updateProjectAction.bind(null, project.id)
    : createProjectAction;
  const [state, action, pending] = useActionState(saveAction, undefined);
  const [values, setValues] = useState({
    title: project?.title ?? "",
    slug: project?.slug ?? "",
    research_area_id: project?.research_area_id ?? "",
    description: project?.description ?? "",
    objective: project?.objective ?? "",
    status: project?.status ?? "proposed",
    start_date: project?.start_date?.slice(0, 10) ?? "",
    end_date: project?.end_date?.slice(0, 10) ?? "",
    publish_status: project?.publish_status ?? "draft",
    is_demo_data: project?.is_demo_data ?? false,
  });

  function updateValue(name: keyof typeof values, value: string | boolean) {
    setValues((current) => ({ ...current, [name]: value }));
  }

  return (
    <form action={action} className={adminTw.editorForm}>
      <section>
        <div className={adminTw.formHeading}>
          <div><h2>Project details</h2><p>Core information shown in the project directory and detail page.</p></div>
        </div>
        <div className={adminTw.formGrid}>
          <label className={adminTw.fieldFull}>
            Title <span className={adminTw.required}>Required</span>
            <input name="title" onChange={(event) => updateValue("title", event.target.value)} required value={values.title} />
          </label>
          <label>
            URL slug <span className={adminTw.required}>Required</span>
            <input name="slug" onChange={(event) => updateValue("slug", event.target.value)} placeholder="urban-air-quality-study" required value={values.slug} />
            <small className={adminTw.fieldHelp}>Lowercase letters, numbers, and hyphens only.</small>
          </label>
          <label>
            Research area
            <select name="research_area_id" onChange={(event) => updateValue("research_area_id", event.target.value)} value={values.research_area_id}>
              <option value="">Not assigned</option>
              {researchAreas.map((area) => <option key={area.id} value={area.id}>{area.name}</option>)}
            </select>
          </label>
          <label>
            Project status
            <select name="status" onChange={(event) => updateValue("status", event.target.value)} value={values.status}>
              <option value="proposed">Proposed</option><option value="ongoing">Ongoing</option><option value="completed">Completed</option><option value="archived">Archived</option>
            </select>
          </label>
          <label>
            Publication status
            <select name="publish_status" onChange={(event) => updateValue("publish_status", event.target.value)} value={values.publish_status}>
              <option value="draft">Draft</option><option value="preview">Preview</option><option value="published">Published</option>
            </select>
          </label>
          <label>
            Start date
            <input name="start_date" onChange={(event) => updateValue("start_date", event.target.value)} type="date" value={values.start_date} />
          </label>
          <label>
            End date
            <input min={values.start_date || undefined} name="end_date" onChange={(event) => updateValue("end_date", event.target.value)} type="date" value={values.end_date} />
          </label>
          <label className={adminTw.fieldFull}>
            Description
            <textarea name="description" onChange={(event) => updateValue("description", event.target.value)} placeholder="A concise overview of the project." rows={6} value={values.description} />
          </label>
          <label className={adminTw.fieldFull}>
            Objective
            <textarea name="objective" onChange={(event) => updateValue("objective", event.target.value)} placeholder="What this project aims to achieve." rows={6} value={values.objective} />
          </label>
          <label className={`${adminTw.checkbox} ${adminTw.fieldFull}`}>
            <input checked={values.is_demo_data} name="is_demo_data" onChange={(event) => updateValue("is_demo_data", event.target.checked)} type="checkbox" />
            <span><strong>Demo data</strong><small>Mark this project as seeded sample content.</small></span>
          </label>
        </div>
      </section>

      <section>
        <div className={adminTw.formHeading}>
          <div><h2>Team</h2><p>Researchers linked to this project, and their role.</p></div>
        </div>
        <div className={adminTw.formGrid}>
          <PeoplePicker
            emptyLabel="No team members added yet."
            fieldName="member_ids"
            initialSelected={teamMembers}
            label="Add team member"
            people={researchers}
            roleFieldName="member_roles"
            roleOptions={[{ value: "team_member", label: "Team member" }, { value: "lead", label: "Lead" }]}
          />
        </div>
      </section>

      {state?.error && <p className={adminTw.editorError} role="alert">{state.error}</p>}
      <footer className={adminTw.formActions}>
        <Link href="/admin/projects">Cancel</Link>
        <button disabled={pending} type="submit">
          {pending ? <LoaderCircle className={adminTw.spin} size={18} /> : <Save size={18} />}
          {pending ? "Saving…" : project ? "Save changes" : "Create project"}
        </button>
      </footer>
    </form>
  );
}
