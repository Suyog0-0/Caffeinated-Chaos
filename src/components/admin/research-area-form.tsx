"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { LoaderCircle, Save } from "lucide-react";
import {
  createResearchAreaAction,
  updateResearchAreaAction,
} from "@/app/research-area-actions";

export type ResearchAreaFormValues = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  is_active: boolean;
  publish_status: string;
  is_demo_data: boolean;
};

const fieldGrid = "grid grid-cols-1 items-start gap-x-6 gap-y-6 p-5 sm:grid-cols-2 sm:p-7 [&_label]:grid [&_label]:gap-2 [&_label]:text-[13px] [&_label]:font-bold [&_label]:text-[#33473e] [&_input:not([type=checkbox])]:min-h-12 [&_input:not([type=checkbox])]:w-full [&_input:not([type=checkbox])]:border [&_input:not([type=checkbox])]:border-[#c7cac3] [&_input:not([type=checkbox])]:bg-white [&_input:not([type=checkbox])]:px-3 [&_input:not([type=checkbox])]:py-2.5 [&_input:not([type=checkbox])]:text-sm [&_input:not([type=checkbox])]:font-normal [&_input:not([type=checkbox])]:text-[#17251f] [&_input:not([type=checkbox])]:outline-none [&_input:not([type=checkbox])]:focus:border-[#153c2e] [&_input:not([type=checkbox])]:focus:ring-2 [&_input:not([type=checkbox])]:focus:ring-[#153c2e]/10 [&_select]:min-h-12 [&_select]:w-full [&_select]:border [&_select]:border-[#c7cac3] [&_select]:bg-white [&_select]:px-3 [&_select]:text-sm [&_select]:font-normal [&_select]:text-[#17251f] [&_select]:outline-none [&_select]:focus:border-[#153c2e] [&_select]:focus:ring-2 [&_select]:focus:ring-[#153c2e]/10 [&_textarea]:min-h-36 [&_textarea]:w-full [&_textarea]:resize-y [&_textarea]:border [&_textarea]:border-[#c7cac3] [&_textarea]:bg-white [&_textarea]:px-3 [&_textarea]:py-2.5 [&_textarea]:text-sm [&_textarea]:font-normal [&_textarea]:leading-6 [&_textarea]:text-[#17251f] [&_textarea]:outline-none [&_textarea]:focus:border-[#153c2e] [&_textarea]:focus:ring-2 [&_textarea]:focus:ring-[#153c2e]/10";
const checkboxField = "!flex min-h-16 items-start gap-3 border border-[#d4d5ce] bg-[#f7f7f3] p-4 sm:col-span-2 [&>input]:mt-0.5 [&>input]:size-4 [&>input]:accent-[#153c2e] [&>span]:grid [&>span]:gap-0.5 [&_small]:font-normal [&_small]:leading-5 [&_small]:text-[#68756f]";

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
    <form action={action} className="mt-8">
      <section className="border border-[#d4d5ce] bg-[#fffefb]">
        <div className="border-b border-[#d4d5ce] px-5 py-5 sm:px-7">
          <h2 className="text-lg font-bold text-[#17251f]">Area details</h2>
          <p className="mt-1 text-sm leading-6 text-[#68756f]">Manage the label and description used to group research across the public site.</p>
        </div>

        <div className={fieldGrid}>
          <label>
            <span>Name <em className="ml-1 text-[11px] font-normal not-italic text-[#8f3939]">Required</em></span>
            <input name="name" onChange={(event) => updateValue("name", event.target.value)} placeholder="Artificial Intelligence" required value={values.name} />
          </label>
          <label>
            <span>URL slug <em className="ml-1 text-[11px] font-normal not-italic text-[#8f3939]">Required</em></span>
            <input autoCapitalize="none" name="slug" onChange={(event) => updateValue("slug", event.target.value)} placeholder="artificial-intelligence" required spellCheck={false} value={values.slug} />
            <small className="font-normal leading-5 text-[#68756f]">Lowercase letters, numbers, and hyphens only.</small>
          </label>
          <label className="sm:col-span-2">
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
          <label className={checkboxField}>
            <input checked={values.is_active} name="is_active" onChange={(event) => updateValue("is_active", event.target.checked)} type="checkbox" />
            <span><strong>Active area</strong><small>Allow this area to be used across the site.</small></span>
          </label>
          <label className={checkboxField}>
            <input checked={values.is_demo_data} name="is_demo_data" onChange={(event) => updateValue("is_demo_data", event.target.checked)} type="checkbox" />
            <span><strong>Demo data</strong><small>Mark this area as seeded sample content.</small></span>
          </label>
        </div>
      </section>

      {state?.error && <p className="mt-4 border border-[#d8bcbc] bg-[#f7eaea] px-4 py-3 text-sm text-[#7a3030]" role="alert">{state.error}</p>}

      <footer className="mt-5 flex items-center justify-end gap-3">
        <Link className="inline-flex min-h-11 items-center px-4 text-[13px] font-semibold text-[#53645c] hover:text-[#153c2e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#153c2e]" href="/admin/research-areas">Cancel</Link>
        <button className="inline-flex min-h-11 items-center gap-2 bg-[#153c2e] px-5 text-[13px] font-bold text-white hover:bg-[#204e3a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#153c2e] disabled:cursor-not-allowed disabled:opacity-55" disabled={pending} type="submit">
          {pending ? <LoaderCircle className="animate-spin" size={18} /> : <Save size={18} />}
          {pending ? "Saving…" : researchArea ? "Save changes" : "Create research area"}
        </button>
      </footer>
    </form>
  );
}
