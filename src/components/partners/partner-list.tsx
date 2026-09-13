"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { PartnerFilters, type PartnerFilterState } from "./partner-filters";
import { PartnerLogo } from "./partner-logo";
import type { PartnerRecord } from "./partners-actions";

interface PartnerListProps {
  partners: PartnerRecord[];
}

interface PartnerCardProps {
  partner: PartnerRecord;
}

interface PartnerPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PAGE_SIZE = 9;

export function PartnerList({ partners }: PartnerListProps) {
  const [filters, setFilters] = useState<PartnerFilterState>({
    query: "",
    category: "all",
    researchType: "all",
  });

  const [page, setPage] = useState(1);

  const categories = useMemo(
    () =>
      Array.from(
        new Set(
          partners
            .map((partner) => partner.partner_type)
            .filter((value): value is string => Boolean(value))
        )
      ),
    [partners]
  );

  const researchTypes = useMemo(
    () =>
      Array.from(
        new Set(
          partners
            .map((partner) => partner.research_area_name)
            .filter((value): value is string => Boolean(value))
        )
      ),
    [partners]
  );

  const filteredPartners = useMemo(() => {
    const normalizedQuery = filters.query.trim().toLowerCase();

    return partners.filter((partner) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        partner.name.toLowerCase().includes(normalizedQuery);

      const matchesCategory =
        filters.category === "all" ||
        partner.partner_type === filters.category;

      const matchesResearchType =
        filters.researchType === "all" ||
        partner.research_area_name === filters.researchType;

      return matchesQuery && matchesCategory && matchesResearchType;
    });
  }, [filters, partners]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPartners.length / PAGE_SIZE)
  );

  /*
   * Clamp the derived page instead of synchronizing state with an effect.
   * This handles cases where filtering or refreshed server data reduces
   * the number of available pages.
   */
  const currentPage = Math.min(page, totalPages);

  const paginatedPartners = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;

    return filteredPartners.slice(start, start + PAGE_SIZE);
  }, [currentPage, filteredPartners]);

  const handleFiltersChange = (next: PartnerFilterState) => {
    setFilters(next);
    setPage(1);
  };

  const handlePageChange = (nextPage: number) => {
    setPage(Math.min(Math.max(nextPage, 1), totalPages));
  };

  return (
    <div>
      <PartnerFilters
        categories={categories}
        researchTypes={researchTypes}
        value={filters}
        onChange={handleFiltersChange}
      />

      <section
        aria-label="Partner results"
        className="bg-[#faf9f5] px-4 py-12 sm:px-6 sm:py-14 md:px-10 lg:px-16 lg:py-16"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-baseline justify-between gap-4 border-b border-neutral-200 pb-4 sm:mb-10">
            <p className="text-sm text-neutral-600" aria-live="polite">
              {filteredPartners.length === 0
                ? "No partners found"
                : `${filteredPartners.length} ${filteredPartners.length === 1 ? "partner" : "partners"
                }`}
            </p>

            {filteredPartners.length > 0 && (
              <p className="hidden text-xs uppercase tracking-[0.14em] text-neutral-400 sm:block">
                Directory
              </p>
            )}
          </div>

          {filteredPartners.length === 0 ? (
            <PartnerEmptyState />
          ) : (
            <>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                {paginatedPartners.map((partner) => (
                  <li key={partner.id} className="min-w-0">
                    <PartnerCard partner={partner} />
                  </li>
                ))}
              </ul>

              {totalPages > 1 && (
                <PartnerPagination
                  page={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

function PartnerEmptyState() {
  return (
    <div className="border-y border-neutral-200 bg-white px-6 py-16 text-center sm:px-10 sm:py-20">
      <p className="font-serif text-2xl leading-tight text-[#0d2818] sm:text-3xl">
        No partners match those filters.
      </p>

      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-neutral-600 sm:text-base">
        Try broadening your search or choosing a different category or
        research area.
      </p>
    </div>
  );
}

function PartnerPagination({
  page,
  totalPages,
  onPageChange,
}: PartnerPaginationProps) {
  const pages = getPaginationPages(page, totalPages);

  return (
    <nav
      aria-label="Partner directory pagination"
      className="mt-10 flex flex-col gap-4 border-t border-neutral-200 pt-6 sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="text-xs uppercase tracking-[0.12em] text-neutral-400">
        Page {page} of {totalPages}
      </p>

      <div className="flex items-center justify-between gap-2 sm:justify-end">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-10 w-10 shrink-0 border-neutral-300 bg-white text-[#0d2818] shadow-none hover:border-[#0d2818] hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-[#0d2818] focus-visible:ring-offset-2"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Go to previous page"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </Button>

        <div className="flex items-center gap-1" aria-label="Page numbers">
          {pages.map((item, index) => {
            if (item === "ellipsis") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  aria-hidden="true"
                  className="flex h-10 w-8 items-center justify-center text-sm text-neutral-400"
                >
                  …
                </span>
              );
            }

            const isCurrent = item === page;

            return (
              <Button
                key={item}
                type="button"
                variant="outline"
                size="icon"
                aria-current={isCurrent ? "page" : undefined}
                aria-label={`Go to page ${item}`}
                className={
                  isCurrent
                    ? "h-10 w-10 border-[#0d2818] bg-[#0d2818] text-white shadow-none hover:bg-[#0d2818] hover:text-white focus-visible:ring-2 focus-visible:ring-[#0d2818] focus-visible:ring-offset-2"
                    : "h-10 w-10 border-transparent bg-transparent text-neutral-600 shadow-none hover:border-neutral-300 hover:bg-white hover:text-[#0d2818] focus-visible:ring-2 focus-visible:ring-[#0d2818] focus-visible:ring-offset-2"
                }
                onClick={() => onPageChange(item)}
              >
                {item}
              </Button>
            );
          })}
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-10 w-10 shrink-0 border-neutral-300 bg-white text-[#0d2818] shadow-none hover:border-[#0d2818] hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-[#0d2818] focus-visible:ring-offset-2"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Go to next page"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </nav>
  );
}

function getPaginationPages(
  currentPage: number,
  totalPages: number
): Array<number | "ellipsis"> {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "ellipsis", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "ellipsis",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "ellipsis",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis",
    totalPages,
  ];
}

function PartnerCard({ partner }: PartnerCardProps) {
  return (
    <Link
      href={`/partners/${partner.id}`}
      className="group block h-full rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d2818] focus-visible:ring-offset-2"
      aria-label={`View ${partner.name}`}
    >
      <Card className="relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-md border border-neutral-200 bg-white p-5 shadow-none transition-[border-color,background-color] duration-200 group-hover:border-[#0d2818]/45 group-hover:bg-[#fdfdfb] sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <PartnerLogo
            className="h-11 w-11 shrink-0 text-sm font-medium"
            logoUrl={partner.logo_url}
            name={partner.name}
          />

          <span
            aria-hidden="true"
            className="flex h-8 w-8 shrink-0 items-center justify-center border border-neutral-200 text-neutral-500 transition-colors duration-200 group-hover:border-[#0d2818]/25 group-hover:text-[#0d2818]"
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>

        <div className="mt-6">
          <h3 className="font-serif text-xl leading-tight tracking-[-0.01em] text-[#0d2818] sm:text-[22px]">
            {partner.name}
          </h3>

          {partner.partner_type && (
            <Badge
              variant="outline"
              className="mt-3 rounded-sm border-neutral-300 px-2 py-0.5 text-[11px] font-medium tracking-wide text-neutral-600"
            >
              {partner.partner_type}
            </Badge>
          )}
        </div>

        {partner.description ? (
          <p className="mt-5 line-clamp-3 text-sm leading-6 text-neutral-600">
            {partner.description}
          </p>
        ) : (
          <p className="mt-5 text-sm leading-6 text-neutral-400">
            Partner profile
          </p>
        )}

        {partner.research_area_name && (
          <p className="mt-auto pt-6 text-xs font-medium uppercase tracking-[0.1em] text-[#738078]">
            {partner.research_area_name}
          </p>
        )}
      </Card>
    </Link>
  );
}