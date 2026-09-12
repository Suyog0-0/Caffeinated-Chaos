"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { ImageIcon, LoaderCircle, Save } from "lucide-react";
import {
  saveSecondaryContentAction,
  type SecondaryContentKind,
} from "@/app/secondary-content-actions";
import {
  PeoplePicker,
  type PersonOption,
  type SelectedPerson,
} from "@/components/admin/people-picker";

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

const fieldGrid = "grid grid-cols-1 items-start gap-x-6 gap-y-6 p-5 sm:grid-cols-2 sm:p-7 [&_label]:grid [&_label]:gap-2 [&_label]:text-[13px] [&_label]:font-bold [&_label]:text-[#33473e] [&_input:not([type=checkbox])]:min-h-12 [&_input:not([type=checkbox])]:w-full [&_input:not([type=checkbox])]:border [&_input:not([type=checkbox])]:border-[#c7cac3] [&_input:not([type=checkbox])]:bg-white [&_input:not([type=checkbox])]:px-3 [&_input:not([type=checkbox])]:py-2.5 [&_input:not([type=checkbox])]:text-sm [&_input:not([type=checkbox])]:font-normal [&_input:not([type=checkbox])]:text-[#17251f] [&_input:not([type=checkbox])]:outline-none [&_input:not([type=checkbox])]:focus:border-[#153c2e] [&_input:not([type=checkbox])]:focus:ring-2 [&_input:not([type=checkbox])]:focus:ring-[#153c2e]/10 [&_select]:min-h-12 [&_select]:w-full [&_select]:border [&_select]:border-[#c7cac3] [&_select]:bg-white [&_select]:px-3 [&_select]:text-sm [&_select]:font-normal [&_select]:text-[#17251f] [&_select]:outline-none [&_select]:focus:border-[#153c2e] [&_select]:focus:ring-2 [&_select]:focus:ring-[#153c2e]/10 [&_textarea]:min-h-36 [&_textarea]:w-full [&_textarea]:resize-y [&_textarea]:border [&_textarea]:border-[#c7cac3] [&_textarea]:bg-white [&_textarea]:px-3 [&_textarea]:py-2.5 [&_textarea]:text-sm [&_textarea]:font-normal [&_textarea]:leading-6 [&_textarea]:text-[#17251f] [&_textarea]:outline-none [&_textarea]:focus:border-[#153c2e] [&_textarea]:focus:ring-2 [&_textarea]:focus:ring-[#153c2e]/10";
const fullField = "sm:col-span-2";
const checkboxField = "!flex min-h-16 items-start gap-3 border border-[#d4d5ce] bg-[#f7f7f3] p-4 sm:self-end [&>input]:mt-0.5 [&>input]:size-4 [&>input]:accent-[#153c2e] [&>span]:grid [&>span]:gap-0.5 [&_small]:font-normal [&_small]:leading-5 [&_small]:text-[#68756f]";

function localDateTime(value?: string | null) {
  return value ? value.slice(0, 16) : "";
}

