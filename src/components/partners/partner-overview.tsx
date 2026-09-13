import { ArrowUpRight, Mail } from "lucide-react";
import type { PartnerRecord } from "./partner-actions";

export function PartnerOverview({ partner }: { partner: PartnerRecord }) {
  const description = partner.bio || partner.description;

  return (
    <div>
      <p className="mb-4 font-sans text-xs font-semibold text-[#426657]">
        Partnership profile
      </p>
      <h2 className="max-w-2xl font-serif text-[clamp(40px,5vw,62px)] font-normal leading-[0.98] tracking-[-0.035em] text-[#0f2d24]">
        What {partner.name} contributes.
      </h2>

      {description ? (
        <p className="mt-9 max-w-[68ch] whitespace-pre-line font-sans text-[19px] leading-8 text-[#405149]">
          {description}
        </p>
      ) : (
        <p className="mt-9 font-sans text-[16px] leading-7 text-[#66766e]">
          Partnership details will be added as the collaboration develops.
        </p>
      )}

      {(partner.website || partner.email) && (
        <div className="mt-12 grid border-l border-t border-[#d0cec5] sm:grid-cols-2">
          {partner.website && (
            <a
              className={`group flex min-h-28 items-center justify-between gap-5 border-b border-r border-[#d0cec5] px-5 py-6 font-sans transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#153c2e] ${partner.email ? "" : "sm:col-span-2"}`}
              href={partner.website}
              rel="noreferrer"
              target="_blank"
            >
              <span>
                <span className="block text-xs font-semibold text-[#66766e]">
                  Online
                </span>
                <span className="mt-1 block text-base font-semibold text-[#153c2e]">
                  Partner website
                </span>
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="text-[#61736a] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                size={18}
              />
            </a>
          )}

          {partner.email && (
            <a
              className={`group flex min-h-28 items-center justify-between gap-5 border-b border-r border-[#d0cec5] px-5 py-6 font-sans transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#153c2e] ${partner.website ? "" : "sm:col-span-2"}`}
              href={`mailto:${partner.email}`}
            >
              <span className="min-w-0">
                <span className="block text-xs font-semibold text-[#66766e]">
                  Contact
                </span>
                <span className="mt-1 block truncate text-base font-semibold text-[#153c2e]">
                  {partner.email}
                </span>
              </span>
              <Mail aria-hidden="true" className="text-[#61736a]" size={18} />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
