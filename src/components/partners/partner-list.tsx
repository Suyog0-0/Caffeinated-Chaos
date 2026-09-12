"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PartnerFilters, PartnerFilterState } from "./partner-filters";
import type { PartnerRecord } from "./partners-actions";

interface PartnerListProps {
  partners: PartnerRecord[];
}

export function PartnerList({ partners }: PartnerListProps) {
  const categories = useMemo(
    () =>
      Array.from(
        new Set(partners.map((p) => p.partner_type).filter(Boolean))
      ) as string[],
    [partners]
  );

  const researchTypes = useMemo(
    () =>
      Array.from(
        new Set(partners.map((p) => p.research_area_name).filter(Boolean))
      ) as string[],
    [partners]
  );

  const [filters, setFilters] = useState<PartnerFilterState>({
    query: "",
    category: "all",
    researchType: "all",
  });

  const filtered = partners.filter((partner) => {
    const matchesQuery = partner.name
      .toLowerCase()
      .includes(filters.query.trim().toLowerCase());
    const matchesCategory =
      filters.category === "all" || partner.partner_type === filters.category;
    const matchesResearch =
      filters.researchType === "all" ||
      partner.research_area_name === filters.researchType;
    return matchesQuery && matchesCategory && matchesResearch;
  });

  return (
    <div>
      <PartnerFilters
        categories={categories}
        researchTypes={researchTypes}
        value={filters}
        onChange={setFilters}
      />

      <div className="bg-[#faf9f5] px-6 py-14 md:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          {filtered.length === 0 ? (
            <div className="rounded-md border border-dashed border-neutral-300 bg-white px-8 py-16 text-center">
              <p className="font-serif text-2xl text-[#0d2818]">
                No partners match those filters.
              </p>
              <p className="mt-2 text-sm text-neutral-600">
                Try clearing the search or choosing a different category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((partner) => (
                <PartnerCard key={partner.id} partner={partner} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PartnerCard({ partner }: { partner: PartnerRecord }) {
  return (
    <Link href={`/partners/${partner.id}`}>
      <Card className="h-full rounded-md border border-neutral-200 bg-white p-6 transition-colors hover:border-[#0d2818]">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#eef0ea] text-sm font-medium text-[#0d2818]">
            {partner.logo_url ? (
              <Image
                src={partner.logo_url}
                alt={partner.name}
                width={44}
                height={44}
                className="h-full w-full object-cover"
              />
            ) : (
              <span>
                {partner.name
                  .split(" ")
                  .slice(0, 2)
                  .map((word) => word[0])
                  .join("")}
              </span>
            )}
          </div>
          <div>
            <h3 className="font-serif text-lg text-[#0d2818]">
              {partner.name}
            </h3>
            {partner.partner_type && (
              <Badge
                variant="outline"
                className="mt-1 border-neutral-300 text-xs font-normal text-neutral-600"
              >
                {partner.partner_type}
              </Badge>
            )}
          </div>
        </div>

        {partner.description && (
          <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-neutral-600">
            {partner.description}
          </p>
        )}
      </Card>
    </Link>
  );
}
