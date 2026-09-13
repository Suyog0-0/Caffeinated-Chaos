"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const ALL_DEPARTMENTS = "All Departments";

export function PersonFilters({ departments }: { departments: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== ALL_DEPARTMENTS) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`);
  };

  const activeDepartment = searchParams.get("department") ?? ALL_DEPARTMENTS;

  return (
    <section className="py-4 md:py-8 px-4 md:px-6 lg:px-10 sticky top-16 md:top-20 z-40 bg-[#F8F7F3]/90 md:bg-[#FAF7F2]/90 backdrop-blur-md border-b md:border-b-0 border-[#E8E4DA]/70 md:border-[#E2DBD0]">
      <div className="max-w-7xl mx-auto space-y-3.5 md:space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-center">
          <div className="md:col-span-6 relative flex items-center">
            <div className="absolute inset-y-0 left-0 pl-3.5 md:pl-4 flex items-center pointer-events-none text-[#737067] md:text-[#94A29A]">
              <Search aria-hidden="true" size={16} strokeWidth={2} />
            </div>
            <input
              className="w-full h-12 md:py-3 pl-10 md:pl-11 pr-4 text-sm bg-[#FFFFFF] border border-[#E8E4DA] md:border-[#E2DBD0] rounded-xl md:rounded-md text-neutral-800 md:text-[#141A17] placeholder:text-neutral-400 md:placeholder-[#94A29A] shadow-sm focus:outline-none focus:ring-1 focus:ring-[#0F2C23] md:focus:ring-[#0B251E] focus:border-[#0F2C23] md:focus:border-[#0B251E] transition-all"
              defaultValue={searchParams.get("query")?.toString()}
              name="query"
              onChange={(e) => handleFilter("query", e.target.value)}
              placeholder="Search researchers, topics, labs..."
              type="search"
            />
            {/* Filter Icon Inside Field (Mobile Only) */}
            <button
              aria-label="Filter results"
              className="md:hidden absolute inset-y-1.5 right-1.5 px-2.5 flex items-center justify-center rounded-lg bg-[#F4F1EA] hover:bg-[#E8E4DA]/70 active:scale-95 transition-all text-[#0A201A] cursor-pointer"
              type="button"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M3 4.5h18m-14 5h10m-7 5h4m-3 5h2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>
          </div>

          <div className="hidden md:block md:col-span-3">
            <div className="relative">
              <select
                className="w-full appearance-none bg-white border border-[#E2DBD0] text-sm text-[#1F2923] py-3 pl-3.5 pr-10 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0B251E] focus:border-[#0B251E] transition-colors shadow-sm cursor-pointer"
                value={activeDepartment}
                onChange={(e) => handleFilter("department", e.target.value)}
              >
                <option value={ALL_DEPARTMENTS}>{ALL_DEPARTMENTS}</option>
                {departments.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#6C7B72]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="hidden md:block md:col-span-3">
            <div className="relative">
              <select
                className="w-full appearance-none bg-white border border-[#E2DBD0] text-sm text-[#1F2923] py-3 pl-3.5 pr-10 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0B251E] focus:border-[#0B251E] transition-colors shadow-sm cursor-pointer"
                defaultValue={searchParams.get("area")?.toString() || "All Research Areas"}
                onChange={(e) => handleFilter("area", e.target.value)}
              >
                <option>All Research Areas</option>
                <option>Neural Architecture &amp; ML</option>
                <option>Cryptographic Systems</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#6C7B72]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          <div className="flex items-center gap-1.5 md:gap-2 overflow-x-auto no-scrollbar md:custom-scrollbar pb-1 text-xs">
            <button
              className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-medium shadow-sm transition-transform md:transition-colors whitespace-nowrap cursor-pointer ${activeDepartment === ALL_DEPARTMENTS
                  ? "bg-[#0F2C23] md:bg-[#0B251E] text-white"
                  : "bg-[#FFFFFF] md:bg-white hover:bg-[#F4F1EA] md:hover:bg-[#F3EFE7] border border-[#E8E4DA] md:border-[#E2DBD0] text-neutral-700 md:text-[#2F3C35]"
                }`}
              onClick={() => handleFilter("department", ALL_DEPARTMENTS)}
            >
              All Faculty
            </button>
            {departments.map((department) => (
              <button
                key={department}
                className={`shrink-0 px-3.5 py-1.5 rounded-full font-medium transition-transform md:transition-colors whitespace-nowrap cursor-pointer ${activeDepartment === department
                    ? "bg-[#0F2C23] md:bg-[#0B251E] text-white"
                    : "bg-[#FFFFFF] md:bg-white hover:bg-[#F4F1EA] md:hover:bg-[#F3EFE7] border border-[#E8E4DA] md:border-[#E2DBD0] text-neutral-700 md:text-[#2F3C35]"
                  }`}
                onClick={() => handleFilter("department", department)}
              >
                {department}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between md:justify-end gap-4 text-xs text-[#737067] md:text-[#4D5B53] w-full md:w-auto px-0.5 md:px-0 pt-1 md:pt-0">
            <span>
              <span className="md:hidden">Featured experts</span>
              <span className="hidden md:inline">{departments.length} departments listed</span>
            </span>
            <div className="h-4 w-px bg-[#E2DBD0] hidden sm:block"></div>
            <div className="flex items-center gap-1 md:gap-2">
              <span className="hidden sm:inline">Sort:</span>
              <select
                className="hidden md:block bg-transparent border-0 py-0 pl-1 pr-6 text-xs font-semibold text-[#141A17] focus:ring-0 cursor-pointer"
                defaultValue={searchParams.get("sort")?.toString() || "Active Impact"}
                onChange={(e) => handleFilter("sort", e.target.value)}
              >
                <option>Active Impact</option>
                <option>Alphabetical (A-Z)</option>
              </select>
              <button className="md:hidden flex items-center gap-1 hover:text-[#0A201A] font-medium transition-colors cursor-pointer" type="button">
                <span>Sort: {searchParams.get("sort") || "Featured"}</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="m19.5 8.25-7.5 7.5-7.5-7.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}