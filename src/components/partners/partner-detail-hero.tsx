// src/components/partners/partner-detail-hero.tsx

import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { PartnerRecord } from "./partners-actions";

export function PartnerDetailHero({
  partner,
}: {
  partner: PartnerRecord;
}) {
  const initials = partner.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <section className="bg-[#f4f2ec] px-6 pb-14 pt-10 md:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/partners"
          className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-[#0d2818]"
        >
          <ArrowLeft className="h-4 w-4" />
          All partners
        </Link>

        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#eef0ea] font-serif text-2xl font-semibold text-[#0d2818]">
            {initials}
          </div>

          <div>
            <h1 className="font-serif text-4xl text-[#0d2818] md:text-5xl">
              {partner.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              {partner.partner_type && (
                <Badge
                  variant="outline"
                  className="border-neutral-300 font-normal text-neutral-600"
                >
                  {partner.partner_type}
                </Badge>
              )}

              {partner.research_area_name && (
                <Badge
                  variant="outline"
                  className="border-[#0d2818]/30 font-normal text-[#0d2818]"
                >
                  {partner.research_area_name}
                </Badge>
              )}
            </div>

            {partner.website && (
              <a
                href={partner.website}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#0d2818] hover:underline"
              >
                Visit website
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}