import Link from "next/link";
import { ExternalLink, Pencil, Search, Users } from "lucide-react";
import { DeleteResearcherButton } from "@/components/admin/delete-researcher-button";
import { requireAdmin } from "@/app/admin/admin-auth";

const PAGE_SIZE = 25;

type Researcher = {
  id: string;
  name: string;
  position: string | null;
  department: string | null;
  email: string | null;
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
      "id, name, position, department, email, publish_status, is_demo_data",
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
      <form className="admin-filters">
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

      {!error && <p className="admin-results-count">{total} researcher{total === 1 ? "" : "s"}</p>}

      {error ? (
        <section className="admin-inline-state">
          <Users size={23} />
          <div><h2>Researchers could not be loaded</h2><p>Check the Supabase connection and RLS policies, then refresh this page.</p></div>
        </section>
      ) : researchers.length === 0 ? (
        <section className="admin-inline-state">
          <Users size={23} />
          <div><h2>No researchers found</h2><p>Try a different name or publication status.</p></div>
        </section>
      ) : (
        <>
          <div className="admin-researcher-table">
            <div className="admin-researcher-head" aria-hidden="true">
              <span>Researcher</span><span>Department</span><span>Status</span><span>Source</span><span>Actions</span>
            </div>
            {researchers.map((researcher) => {
              const initials = researcher.name.split(" ").map((part) => part[0]).join("").slice(0, 2);
              return (
                <article className="admin-researcher-row" key={researcher.id}>
                  <div className="admin-researcher-name">
                    <span>{initials}</span>
                    <div><strong>{researcher.name}</strong><small>{researcher.position ?? researcher.email ?? "Position not added"}</small></div>
                  </div>
                  <p data-label="Department">{researcher.department ?? "Not assigned"}</p>
                  <p data-label="Status"><i className={`admin-status admin-status-${researcher.publish_status}`}>{researcher.publish_status}</i></p>
                  <p data-label="Source">{researcher.is_demo_data ? "Demo data" : "College record"}</p>
                  <div className="admin-row-actions">
                    <Link aria-label={`Edit ${researcher.name}`} href={`/admin/researchers/${researcher.id}/edit`} title="Edit researcher"><Pencil size={17} /></Link>
                    <Link aria-label={`View ${researcher.name}'s public profile`} href={`/people/${researcher.id}`} title="View public profile"><ExternalLink size={17} /></Link>
                    <DeleteResearcherButton id={researcher.id} name={researcher.name} />
                  </div>
                </article>
              );
            })}
          </div>

          {pageCount > 1 && (
            <nav aria-label="Researcher pages" className="admin-pagination">
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
