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

        <div className="mt-8 flex flex-wrap items-stretch gap-10">
          <div className="flex items-baseline gap-2.5">
            <span className="size-1.5 rounded-full bg-[#153c2e]" />
            <div className="font-serif text-5xl leading-none text-[#17251f]">
              {totalPartners}
            </div>
            <div className="text-sm text-[#68726c]">Active partners</div>
          </div>

          <div className="w-px self-stretch bg-[#e5e4de]" />

          <div className="flex items-baseline gap-2.5">
            <span className="size-1.5 rounded-full bg-[#153c2e]" />
            <div className="font-serif text-5xl leading-none text-[#17251f]">
              {totalCategories}
            </div>
            <div className="text-sm text-[#68726c]">Partner categories</div>
          </div>
        </div>
      </div>
    </section>
  );
}
