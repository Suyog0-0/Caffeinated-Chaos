import Link from "next/link";
import { FolderKanban, Search } from "lucide-react";
import { ProjectRow } from "@/components/admin/project-row";
import { requireAdmin } from "@/src/app/admin/admin-auth";

const PAGE_SIZE = 25;

type ProjectRecord = {
  id: string;
  slug: string;
  title: string;
  status: string;
  publish_status: string;
  research_area: { name: string } | { name: string }[] | null;
};

function pageHref(page: number, query: string, status: string) {
  const params = new URLSearchParams();
  if (query) params.set("query", query);
  if (status !== "all") params.set("status", status);
  if (page > 1) params.set("page", String(page));
  const suffix = params.toString();
  return `/admin/projects${suffix ? `?${suffix}` : ""}`;
}

export async function ProjectDirectory({ query, status, page }: { query: string; status: string; page: number }) {
  const { supabase } = await requireAdmin();
  let request = supabase
    .from("project")
    .select("id, slug, title, status, publish_status, research_area(name)", { count: "exact" })
    .order("last_updated_at", { ascending: false })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  const safeQuery = query.trim().replace(/[%_]/g, "");
  if (safeQuery) request = request.ilike("title", `%${safeQuery}%`);
  if (["proposed", "ongoing", "completed", "archived"].includes(status)) request = request.eq("status", status);

  const { data, count, error } = await request;
  const projects = (data ?? []) as ProjectRecord[];
  const total = count ?? 0;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <>
      <form className="admin-filters">
        <label><Search size={17} /><span className="sr-only">Search projects</span><input defaultValue={query} name="query" placeholder="Search by project title" /></label>
        <select aria-label="Filter by project status" defaultValue={status} name="status">
          <option value="all">All statuses</option><option value="proposed">Proposed</option><option value="ongoing">Ongoing</option><option value="completed">Completed</option><option value="archived">Archived</option>
        </select>
        <button type="submit">Apply filters</button>
        {(query || status !== "all") && <Link href="/admin/projects">Clear</Link>}
      </form>
      {!error && <p className="admin-results-count">{total} project{total === 1 ? "" : "s"}</p>}

      {error ? (
        <section className="admin-inline-state"><FolderKanban size={23} /><div><h2>Projects could not be loaded</h2><p>Check the Supabase connection and project RLS policies, then refresh this page.</p></div></section>
      ) : projects.length === 0 ? (
        <section className="admin-inline-state"><FolderKanban size={23} /><div><h2>No projects found</h2><p>Try a different title or project status.</p></div></section>
      ) : (
        <>
          <div className="admin-researcher-table">
            <div className="admin-researcher-head" aria-hidden="true"><span>Project</span><span>Research area</span><span>Status</span><span>Visibility</span><span>Actions</span></div>
            {projects.map((project) => {
              const relation = project.research_area;
              const researchArea = Array.isArray(relation) ? relation[0]?.name : relation?.name;
              return <ProjectRow key={project.id} project={{ ...project, researchArea: researchArea ?? "Not assigned" }} />;
            })}
          </div>
          {pageCount > 1 && (
            <nav aria-label="Project pages" className="admin-pagination">
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
