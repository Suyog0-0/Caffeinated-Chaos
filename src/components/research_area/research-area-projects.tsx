import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

type Project = { slug: string; title: string; summary: string; status: string };

export function ResearchAreaProjects({ projects }: { projects: Project[] }) {
  return (
    <section>
      <h2 className="mb-6 text-4xl font-medium">Work in this area</h2>
      <div className="flex flex-col gap-4">
        {projects.map((project) => (
          <Link
            className="group block rounded-2xl border border-[#d7d5cd] bg-[#f6f3eb] p-6 transition-all duration-300 hover:border-[#153c2e] hover:bg-[#eeeae0]"
            href={`/projects/${project.slug}`}
            key={project.slug}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-3">
                  <h3 className="text-3xl font-medium leading-snug text-[#0e1c16]">
                    {project.title}
                  </h3>
                  <span className="mt-1 inline-block rounded-full border border-[#c2bfb6] bg-[#eeeae0] px-2.5 py-1 font-sans text-[11px] uppercase tracking-widest text-[#153c2e]">
                    {project.status}
                  </span>
                </div>
                <p className="mt-2 text-base leading-relaxed text-[#405149]">{project.summary}</p>
              </div>
              <div className="shrink-0 mt-1">
                <span className="grid size-9 place-items-center rounded-full bg-[#153c2e] text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight size={16} aria-hidden="true" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}