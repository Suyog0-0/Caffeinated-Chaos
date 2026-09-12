// src/components/projects/project-filters.tsx
"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export function ProjectFilters({ areaOptions }: { areaOptions: { slug: string; name: string }[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // Any filter change should take the user back to page 1.
    params.delete("page");
    router.push(`?${params.toString()}`);
  };

  const status = searchParams.get("status") || "all";

  return (
    <section className="sticky top-16 md:top-20 z-40 bg-[#f4f0e8] border-b border-[#e2ded5] py-5">
      <div className="mx-auto w-[min(calc(100%_-_48px),1240px)] max-sm:w-[calc(100%_-_32px)]">

        {/* Primary row: search + 2 selects */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-3.5">

          {/* Search */}
          <div className="md:col-span-6 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#74827b]">
              <Search size={16} aria-hidden="true" />
            </div>
            <input
              className="w-full py-3 pl-10 pr-20 text-[15px] bg-white border border-[#ded8cc] rounded-sm placeholder-[#7c8b83] text-[#141d18] focus:outline-none focus:ring-1 focus:ring-[#0e2820] focus:border-[#0e2820] transition-colors"
              placeholder="Search projects by title or keyword..."
              type="text"
              defaultValue={searchParams.get("query") || ""}
              onChange={(e) => handleFilter("query", e.target.value)}
              aria-label="Search projects"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="rounded bg-[#ede8de] px-1.5 py-0.5 text-[10px] font-semibold uppercase text-[#67756f]">ESC</span>
            </div>
          </div>

          {/* Status */}
          <div className="md:col-span-3">
            <div className="relative">
              <select
                className="w-full appearance-none rounded-sm border border-[#ded8cc] bg-white py-3 pl-3.5 pr-8 text-[15px] text-[#27352e] [font-family:inherit] cursor-pointer focus:border-[#0e2820] focus:outline-none focus:ring-1 focus:ring-[#0e2820]"
                aria-label="Filter by status"
                defaultValue={status}
                onChange={(e) => handleFilter("status", e.target.value)}
              >
                <option value="all">All project statuses</option>
                <option value="proposed">Proposed</option>
                <option value="ongoing">Active / Ongoing</option>
                <option value="completed">Completed</option>
                <option value="archived">Archived</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2.5 pointer-events-none text-[#67756f]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>

          {/* Research Area */}
          <div className="md:col-span-3">
            <div className="relative">
              <select
                className="w-full appearance-none rounded-sm border border-[#ded8cc] bg-white py-3 pl-3.5 pr-8 text-[15px] text-[#27352e] [font-family:inherit] cursor-pointer focus:border-[#0e2820] focus:outline-none focus:ring-1 focus:ring-[#0e2820]"
                aria-label="Filter by research area"
                defaultValue={searchParams.get("area") || "all"}
                onChange={(e) => handleFilter("area", e.target.value)}
              >
                <option value="all">All research areas</option>
                {areaOptions.map((area) => (
                  <option key={area.slug} value={area.slug}>
                    {area.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2.5 pointer-events-none text-[#67756f]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick chips + sort row */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-[13px]">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              className={`px-3.5 py-1.5 rounded-full font-medium transition-all ${status === "all" ? "bg-[#0e2820] text-white" : "bg-white hover:bg-[#ebe6dc] border border-[#ded8cc] text-[#46534d]"}`}
              onClick={() => handleFilter("status", "all")}
              type="button"
            >
              All Initiatives
            </button>
            <button
              className={`px-3.5 py-1.5 rounded-full font-medium transition-all ${status === "ongoing" ? "bg-[#0e2820] text-white" : "bg-white hover:bg-[#ebe6dc] border border-[#ded8cc] text-[#46534d]"}`}
              onClick={() => handleFilter("status", "ongoing")}
              type="button"
            >
              Ongoing
            </button>
            <button
              className={`px-3.5 py-1.5 rounded-full font-medium transition-all ${status === "completed" ? "bg-[#0e2820] text-white" : "bg-white hover:bg-[#ebe6dc] border border-[#ded8cc] text-[#46534d]"}`}
              onClick={() => handleFilter("status", "completed")}
              type="button"
            >
              Completed
            </button>
            <button
              className={`px-3.5 py-1.5 rounded-full font-medium transition-all ${status === "proposed" ? "bg-[#0e2820] text-white" : "bg-white hover:bg-[#ebe6dc] border border-[#ded8cc] text-[#46534d]"}`}
              onClick={() => handleFilter("status", "proposed")}
              type="button"
            >
              Proposed
            </button>
          </div>
          <div className="flex items-center gap-1.5 text-[#627068] ml-auto">
            <span>Sort:</span>
            <select
              className="cursor-pointer border-none bg-transparent p-0 pr-4 text-[13px] font-semibold text-[#0e2820] [font-family:inherit] focus:ring-0"
              aria-label="Sort projects"
              defaultValue={searchParams.get("sort") || "recent"}
              onChange={(e) => handleFilter("sort", e.target.value)}
            >
              <option value="recent">Recently Added</option>
              <option value="az">Alphabetical (A–Z)</option>
            </select>
          </div>
        </div>

      </div>
    </section>
  );
}
