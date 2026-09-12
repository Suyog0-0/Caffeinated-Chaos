"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { LoaderCircle, Save } from "lucide-react";
import {
  createPublicationAction,
  updatePublicationAction,
} from "@/app/publications-actions";
import { PeoplePicker, type PersonOption, type SelectedPerson } from "@/components/admin/people-picker";
import { adminTw } from "@/components/admin/admin-tailwind";

export type PublicationFormValues = {
  id: string;
  research_area_id: string | null;
  project_id: string | null;
  title: string;
  publication_type: string | null;
  year: number | null;
  date_of_issue: string | null;
  summary: string | null;
  venue: string | null;
  doi: string | null;
  external_url: string | null;
  publish_status: "draft" | "preview" | "published";
  is_ijmr: boolean;
  is_demo_data: boolean;
};

type RelationOption = { id: string; name: string };
type ProjectOption = { id: string; title: string };

export function PublicationForm({
  publication,
  projects,
  researchAreas,
  researchers,
  authors = [],
}: {
  publication?: PublicationFormValues;
  projects: ProjectOption[];
  researchAreas: RelationOption[];
  researchers: PersonOption[];
  authors?: SelectedPerson[];
}) {
  const submitAction = publication
    ? updatePublicationAction.bind(null, publication.id)
    : createPublicationAction;
  const [state, action, pending] = useActionState(submitAction, undefined);
  const [values, setValues] = useState({
    title: publication?.title ?? "",
    publication_type: publication?.publication_type ?? "",
    year: publication?.year ? String(publication.year) : "",
    date_of_issue: publication?.date_of_issue ?? "",
    summary: publication?.summary ?? "",
    venue: publication?.venue ?? "",
    doi: publication?.doi ?? "",
    external_url: publication?.external_url ?? "",
    research_area_id: publication?.research_area_id ?? "",
    project_id: publication?.project_id ?? "",
    publish_status: publication?.publish_status ?? "draft",
    is_ijmr: publication?.is_ijmr ?? false,
    is_demo_data: publication?.is_demo_data ?? false,
  });

  function updateValue(name: keyof typeof values, value: string | boolean) {
    setValues((current) => ({ ...current, [name]: value }));
  }

  return (
    <form action={action} className={adminTw.editorForm}>
      <section>
        <div className={adminTw.formHeading}>
          <div>
            <h2>Publication details</h2>
            <p>Bibliographic details and publishing controls for this record.</p>
          </div>
        </div>

        <div className={adminTw.formGrid}>
          <label className={adminTw.fieldFull}>
            Title <span className={adminTw.required}>Required</span>
            <input name="title" onChange={(event) => updateValue("title", event.target.value)} required value={values.title} />
          </label>
          <label>
            Publication type
            <select name="publication_type" onChange={(event) => updateValue("publication_type", event.target.value)} value={values.publication_type}>
              <option value="">Not set</option>
              <option value="journal">Journal</option>
              <option value="conference">Conference</option>
              <option value="report">Report</option>
            </select>
          </label>
          <label>
            Publication status
            <select name="publish_status" onChange={(event) => updateValue("publish_status", event.target.value)} value={values.publish_status}>
              <option value="draft">Draft</option>
              <option value="preview">Preview</option>
              <option value="published">Published</option>
            </select>
          </label>
          <label>
            Year
            <input inputMode="numeric" max="2200" min="1800" name="year" onChange={(event) => updateValue("year", event.target.value)} placeholder="2026" type="number" value={values.year} />
          </label>
          <label>
            Date of issue
            <input name="date_of_issue" onChange={(event) => updateValue("date_of_issue", event.target.value)} type="date" value={values.date_of_issue} />
          </label>
          <label>
            Venue
            <input name="venue" onChange={(event) => updateValue("venue", event.target.value)} placeholder="Journal or conference" value={values.venue} />
          </label>
          <label>
            DOI
            <input name="doi" onChange={(event) => updateValue("doi", event.target.value)} placeholder="10.1000/example" value={values.doi} />
          </label>
          <label>
            Research area
            <select name="research_area_id" onChange={(event) => updateValue("research_area_id", event.target.value)} value={values.research_area_id}>
              <option value="">Not linked</option>
              {researchAreas.map((area) => <option key={area.id} value={area.id}>{area.name}</option>)}
            </select>
          </label>
          <label>
            Project
            <select name="project_id" onChange={(event) => updateValue("project_id", event.target.value)} value={values.project_id}>
              <option value="">Not linked</option>
              {projects.map((project) => <option key={project.id} value={project.id}>{project.title}</option>)}
            </select>
          </label>
          <label className={adminTw.fieldFull}>
            External URL
            <input name="external_url" onChange={(event) => updateValue("external_url", event.target.value)} placeholder="https://…" type="url" value={values.external_url} />
          </label>
          <label className={adminTw.fieldFull}>
            Summary
            <textarea name="summary" onChange={(event) => updateValue("summary", event.target.value)} placeholder="A concise summary of the publication." rows={7} value={values.summary} />
          </label>
          <label className={adminTw.checkbox}>
            <input checked={values.is_ijmr} name="is_ijmr" onChange={(event) => updateValue("is_ijmr", event.target.checked)} type="checkbox" />
            <span><strong>IJMR publication</strong><small>Identify this as an IJMR record.</small></span>
          </label>
          <label className={adminTw.checkbox}>
            <input checked={values.is_demo_data} name="is_demo_data" onChange={(event) => updateValue("is_demo_data", event.target.checked)} type="checkbox" />
            <span><strong>Demo data</strong><small>Mark this as seeded sample content.</small></span>
          </label>
        </div>
      </section>

      <section>
        <div className={adminTw.formHeading}>
          <div><h2>Authors</h2><p>Researchers credited on this publication, in author order.</p></div>
        </div>
        <div className={adminTw.formGrid}>
          <PeoplePicker
            emptyLabel="No authors added yet."
            fieldName="author_ids"
            initialSelected={authors}
            label="Add author"
            people={researchers}
          />
        </div>
      </section>

      {state?.error && <p className={adminTw.editorError} role="alert">{state.error}</p>}

      <footer className={adminTw.formActions}>
        <Link href="/admin/publications">Cancel</Link>
        <button disabled={pending} type="submit">
          {pending ? <LoaderCircle className={adminTw.spin} size={18} /> : <Save size={18} />}
          {pending ? "Saving…" : publication ? "Save changes" : "Create publication"}
        </button>
      </footer>
    </form>
  );
}
