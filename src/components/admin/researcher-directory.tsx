import Link from "next/link";
import { ChevronLeft, ChevronRight, Search, Users } from "lucide-react";
import { ResearcherRow } from "@/components/admin/researcher-row";
import { requireAdmin } from "@/app/admin/admin-auth";
import { adminTw } from "@/components/admin/admin-tailwind";

const PAGE_SIZE = 10;

type Researcher = {
  id: string;
  name: string;
  position: string | null;
  department: string | null;
  email: string | null;
  photo_url: string | null;
  publish_status: string;
  is_demo_data: boolean;
};

function pageHref(page: number, query: string, status: string) {
  const params = new URLSearchParams();
  if (query) params.set("query", query);
  if (status !== "all") params.set("status", status);
  if (page > 1) params.set("page", String(page));
  const suffix = params.toString();
  return `/admin/researchers${suffix ? `?${suffix}` : ""}`;
}

export async function ResearcherDirectory({
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
    .from("researcher")
    .select(
      "id, name, position, department, email, photo_url, publish_status, is_demo_data",
      { count: "exact" },
    )
    .order("name")
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  const safeQuery = query.trim().replace(/[%_]/g, "");
  if (safeQuery) request = request.ilike("name", `%${safeQuery}%`);
  if (["draft", "preview", "published"].includes(status)) {
    request = request.eq("publish_status", status);
  }

  const { data, count, error } = await request;
  const researchers = (data ?? []) as Researcher[];
  const total = count ?? 0;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <>
      <form className={adminTw.filters}>
        <label>
          <Search size={17} />
          <span className="sr-only">Search researchers</span>
          <input defaultValue={query} name="query" placeholder="Search by researcher name" />
        </label>
        <select aria-label="Filter by publication status" defaultValue={status} name="status">
          <option value="all">All statuses</option>
          <option value="published">Published</option>
          <option value="preview">Preview</option>
          <option value="draft">Draft</option>
        </select>
        <button type="submit">Apply filters</button>
        {(query || status !== "all") && <Link href="/admin/researchers">Clear</Link>}
      </form>

      {!error && <p className={adminTw.resultsCount}>{total} researcher{total === 1 ? "" : "s"}</p>}

      {error ? (
        <section className={adminTw.inlineState}>
          <Users size={23} />
          <div><h2>Researchers could not be loaded</h2><p>Check the Supabase connection and RLS policies, then refresh this page.</p></div>
        </section>
      ) : researchers.length === 0 ? (
        <section className={adminTw.inlineState}>
          <Users size={23} />
          <div><h2>No researchers found</h2><p>Try a different name or publication status.</p></div>
        </section>
      ) : (
        <>
          <div className={adminTw.table}>
            <div className={adminTw.tableHead} aria-hidden="true">
              <span>Researcher</span><span>Department</span><span>Status</span><span>Source</span><span>Actions</span>
            </div>
            {researchers.map((researcher) => (
              <ResearcherRow key={researcher.id} researcher={researcher} />
            ))}
          </div>

          {pageCount > 1 && (
            <nav aria-label="Researcher pages" className={adminTw.pagination}>
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
