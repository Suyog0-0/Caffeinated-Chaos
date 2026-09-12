import Link from "next/link";
import { CalendarDays, ChevronLeft, ChevronRight, Landmark, Megaphone, Pencil, Search } from "lucide-react";
import { requireAdmin } from "@/app/admin/admin-auth";
import { DeleteSecondaryContentButton } from "@/components/admin/delete-secondary-content-button";
import type { SecondaryContentKind } from "@/app/secondary-content-actions";

const PAGE_SIZE = 10;
const config = {
  event: { route: "/admin/events", icon: CalendarDays, empty: "No events found", detail: "Event details", select: "id, title, event_type, location, start_at, publish_status, is_demo_data, created_at" },
  grant: { route: "/admin/grants", icon: Landmark, empty: "No grants found", detail: "Grant status", select: "id, title, funder, deadline, status, publish_status, is_demo_data, created_at" },
  announcement: { route: "/admin/announcements", icon: Megaphone, empty: "No announcements found", detail: "Summary", select: "id, title, summary, publish_status, is_demo_data, created_at" },
} as const;

type ContentRow = {
  id: string;
  title: string;
  publish_status: string;
  is_demo_data: boolean;
  event_type?: string | null;
  location?: string | null;
  start_at?: string | null;
  funder?: string | null;
  deadline?: string | null;
  status?: string | null;
  summary?: string | null;
};

const iconButton = "relative z-10 inline-flex size-9 items-center justify-center border border-[#d4d5ce] bg-[#fffefb] text-[#53645c] transition-colors hover:border-[#153c2e] hover:text-[#153c2e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#153c2e]";
const grid = "grid grid-cols-1 items-center gap-x-5 gap-y-3 md:grid-cols-[minmax(240px,1.8fr)_minmax(150px,1fr)_120px_110px] lg:grid-cols-[minmax(300px,1.8fr)_minmax(170px,1fr)_120px_110px_116px]";

function pageHref(route: string, page: number, query: string, status: string) {
  const params = new URLSearchParams();
  if (query) params.set("query", query);
  if (status !== "all") params.set("status", status);
  if (page > 1) params.set("page", String(page));
  return `${route}${params.size ? `?${params}` : ""}`;
}

function supportingText(kind: SecondaryContentKind, row: ContentRow) {
  if (kind === "event") return [row.event_type, row.location, row.start_at ? new Date(row.start_at).toLocaleDateString("en-GB") : null].filter(Boolean).join(" · ") || "Event details not added";
  if (kind === "grant") return [row.funder, row.deadline ? `Due ${new Date(row.deadline).toLocaleDateString("en-GB")}` : null].filter(Boolean).join(" · ") || "Grant details not added";
  return row.summary || "Summary not added";
}

function statusClass(status: string | null | undefined) {
  const tone = status === "published" || status === "open"
    ? "border-[#a9c0b6] bg-[#e9f0ec] text-[#204e3a]"
    : status === "preview" || status === "awarded"
      ? "border-[#d9ca91] bg-[#f7f0d9] text-[#6b5814]"
      : "border-[#c8cbc4] bg-[#eeeee9] text-[#53645c]";
  return `inline-flex rounded-full border px-2 py-1 text-[11px] not-italic capitalize ${tone}`;
}

