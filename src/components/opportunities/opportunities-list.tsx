"use client";

import { useEffect, useRef, useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { OpportunityCard, type Opportunity } from "./opportunity-card";

export function OpportunitiesList({
  opportunities,
}: {
  opportunities: Opportunity[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [areaFilter, setAreaFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const uniqueAreas = Array.from(new Set(opportunities.map((op) => op.areaName)));
  const uniqueTypes = Array.from(new Set(opportunities.map((op) => op.type)));

  const filteredOpportunities = opportunities.filter((op) => {
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query === "" ||
      op.title.toLowerCase().includes(query) ||
      op.description.toLowerCase().includes(query);
    const matchesArea = areaFilter === "All" || op.areaName === areaFilter;
    const matchesType = typeFilter === "All" || op.type === typeFilter;
    return matchesSearch && matchesArea && matchesType;
  });

  const hasActiveFilters =
    searchQuery.trim() !== "" || areaFilter !== "All" || typeFilter !== "All";

  const clearFilters = () => {
    setSearchQuery("");
    setAreaFilter("All");
    setTypeFilter("All");
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && document.activeElement === searchInputRef.current) {
        setSearchQuery("");
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section
      className="min-h-[70vh] bg-[#f7f5ef] py-12 text-[#17251f] sm:py-16 lg:py-20"
      aria-labelledby="opportunity-results-title"
    >
      <div className="mx-auto w-[min(calc(100%_-_48px),1240px)] max-sm:w-[calc(100%_-_32px)]">
        <div className="mb-8 border-b border-[#c9ccc7] pb-8 sm:mb-10">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-semibold text-[#68776f]">
                Current registry
              </p>
              <h2
                id="opportunity-results-title"
                className="text-2xl font-semibold tracking-[-0.025em] text-[#153c2e] sm:text-3xl"
              >
                Open opportunities
              </h2>
            </div>

            <div className="flex items-center gap-4 text-sm text-[#68776f]">
              <span aria-live="polite">
                {filteredOpportunities.length} of {opportunities.length} shown
              </span>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="font-semibold text-[#153c2e] underline decoration-[#9eaaa3] underline-offset-4 transition-colors hover:decoration-[#153c2e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#153c2e] focus-visible:ring-offset-4"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_240px_240px]">
            <label className="relative block">
              <span className="sr-only">Search opportunities</span>
            <Search
              size={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#75827b]"
                aria-hidden="true"
            />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search by title or keyword"
                className="h-12 w-full border border-[#c9ccc7] bg-[#fffefb] pl-11 pr-4 text-sm text-[#17251f] placeholder:text-[#89938e] focus:border-[#153c2e] focus:outline-none focus:ring-1 focus:ring-[#153c2e]"
            />
            </label>

            <label className="relative block">
              <span className="sr-only">Filter by research area</span>
              <select
                value={areaFilter}
                onChange={(event) => setAreaFilter(event.target.value)}
                className="h-12 w-full cursor-pointer appearance-none border border-[#c9ccc7] bg-[#fffefb] pl-4 pr-10 text-sm text-[#33463c] focus:border-[#153c2e] focus:outline-none focus:ring-1 focus:ring-[#153c2e]"
              >
                <option value="All">All Research Areas</option>
                {uniqueAreas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#75827b]"
                aria-hidden="true"
              />
            </label>

            <label className="relative block">
              <span className="sr-only">Filter by opportunity type</span>
              <select
                value={typeFilter}
                onChange={(event) => setTypeFilter(event.target.value)}
                className="h-12 w-full cursor-pointer appearance-none border border-[#c9ccc7] bg-[#fffefb] pl-4 pr-10 text-sm text-[#33463c] focus:border-[#153c2e] focus:outline-none focus:ring-1 focus:ring-[#153c2e]"
              >
                <option value="All">All Opportunity Types</option>
                {uniqueTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#75827b]"
                aria-hidden="true"
              />
            </label>
          </div>
        </div>

        {filteredOpportunities.length > 0 ? (
          <ol className="grid border-t border-[#bfc5c0] lg:grid-cols-2">
            {filteredOpportunities.map((op, index) => (
              <OpportunityCard
                key={op.id}
                opportunity={op}
                index={index}
              />
            ))}
          </ol>
        ) : (
          <div className="border-y border-[#c9ccc7] py-20 text-center">
            <p className="text-lg font-semibold text-[#33463c]">
              No matching opportunities
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#68776f]">
              Try a broader keyword or clear the filters to return to the full
              registry.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 border border-[#153c2e] px-5 py-2.5 text-sm font-semibold text-[#153c2e] transition-colors hover:bg-[#153c2e] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#153c2e] focus-visible:ring-offset-4"
            >
              View all opportunities
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
