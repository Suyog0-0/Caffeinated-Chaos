import { ArrowUpRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { PartnerLogo } from "@/components/partners/partner-logo";
import { getPartners } from "@/components/partners/partner-actions";
import { buttonVariants } from "@/components/ui/button";
import { kicker, pageShell, sectionTitle } from "./shared";

const PARTNER_LIMIT = 5;

export async function HomePartners() {
  const partners = (await getPartners()).slice(0, PARTNER_LIMIT);

  if (partners.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="home-partners-title"
      className="border-b border-[#d7d5cd] bg-[#f3f0e8] py-20 max-sm:py-16"
    >
      <div className={pageShell}>
        <header className="mb-10 grid grid-cols-[1fr_auto] items-end gap-10 max-sm:grid-cols-1 max-sm:gap-5">
          <div>
            <p className={kicker}>Research partners</p>
            <h2
              className={`${sectionTitle} max-w-3xl`}
              id="home-partners-title"
            >
              Shared standards. Wider reach.
            </h2>
          </div>

          <p className="max-w-md font-sans text-[16px] leading-7 text-[#405149] lg:text-right">
            Organisations helping turn college research into useful work beyond
            the campus.
          </p>
        </header>

        <ul className="grid border-l border-t border-[#cbc9c0] sm:grid-cols-2 lg:grid-cols-5">
          {partners.map((partner) => (
            <li
              className="min-w-0 border-b border-r border-[#cbc9c0]"
              key={partner.id}
            >
              <Link
                aria-label={`View ${partner.name}`}
                className="group flex min-h-[220px] cursor-pointer flex-col p-6 transition-colors duration-300 hover:bg-[#fffefb] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#153c2e]"
                href={`/partners/${partner.id}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <PartnerLogo
                    className="size-14 bg-[#fffefb]"
                    logoUrl={partner.logo_url}
                    name={partner.name}
                  />

                  <ArrowUpRight
                    aria-hidden="true"
                    className="text-[#66766e] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#153c2e]"
                    size={18}
                  />
                </div>

                <div className="mt-auto pt-8">
                  <h3 className="text-[22px] font-medium leading-[1.08] tracking-[-0.015em] text-[#17251f] decoration-1 underline-offset-4 group-hover:text-[#153c2e] group-hover:underline">
                    {partner.name}
                  </h3>

                  {partner.partner_type && (
                    <p className="mt-3 font-sans text-[11px] font-semibold leading-5 text-[#68756f]">
                      {partner.partner_type}
                    </p>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <Link
          className={buttonVariants({
            variant: "link",
            className:
              "mt-7 font-sans text-[15px] font-semibold text-[#153c2e] transition-transform hover:translate-x-1",
          })}
          href="/partners"
        >
          View all partners
          <ChevronRight aria-hidden="true" size={16} />
        </Link>
      </div>
    </section>
  );
}
