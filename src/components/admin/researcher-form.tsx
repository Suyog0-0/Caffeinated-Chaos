"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { ImageIcon, LoaderCircle, Save } from "lucide-react";
import {
  createResearcherAction,
  updateResearcherAction,
} from "@/app/admin/actions";

export type ResearcherFormValues = {
  id: string;
  name: string;
  position: string | null;
  department: string | null;
  email: string | null;
  biography: string | null;
  photo_url: string | null;
  google_scholar_url: string | null;
  publish_status: string;
  is_demo_data: boolean;
};

export function ResearcherForm({ researcher }: { researcher?: ResearcherFormValues }) {
  const updateAction = researcher
    ? updateResearcherAction.bind(null, researcher.id)
    : createResearcherAction;
  const [state, action, pending] = useActionState(updateAction, undefined);
  const [values, setValues] = useState({
    name: researcher?.name ?? "",
    position: researcher?.position ?? "",
    department: researcher?.department ?? "",
    email: researcher?.email ?? "",
    biography: researcher?.biography ?? "",
    photo_url: researcher?.photo_url ?? "",
    google_scholar_url: researcher?.google_scholar_url ?? "",
    publish_status: researcher?.publish_status ?? "draft",
    is_demo_data: researcher?.is_demo_data ?? false,
  });
  const [failedPhotoUrl, setFailedPhotoUrl] = useState("");

  function updateValue(name: keyof typeof values, value: string | boolean) {
    setValues((current) => ({ ...current, [name]: value }));
  }

  let previewUrl = "";
  try {
    const url = new URL(values.photo_url);
    if (url.protocol === "http:" || url.protocol === "https:") previewUrl = url.href;
  } catch {
    previewUrl = "";
  }

  const initials = values.name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "?";

  const showPreviewImage = previewUrl && failedPhotoUrl !== previewUrl;

  return (
    <form action={action} className="admin-editor-form">
      <section>
        <div className="admin-form-heading">
          <h2>Profile details</h2>
          <p>Information shown in the researcher directory and public profile.</p>
        </div>

        <div className="admin-avatar-row">
          <div className="admin-avatar" aria-hidden="true">
            {showPreviewImage ? (
              // An arbitrary admin-provided URL cannot use next/image's fixed remote host allowlist.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                alt=""
                decoding="async"
                key={previewUrl}
                loading="lazy"
                onError={() => setFailedPhotoUrl(previewUrl)}
                src={previewUrl}
              />
            ) : (
              <span>{initials}</span>
            )}
          </div>
          <div className="admin-avatar-meta">
            <strong>{values.name || "Unnamed researcher"}</strong>
            {(values.position || values.department) && (
              <small>
                {[values.position, values.department].filter(Boolean).join(", ")}
              </small>
            )}
            {values.email && <small>{values.email}</small>}
          </div>
        </div>

        <div className="admin-form-grid">
          <label className="admin-field-full">
            Name <span className="admin-required">Required</span>
            <input name="name" onChange={(event) => updateValue("name", event.target.value)} required value={values.name} />
          </label>
          <label>
            Position
            <input name="position" onChange={(event) => updateValue("position", event.target.value)} placeholder="Associate Professor" value={values.position} />
          </label>
          <label>
            Department
            <input name="department" onChange={(event) => updateValue("department", event.target.value)} placeholder="Computing" value={values.department} />
          </label>
          <label>
            Email address
            <input name="email" onChange={(event) => updateValue("email", event.target.value)} placeholder="name@islingtoncollege.edu.np" type="email" value={values.email} />
          </label>
          <label>
            Publication status
            <select name="publish_status" onChange={(event) => updateValue("publish_status", event.target.value)} value={values.publish_status}>
              <option value="draft">Draft</option>
              <option value="preview">Preview</option>
              <option value="published">Published</option>
            </select>
          </label>
          <label className="admin-field-full">
            Biography
            <textarea name="biography" onChange={(event) => updateValue("biography", event.target.value)} placeholder="Research background, current work, and areas of expertise." rows={7} value={values.biography} />
          </label>
          <label>
            Photo URL
            <input name="photo_url" onChange={(event) => updateValue("photo_url", event.target.value)} placeholder="https://…" type="url" value={values.photo_url} />
            {previewUrl && failedPhotoUrl === previewUrl && (
              <small className="admin-field-help admin-field-help-error">
                <ImageIcon size={13} /> This image could not be loaded. Check the photo URL.
              </small>
            )}
          </label>
          <label>
            Google Scholar URL
            <input name="google_scholar_url" onChange={(event) => updateValue("google_scholar_url", event.target.value)} placeholder="https://…" type="url" value={values.google_scholar_url} />
            <small className="admin-field-help">Any valid profile link is accepted for now.</small>
          </label>
          <label className="admin-checkbox admin-field-full">
            <input checked={values.is_demo_data} name="is_demo_data" onChange={(event) => updateValue("is_demo_data", event.target.checked)} type="checkbox" />
            <span><strong>Demo data</strong><small>Mark this profile as seeded sample content.</small></span>
          </label>
        </div>
      </section>

      {state?.error && <p className="admin-editor-error" role="alert">{state.error}</p>}

      <footer className="admin-form-actions">
        <Link href="/admin/researchers">Cancel</Link>
        <button disabled={pending} type="submit">
          {pending ? <LoaderCircle className="admin-spin" size={18} /> : <Save size={18} />}
          {pending ? "Saving…" : researcher ? "Save changes" : "Create researcher"}
        </button>
      </footer>
    </form>
  );
}
