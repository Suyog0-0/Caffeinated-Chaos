"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { ExternalLink, ImageIcon, LoaderCircle, Save } from "lucide-react";
import { createPartnerAction, updatePartnerAction } from "@/app/partner-actions";
import { adminTw } from "@/components/admin/admin-tailwind";

export type PartnerFormValues = {
  id: string;
  name: string;
  description: string | null;
  website: string | null;
  logo_url: string | null;
  partner_type: string | null;
  publish_status: string | null;
  is_demo_data: boolean | null;
};

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((word) => word[0]).join("").toUpperCase() || "P";
}

export function PartnerForm({ partner }: { partner?: PartnerFormValues }) {
  const saveAction = partner ? updatePartnerAction.bind(null, partner.id) : createPartnerAction;
  const [state, action, pending] = useActionState(saveAction, undefined);
  const [name, setName] = useState(partner?.name ?? "");
  const [logoUrl, setLogoUrl] = useState(partner?.logo_url ?? "");
  const [failedLogo, setFailedLogo] = useState("");
  const validLogo = (logoUrl.startsWith("http://") || logoUrl.startsWith("https://")) && failedLogo !== logoUrl;

  return (
    <form action={action} className={adminTw.editorForm}>
      <section>
        <header className={adminTw.formHeading}>
          <div><h2>Partner identity</h2><p>Manage how this organisation appears in the partner directory and related work.</p></div>
        </header>

        <div className={adminTw.formGrid}>
          <figure className={`${adminTw.fieldFull} flex min-h-36 items-center gap-5 border border-[#d4d5ce] bg-[#f7f7f3] p-5 sm:p-7`}>
            <div className="grid size-24 shrink-0 place-items-center overflow-hidden rounded-full border border-[#d4d5ce] bg-white text-xl font-bold text-[#36594b]">
              {validLogo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img alt={`${name || "Partner"} logo preview`} className="h-full w-full object-contain p-2" onError={() => setFailedLogo(logoUrl)} src={logoUrl} />
              ) : <span>{initials(name)}</span>}
            </div>
            <figcaption className="min-w-0"><strong className="block truncate text-lg text-[#17251f]">{name.trim() || "New partner"}</strong><span className="mt-1 block text-xs font-normal leading-5 text-[#68756f]">Logo preview. A letter mark is used when no image is available.</span></figcaption>
          </figure>

          <label className={adminTw.fieldFull}>
            <span>Partner name <em className={adminTw.required}>Required</em></span>
            <input name="name" onChange={(event) => setName(event.target.value)} placeholder="Partner organisation name" required value={name} />
          </label>

          <label>
            Partner type
            <input defaultValue={partner?.partner_type ?? ""} list="partner-types" name="partner_type" placeholder="University" />
            <datalist id="partner-types"><option value="University" /><option value="Research institute" /><option value="Industry" /><option value="Government" /><option value="Nonprofit" /></datalist>
          </label>

          <label>
            Publication status
            <select defaultValue={partner?.publish_status ?? "draft"} name="publish_status"><option value="draft">Draft</option><option value="preview">Preview</option><option value="published">Published</option></select>
          </label>

          <label className={adminTw.fieldFull}>
            Description
            <textarea defaultValue={partner?.description ?? ""} name="description" placeholder="Describe the partnership, organisation, and areas of collaboration." rows={9} />
          </label>

          <label>
            Website
            <input defaultValue={partner?.website ?? ""} name="website" placeholder="https://partner.example" type="url" />
            {partner?.website && <small className={adminTw.fieldHelp}><a className="inline-flex items-center gap-1 font-semibold text-[#153c2e] underline underline-offset-4" href={partner.website} rel="noopener noreferrer" target="_blank">Visit website <ExternalLink size={13} /></a></small>}
          </label>

          <label>
            Logo URL
            <input name="logo_url" onChange={(event) => { setLogoUrl(event.target.value); setFailedLogo(""); }} placeholder="https://partner.example/logo.png" type="url" value={logoUrl} />
            <small className={`${adminTw.fieldHelp} ${failedLogo === logoUrl && logoUrl ? adminTw.fieldHelpError : ""}`}><ImageIcon size={13} />{failedLogo === logoUrl && logoUrl ? "The logo could not be loaded. Check the URL." : "Use a square or wide logo with a transparent background."}</small>
          </label>

          <label className={`${adminTw.checkbox} ${adminTw.fieldFull}`}>
            <input defaultChecked={partner?.is_demo_data ?? false} name="is_demo_data" type="checkbox" />
            <span><strong>Demo data</strong><small>Mark this partner as seeded sample content.</small></span>
          </label>
        </div>
      </section>

      {state?.error && <p className={adminTw.editorError} role="alert">{state.error}</p>}
      <footer className={adminTw.formActions}>
        <Link href="/admin/partners">Cancel</Link>
        <button disabled={pending} type="submit">{pending ? <LoaderCircle className={adminTw.spin} size={18} /> : <Save size={18} />}{pending ? "Saving…" : partner ? "Save changes" : "Create partner"}</button>
      </footer>
    </form>
  );
}
