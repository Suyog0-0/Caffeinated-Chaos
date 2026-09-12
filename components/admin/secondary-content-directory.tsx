import Link from "next/link";
import { CalendarDays, Landmark, Megaphone, Pencil, Search } from "lucide-react";
import { requireAdmin } from "@/src/app/admin/admin-auth";
import { DeleteSecondaryContentButton } from "@/components/admin/delete-secondary-content-button";
import type { SecondaryContentKind } from "@/src/app/admin/secondary-content-actions";

const PAGE_SIZE = 25;
const config = {
  event: { route: "/admin/events", icon: CalendarDays, empty: "No events found", select: "id, title, event_type, location, start_at, publish_status, is_demo_data, created_at" },
  grant: { route: "/admin/grants", icon: Landmark, empty: "No grants found", select: "id, title, funder, deadline, status, publish_status, is_demo_data, created_at" },
  announcement: { route: "/admin/announcements", icon: Megaphone, empty: "No announcements found", select: "id, title, summary, publish_status, is_demo_data, created_at" },
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
      <form className="admin-filters">
        <label><Search size={17} /><span className="sr-only">Search by title</span><input defaultValue={query} name="query" placeholder="Search by title" /></label>
        <select aria-label="Filter by publication status" defaultValue={status} name="status"><option value="all">All statuses</option><option value="published">Published</option><option value="preview">Preview</option><option value="draft">Draft</option></select>
        <button type="submit">Apply filters</button>
        {(query || status !== "all") && <Link href={item.route}>Clear</Link>}
      </form>
      {!error && <p className="admin-results-count">{total} result{total === 1 ? "" : "s"}</p>}
      {error ? (
        <section className="admin-inline-state"><Icon size={23} /><div><h2>{error.code === "PGRST205" ? `${kind[0].toUpperCase()}${kind.slice(1)} setup is required` : "Content could not be loaded"}</h2><p>{error.code === "PGRST205" ? "Apply the included local Supabase migration, then refresh this page." : "Check the Supabase connection and RLS policies, then refresh."}</p></div></section>
      ) : rows.length === 0 ? (
        <section className="admin-inline-state"><Icon size={23} /><div><h2>{item.empty}</h2><p>Create the first record or change the current filters.</p></div></section>
      ) : (
        <div className="admin-content-table">
          {rows.map((row) => (
            <article className="admin-content-row" key={row.id}>
              <Link aria-label={`Edit ${row.title}`} className="admin-row-hit-area" href={`${item.route}/${row.id}/edit`} />
              <div><strong>{row.title}</strong><small>{supportingText(kind, row)}</small></div>
              {kind === "grant" && <p data-label="Grant status"><i className={`admin-status admin-status-${row.status}`}>{row.status}</i></p>}
              <p data-label="Publication status"><i className={`admin-status admin-status-${row.publish_status}`}>{row.publish_status}</i></p>
              <p data-label="Source">{row.is_demo_data ? "Demo data" : "College record"}</p>
              <div className="admin-row-actions"><Link aria-label={`Edit ${row.title}`} href={`${item.route}/${row.id}/edit`} title={`Edit ${kind}`}><Pencil size={17} /></Link><DeleteSecondaryContentButton id={row.id} kind={kind} title={row.title} /></div>
            </article>
          ))}
        </div>
      )}
      {pageCount > 1 && <nav aria-label="Pages" className="admin-pagination">{page > 1 ? <Link href={pageHref(item.route, page - 1, query, status)}>Previous</Link> : <span>Previous</span>}<p>Page {page} of {pageCount}</p>{page < pageCount ? <Link href={pageHref(item.route, page + 1, query, status)}>Next</Link> : <span>Next</span>}</nav>}
    </>
  );
}
