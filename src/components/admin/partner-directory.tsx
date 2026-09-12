import Link from "next/link";
import { ChevronLeft, ChevronRight, ExternalLink, Network, Pencil, Search } from "lucide-react";
import { requireAdmin } from "@/app/admin/admin-auth";
import { DeletePartnerButton } from "@/components/admin/delete-partner-button";
import { statusTw } from "@/components/admin/admin-tailwind";

const PAGE_SIZE = 10;
const grid = "grid grid-cols-1 items-center gap-x-5 gap-y-3 md:grid-cols-[minmax(300px,2fr)_minmax(150px,.8fr)_115px_110px] lg:grid-cols-[minmax(390px,2.3fr)_minmax(170px,.8fr)_115px_105px_116px]";
const iconButton = "relative z-10 inline-flex size-9 items-center justify-center border border-[#d4d5ce] bg-[#fffefb] text-[#53645c] hover:border-[#153c2e] hover:text-[#153c2e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#153c2e]";

type PartnerRow = {
  id: string;
  name: string;
  description: string | null;
  website: string | null;
  logo_url: string | null;
  partner_type: string | null;
  publish_status: string | null;
};

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((word) => word[0]).join("").toUpperCase() || "P";
}

function pageHref(page: number, query: string, status: string, type: string) {
  const params = new URLSearchParams();
  if (query) params.set("query", query);
  if (status !== "all") params.set("status", status);
  if (type !== "all") params.set("type", type);
  if (page > 1) params.set("page", String(page));
  const suffix = params.toString();
  return `/admin/partners${suffix ? `?${suffix}` : ""}`;
}

