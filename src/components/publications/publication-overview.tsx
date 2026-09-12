import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
});

const sectionHeading =
  "font-serif text-4xl font-medium tracking-tight text-[#0F2D24]";

type Project = {
  slug: string;
  status: string;
  title: string;
  summary: string;
};

export function PublicationOverview({
  summary,
  project,
}: {
  summary: string;
  project?: Project;
}) {
  return (
    <section>
      <h2 className={`${sectionHeading} mb-6`}>Abstract</h2>
      <p
        className={`${inter.className} max-w-3xl text-justify text-[18px] leading-relaxed text-[#405149]`}
      >
        {summary}
      </p>
      {project && (
        <>
          <h2 className={`${sectionHeading} mt-12 mb-6`}>Related project</h2>
          <Link
            className={`${inter.className} group block rounded-2xl border border-[#d7d5cd] bg-[#f6f3eb] p-6 transition-all duration-300 hover:border-[#153c2e] hover:bg-[#eeeae0]`}
            href={`/projects/${project.slug}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-3">
                  <h3
                    className="text-justify text-3xl font-medium leading-snug text-[#0e1c16]"
                    style={{
                      fontFamily:
                        'Garamond, "EB Garamond", "Times New Roman", serif',
                    }}
                  >
                    {project.title}
                  </h3>
                  <span className="mt-1 inline-block rounded-full border border-[#c2bfb6] bg-[#eeeae0] px-2.5 py-1 text-[11px] font-medium uppercase tracking-widest text-[#153c2e]">
                    {project.status}
                  </span>
                </div>
                <p className="mt-2 text-justify text-base leading-relaxed text-[#405149]">
                  {project.summary}
                </p>
              </div>
              <div className="shrink-0 mt-1">
                <span className="grid size-9 place-items-center rounded-full bg-[#153c2e] text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight size={16} aria-hidden="true" />
                </span>
              </div>
            </div>
          </Link>
        </>
      )}
    </section>
  );
}