export async function SecondaryContentDirectory({ kind, page, query, status }: { kind: SecondaryContentKind; page: number; query: string; status: string }) {
  const { supabase } = await requireAdmin();
  const item = config[kind];
  let request = supabase.from(kind).select(item.select, { count: "exact" }).order("created_at", { ascending: false }).range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
  const safeQuery = query.trim().replace(/[%_]/g, "");
  if (safeQuery) request = request.ilike("title", `%${safeQuery}%`);
  if (["draft", "preview", "published"].includes(status)) request = request.eq("publish_status", status);
  const { data, count, error } = await request;
  const rows = (data ?? []) as unknown as ContentRow[];
  const total = count ?? 0;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const Icon = item.icon;

  return (
    <>
      <form className="grid grid-cols-2 items-center gap-2.5 py-6 sm:flex">
        <label className="col-span-2 flex min-h-11 flex-1 items-center gap-2.5 border border-[#c9cbc4] bg-[#fffefb] px-3 text-[#738079] focus-within:border-[#153c2e] focus-within:ring-2 focus-within:ring-[#153c2e]/10">
          <Search aria-hidden="true" size={17} />
          <span className="sr-only">Search by title</span>
          <input className="w-full bg-transparent text-sm text-[#17251f] outline-none placeholder:text-[#87918c]" defaultValue={query} name="query" placeholder="Search by title" />
        </label>
        <select aria-label="Filter by publication status" className="min-h-11 border border-[#c9cbc4] bg-[#fffefb] px-3 text-[13px] text-[#17251f] outline-none focus:border-[#153c2e] focus:ring-2 focus:ring-[#153c2e]/10" defaultValue={status} name="status"><option value="all">All statuses</option><option value="published">Published</option><option value="preview">Preview</option><option value="draft">Draft</option></select>
        <button className="min-h-11 bg-[#153c2e] px-4 text-[13px] font-bold text-white transition-colors hover:bg-[#204e3a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#153c2e]" type="submit">Apply filters</button>
        {(query || status !== "all") && <Link className="col-span-2 justify-self-start text-[13px] text-[#53645c] underline decoration-[#8a948f] underline-offset-4 hover:text-[#153c2e]" href={item.route}>Clear filters</Link>}
      </form>
      {!error && <p className="mb-3 text-xs text-[#68756f]">{total} result{total === 1 ? "" : "s"}</p>}
      {error ? (
        <section className="flex items-start gap-4 border-y border-[#d4d5ce] py-8 text-[#53645c]"><Icon aria-hidden="true" className="mt-0.5 shrink-0" size={23} /><div><h2 className="text-base font-bold text-[#17251f]">{error.code === "PGRST205" ? `${kind[0].toUpperCase()}${kind.slice(1)} setup is required` : "Content could not be loaded"}</h2><p className="mt-1 text-sm leading-6">{error.code === "PGRST205" ? "Apply the included local Supabase migration, then refresh this page." : "Check the Supabase connection and RLS policies, then refresh."}</p></div></section>
      ) : rows.length === 0 ? (
        <section className="flex items-start gap-4 border-y border-[#d4d5ce] py-8 text-[#53645c]"><Icon aria-hidden="true" className="mt-0.5 shrink-0" size={23} /><div><h2 className="text-base font-bold text-[#17251f]">{item.empty}</h2><p className="mt-1 text-sm leading-6">Create the first record or change the current filters.</p></div></section>
      ) : (
        <div className="border-b border-[#d4d5ce]">
          <div aria-hidden="true" className={`${grid} border-y border-[#17251f] py-3 text-[11px] font-bold text-[#53645c] max-md:hidden`}>
            <span>{kind === "announcement" ? "Announcement" : kind === "event" ? "Event" : "Grant"}</span><span>{item.detail}</span><span>Visibility</span><span className="max-lg:hidden">Source</span><span>Actions</span>
          </div>
          {rows.map((row) => (
            <article className={`${grid} group relative min-h-20 border-t border-[#d4d5ce] py-4 first:border-t-0 hover:bg-[#f2f2ed] focus-within:bg-[#f2f2ed] md:py-3`} key={row.id}>
              <Link aria-label={`Edit ${row.title}`} className="absolute inset-0 z-0 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#153c2e]" href={`${item.route}/${row.id}/edit`} />
              <div className="min-w-0 pr-20 md:pr-0"><strong className="block truncate text-[15px] font-bold text-[#17251f]">{row.title}</strong><small className="mt-1 block truncate text-xs text-[#68756f] md:hidden">{supportingText(kind, row)}</small></div>
              <p className={`relative z-10 min-w-0 text-xs text-[#68756f] ${kind === "grant" ? "flex items-center gap-2 before:w-24 before:font-bold before:text-[#374a41] before:content-['Grant_status'] md:block md:before:hidden" : "max-md:hidden"}`}>{kind === "grant" ? <i className={statusClass(row.status)}>{row.status || "Not set"}</i> : <span className="line-clamp-2">{supportingText(kind, row)}</span>}</p>
              <p className="relative z-10 flex items-center gap-2 text-xs text-[#68756f] before:w-24 before:font-bold before:text-[#374a41] before:content-['Visibility'] md:block md:before:hidden"><i className={statusClass(row.publish_status)}>{row.publish_status}</i></p>
              <p className="relative z-10 block text-xs text-[#68756f] before:mr-2 before:inline-block before:w-24 before:font-bold before:text-[#374a41] before:content-['Source'] md:hidden lg:block lg:before:hidden">{row.is_demo_data ? "Demo data" : "College record"}</p>
              <div className="relative z-10 flex items-center justify-end gap-1.5 max-md:absolute max-md:right-0 max-md:top-3"><Link aria-label={`Edit ${row.title}`} className={iconButton} href={`${item.route}/${row.id}/edit`} title={`Edit ${kind}`}><Pencil size={17} /></Link><DeleteSecondaryContentButton id={row.id} kind={kind} title={row.title} /></div>
            </article>
          ))}
        </div>
      )}
      {pageCount > 1 && (
        <nav aria-label="Pages" className="flex items-center justify-between gap-4 border-t border-[#d4d5ce] py-5 text-xs text-[#53645c]">
          {page > 1 ? <Link className="inline-flex items-center gap-1.5 font-semibold hover:text-[#153c2e]" href={pageHref(item.route, page - 1, query, status)}><ChevronLeft size={15} /> Previous</Link> : <span className="inline-flex items-center gap-1.5 opacity-40"><ChevronLeft size={15} /> Previous</span>}
          <p aria-live="polite">Page {page} of {pageCount}</p>
          {page < pageCount ? <Link className="inline-flex items-center gap-1.5 font-semibold hover:text-[#153c2e]" href={pageHref(item.route, page + 1, query, status)}>Next <ChevronRight size={15} /></Link> : <span className="inline-flex items-center gap-1.5 opacity-40">Next <ChevronRight size={15} /></span>}
        </nav>
      )}
    </>
  );
}
