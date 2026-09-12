import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

type Area = {
  slug: string;
  name: string;
  description: string;
  projects: number;
  publications: number;
};

export function ResearchAreaDirectory({ areas }: { areas: Area[] }) {
  if (areas.length === 0) {
    return (
      <div className="border-t border-[#17251f] py-20 text-center">
        <p className="font-sans text-sm text-[#8a9690]">No research areas match your filters.</p>
      </div>
    );
  }

  return (
    <div className="border-t border-[#17251f] pb-16">
      {areas.map((area, index) => (
        <article
          key={area.slug}
          className="group border-b border-[#d7d5cd] transition-colors hover:bg-[#f7f6f2]"
        >
          <div className="grid grid-cols-[56px_1fr] max-sm:grid-cols-1">
            <div className="flex items-start justify-center pt-8 max-sm:hidden">
              <span className="font-sans text-[11px] tabular-nums text-[#b0afa8]">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="grid grid-cols-[1fr_auto] items-center gap-6 border-l border-[#d7d5cd] px-6 py-8 max-sm:grid-cols-1 max-sm:border-l-0 max-sm:px-0 max-sm:py-6">
              <div className="min-w-0">
                <h2 className="mb-2 text-2xl font-medium leading-snug tracking-tight text-[#17251f]">
                  <Link
                    className="decoration-[#267457]/40 underline-offset-3 transition-colors hover:text-[#267457] hover:underline"
                    href={`/research-areas/${area.slug}`}
                  >
                    {area.name}
                  </Link>
                </h2>
                <p className="mb-4 font-sans text-sm leading-relaxed text-[#405149]">
                  {area.description}
                </p>
                <div className="flex gap-8">
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#8b928c]">Projects</span>
                    <span className="text-2xl font-normal text-[#17251f] mt-0.5 leading-tight tabular-nums">{area.projects}</span>
                    <span className="font-sans text-[10px] text-[#8b928c] mt-0.5">Active inquiries</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#8b928c]">Publications</span>
                    <span className="text-2xl font-normal text-[#17251f] mt-0.5 leading-tight tabular-nums">{area.publications}</span>
                    <span className="font-sans text-[10px] text-[#8b928c] mt-0.5">Peer-reviewed</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center max-sm:justify-start">
                <Link
                  href={`/research-areas/${area.slug}`}
                  className="inline-flex items-center gap-1.5 border-b border-transparent pb-px font-sans text-[11px] font-medium uppercase tracking-widest text-[#17251f] transition-all duration-200 hover:border-[#267457] hover:text-[#267457]"
                >
                  View area
                  <ArrowUpRight
                    size={12}
                    strokeWidth={1.8}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
