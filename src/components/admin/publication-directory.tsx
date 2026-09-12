import Link from "next/link";
import { BookOpen, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { PublicationRow, type PublicationRowData } from "@/components/admin/publication-row";
import { requireAdmin } from "@/app/admin/admin-auth";
import { adminTw } from "@/components/admin/admin-tailwind";

const PAGE_SIZE = 10;

function pageHref(page: number, query: string, status: string) {
  const params = new URLSearchParams();
  if (query) params.set("query", query);
  if (status !== "all") params.set("status", status);
  if (page > 1) params.set("page", String(page));
  const suffix = params.toString();
  return `/admin/publications${suffix ? `?${suffix}` : ""}`;
}

export async function PublicationDirectory({
  page,
  query,
  status,
}: {
  page: number;
  query: string;
  status: string;
}) {
  const { supabase } = await requireAdmin();
  let request = supabase
    .from("publication")
    .select("id, title, publication_type, year, venue, publish_status, is_ijmr", { count: "exact" })
    .order("created_at", { ascending: false })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  const safeQuery = query.trim().replace(/[%_,]/g, "");
  if (safeQuery) {
    request = request.or(`title.ilike.%${safeQuery}%,venue.ilike.%${safeQuery}%,doi.ilike.%${safeQuery}%`);
  }
  if (["draft", "preview", "published"].includes(status)) {
    request = request.eq("publish_status", status);
  }

  const { data, count, error } = await request;
  const publications = (data ?? []) as PublicationRowData[];
  const total = count ?? 0;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <>
      <form className={adminTw.filters}>
        <label>
          <Search size={17} />
          <span className="sr-only">Search publications</span>
          <input defaultValue={query} name="query" placeholder="Search title, venue, or DOI" />
        </label>
        <select aria-label="Filter by publication status" defaultValue={status} name="status">
          <option value="all">All statuses</option>
          <option value="published">Published</option>
          <option value="preview">Preview</option>
          <option value="draft">Draft</option>
        </select>
        <button type="submit">Apply filters</button>
        {(query || status !== "all") && <Link href="/admin/publications">Clear</Link>}
      </form>

      {!error && <p className={adminTw.resultsCount}>{total} publication{total === 1 ? "" : "s"}</p>}

      {error ? (
        <section className={adminTw.inlineState}>
          <BookOpen size={23} />
          <div><h2>Publications could not be loaded</h2><p>Check the Supabase connection and publication RLS policies, then refresh this page.</p></div>
        </section>
      ) : publications.length === 0 ? (
        <section className={adminTw.inlineState}>
          <BookOpen size={23} />
          <div><h2>No publications found</h2><p>Try a different search or publication status.</p></div>
        </section>
      ) : (
        <>
          <div className={adminTw.table}>
            <div className={`${adminTw.tableHead} ${adminTw.publicationGrid}`} aria-hidden="true">
              <span>Publication</span><span>Type</span><span>Status</span><span>Year</span><span>Actions</span>
            </div>
            {publications.map((publication) => <PublicationRow key={publication.id} publication={publication} />)}
          </div>

          {pageCount > 1 && (
            <nav aria-label="Publication pages" className={adminTw.pagination}>
              {page > 1 ? (
                <Link href={pageHref(page - 1, query, status)}><ChevronLeft size={15} /> Previous</Link>
              ) : (
                <span><ChevronLeft size={15} /> Previous</span>
              )}
              <p aria-live="polite">Page {page} of {pageCount}</p>
              {page < pageCount ? (
                <Link href={pageHref(page + 1, query, status)}>Next <ChevronRight size={15} /></Link>
              ) : (
                <span>Next <ChevronRight size={15} /></span>
              )}
            </nav>
          )}
        </>
      )}
    </>
  );
}
