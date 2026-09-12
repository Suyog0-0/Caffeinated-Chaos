import { ArrowUpRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { kicker, pageShell, sectionTitle } from "./shared";
import { getResearchAreas } from "./data/research-areas";
export async function ResearchAreas() {
  const researchAreas = await getResearchAreas();

  return (
    <section className={`${pageShell} py-24 max-sm:py-16`}>
      <header className="mb-12 grid grid-cols-[1.2fr_.8fr] items-end gap-16 max-sm:grid-cols-1 max-sm:gap-5">
        <div>
          <p className={kicker}>Find your starting point</p>

          <h2 className={sectionTitle}>
            Explore research areas
          </h2>
        </div>

        <p className="max-w-lg text-[#405149]">
          Follow a subject to the researchers investigating it, the projects
          in progress, and the evidence they publish.
        </p>
      </header>

      <div className="border-t border-[#17251f]">
        {researchAreas.map((area, index) => (
          <Link
            className="group grid min-h-36 grid-cols-[70px_1fr_230px_52px] items-center gap-5 border-b border-[#d7d5cd] max-sm:grid-cols-[34px_1fr_42px] max-sm:py-6"
            href={`/research-areas/${area.slug}`}
            key={area.id}
          >
            <span className="self-start pt-8 font-sans text-[11px] text-[#7e8782] max-sm:pt-1">
              {String(index + 1).padStart(2, "0")}
            </span>

            <span>
              <strong className="block text-3xl font-medium max-sm:text-2xl">
                {area.name}
              </strong>

              <small className="mt-1 block max-w-xl text-[15px] text-[#405149]">
                {area.description}
              </small>
            </span>

            <span className="flex gap-7 font-sans text-[10px] text-[#405149] max-sm:col-start-2">
              <small>
                {area.project_count} projects
              </small>

              <small>
                {area.publication_count} publications
              </small>
            </span>

            <span className="grid size-10 place-items-center border border-[#d7d5cd] transition-colors group-hover:bg-[#153c2e] group-hover:text-white max-sm:col-start-3 max-sm:row-span-2 max-sm:row-start-1">
              <ArrowUpRight aria-hidden size={20} />
            </span>
          </Link>
        ))}
      </div>

      <Link
        className={buttonVariants({
          variant: "link",
          className: "mt-8",
        })}
        href="/research-areas"
      >
        Browse all research areas
        <ChevronRight aria-hidden size={16} />
      </Link>
    </section>
  );
}