export async function PartnerDirectory({ page, query, status, type }: { page: number; query: string; status: string; type: string }) {
  const { supabase } = await requireAdmin();
  const typesRequest = supabase.from("partner").select("partner_type").not("partner_type", "is", null).order("partner_type");
  let request = supabase
    .from("partner")
    .select("id, name, description, website, logo_url, partner_type, publish_status", { count: "exact" })
    .order("name", { ascending: true })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  const safeQuery = query.trim().replace(/[%_,]/g, "");
  if (safeQuery) request = request.or(`name.ilike.%${safeQuery}%,description.ilike.%${safeQuery}%,partner_type.ilike.%${safeQuery}%`);
  if (["draft", "preview", "published"].includes(status)) request = request.eq("publish_status", status);
  if (type !== "all") request = request.eq("partner_type", type);

  const [{ data, count, error }, { data: typeRows }] = await Promise.all([request, typesRequest]);
  const partners = (data ?? []) as PartnerRow[];
  const partnerTypes = Array.from(new Set((typeRows ?? []).map((row) => row.partner_type).filter((value): value is string => Boolean(value))));
  const total = count ?? 0;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <>
      <form className="grid grid-cols-2 items-center gap-2.5 py-6 lg:flex">
        <label className="col-span-2 flex min-h-11 flex-1 items-center gap-2.5 border border-[#c9cbc4] bg-[#fffefb] px-3 text-[#738079] focus-within:border-[#153c2e] focus-within:ring-2 focus-within:ring-[#153c2e]/10 lg:col-auto">
          <Search aria-hidden="true" size={17} /><span className="sr-only">Search partners</span>
          <input className="w-full bg-transparent text-sm text-[#17251f] outline-none placeholder:text-[#87918c]" defaultValue={query} name="query" placeholder="Search partner name, type, or description" />
        </label>
        <select aria-label="Filter by partner type" className="min-h-11 min-w-0 border border-[#c9cbc4] bg-[#fffefb] px-3 text-[13px] text-[#17251f] outline-none focus:border-[#153c2e]" defaultValue={type} name="type"><option value="all">All partner types</option>{partnerTypes.map((item) => <option key={item} value={item}>{item}</option>)}</select>
        <select aria-label="Filter by publication status" className="min-h-11 min-w-0 border border-[#c9cbc4] bg-[#fffefb] px-3 text-[13px] text-[#17251f] outline-none focus:border-[#153c2e]" defaultValue={status} name="status"><option value="all">All visibility</option><option value="published">Published</option><option value="preview">Preview</option><option value="draft">Draft</option></select>
        <button className="min-h-11 bg-[#153c2e] px-4 text-[13px] font-bold text-white hover:bg-[#204e3a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#153c2e]" type="submit">Apply filters</button>
        {(query || status !== "all" || type !== "all") && <Link className="col-span-2 justify-self-start text-[13px] text-[#53645c] underline underline-offset-4 hover:text-[#153c2e]" href="/admin/partners">Clear</Link>}
      </form>

      {!error && <p className="mb-3 text-xs text-[#68756f]">{total} {total === 1 ? "partner" : "partners"}</p>}
      {error ? (
        <section className="flex items-start gap-4 border-y border-[#d4d5ce] py-8 text-[#53645c]"><Network className="mt-0.5 shrink-0" size={23} /><div><h2 className="text-base font-bold text-[#17251f]">Partners could not be loaded</h2><p className="mt-1 text-sm leading-6">Check the Supabase connection and partner RLS policies, then refresh.</p></div></section>
      ) : partners.length === 0 ? (
        <section className="flex items-start gap-4 border-y border-[#d4d5ce] py-8 text-[#53645c]"><Network className="mt-0.5 shrink-0" size={23} /><div><h2 className="text-base font-bold text-[#17251f]">No partners found</h2><p className="mt-1 text-sm leading-6">Create the first partner or change the current filters.</p></div></section>
      ) : (
        <div className="border-b border-[#d4d5ce]">
          <div aria-hidden="true" className={`${grid} border-y border-[#17251f] py-3 text-[11px] font-bold text-[#53645c] max-md:hidden`}><span>Partner</span><span>Type</span><span>Visibility</span><span className="max-lg:hidden">Website</span><span>Actions</span></div>
          {partners.map((partner) => {
            const editHref = `/admin/partners/${partner.id}/edit`;
            return (
              <article className={`${grid} group relative min-h-20 border-t border-[#d4d5ce] py-4 first:border-t-0 hover:bg-[#f2f2ed] focus-within:bg-[#f2f2ed] md:py-3`} key={partner.id}>
                <Link aria-label={`Edit ${partner.name}`} className="absolute inset-0 z-0 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#153c2e]" href={editHref} />
                <div className="flex min-w-0 items-center gap-3 pr-20 md:pr-0">
                  <span className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-full border border-[#d4d5ce] bg-[#fffefb] text-xs font-bold text-[#36594b]">
                    {partner.logo_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img alt="" className="h-full w-full object-contain p-1.5" src={partner.logo_url} />
                    ) : initials(partner.name)}
                  </span>
                  <span className="min-w-0"><strong className="block truncate text-[15px] font-bold text-[#17251f]">{partner.name}</strong><small className="mt-1 block truncate text-xs text-[#68756f]">{partner.description || "No public description"}</small></span>
                </div>
                <p className="min-w-0 truncate text-xs text-[#68756f] before:mr-2 before:inline-block before:w-24 before:font-bold before:text-[#374a41] before:content-['Type'] md:before:hidden">{partner.partner_type || "Uncategorised"}</p>
                <p className="text-xs text-[#68756f] before:mr-2 before:inline-block before:w-24 before:font-bold before:text-[#374a41] before:content-['Visibility'] md:before:hidden"><i className={statusTw(partner.publish_status || "draft")}>{partner.publish_status || "draft"}</i></p>
                <p className="block text-xs text-[#68756f] before:mr-2 before:inline-block before:w-24 before:font-bold before:text-[#374a41] before:content-['Website'] md:hidden lg:block lg:before:hidden">{partner.website ? "Available" : "Not added"}</p>
                <div className="relative z-10 flex items-center justify-end gap-1.5 max-md:absolute max-md:right-0 max-md:top-3">
                  <Link aria-label={`Edit ${partner.name}`} className={iconButton} href={editHref} title="Edit partner"><Pencil size={17} /></Link>
                  {partner.website && <a aria-label={`Visit ${partner.name} website`} className={iconButton} href={partner.website} rel="noopener noreferrer" target="_blank" title="Visit website"><ExternalLink size={17} /></a>}
                  <DeletePartnerButton id={partner.id} name={partner.name} />
                </div>
              </article>
            );
          })}
        </div>
      )}

      {pageCount > 1 && <nav aria-label="Partner pages" className="flex items-center justify-between gap-4 border-t border-[#d4d5ce] py-5 text-xs text-[#53645c]">{page > 1 ? <Link className="inline-flex items-center gap-1.5 font-semibold hover:text-[#153c2e]" href={pageHref(page - 1, query, status, type)}><ChevronLeft size={15} /> Previous</Link> : <span className="inline-flex items-center gap-1.5 opacity-40"><ChevronLeft size={15} /> Previous</span>}<p aria-live="polite">Page {page} of {pageCount}</p>{page < pageCount ? <Link className="inline-flex items-center gap-1.5 font-semibold hover:text-[#153c2e]" href={pageHref(page + 1, query, status, type)}>Next <ChevronRight size={15} /></Link> : <span className="inline-flex items-center gap-1.5 opacity-40">Next <ChevronRight size={15} /></span>}</nav>}
    </>
  );
}
