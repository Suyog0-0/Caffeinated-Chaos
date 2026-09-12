import Link from "next/link";
import { BriefcaseBusiness, ChevronLeft, ChevronRight, Pencil, Search } from "lucide-react";
import { requireAdmin } from "@/app/admin/admin-auth";
import { DeleteOpportunityButton } from "@/components/admin/delete-opportunity-button";
import { statusTw } from "@/components/admin/admin-tailwind";

const PAGE_SIZE = 10;
const grid = "grid grid-cols-1 items-center gap-x-5 gap-y-3 md:grid-cols-[minmax(270px,2fr)_minmax(135px,.8fr)_95px_110px] lg:grid-cols-[minmax(340px,2.2fr)_minmax(150px,.8fr)_95px_110px_116px]";
const iconButton = "relative z-10 inline-flex size-9 items-center justify-center border border-[#d4d5ce] bg-[#fffefb] text-[#53645c] transition-colors hover:border-[#153c2e] hover:text-[#153c2e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#153c2e]";

type OpportunityRow = {
  id: string;
  title: string;
  opportunity_type: string | null;
  deadline: string | null;
  status: string | null;
  publish_status: string | null;
  is_demo_data: boolean | null;
};

function pageHref(page: number, query: string, visibility: string, state: string) {
  const params = new URLSearchParams();
  if (query) params.set("query", query);
  if (visibility !== "all") params.set("visibility", visibility);
  if (state !== "all") params.set("state", state);
  if (page > 1) params.set("page", String(page));
  const suffix = params.toString();
  return `/admin/opportunities${suffix ? `?${suffix}` : ""}`;
}

function opportunityStatus(status: string | null) {
  const open = status === "open";
  return `inline-flex rounded-full border px-2 py-1 text-[11px] not-italic capitalize ${
    open
      ? "border-[#a9c0b6] bg-[#e9f0ec] text-[#204e3a]"
      : "border-[#c8cbc4] bg-[#eeeee9] text-[#53645c]"
  }`;
}

