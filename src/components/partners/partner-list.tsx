// src/components/partners/partner-list.tsx

"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PartnerFilters, PartnerFilterState } from "./partner-filters";
import { PartnerLogo } from "./partner-logo";
import type { PartnerRecord } from "./partner-actions";

interface PartnerListProps {
  partners: PartnerRecord[];
}

const PAGE_SIZE = 9;

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

  const [page, setPage] = useState(1);

  const filtered = partners.filter((partner) => {
    const matchesQuery = partner.name
      .toLowerCase()
      .includes(filters.query.trim().toLowerCase());

    const matchesCategory =
      filters.category === "all" ||
      partner.partner_type === filters.category;

    const matchesResearch =
      filters.researchType === "all" ||
      partner.research_area_name === filters.researchType;

    return matchesQuery && matchesCategory && matchesResearch;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  useEffect(() => {
    setPage(1);
  }, [filters.query, filters.category, filters.researchType]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const currentPage = Math.min(page, totalPages);

  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div>
      <PartnerFilters
        categories={categories}
        researchTypes={researchTypes}
        value={filters}
        onChange={(next) => {
          setFilters(next);
          setPage(1);
        }}
      />

      <div className="bg-[#faf9f5] py-14">
        <div className="mx-auto w-[min(calc(100%_-_48px),1240px)] max-sm:w-[calc(100%_-_32px)]">
          {filtered.length === 0 ? (
            <div className="rounded-md border border-dashed border-[#e2ded5] bg-white px-8 py-16 text-center">
              <p className="font-serif text-2xl text-[#17251f]">
                No partners match those filters.
              </p>

              <p className="mt-2 text-sm text-[#68726c]">
                Try clearing the search or choosing a different category.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {paginated.map((partner) => (
                  <PartnerCard
                    key={partner.id}
                    partner={partner}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <PartnerPagination
                  page={currentPage}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function PartnerPagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const pages = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  );

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 border-[#e2ded5]"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {pages.map((p) => (
        <Button
          key={p}
          variant={p === page ? "default" : "outline"}
          size="icon"
          className={
            p === page
              ? "h-9 w-9 bg-[#153c2e] text-white hover:bg-[#153c2e]/90"
              : "h-9 w-9 border-[#e2ded5] text-[#405149]"
          }
          onClick={() => onPageChange(p)}
        >
          {p}
        </Button>
      ))}

      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 border-[#e2ded5]"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

function PartnerCard({
  partner,
}: {
  partner: PartnerRecord;
}) {
  return (
    <Link href={`/partners/${partner.id}`}>
      <Card className="group h-full rounded-md border border-[#e5e4de] bg-white p-6 transition-colors hover:border-[#153c2e]">
        <div className="flex items-center gap-3">
          <PartnerLogo
            className="h-11 w-11 text-sm font-medium"
            logoUrl={partner.logo_url}
            name={partner.name}
          />

          <div>
            <h3 className="font-serif text-xl leading-snug text-[#17251f] transition-colors group-hover:text-[#0e2820]">
              {partner.name}
            </h3>

            {partner.partner_type && (
              <Badge
                variant="outline"
                className="mt-1 border-[#e2ded5] text-xs font-normal text-[#68726c]"
              >
                {partner.partner_type}
              </Badge>
            )}
          </div>
        </div>

        {partner.description && (
          <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-[#405149]">
            {partner.description}
          </p>
        )}
      </Card>
    </Link>
  );
}
