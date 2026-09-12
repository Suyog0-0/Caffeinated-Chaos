"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Project = {
  slug: string;
  status: string;
  area: string;
  title: string;
  summary: string;
  lead: string;
};

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
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "all";
  const area = searchParams.get("area") || "all";
  const query = (searchParams.get("query") || "").trim().toLowerCase();

  const filtered = projects.filter((project) => {
    if (status !== "all" && project.status !== status) return false;
    if (area !== "all" && project.area !== area) return false;
    if (query) {
      const haystack = `${project.title} ${project.summary}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    return (
      <p className="text-sm text-[#627068] py-12 text-center">
        No projects match your filters.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {filtered.map((project) => (
        <article
          className="bg-white border border-[#e5dfd3] hover:border-[#0e2820] rounded-sm p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-200 group"
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
                <span className="text-xs font-mono text-[#68726c] bg-[#f5f2ea] px-2 py-0.5 rounded">
                  {project.area}
                </span>
              </div>
              <h2 className="font-serif text-2xl md:text-[1.7rem] font-semibold text-[#141d18] group-hover:text-[#0e2820] transition-colors mb-2.5 tracking-tight">
                {project.title}
              </h2>
              <p className="text-sm md:text-[15px] text-[#425048] leading-relaxed max-w-4xl font-light">
                {project.summary}
              </p>
            </div>

            <div className="flex lg:flex-col items-center justify-end gap-3 self-end lg:self-start shrink-0 pt-4 lg:pt-0">
              <Link
                aria-label="View project detail"
                className="w-10 h-10 rounded-full border border-[#ded8cc] group-hover:border-[#0e2820] group-hover:bg-[#0e2820] flex items-center justify-center text-[#55645d] group-hover:text-white transition-all"
                href={`/projects/${project.slug}`}
              >
                <ArrowUpRight
                  className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
