import Link from "next/link";
import { ChevronLeft, ChevronRight, ExternalLink, FileCheck2, Pencil, Search } from "lucide-react";
import { requireAdmin } from "@/app/admin/admin-auth";
import { DeleteEthicsPolicyButton } from "@/components/admin/delete-ethics-policy-button";
import { statusTw } from "@/components/admin/admin-tailwind";

const PAGE_SIZE = 10;
const grid = "grid grid-cols-1 items-center gap-x-5 gap-y-3 md:grid-cols-[minmax(280px,2fr)_minmax(150px,.8fr)_115px_110px] lg:grid-cols-[minmax(360px,2.2fr)_minmax(170px,.8fr)_115px_105px_116px]";
const iconButton = "relative z-10 inline-flex size-9 items-center justify-center border border-[#d4d5ce] bg-[#fffefb] text-[#53645c] hover:border-[#153c2e] hover:text-[#153c2e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#153c2e]";

type PolicyRow = {
  id: string;
  title: string;
  category: string | null;
  file_url: string | null;
  publish_status: string | null;
};

function pageHref(page: number, query: string, status: string) {
  const params = new URLSearchParams();
  if (query) params.set("query", query);
  if (status !== "all") params.set("status", status);
  if (page > 1) params.set("page", String(page));
  const suffix = params.toString();
  return `/admin/ethics-policies${suffix ? `?${suffix}` : ""}`;
}

