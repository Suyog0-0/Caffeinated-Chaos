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
        <Link
          href={`/research-areas/${area.slug}`}
          key={area.slug}
          className="group flex min-h-[190px] items-start gap-7 border-b border-[#d7d5cd] py-8 transition-colors duration-300 hover:bg-[#faf9f5] focus-visible:bg-[#faf9f5] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#153c2e] max-sm:min-h-0 max-sm:gap-4 max-sm:py-7"
        >
          <span className="w-12 shrink-0 pt-1 font-sans text-lg font-semibold tabular-nums text-[#6e7772] transition-colors group-hover:text-[#153c2e] max-sm:w-8 max-sm:text-[15px]">
            {String(index + 1).padStart(2, "0")}
          </span>

          <span className="min-w-0 flex-1">
            <strong
              className="block font-medium text-[#17251f] transition-colors group-hover:text-[#153c2e]"
              style={{ fontSize: "clamp(28px, 3vw, 36px)", letterSpacing: "-0.015em", lineHeight: 1.08 }}
            >
              {area.name}
            </strong>
            <span className="mt-4 block max-w-3xl text-justify font-sans text-[16px] leading-7 text-[#405149] max-sm:mt-3 max-sm:text-[15px]">
              {area.description}
            </span>
            <span className="mt-5 flex gap-7 font-sans text-[13px] font-semibold text-[#36594b] max-sm:flex-wrap max-sm:gap-x-5 max-sm:gap-y-1">
              <span>{area.projects} {area.projects === 1 ? "project" : "projects"}</span>
              <span>{area.publications} {area.publications === 1 ? "publication" : "publications"}</span>
            </span>
          </span>

          <span className="grid size-11 shrink-0 place-items-center border border-[#d7d5cd] bg-[#fffefb] text-[#17251f] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#153c2e] group-hover:bg-[#153c2e] group-hover:text-white max-sm:size-10">
            <ArrowUpRight aria-hidden="true" size={20} strokeWidth={1.8} />
          </span>
        </Link>
      ))}
    </div>
  );
}
