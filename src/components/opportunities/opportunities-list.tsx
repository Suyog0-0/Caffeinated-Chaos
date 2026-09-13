"use client";

import { useEffect, useRef, useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { OpportunityCard, type Opportunity } from "./opportunity-card";

export function OpportunitiesList({ opportunities }: { opportunities: Opportunity[] }) {
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
    <section className="bg-[#F8F7F4] py-12 px-6 md:px-12 min-h-screen font-sans">
      <div className="max-w-[1400px] mx-auto">

        {/* Search + dropdown filters */}
        <div className="flex flex-col lg:flex-row gap-3 mb-12">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search opportunities, titles, keywords..."
              className="w-full bg-white border border-[#E5E2D9] rounded-full pl-11 pr-14 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#0B3B24]"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-medium text-gray-400 bg-[#F4F1EA] border border-[#E5E2D9] rounded px-1.5 py-0.5 pointer-events-none">
              ESC
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <select
                value={areaFilter}
                onChange={(event) => setAreaFilter(event.target.value)}
                className="appearance-none bg-white border border-[#E5E2D9] text-gray-700 text-sm rounded-full pl-4 pr-10 py-2.5 min-w-[190px] focus:outline-none focus:border-[#0B3B24] cursor-pointer"
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
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>

            <div className="relative">
              <select
                value={typeFilter}
                onChange={(event) => setTypeFilter(event.target.value)}
                className="appearance-none bg-white border border-[#E5E2D9] text-gray-700 text-sm rounded-full pl-4 pr-10 py-2.5 min-w-[190px] focus:outline-none focus:border-[#0B3B24] cursor-pointer"
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
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Grid */}
        {filteredOpportunities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {filteredOpportunities.map((op) => (
              <OpportunityCard key={op.id} opportunity={op} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-2xl border border-gray-200 mb-16">
            <p className="text-gray-500 text-lg">No opportunities found for the selected filters.</p>
          </div>
        )}

      </div>
    </section>
  );
}