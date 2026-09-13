import { ArrowUpRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import type { PartnerRecord } from "./partner-actions";
import { PartnerLogo } from "./partner-logo";

export function PartnerDetailHero({ partner }: { partner: PartnerRecord }) {
  return (
    <header className="border-b border-white/15 bg-[#12372b] text-white">
      <div className="mx-auto grid min-h-[540px] w-[min(calc(100%_-_48px),1240px)] grid-cols-[minmax(0,1fr)_320px] items-center gap-20 py-16 max-lg:grid-cols-[minmax(0,1fr)_250px] max-lg:gap-12 max-md:grid-cols-1 max-md:gap-10 max-sm:w-[calc(100%_-_32px)] max-sm:py-12">
        <div>
          <Link
            className="inline-flex items-center gap-1 font-sans text-sm text-white/70 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            href="/partners"
          >
            <ChevronLeft aria-hidden="true" size={16} />
            Partner directory
          </Link>

          <p className="mt-16 font-sans text-xs font-semibold text-[#b9d4c8] max-md:mt-10">
            {partner.partner_type || "Research partner"}
          </p>

          <h1 className="mt-4 max-w-[12ch] font-serif text-[clamp(52px,7vw,92px)] font-normal leading-[0.94] tracking-[-0.045em] text-white">
            {partner.name}
          </h1>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 font-sans">
            {partner.research_area_name && (
              <span className="text-sm text-white/70">
                {partner.research_area_name}
              </span>
            )}

            {partner.website && (
              <a
                className="group inline-flex items-center gap-2 border-b border-white/50 pb-1 text-sm font-semibold text-white transition-colors hover:border-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                href={partner.website}
                rel="noreferrer"
                target="_blank"
              >
                Visit partner website
                <ArrowUpRight
                  aria-hidden="true"
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  size={16}
                />
              </a>
            )}
          </div>
        </div>

        <div className="justify-self-end border border-white/20 bg-[#f8f7f2] p-8 shadow-[18px_18px_0_rgba(0,0,0,0.12)] max-md:justify-self-start max-sm:w-full">
          <PartnerLogo
            className="size-60 rounded-none bg-white font-serif text-5xl ring-0 max-lg:size-48 max-sm:mx-auto"
            logoUrl={partner.logo_url}
            name={partner.name}
          />
          <p className="mt-6 border-t border-[#d7d5cd] pt-4 font-sans text-xs font-semibold text-[#496157]">
            Institutional partner
          </p>
        </div>
      </div>
    </header>
  );
}
