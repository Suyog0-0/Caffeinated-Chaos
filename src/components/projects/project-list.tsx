// src/components/projects/project-list.tsx
"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

type Project = {
  slug: string;
  status: string;
  area: string;
  areaSlug: string;
  title: string;
  summary: string;
  lead: string;
};

const PAGE_SIZE = 6;

const getStatusStyles = (status: string) => {
  const normalized = (status || "").toLowerCase();
  switch (normalized) {
    case 'ongoing':
      return { cls: 'bg-[#ecf7f2] text-[#0e6144] border border-[#c3ebd7]', label: 'Active' };
    case 'completed':
      return { cls: 'bg-[#f3f4f6] text-[#4b5563] border border-[#d1d5db]', label: 'Completed' };
    case 'proposed':
      return { cls: 'bg-[#fffbeb] text-[#92400e] border border-[#fde68a]', label: 'Proposed' };
    default:
      return { cls: 'bg-[#f5f2ea] text-[#68726c] border border-[#e2ded5]', label: status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown' };
  }
};

export function ProjectList({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = (searchParams.get("query") || "").trim().toLowerCase();
  const status = searchParams.get("status") || "all";
  const area = searchParams.get("area") || "all";
  const sort = searchParams.get("sort") || "recent";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  // Filter
  let filtered = projects.filter((project) => {
    const matchesQuery =
      !query ||
      project.title.toLowerCase().includes(query) ||
      project.summary.toLowerCase().includes(query);
    const matchesStatus = status === "all" || project.status === status;
    const matchesArea = area === "all" || project.areaSlug === area;
    return matchesQuery && matchesStatus && matchesArea;
  });

  // Sort
  if (sort === "az") {
    filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
  }
  // "recent" keeps the order already returned by the server (newest first).

  // Paginate
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PAGE_SIZE);

  const goToPage = (nextPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(nextPage));
    router.push(`?${params.toString()}`);
  };

  if (filtered.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-[#68726c]">
        No projects match your filters.
      </p>
    );
  }

  return (
    <div>
      <div className="space-y-4">
        {pageItems.map((project) => (
          <Link
            href={`/projects/${project.slug}`}
            aria-label={`View ${project.title}`}
            className="block bg-white border border-[#e5dfd3] hover:border-[#0e2820] rounded-sm p-6 sm:p-7 shadow-xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group"
            key={project.slug}
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {(() => {
                    const style = getStatusStyles(project.status);
                    return (
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${style.cls}`}>
                        {style.label}
                      </span>
                    );
                  })()}
                  <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-[#68726c] bg-[#f5f2ea] px-2 py-1 rounded">
                    {project.area}
                  </span>
                </div>
                <h2 className="font-serif text-2xl md:text-[1.7rem] font-semibold text-[#141d18] group-hover:text-[#0e2820] transition-colors mb-2.5 tracking-tight">
                  {project.title}
                </h2>
                <p className="text-sm md:text-[15px] text-[#425048] leading-relaxed max-w-4xl font-light">
                  {project.summary}
                </p>
                <p className="mt-3 text-xs font-sans text-[#7c8b83]">
                  Led by <span className="font-medium text-[#46534d]">{project.lead}</span>
                </p>
              </div>

              <div className="flex lg:flex-col items-center justify-end gap-3 self-end lg:self-start shrink-0 pt-4 lg:pt-0">
                <span
                  aria-hidden="true"
                  className="w-10 h-10 rounded-full border border-[#ded8cc] group-hover:border-[#0e2820] group-hover:bg-[#0e2820] flex items-center justify-center text-[#55645d] group-hover:text-white transition-all"
                >
                  <ArrowUpRight
                    className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <nav
          aria-label="Projects pagination"
          className="mt-8 flex items-center justify-center gap-1.5"
        >
          <button
            type="button"
            className="px-3 py-1.5 text-xs font-medium border border-[#ded8cc] rounded-sm text-[#46534d] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#ebe6dc]"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              className={`w-8 h-8 text-xs font-medium rounded-sm transition-colors ${n === currentPage
                  ? "bg-[#0e2820] text-white"
                  : "border border-[#ded8cc] text-[#46534d] hover:bg-[#ebe6dc]"
                }`}
              onClick={() => goToPage(n)}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            className="px-3 py-1.5 text-xs font-medium border border-[#ded8cc] rounded-sm text-[#46534d] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#ebe6dc]"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </nav>
      )}
    </div>
  );
}