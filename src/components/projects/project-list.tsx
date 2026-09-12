"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Project = {
  slug: string;
  status: string;
  area: string;
  areaSlug: string;
  title: string;
  summary: string;
  lead: string;
};

const getStatusStyles = (status: string) => {
  const normalized = (status || "").toLowerCase();

  switch (normalized) {
    case "ongoing":
      return {
        cls: "bg-[#ecf7f2] text-[#0e6144] border border-[#c3ebd7]",
        label: "Active",
      };

    case "completed":
      return {
        cls: "bg-[#f3f4f6] text-[#4b5563] border border-[#d1d5db]",
        label: "Completed",
      };

    case "proposed":
      return {
        cls: "bg-[#fffbeb] text-[#92400e] border border-[#fde68a]",
        label: "Proposed",
      };

    default:
      return {
        cls: "bg-[#f5f2ea] text-[#68726c] border border-[#e2ded5]",
        label: status
          ? status.charAt(0).toUpperCase() + status.slice(1)
          : "Unknown",
      };
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
      const haystack =
        `${project.title} ${project.summary}`.toLowerCase();

      if (!haystack.includes(query)) return false;
    }

    return true;
  });

  if (filtered.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-[#627068]">
        No projects match your filters.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {filtered.map((project) => {
        const style = getStatusStyles(project.status);

        return (
          <Link
            key={project.slug}
            aria-label={`View ${project.title} project`}
            href={`/projects/${project.slug}`}
            className="group block cursor-pointer rounded-sm border border-[#e5dfd3] bg-white p-6 shadow-xs transition-all duration-200 hover:border-[#0e2820] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0e2820] sm:p-7"
          >
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
              <div className="flex-1">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium ${style.cls}`}
                  >
                    {style.label}
                  </span>

                  <span className="rounded bg-[#f5f2ea] px-2 py-0.5 text-xs font-medium text-[#68726c]">
                    {project.area}
                  </span>
                </div>

                <h2
                  className="mb-2.5 font-semibold tracking-tight text-[#141d18] transition-colors group-hover:text-[#0e2820]"
                  style={{
                    fontFamily:
                      'Garamond, "EB Garamond", "Times New Roman", serif',
                    fontSize: "2rem",
                  }}
                >
                  {project.title}
                </h2>

                <p className="max-w-4xl text-justify text-sm font-normal leading-relaxed text-[#425048] md:text-[15px]">
                  {project.summary}
                </p>
              </div>

              <div className="flex shrink-0 items-center justify-end self-end pt-4 lg:self-start lg:pt-0">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#ded8cc] text-[#55645d] transition-all group-hover:border-[#0e2820] group-hover:bg-[#0e2820] group-hover:text-white"
                >
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
