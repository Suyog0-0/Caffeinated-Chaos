import Link from "next/link";
import { ChevronLeft, ChevronRight, FlaskConical, Search } from "lucide-react";
import { ResearchAreaRow, type ResearchAreaRowValue } from "@/components/admin/research-area-row";
import { requireAdmin } from "@/app/admin/admin-auth";

const PAGE_SIZE = 10;
const grid = "grid grid-cols-1 items-center gap-x-5 gap-y-3 md:grid-cols-[minmax(240px,1.8fr)_120px_120px_110px] lg:grid-cols-[minmax(300px,1.8fr)_120px_120px_110px_116px]";

function pageHref(page: number, query: string, status: string) {
  const params = new URLSearchParams();
  if (query) params.set("query", query);
  if (status !== "all") params.set("status", status);
  if (page > 1) params.set("page", String(page));
  const suffix = params.toString();
  return `/admin/research-areas${suffix ? `?${suffix}` : ""}`;
}

export async function ResearchAreaDirectory({ query, status, page }: { query: string; status: string; page: number }) {
  const { supabase } = await requireAdmin();
  let request = supabase
    .from("research_area")
    .select("id, slug, name, publish_status, is_active, is_demo_data", { count: "exact" })
    .order("name")
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  const safeQuery = query.trim().replace(/[%_]/g, "");
  if (safeQuery) request = request.ilike("name", `%${safeQuery}%`);
  if (["draft", "preview", "published"].includes(status)) request = request.eq("publish_status", status);

  const { data, count, error } = await request;
  const researchAreas = (data ?? []) as ResearchAreaRowValue[];
  const total = count ?? 0;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <>
      <form className="grid grid-cols-2 items-center gap-2.5 py-6 sm:flex">
        <label className="col-span-2 flex min-h-11 flex-1 items-center gap-2.5 border border-[#c9cbc4] bg-[#fffefb] px-3 text-[#738079] focus-within:border-[#153c2e] focus-within:ring-2 focus-within:ring-[#153c2e]/10">
          <Search aria-hidden="true" size={17} /><span className="sr-only">Search research areas</span>
          <input className="w-full bg-transparent text-sm text-[#17251f] outline-none placeholder:text-[#87918c]" defaultValue={query} name="query" placeholder="Search by research area name" />
        </label>
        <select aria-label="Filter by publication status" className="min-h-11 border border-[#c9cbc4] bg-[#fffefb] px-3 text-[13px] text-[#17251f] outline-none focus:border-[#153c2e] focus:ring-2 focus:ring-[#153c2e]/10" defaultValue={status} name="status"><option value="all">All statuses</option><option value="published">Published</option><option value="preview">Preview</option><option value="draft">Draft</option></select>
        <button className="min-h-11 bg-[#153c2e] px-4 text-[13px] font-bold text-white hover:bg-[#204e3a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#153c2e]" type="submit">Apply filters</button>
        {(query || status !== "all") && <Link className="col-span-2 justify-self-start text-[13px] text-[#53645c] underline underline-offset-4 hover:text-[#153c2e]" href="/admin/research-areas">Clear filters</Link>}
      </form>

      {!error && <p className="mb-3 text-xs text-[#68756f]">{total} research area{total === 1 ? "" : "s"}</p>}
      {error ? (
        <section className="flex items-start gap-4 border-y border-[#d4d5ce] py-8 text-[#53645c]"><FlaskConical className="mt-0.5 shrink-0" size={23} /><div><h2 className="text-base font-bold text-[#17251f]">Research areas could not be loaded</h2><p className="mt-1 text-sm leading-6">Check the Supabase connection and RLS policies, then refresh this page.</p></div></section>
      ) : researchAreas.length === 0 ? (
        <section className="flex items-start gap-4 border-y border-[#d4d5ce] py-8 text-[#53645c]"><FlaskConical className="mt-0.5 shrink-0" size={23} /><div><h2 className="text-base font-bold text-[#17251f]">No research areas found</h2><p className="mt-1 text-sm leading-6">Try a different name or publication status.</p></div></section>
      ) : (
        <div className="border-b border-[#d4d5ce]">
          <div aria-hidden="true" className={`${grid} border-y border-[#17251f] py-3 text-[11px] font-bold text-[#53645c] max-md:hidden`}><span>Research area</span><span>Status</span><span>Availability</span><span className="max-lg:hidden">Source</span><span>Actions</span></div>
          {researchAreas.map((researchArea) => <ResearchAreaRow gridClassName={grid} key={researchArea.id} researchArea={researchArea} />)}
        </div>
      )}

      {pageCount > 1 && (
        <nav aria-label="Research area pages" className="flex items-center justify-between gap-4 border-t border-[#d4d5ce] py-5 text-xs text-[#53645c]">
          {page > 1 ? <Link className="inline-flex items-center gap-1.5 font-semibold hover:text-[#153c2e]" href={pageHref(page - 1, query, status)}><ChevronLeft size={15} /> Previous</Link> : <span className="inline-flex items-center gap-1.5 opacity-40"><ChevronLeft size={15} /> Previous</span>}
          <p aria-live="polite">Page {page} of {pageCount}</p>
          {page < pageCount ? <Link className="inline-flex items-center gap-1.5 font-semibold hover:text-[#153c2e]" href={pageHref(page + 1, query, status)}>Next <ChevronRight size={15} /></Link> : <span className="inline-flex items-center gap-1.5 opacity-40">Next <ChevronRight size={15} /></span>}
        </nav>
      )}
    </>
  );
}
