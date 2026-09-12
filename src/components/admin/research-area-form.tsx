"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { LoaderCircle, Save } from "lucide-react";
import {
  createResearchAreaAction,
  updateResearchAreaAction,
} from "@/app/admin/research-area-actions";

export type ResearchAreaFormValues = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  is_active: boolean;
  publish_status: string;
  is_demo_data: boolean;
};

export function ResearchAreaForm({ researchArea }: { researchArea?: ResearchAreaFormValues }) {
  const saveAction = researchArea
    ? updateResearchAreaAction.bind(null, researchArea.id)
    : createResearchAreaAction;
  const [state, action, pending] = useActionState(saveAction, undefined);
  const [values, setValues] = useState({
    name: researchArea?.name ?? "",
    slug: researchArea?.slug ?? "",
    description: researchArea?.description ?? "",
    is_active: researchArea?.is_active ?? true,
    publish_status: researchArea?.publish_status ?? "draft",
    is_demo_data: researchArea?.is_demo_data ?? false,
  });

  function updateValue(name: keyof typeof values, value: string | boolean) {
    setValues((current) => ({ ...current, [name]: value }));
  }

  return (
    <form action={action} className="admin-editor-form">
      <section>
        <div className="admin-form-heading">
          <h2>Area details</h2>
          <p>Manage the label and description used to group research across the public site.</p>
        </div>

        <div className="admin-form-grid">
          <label>
            Name <span className="admin-required">Required</span>
            <input name="name" onChange={(event) => updateValue("name", event.target.value)} placeholder="Artificial Intelligence" required value={values.name} />
          </label>
          <label>
            URL slug <span className="admin-required">Required</span>
            <input autoCapitalize="none" name="slug" onChange={(event) => updateValue("slug", event.target.value)} placeholder="artificial-intelligence" required spellCheck={false} value={values.slug} />
            <small className="admin-field-help">Lowercase letters, numbers, and hyphens only.</small>
          </label>
          <label className="admin-field-full">
            Description
            <textarea name="description" onChange={(event) => updateValue("description", event.target.value)} placeholder="A short description of this research area." rows={7} value={values.description} />
          </label>
          <label>
            Publication status
            <select name="publish_status" onChange={(event) => updateValue("publish_status", event.target.value)} value={values.publish_status}>
              <option value="draft">Draft</option>
              <option value="preview">Preview</option>
              <option value="published">Published</option>
            </select>
          </label>
          <div />
          <label className="admin-checkbox admin-field-full">
            <input checked={values.is_active} name="is_active" onChange={(event) => updateValue("is_active", event.target.checked)} type="checkbox" />
            <span><strong>Active area</strong><small>Allow this area to be used across the site.</small></span>
          </label>
          <label className="admin-checkbox admin-field-full">
            <input checked={values.is_demo_data} name="is_demo_data" onChange={(event) => updateValue("is_demo_data", event.target.checked)} type="checkbox" />
            <span><strong>Demo data</strong><small>Mark this area as seeded sample content.</small></span>
          </label>
        </div>
      </section>

      {state?.error && <p className="admin-editor-error" role="alert">{state.error}</p>}

      <footer className="admin-form-actions">
        <Link href="/admin/research-areas">Cancel</Link>
        <button disabled={pending} type="submit">
          {pending ? <LoaderCircle className="admin-spin" size={18} /> : <Save size={18} />}
          {pending ? "Saving…" : researchArea ? "Save changes" : "Create research area"}
        </button>
      </footer>
    </form>
  );
}
