import { Handshake, Tags } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface PartnersHeroProps {
  totalPartners: number;
  totalCategories: number;
}

export function PartnersHero({ totalPartners, totalCategories }: PartnersHeroProps) {
  return (
    <section className="bg-[#f4f2ec] pb-16 pt-14">
      <div className="mx-auto w-[min(calc(100%_-_48px),1240px)] max-sm:w-[calc(100%_-_32px)]">
        <p className="text-sm font-medium tracking-wide text-[#153c2e]">
          Partners
        </p>
        <h1 className="mt-4 max-w-2xl font-serif text-5xl leading-[1.1] text-[#17251f] md:text-6xl">
          People and institutions doing the work with us.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-[#405149]">
          Every project on this hub grows out of a relationship — with the
          researchers, industry sponsors, and public institutions who share
          our standards for evidence.
        </p>

        <Separator className="mt-12 bg-[#e5e4de]" />

        <div className="mt-8 flex flex-wrap items-stretch gap-8 max-sm:flex-col">
          <div className="flex min-w-56 items-center gap-4">
            <span className="grid size-10 shrink-0 place-items-center border border-[#b9c2bd] text-[#153c2e]">
              <Handshake aria-hidden="true" size={18} strokeWidth={1.6} />
            </span>
            <div className="flex items-baseline gap-3">
              <div className="font-serif text-5xl leading-none text-[#17251f]">
                {totalPartners}
              </div>
              <div className="text-sm text-[#68726c]">Active partners</div>
            </div>
          </div>

          <div className="w-px self-stretch bg-[#d7d5cd] max-sm:hidden" />

          <div className="flex min-w-56 items-center gap-4">
            <span className="grid size-10 shrink-0 place-items-center border border-[#b9c2bd] text-[#153c2e]">
              <Tags aria-hidden="true" size={18} strokeWidth={1.6} />
            </span>
            <div className="flex items-baseline gap-3">
              <div className="font-serif text-5xl leading-none text-[#17251f]">
                {totalCategories}
              </div>
              <div className="text-sm text-[#68726c]">Partner categories</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