export function SecondaryContentForm({
  kind,
  item,
  researchers = [],
  speakers = [],
}: {
  kind: SecondaryContentKind;
  item?: ContentValues;
  researchers?: PersonOption[];
  speakers?: SelectedPerson[];
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
    if (name === "image_url") setFailedImage("");
    setValues((current) => ({ ...current, [name]: value }));
  }

  let previewUrl = "";
  if (values.image_url.startsWith("/")) {
    previewUrl = values.image_url;
  } else {
    try {
      const url = new URL(values.image_url);
      if (["http:", "https:"].includes(url.protocol)) previewUrl = url.href;
    } catch {
      previewUrl = "";
    }
  }

  return (
    <form action={action} className="mt-8">
      <section className="border border-[#d4d5ce] bg-[#fffefb]">
        <div className="border-b border-[#d4d5ce] px-5 py-5 sm:px-7">
          <h2 className="text-lg font-bold text-[#17251f]">{kind === "announcement" ? "Announcement details" : `${kind[0].toUpperCase()}${kind.slice(1)} details`}</h2>
          <p className="mt-1 text-sm leading-6 text-[#68756f]">Keep the public-facing information concise, accurate, and ready for review.</p>
        </div>
        <div className={fieldGrid}>
          {kind === "event" && item?.id && previewUrl && (
            <figure className={`${fullField} overflow-hidden border border-[#c7cac3] bg-[#17251f]`}>
              {failedImage === previewUrl ? (
                <div className="flex min-h-56 flex-col items-center justify-center gap-2 bg-[#f2f2ed] p-6 text-center text-xs font-normal text-[#8f3939] sm:min-h-72">
                  <ImageIcon aria-hidden="true" size={24} />
                  <span>The event image could not be loaded. Check the image URL below.</span>
                </div>
              ) : (
                <div className="relative min-h-56 sm:min-h-72">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={`${values.title || "Event"} cover`}
                    className="absolute inset-0 h-full w-full object-cover"
                    decoding="async"
                    key={previewUrl}
                    onError={() => setFailedImage(previewUrl)}
                    src={previewUrl}
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-[#0b1b33]/95 via-[#0b1b33]/20 to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 px-5 py-5 text-white sm:px-7 sm:py-6">
                    <span className="block text-[11px] font-semibold text-[#d4ddd8]">Event cover</span>
                    <strong className="mt-1 block max-w-3xl text-balance text-2xl font-semibold leading-tight tracking-[-0.025em] sm:text-3xl">
                      {values.title.trim() || "Untitled event"}
                    </strong>
                  </figcaption>
                </div>
              )}
            </figure>
          )}

          <label className={fullField}>
            <span>Title <em className="ml-1 text-[11px] font-normal not-italic text-[#8f3939]">Required</em></span>
            <input name="title" onChange={(event) => update("title", event.target.value)} required value={values.title} />
          </label>

          {kind === "event" && (
            <>
              <label>Event type<input name="event_type" onChange={(event) => update("event_type", event.target.value)} placeholder="Conference" value={values.event_type} /></label>
              <label>Location<input name="location" onChange={(event) => update("location", event.target.value)} placeholder="Islington College" value={values.location} /></label>
              <label>Starts<input name="start_at" onChange={(event) => update("start_at", event.target.value)} type="datetime-local" value={values.start_at} /></label>
              <label>Ends<input name="end_at" onChange={(event) => update("end_at", event.target.value)} type="datetime-local" value={values.end_at} /></label>
              <label className={fullField}>Description<textarea name="description" onChange={(event) => update("description", event.target.value)} rows={6} value={values.description} /></label>
              <label>Registration URL<input name="registration_url" onChange={(event) => update("registration_url", event.target.value)} placeholder="https://…" type="url" value={values.registration_url} /></label>
              <label>
                Image URL
                <input name="image_url" onChange={(event) => update("image_url", event.target.value)} placeholder="https://…" type="url" value={values.image_url} />
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
              <label className={fullField}>Description<textarea name="description" onChange={(event) => update("description", event.target.value)} rows={6} value={values.description} /></label>
            </>
          )}

          {kind === "announcement" && (
            <>
              <label className={fullField}>Summary<textarea name="summary" onChange={(event) => update("summary", event.target.value)} rows={3} value={values.summary} /></label>
              <label className={fullField}>Content<textarea name="content" onChange={(event) => update("content", event.target.value)} rows={10} value={values.content} /></label>
            </>
          )}

          <label>Publication status<select name="publish_status" onChange={(event) => update("publish_status", event.target.value)} value={values.publish_status}><option value="draft">Draft</option><option value="preview">Preview</option><option value="published">Published</option></select></label>
          <label className={checkboxField}>
            <input checked={values.is_demo_data} name="is_demo_data" onChange={(event) => update("is_demo_data", event.target.checked)} type="checkbox" />
            <span><strong>Demo data</strong><small>Mark this as seeded sample content.</small></span>
          </label>
        </div>
      </section>
      {kind === "event" && (
        <section className="mt-6 border border-[#d4d5ce] bg-[#fffefb]">
          <div className="border-b border-[#d4d5ce] px-5 py-5 sm:px-7">
            <h2 className="text-lg font-bold text-[#17251f]">Speakers</h2>
            <p className="mt-1 text-sm leading-6 text-[#68756f]">Select the researchers speaking at this event.</p>
          </div>
          <div className={fieldGrid}>
            <PeoplePicker
              allowReorder={false}
              emptyLabel="No speakers added yet."
              fieldName="speaker_ids"
              initialSelected={speakers}
              label="Add speaker"
              people={researchers}
              placeholder="Search researchers by name…"
            />
          </div>
        </section>
      )}
      {state?.error && <p className="mt-4 border border-[#d8bcbc] bg-[#f7eaea] px-4 py-3 text-sm text-[#7a3030]" role="alert">{state.error}</p>}
      <footer className="mt-5 flex items-center justify-end gap-3">
        <Link className="inline-flex min-h-11 items-center px-4 text-[13px] font-semibold text-[#53645c] hover:text-[#153c2e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#153c2e]" href={routes[kind]}>Cancel</Link>
        <button className="inline-flex min-h-11 items-center gap-2 bg-[#153c2e] px-5 text-[13px] font-bold text-white hover:bg-[#204e3a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#153c2e] disabled:cursor-not-allowed disabled:opacity-55" disabled={pending} type="submit">
          {pending ? <LoaderCircle className="animate-spin" size={18} /> : <Save size={18} />}
          {pending ? "Saving…" : item ? "Save changes" : `Create ${kind}`}
        </button>
      </footer>
    </form>
  );
}
