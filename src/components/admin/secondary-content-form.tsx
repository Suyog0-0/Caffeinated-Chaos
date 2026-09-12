"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { ImageIcon, LoaderCircle, Save } from "lucide-react";
import {
  saveSecondaryContentAction,
  type SecondaryContentKind,
} from "@/app/secondary-content-actions";

type ContentValues = {
  id?: string;
  title?: string | null;
  publish_status?: string | null;
  is_demo_data?: boolean | null;
  event_type?: string | null;
  description?: string | null;
  location?: string | null;
  start_at?: string | null;
  end_at?: string | null;
  registration_url?: string | null;
  image_url?: string | null;
  funder?: string | null;
  amount?: number | null;
  currency?: string | null;
  deadline?: string | null;
  external_url?: string | null;
  status?: string | null;
  summary?: string | null;
  content?: string | null;
};

const routes = {
  event: "/admin/events",
  grant: "/admin/grants",
  announcement: "/admin/announcements",
};

function localDateTime(value?: string | null) {
  return value ? value.slice(0, 16) : "";
}

export function SecondaryContentForm({
  kind,
  item,
}: {
  kind: SecondaryContentKind;
  item?: ContentValues;
}) {
  const saveAction = saveSecondaryContentAction.bind(null, kind, item?.id ?? null);
  const [state, action, pending] = useActionState(saveAction, undefined);
  const [values, setValues] = useState({
    title: item?.title ?? "",
    publish_status: item?.publish_status ?? "draft",
    is_demo_data: item?.is_demo_data ?? false,
    event_type: item?.event_type ?? "",
    description: item?.description ?? "",
    location: item?.location ?? "",
    start_at: localDateTime(item?.start_at),
    end_at: localDateTime(item?.end_at),
    registration_url: item?.registration_url ?? "",
    image_url: item?.image_url ?? "",
    funder: item?.funder ?? "",
    amount: item?.amount?.toString() ?? "",
    currency: item?.currency ?? "",
    deadline: item?.deadline ?? "",
    external_url: item?.external_url ?? "",
    status: item?.status ?? "open",
    summary: item?.summary ?? "",
    content: item?.content ?? "",
  });
  const [failedImage, setFailedImage] = useState("");

  function update(name: keyof typeof values, value: string | boolean) {
    setValues((current) => ({ ...current, [name]: value }));
  }

  let previewUrl = "";
  try {
    const url = new URL(values.image_url);
    if (["http:", "https:"].includes(url.protocol)) previewUrl = url.href;
  } catch {
    previewUrl = "";
  }

  return (
    <form action={action} className="admin-editor-form">
      <section>
        <div className="admin-form-heading">
          <h2>{kind === "announcement" ? "Announcement details" : `${kind[0].toUpperCase()}${kind.slice(1)} details`}</h2>
          <p>Keep the public-facing information concise, accurate, and ready for review.</p>
        </div>
        <div className="admin-form-grid">
          <label className="admin-field-full">
            Title <span className="admin-required">Required</span>
            <input name="title" onChange={(event) => update("title", event.target.value)} required value={values.title} />
          </label>

          {kind === "event" && (
            <>
              <label>Event type<input name="event_type" onChange={(event) => update("event_type", event.target.value)} placeholder="Conference" value={values.event_type} /></label>
              <label>Location<input name="location" onChange={(event) => update("location", event.target.value)} placeholder="Islington College" value={values.location} /></label>
              <label>Starts<input name="start_at" onChange={(event) => update("start_at", event.target.value)} type="datetime-local" value={values.start_at} /></label>
              <label>Ends<input name="end_at" onChange={(event) => update("end_at", event.target.value)} type="datetime-local" value={values.end_at} /></label>
              <label className="admin-field-full">Description<textarea name="description" onChange={(event) => update("description", event.target.value)} rows={6} value={values.description} /></label>
              <label>Registration URL<input name="registration_url" onChange={(event) => update("registration_url", event.target.value)} placeholder="https://…" type="url" value={values.registration_url} /></label>
              <label>
                Image URL
                <input name="image_url" onChange={(event) => update("image_url", event.target.value)} placeholder="https://…" type="url" value={values.image_url} />
                {previewUrl && (
                  <div className="admin-photo-preview">
                    {failedImage === previewUrl ? (
                      <div className="admin-photo-preview-error"><ImageIcon size={20} /> Check the image URL.</div>
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img alt="Event preview" decoding="async" key={previewUrl} loading="lazy" onError={() => setFailedImage(previewUrl)} src={previewUrl} />
                    )}
                  </div>
                )}
              </label>
            </>
          )}

          {kind === "grant" && (
            <>
              <label>Funder<input name="funder" onChange={(event) => update("funder", event.target.value)} placeholder="Funding organisation" value={values.funder} /></label>
              <label>Grant status<select name="status" onChange={(event) => update("status", event.target.value)} value={values.status}><option value="open">Open</option><option value="closed">Closed</option><option value="awarded">Awarded</option></select></label>
              <label>Amount<input min="0" name="amount" onChange={(event) => update("amount", event.target.value)} step="0.01" type="number" value={values.amount} /></label>
              <label>Currency<input maxLength={8} name="currency" onChange={(event) => update("currency", event.target.value)} placeholder="NPR" value={values.currency} /></label>
              <label>Deadline<input name="deadline" onChange={(event) => update("deadline", event.target.value)} type="date" value={values.deadline} /></label>
              <label>External URL<input name="external_url" onChange={(event) => update("external_url", event.target.value)} placeholder="https://…" type="url" value={values.external_url} /></label>
              <label className="admin-field-full">Description<textarea name="description" onChange={(event) => update("description", event.target.value)} rows={6} value={values.description} /></label>
            </>
          )}

          {kind === "announcement" && (
            <>
              <label className="admin-field-full">Summary<textarea name="summary" onChange={(event) => update("summary", event.target.value)} rows={3} value={values.summary} /></label>
              <label className="admin-field-full">Content<textarea name="content" onChange={(event) => update("content", event.target.value)} rows={10} value={values.content} /></label>
            </>
          )}

          <label>Publication status<select name="publish_status" onChange={(event) => update("publish_status", event.target.value)} value={values.publish_status}><option value="draft">Draft</option><option value="preview">Preview</option><option value="published">Published</option></select></label>
          <label className="admin-checkbox">
            <input checked={values.is_demo_data} name="is_demo_data" onChange={(event) => update("is_demo_data", event.target.checked)} type="checkbox" />
            <span><strong>Demo data</strong><small>Mark this as seeded sample content.</small></span>
          </label>
        </div>
      </section>
      {state?.error && <p className="admin-editor-error" role="alert">{state.error}</p>}
      <footer className="admin-form-actions">
        <Link href={routes[kind]}>Cancel</Link>
        <button disabled={pending} type="submit">
          {pending ? <LoaderCircle className="admin-spin" size={18} /> : <Save size={18} />}
          {pending ? "Saving…" : item ? "Save changes" : `Create ${kind}`}
        </button>
      </footer>
    </form>
  );
}
