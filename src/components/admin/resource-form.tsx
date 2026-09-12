"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { ExternalLink, LibraryBig, LoaderCircle, Save } from "lucide-react";
import { createResourceAction, updateResourceAction } from "@/app/resource-actions";
import { adminTw } from "@/components/admin/admin-tailwind";

export type ResourceFormValues = {
  id: string;
  title: string;
  category: string | null;
  description: string | null;
  content: string | null;
  file_url: string | null;
  publish_status: string | null;
};

export function ResourceForm({ resource }: { resource?: ResourceFormValues }) {
  const saveAction = resource
    ? updateResourceAction.bind(null, resource.id)
    : createResourceAction;
  const [state, action, pending] = useActionState(saveAction, undefined);
  const [fileUrl, setFileUrl] = useState(resource?.file_url ?? "");
  const validPreviewUrl = fileUrl.startsWith("http://") || fileUrl.startsWith("https://");

  return (
    <form action={action} className={adminTw.editorForm}>
      <section>
        <header className={adminTw.formHeading}>
          <div>
            <h2>Resource details</h2>
            <p>Give researchers a clear summary, practical guidance, and an optional source document.</p>
          </div>
          <LibraryBig aria-hidden="true" className="mt-1 shrink-0 text-[#496057] max-[720px]:hidden" size={25} />
        </header>

        <div className={adminTw.formGrid}>
          <label className={adminTw.fieldFull}>
            <span>Resource title <em className={adminTw.required}>Required</em></span>
            <input defaultValue={resource?.title ?? ""} name="title" placeholder="Research data management guide" required />
          </label>

          <label>
            Category
            <input defaultValue={resource?.category ?? ""} list="resource-categories" name="category" placeholder="Research methods" />
            <datalist id="resource-categories">
              <option value="Research methods" />
              <option value="Funding and grants" />
              <option value="Publishing" />
              <option value="Data management" />
              <option value="Templates and forms" />
            </datalist>
          </label>

          <label>
            Publication status
            <select defaultValue={resource?.publish_status ?? "draft"} name="publish_status">
              <option value="draft">Draft</option>
              <option value="preview">Preview</option>
              <option value="published">Published</option>
            </select>
          </label>

          <label className={adminTw.fieldFull}>
            Short description
            <textarea defaultValue={resource?.description ?? ""} name="description" placeholder="Explain what this resource helps researchers do." rows={5} />
            <small className={adminTw.fieldHelp}>This summary appears in the public resource directory.</small>
          </label>

          <label className={adminTw.fieldFull}>
            Full content
            <textarea defaultValue={resource?.content ?? ""} name="content" placeholder="Add the full guidance, instructions, or supporting information…" rows={13} />
          </label>

          <label className={adminTw.fieldFull}>
            Source document URL
            <input inputMode="url" name="file_url" onChange={(event) => setFileUrl(event.target.value)} placeholder="https://example.org/resources/guide.pdf" type="url" value={fileUrl} />
            <small className={adminTw.fieldHelp}>
              Link to the original PDF or document, if one exists.
              {validPreviewUrl ? (
                <a className="relative z-10 ml-1 inline-flex items-center gap-1 font-semibold text-[#153c2e] underline underline-offset-4" href={fileUrl} rel="noopener noreferrer" target="_blank">Open document <ExternalLink size={13} /></a>
              ) : null}
            </small>
          </label>
        </div>
      </section>

      {state?.error && <p className={adminTw.editorError} role="alert">{state.error}</p>}

      <footer className={adminTw.formActions}>
        <Link href="/admin/research-support">Cancel</Link>
        <button disabled={pending} type="submit">
          {pending ? <LoaderCircle className={adminTw.spin} size={18} /> : <Save size={18} />}
          {pending ? "Saving…" : resource ? "Save changes" : "Create resource"}
        </button>
      </footer>
    </form>
  );
}
