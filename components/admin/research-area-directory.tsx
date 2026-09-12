import Link from "next/link";
import { FlaskConical, Search } from "lucide-react";
import { ResearchAreaRow, type ResearchAreaRowValue } from "@/components/admin/research-area-row";
import { requireAdmin } from "@/src/app/admin/admin-auth";

const PAGE_SIZE = 25;

function pageHref(page: number, query: string, status: string) {
  const params = new URLSearchParams();
  if (query) params.set("query", query);
  if (status !== "all") params.set("status", status);
  if (page > 1) params.set("page", String(page));
  const suffix = params.toString();
  return `/admin/research-areas${suffix ? `?${suffix}` : ""}`;
}

export async function ResearchAreaDirectory({
  query,
  status,
  page,
}: {
  query: string;
  status: string;
  page: number;
}) {
  const { supabase } = await requireAdmin();
  let request = supabase
    .from("research_area")
    .select("id, slug, name, publish_status, is_active, is_demo_data", { count: "exact" })
    .order("name")
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  const safeQuery = query.trim().replace(/[%_]/g, "");
  if (safeQuery) request = request.ilike("name", `%${safeQuery}%`);
  if (["draft", "preview", "published"].includes(status)) {
    request = request.eq("publish_status", status);
  }

  const { data, count, error } = await request;
  const researchAreas = (data ?? []) as ResearchAreaRowValue[];
  const total = count ?? 0;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <>
      <form className="admin-filters">
        <label>
          <Search size={17} />
          <span className="sr-only">Search research areas</span>
          <input defaultValue={query} name="query" placeholder="Search by research area name" />
        </label>
        <select aria-label="Filter by publication status" defaultValue={status} name="status">
          <option value="all">All statuses</option>
          <option value="published">Published</option>
          <option value="preview">Preview</option>
          <option value="draft">Draft</option>
        </select>
        <button type="submit">Apply filters</button>
        {(query || status !== "all") && <Link href="/admin/research-areas">Clear</Link>}
      </form>

      {!error && <p className="admin-results-count">{total} research area{total === 1 ? "" : "s"}</p>}

      {error ? (
        <section className="admin-inline-state">
          <FlaskConical size={23} />
          <div><h2>Research areas could not be loaded</h2><p>Check the Supabase connection and RLS policies, then refresh this page.</p></div>
        </section>
      ) : researchAreas.length === 0 ? (
        <section className="admin-inline-state">
          <FlaskConical size={23} />
          <div><h2>No research areas found</h2><p>Try a different name or publication status.</p></div>
        </section>
      ) : (
        <>
          <div className="admin-researcher-table">
            <div className="admin-researcher-head" aria-hidden="true">
              <span>Research area</span><span>Status</span><span>Availability</span><span>Source</span><span>Actions</span>
            </div>
            {researchAreas.map((researchArea) => <ResearchAreaRow key={researchArea.id} researchArea={researchArea} />)}
          </div>

          {pageCount > 1 && (
            <nav aria-label="Research area pages" className="admin-pagination">
              {page > 1 ? <Link href={pageHref(page - 1, query, status)}>Previous</Link> : <span>Previous</span>}
              <p>Page {page} of {pageCount}</p>
              {page < pageCount ? <Link href={pageHref(page + 1, query, status)}>Next</Link> : <span>Next</span>}
            </nav>
          )}
        </>
      )}
    </>
  );
}
