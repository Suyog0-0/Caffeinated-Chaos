import { Separator } from "@/components/ui/separator";

interface PartnersHeroProps {
  totalPartners: number;
  totalCategories: number;
}

export function PartnersHero({ totalPartners, totalCategories }: PartnersHeroProps) {
  return (
    <section className="bg-[#f4f2ec] px-6 pb-16 pt-14 md:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium tracking-wide text-neutral-700">
          Partners
        </p>
        <h1 className="mt-4 max-w-2xl font-serif text-5xl leading-[1.1] text-[#0d2818] md:text-6xl">
          People and institutions doing the work with us.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-600">
          Every project on this hub grows out of a relationship — with the
          researchers, industry sponsors, and public institutions who share
          our standards for evidence.
        </p>

        <Separator className="mt-12 bg-neutral-300" />

        <div className="mt-8 flex flex-wrap gap-12">
          <div>
            <div className="font-serif text-4xl text-[#0d2818]">
              {totalPartners}
            </div>
            <div className="mt-1 text-sm text-neutral-600">Active partners</div>
          </div>
          <div>
            <div className="font-serif text-4xl text-[#0d2818]">
              {totalCategories}
            </div>
            <div className="mt-1 text-sm text-neutral-600">
              Partner categories
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