export async function EthicsPolicyDirectory({ page, query, status }: { page: number; query: string; status: string }) {
  const { supabase } = await requireAdmin();
  let request = supabase
    .from("ethics_policy")
    .select("id, title, category, file_url, publish_status", { count: "exact" })
    .order("created_at", { ascending: false })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  const safeQuery = query.trim().replace(/[%_,]/g, "");
  if (safeQuery) request = request.or(`title.ilike.%${safeQuery}%,category.ilike.%${safeQuery}%`);
  if (["draft", "preview", "published"].includes(status)) request = request.eq("publish_status", status);

  const { data, count, error } = await request;
  const policies = (data ?? []) as PolicyRow[];
  const total = count ?? 0;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <>
      <form className="grid grid-cols-2 items-center gap-2.5 py-6 sm:flex">
        <label className="col-span-2 flex min-h-11 flex-1 items-center gap-2.5 border border-[#c9cbc4] bg-[#fffefb] px-3 text-[#738079] focus-within:border-[#153c2e] focus-within:ring-2 focus-within:ring-[#153c2e]/10">
          <Search aria-hidden="true" size={17} /><span className="sr-only">Search ethics policies</span>
          <input className="w-full bg-transparent text-sm text-[#17251f] outline-none placeholder:text-[#87918c]" defaultValue={query} name="query" placeholder="Search title or category" />
        </label>
        <select aria-label="Filter by publication status" className="min-h-11 border border-[#c9cbc4] bg-[#fffefb] px-3 text-[13px] text-[#17251f] outline-none focus:border-[#153c2e]" defaultValue={status} name="status"><option value="all">All visibility</option><option value="published">Published</option><option value="preview">Preview</option><option value="draft">Draft</option></select>
        <button className="min-h-11 bg-[#153c2e] px-4 text-[13px] font-bold text-white hover:bg-[#204e3a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#153c2e]" type="submit">Apply filters</button>
        {(query || status !== "all") && <Link className="col-span-2 justify-self-start text-[13px] text-[#53645c] underline underline-offset-4 hover:text-[#153c2e]" href="/admin/ethics-policies">Clear</Link>}
      </form>

      {!error && <p className="mb-3 text-xs text-[#68756f]">{total} {total === 1 ? "policy" : "policies"}</p>}

      {error ? (
        <section className="flex items-start gap-4 border-y border-[#d4d5ce] py-8 text-[#53645c]"><FileCheck2 className="mt-0.5 shrink-0" size={23} /><div><h2 className="text-base font-bold text-[#17251f]">Ethics policies could not be loaded</h2><p className="mt-1 text-sm leading-6">Check the Supabase connection and ethics_policy RLS policies, then refresh.</p></div></section>
      ) : policies.length === 0 ? (
        <section className="flex items-start gap-4 border-y border-[#d4d5ce] py-8 text-[#53645c]"><FileCheck2 className="mt-0.5 shrink-0" size={23} /><div><h2 className="text-base font-bold text-[#17251f]">No ethics policies found</h2><p className="mt-1 text-sm leading-6">Create the first policy or change the current filters.</p></div></section>
      ) : (
        <div className="border-b border-[#d4d5ce]">
          <div aria-hidden="true" className={`${grid} border-y border-[#17251f] py-3 text-[11px] font-bold text-[#53645c] max-md:hidden`}><span>Policy</span><span>Category</span><span>Visibility</span><span className="max-lg:hidden">Document</span><span>Actions</span></div>
          {policies.map((policy) => {
            const editHref = `/admin/ethics-policies/${policy.id}/edit`;
            return (
              <article className={`${grid} group relative min-h-20 border-t border-[#d4d5ce] py-4 first:border-t-0 hover:bg-[#f2f2ed] focus-within:bg-[#f2f2ed] md:py-3`} key={policy.id}>
                <Link aria-label={`Edit ${policy.title}`} className="absolute inset-0 z-0 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#153c2e]" href={editHref} />
                <div className="min-w-0 pr-20 md:pr-0"><strong className="block truncate text-[15px] font-bold text-[#17251f]">{policy.title}</strong><small className="mt-1 block text-xs text-[#68756f] md:hidden">{policy.category || "General"}</small></div>
                <p className="min-w-0 truncate text-xs text-[#68756f] before:mr-2 before:inline-block before:w-24 before:font-bold before:text-[#374a41] before:content-['Category'] md:before:hidden">{policy.category || "General"}</p>
                <p className="text-xs text-[#68756f] before:mr-2 before:inline-block before:w-24 before:font-bold before:text-[#374a41] before:content-['Visibility'] md:before:hidden"><i className={statusTw(policy.publish_status || "draft")}>{policy.publish_status || "draft"}</i></p>
                <p className="block text-xs text-[#68756f] before:mr-2 before:inline-block before:w-24 before:font-bold before:text-[#374a41] before:content-['Document'] md:hidden lg:block lg:before:hidden">{policy.file_url ? "Attached" : "No file"}</p>
                <div className="relative z-10 flex items-center justify-end gap-1.5 max-md:absolute max-md:right-0 max-md:top-3">
                  <Link aria-label={`Edit ${policy.title}`} className={iconButton} href={editHref} title="Edit ethics policy"><Pencil size={17} /></Link>
                  {policy.file_url && <a aria-label={`Open document for ${policy.title}`} className={iconButton} href={policy.file_url} rel="noopener noreferrer" target="_blank" title="Open document"><ExternalLink size={17} /></a>}
                  <DeleteEthicsPolicyButton id={policy.id} title={policy.title} />
                </div>
              </article>
            );
          })}
        </div>
      )}

      {pageCount > 1 && <nav aria-label="Ethics policy pages" className="flex items-center justify-between gap-4 border-t border-[#d4d5ce] py-5 text-xs text-[#53645c]">{page > 1 ? <Link className="inline-flex items-center gap-1.5 font-semibold hover:text-[#153c2e]" href={pageHref(page - 1, query, status)}><ChevronLeft size={15} /> Previous</Link> : <span className="inline-flex items-center gap-1.5 opacity-40"><ChevronLeft size={15} /> Previous</span>}<p aria-live="polite">Page {page} of {pageCount}</p>{page < pageCount ? <Link className="inline-flex items-center gap-1.5 font-semibold hover:text-[#153c2e]" href={pageHref(page + 1, query, status)}>Next <ChevronRight size={15} /></Link> : <span className="inline-flex items-center gap-1.5 opacity-40">Next <ChevronRight size={15} /></span>}</nav>}
    </>
  );
}
