import { ArrowUpRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { kicker, pageShell, sectionTitle } from "./shared";
import { getResearchAreas } from "./data/research-areas";
export async function ResearchAreas() {
  const researchAreas = await getResearchAreas();

  return (
    <section className={`${pageShell} py-24 max-sm:py-16`}>
      <header className="mb-14 grid grid-cols-[1.1fr_.9fr] items-end gap-16 max-sm:grid-cols-1 max-sm:gap-5">
        <div>
          <p className={kicker}>Find your starting point</p>

          <h2 className={`${sectionTitle} text-[clamp(50px,5.8vw,76px)]`}>
            Explore research areas
          </h2>
        </div>

        <p className="max-w-lg font-sans text-[18px] leading-8 text-[#405149]">
          Follow a subject to the researchers investigating it, the projects
          in progress, and the evidence they publish.
        </p>
      </header>

      <div className="border-t border-[#17251f]">
        {researchAreas.map((area, index) => (
          <Link
            className="group grid min-h-[176px] grid-cols-[64px_minmax(0,1fr)_260px_52px] items-center gap-7 border-b border-[#d7d5cd] py-7 transition-colors duration-300 hover:bg-[#faf9f5] max-lg:grid-cols-[48px_minmax(0,1fr)_180px_48px] max-sm:grid-cols-[34px_1fr_42px] max-sm:gap-4 max-sm:py-7"
            href={`/research-areas/${area.slug}`}
            key={area.id}
          >
            <span className="self-start pt-2 font-sans text-[15px] font-semibold text-[#6e7772] max-sm:pt-1 max-sm:text-[13px]">
              {String(index + 1).padStart(2, "0")}
            </span>

            <span>
              <strong className="block text-[34px] font-medium leading-[1.08] tracking-[-0.015em] transition-colors group-hover:text-[#153c2e] max-sm:text-[26px]">
                {area.name}
              </strong>

              <small className="mt-4 block max-w-3xl text-justify font-sans text-[16px] leading-8 text-[#405149] max-sm:text-left max-sm:text-[15px] max-sm:leading-7">
                {area.description}
              </small>
            </span>

            <span className="flex justify-end gap-8 font-sans text-[14px] font-semibold text-[#27463a] max-lg:flex-col max-lg:items-start max-lg:gap-2 max-sm:col-start-2 max-sm:flex-row max-sm:text-[13px]">
              <small className="whitespace-nowrap">
                {area.project_count} projects
              </small>

              <small className="whitespace-nowrap">
                {area.publication_count} publications
              </small>
            </span>

            <span className="grid size-11 place-items-center border border-[#d7d5cd] bg-[#fffefb] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#153c2e] group-hover:bg-[#153c2e] group-hover:text-white max-sm:col-start-3 max-sm:row-span-2 max-sm:row-start-1 max-sm:size-10">
              <ArrowUpRight aria-hidden size={20} />
            </span>
          </Link>
        ))}
      </div>

      <Link
        className={buttonVariants({
          variant: "link",
          className: "mt-8 font-sans text-[16px] font-semibold text-[#153c2e] transition-transform hover:translate-x-1",
        })}
        href="/research-areas"
      >
        Browse all research areas
        <ChevronRight aria-hidden size={16} />
      </Link>
    </section>
  );
}