function formatDeadline(deadline: string | null) {
  if (!deadline) return "Rolling";
  const date = new Date(`${deadline}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? deadline
    : date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export async function OpportunityDirectory({
  page,
  query,
  visibility,
  state,
}: {
  page: number;
  query: string;
  visibility: string;
  state: string;
}) {
  const { supabase } = await requireAdmin();
  let request = supabase
    .from("opportunity")
    .select("id, title, opportunity_type, deadline, status, publish_status, is_demo_data", { count: "exact" })
    .order("created_at", { ascending: false })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  const safeQuery = query.trim().replace(/[%_,]/g, "");
  if (safeQuery) {
    request = request.or(`title.ilike.%${safeQuery}%,opportunity_type.ilike.%${safeQuery}%`);
  }
  if (["draft", "preview", "published"].includes(visibility)) {
    request = request.eq("publish_status", visibility);
  }
  if (["open", "closed"].includes(state)) {
    request = request.eq("status", state);
  }

  const { data, count, error } = await request;
  const opportunities = (data ?? []) as OpportunityRow[];
  const total = count ?? 0;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <>
      <form className="grid grid-cols-2 items-center gap-2.5 py-6 sm:flex">
        <label className="col-span-2 flex min-h-11 flex-1 items-center gap-2.5 border border-[#c9cbc4] bg-[#fffefb] px-3 text-[#738079] focus-within:border-[#153c2e] focus-within:ring-2 focus-within:ring-[#153c2e]/10">
          <Search aria-hidden="true" size={17} />
          <span className="sr-only">Search opportunities</span>
          <input className="w-full bg-transparent text-sm text-[#17251f] outline-none placeholder:text-[#87918c]" defaultValue={query} name="query" placeholder="Search title or type" />
        </label>
        <select aria-label="Filter by opportunity status" className="min-h-11 border border-[#c9cbc4] bg-[#fffefb] px-3 text-[13px] text-[#17251f] outline-none focus:border-[#153c2e]" defaultValue={state} name="state">
          <option value="all">All states</option><option value="open">Open</option><option value="closed">Closed</option>
        </select>
        <select aria-label="Filter by publication status" className="min-h-11 border border-[#c9cbc4] bg-[#fffefb] px-3 text-[13px] text-[#17251f] outline-none focus:border-[#153c2e]" defaultValue={visibility} name="visibility">
          <option value="all">All visibility</option><option value="published">Published</option><option value="preview">Preview</option><option value="draft">Draft</option>
        </select>
        <button className="min-h-11 bg-[#153c2e] px-4 text-[13px] font-bold text-white hover:bg-[#204e3a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#153c2e]" type="submit">Apply filters</button>
        {(query || visibility !== "all" || state !== "all") && <Link className="col-span-2 justify-self-start text-[13px] text-[#53645c] underline underline-offset-4 hover:text-[#153c2e]" href="/admin/opportunities">Clear</Link>}
      </form>

      {!error && <p className="mb-3 text-xs text-[#68756f]">{total} opportunit{total === 1 ? "y" : "ies"}</p>}

      {error ? (
        <section className="flex items-start gap-4 border-y border-[#d4d5ce] py-8 text-[#53645c]"><BriefcaseBusiness className="mt-0.5 shrink-0" size={23} /><div><h2 className="text-base font-bold text-[#17251f]">Opportunities could not be loaded</h2><p className="mt-1 text-sm leading-6">Check the Supabase connection and opportunity RLS policies, then refresh.</p></div></section>
      ) : opportunities.length === 0 ? (
        <section className="flex items-start gap-4 border-y border-[#d4d5ce] py-8 text-[#53645c]"><BriefcaseBusiness className="mt-0.5 shrink-0" size={23} /><div><h2 className="text-base font-bold text-[#17251f]">No opportunities found</h2><p className="mt-1 text-sm leading-6">Create the first opportunity or change the current filters.</p></div></section>
      ) : (
        <div className="border-b border-[#d4d5ce]">
          <div aria-hidden="true" className={`${grid} border-y border-[#17251f] py-3 text-[11px] font-bold text-[#53645c] max-md:hidden`}>
            <span>Opportunity</span><span>Type</span><span>Status</span><span className="max-lg:hidden">Deadline</span><span>Actions</span>
          </div>
          {opportunities.map((opportunity) => {
            const editHref = `/admin/opportunities/${opportunity.id}/edit`;
            return (
              <article className={`${grid} group relative min-h-20 border-t border-[#d4d5ce] py-4 first:border-t-0 hover:bg-[#f2f2ed] focus-within:bg-[#f2f2ed] md:py-3`} key={opportunity.id}>
                <Link aria-label={`Edit ${opportunity.title}`} className="absolute inset-0 z-0 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#153c2e]" href={editHref} />
                <div className="min-w-0 pr-20 md:pr-0"><strong className="block truncate text-[15px] font-bold text-[#17251f]">{opportunity.title}</strong><small className="mt-1 block truncate text-xs text-[#68756f]">{opportunity.publish_status ? <i className={`${statusTw(opportunity.publish_status)} mr-2 !px-1.5 !py-px !text-[10px]`}>{opportunity.publish_status}</i> : null}{opportunity.is_demo_data ? "Demo data" : "College record"}</small></div>
                <p className="min-w-0 truncate text-xs text-[#68756f] before:mr-2 before:inline-block before:w-24 before:font-bold before:text-[#374a41] before:content-['Type'] md:before:hidden">{opportunity.opportunity_type || "Not specified"}</p>
                <p className="text-xs text-[#68756f] before:mr-2 before:inline-block before:w-24 before:font-bold before:text-[#374a41] before:content-['Status'] md:before:hidden"><i className={opportunityStatus(opportunity.status)}>{opportunity.status || "Not set"}</i></p>
                <p className="block text-xs text-[#68756f] before:mr-2 before:inline-block before:w-24 before:font-bold before:text-[#374a41] before:content-['Deadline'] md:hidden lg:block lg:before:hidden">{formatDeadline(opportunity.deadline)}</p>
                <div className="relative z-10 flex items-center justify-end gap-1.5 max-md:absolute max-md:right-0 max-md:top-3"><Link aria-label={`Edit ${opportunity.title}`} className={iconButton} href={editHref} title="Edit opportunity"><Pencil size={17} /></Link><DeleteOpportunityButton id={opportunity.id} title={opportunity.title} /></div>
              </article>
            );
          })}
        </div>
      )}

      {pageCount > 1 && (
        <nav aria-label="Opportunity pages" className="flex items-center justify-between gap-4 border-t border-[#d4d5ce] py-5 text-xs text-[#53645c]">
          {page > 1 ? <Link className="inline-flex items-center gap-1.5 font-semibold hover:text-[#153c2e]" href={pageHref(page - 1, query, visibility, state)}><ChevronLeft size={15} /> Previous</Link> : <span className="inline-flex items-center gap-1.5 opacity-40"><ChevronLeft size={15} /> Previous</span>}
          <p aria-live="polite">Page {page} of {pageCount}</p>
          {page < pageCount ? <Link className="inline-flex items-center gap-1.5 font-semibold hover:text-[#153c2e]" href={pageHref(page + 1, query, visibility, state)}>Next <ChevronRight size={15} /></Link> : <span className="inline-flex items-center gap-1.5 opacity-40">Next <ChevronRight size={15} /></span>}
        </nav>
      )}
    </>
  );
}
