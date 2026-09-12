"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { ExternalLink, FileText, LoaderCircle, Save } from "lucide-react";
import {
  createEthicsPolicyAction,
  updateEthicsPolicyAction,
} from "@/app/ethics-policy-actions";
import { adminTw } from "@/components/admin/admin-tailwind";

export type EthicsPolicyFormValues = {
  id: string;
  title: string;
  category: string | null;
  content: string | null;
  file_url: string | null;
  publish_status: string | null;
};

export function EthicsPolicyForm({ policy }: { policy?: EthicsPolicyFormValues }) {
  const saveAction = policy
    ? updateEthicsPolicyAction.bind(null, policy.id)
    : createEthicsPolicyAction;
  const [state, action, pending] = useActionState(saveAction, undefined);
  const [fileUrl, setFileUrl] = useState(policy?.file_url ?? "");

  return (
    <form action={action} className={adminTw.editorForm}>
      <section>
        <header className={adminTw.formHeading}>
          <div>
            <h2>Policy details</h2>
            <p>Publish the policy text, attach a supporting document, or provide both.</p>
          </div>
          <FileText aria-hidden="true" className="mt-1 shrink-0 text-[#496057] max-[720px]:hidden" size={25} />
        </header>

        <div className={adminTw.formGrid}>
          <label className={adminTw.fieldFull}>
            <span>Policy title <em className={adminTw.required}>Required</em></span>
            <input defaultValue={policy?.title ?? ""} name="title" placeholder="Research ethics and integrity policy" required />
          </label>

          <label>
            Category
            <input defaultValue={policy?.category ?? ""} list="ethics-policy-categories" name="category" placeholder="Research Ethics" />
            <datalist id="ethics-policy-categories">
              <option value="Research Ethics" />
              <option value="Ethics Application" />
              <option value="Research Integrity" />
              <option value="Data and Privacy" />
            </datalist>
          </label>

          <label>
            Publication status
            <select defaultValue={policy?.publish_status ?? "draft"} name="publish_status">
              <option value="draft">Draft</option>
              <option value="preview">Preview</option>
              <option value="published">Published</option>
            </select>
          </label>

          <label className={adminTw.fieldFull}>
            Policy content
            <textarea defaultValue={policy?.content ?? ""} name="content" placeholder="Write the policy content shown on the public ethics page…" rows={14} />
            <small className={adminTw.fieldHelp}>Use plain text with clear headings and short paragraphs for readability.</small>
          </label>

          <label className={adminTw.fieldFull}>
            Supporting document URL
            <input
              inputMode="url"
              name="file_url"
              onChange={(event) => setFileUrl(event.target.value)}
              placeholder="https://example.org/documents/ethics-policy.pdf"
              type="url"
              value={fileUrl}
            />
            <small className={adminTw.fieldHelp}>
              Link to a PDF or document already hosted online.
              {fileUrl.startsWith("http://") || fileUrl.startsWith("https://") ? (
                <a className="relative z-10 ml-1 inline-flex items-center gap-1 font-semibold text-[#153c2e] underline underline-offset-4" href={fileUrl} rel="noopener noreferrer" target="_blank">
                  Open document <ExternalLink size={13} />
                </a>
              ) : null}
            </small>
          </label>
        </div>
      </section>

      {state?.error && <p className={adminTw.editorError} role="alert">{state.error}</p>}

      <footer className={adminTw.formActions}>
        <Link href="/admin/ethics-policies">Cancel</Link>
        <button disabled={pending} type="submit">
          {pending ? <LoaderCircle className={adminTw.spin} size={18} /> : <Save size={18} />}
          {pending ? "Saving…" : policy ? "Save changes" : "Create policy"}
        </button>
      </footer>
    </form>
  );
}
