"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export function ProjectFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`);
  };

  const status = searchParams.get("status") || "all";

  return (
    <section className="sticky top-16 md:top-20 z-40 bg-[#f4f0e8] border-b border-[#e2ded5] py-4">
      <div className="mx-auto w-[min(calc(100%_-_48px),1240px)] max-sm:w-[calc(100%_-_32px)]">

        {/* Primary row: search + 2 selects */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-3.5">

          {/* Search */}
          <div className="md:col-span-6 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#74827b]">
              <Search size={16} aria-hidden="true" />
            </div>
            <input
              className="w-full pl-10 pr-20 py-2.5 text-sm bg-white border border-[#ded8cc] rounded-sm placeholder-[#7c8b83] text-[#141d18] focus:outline-none focus:ring-1 focus:ring-[#0e2820] focus:border-[#0e2820] transition-colors"
              placeholder="Search projects by title or keyword..."
              type="text"
              defaultValue={searchParams.get("query") || ""}
              onChange={(e) => handleFilter("query", e.target.value)}
              aria-label="Search projects"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-[#ede8de] rounded text-[#67756f]">ESC</span>
            </div>
          </div>

          {/* Status */}
          <div className="md:col-span-3">
            <div className="relative">
              <select
                className="w-full py-2.5 pl-3.5 pr-8 text-sm bg-white border border-[#ded8cc] rounded-sm text-[#27352e] focus:outline-none focus:ring-1 focus:ring-[#0e2820] focus:border-[#0e2820] appearance-none font-sans cursor-pointer"
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
                className="w-full py-2.5 pl-3.5 pr-8 text-sm bg-white border border-[#ded8cc] rounded-sm text-[#27352e] focus:outline-none focus:ring-1 focus:ring-[#0e2820] focus:border-[#0e2820] appearance-none font-sans cursor-pointer"
                aria-label="Filter by research area"
                defaultValue={searchParams.get("area") || "all"}
                onChange={(e) => handleFilter("area", e.target.value)}
              >
                <option value="all">All research areas</option>
                <option value="ai">Artificial Intelligence</option>
                <option value="data-science">Data Science</option>
                <option value="bioinformatics">Bioinformatics</option>
                <option value="cyber-physical">Cyber-Physical Systems</option>
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
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              className={`px-3 py-1 rounded-full font-medium transition-all ${status === "all" ? "bg-[#0e2820] text-white" : "bg-white hover:bg-[#ebe6dc] border border-[#ded8cc] text-[#46534d]"}`}
              onClick={() => handleFilter("status", "all")}
              type="button"
            >
              All Initiatives
            </button>
            <button
              className={`px-3 py-1 rounded-full font-medium transition-all ${status === "ongoing" ? "bg-[#0e2820] text-white" : "bg-white hover:bg-[#ebe6dc] border border-[#ded8cc] text-[#46534d]"}`}
              onClick={() => handleFilter("status", "ongoing")}
              type="button"
            >
              Ongoing
            </button>
            <button
              className={`px-3 py-1 rounded-full font-medium transition-all ${status === "completed" ? "bg-[#0e2820] text-white" : "bg-white hover:bg-[#ebe6dc] border border-[#ded8cc] text-[#46534d]"}`}
              onClick={() => handleFilter("status", "completed")}
              type="button"
            >
              Completed
            </button>
            <button
              className={`px-3 py-1 rounded-full font-medium transition-all ${status === "proposed" ? "bg-[#0e2820] text-white" : "bg-white hover:bg-[#ebe6dc] border border-[#ded8cc] text-[#46534d]"}`}
              onClick={() => handleFilter("status", "proposed")}
              type="button"
            >
              Proposed
            </button>
          </div>
          <div className="flex items-center gap-1.5 text-[#627068] ml-auto">
            <span>Sort:</span>
            <select className="bg-transparent border-none text-xs font-semibold text-[#0e2820] focus:ring-0 cursor-pointer p-0 pr-4">
              <option>Active Impact</option>
              <option>Recently Added</option>
              <option>Alphabetical (A–Z)</option>
            </select>
          </div>
        </div>

      </div>
    </section>
  );
}