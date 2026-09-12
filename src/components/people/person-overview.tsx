import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

type ProjectSummary = {
  slug: string;
  status: string;
  title: string;
  summary: string;
};

export function PersonOverview({
  biography,
  projects,
}: {
  biography: string;
  projects: ProjectSummary[];
}) {
  return (
    <section>
      <h2 className="mb-6 text-4xl font-medium">Biography</h2>
      <p className="max-w-3xl text-[22px] whitespace-pre-wrap">{biography}</p>
      {projects.length > 0 && (
        <>
          <h2 className="mt-12 mb-6 text-4xl font-medium">Current projects</h2>
          {projects.map((project) => (
            <Link
              className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#153c2e]"
              href={`/projects/${project.slug}`}
              key={project.slug}
            >
              <div className="border-t border-[#d7d5cd] bg-transparent py-6">
                <span className="inline-block text-[10px] font-sans font-bold text-[#405149] uppercase tracking-widest">{project.status}</span>
                <h3 className="my-1 flex items-center gap-2 text-2xl font-medium">
                    {project.title}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                      size={17}
                    />
                  </h3>
                  <p className="text-sm text-[#405149]">{project.summary}</p>
              </div>
            </Link>
          ))}
        </>
      )}
    </section>
  );
}
