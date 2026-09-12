"use client";

import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";

type ResearchAreaFiltersProps = {
    search: string;
    onSearchChange: (value: string) => void;
    status: string;
    onStatusChange: (value: string) => void;
    sort: string;
    onSortChange: (value: string) => void;
    resultCount: number;
};

const pillSelectCls =
    "cursor-pointer appearance-none rounded-full border border-[#d7d5cd] bg-white pl-3.5 pr-7 py-1.5 font-sans text-[11px] text-[#405149] outline-none transition-colors hover:border-[#267457] hover:text-[#267457]";

const activeChipCls =
    "flex items-center gap-1.5 rounded-full border border-[#267457]/25 bg-[#eef5f1] px-3 py-1.5 font-sans text-[11px] text-[#17251f]";

const chipXCls = "text-[#8a9690] transition-colors hover:text-[#153c2e]";

export function ResearchAreaFilters({
    search,
    onSearchChange,
    status,
    onStatusChange,
    sort,
    onSortChange,
    resultCount,
}: ResearchAreaFiltersProps) {
    const activeCount = [status !== "all"].filter(Boolean).length;

    return (
        <form className="mt-10 mb-8 space-y-3" onSubmit={(e) => e.preventDefault()}>
            <div className="relative flex items-center rounded-full border border-[#d0cfc7] bg-white px-4 shadow-sm transition-all focus-within:border-[#267457] focus-within:shadow-[0_0_0_3px_rgba(38,116,87,0.08)]">
                <Search size={15} className="shrink-0 text-[#8a9690]" aria-hidden="true" />
                <input
                    className="min-h-[48px] flex-1 bg-transparent px-3 font-sans text-sm text-[#17251f] outline-none placeholder:font-light placeholder:tracking-wide placeholder:text-[#a0a89e]"
                    aria-label="Search research areas"
                    placeholder="Search research areas…"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
                {search && (
                    <button
                        type="button"
                        onClick={() => onSearchChange("")}
                        className="ml-2 shrink-0 rounded-full p-1 text-[#8a9690] transition-colors hover:bg-[#f0efea] hover:text-[#17251f]"
                        aria-label="Clear search"
                    >
                        <X size={14} />
                    </button>
                )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="flex items-center gap-1.5 rounded-full bg-[#17251f] px-3.5 py-1.5 font-sans text-[11px] font-medium text-white">
                        <SlidersHorizontal size={12} strokeWidth={2} aria-hidden="true" />
                        Filters
                        {activeCount > 0 && (
                            <span className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white text-[9px] font-bold text-[#17251f]">
                                {activeCount}
                            </span>
                        )}
                    </span>

                    {status !== "all" ? (
                        <span className={activeChipCls}>
                            Status: {status.charAt(0).toUpperCase() + status.slice(1)}
                            <button type="button" onClick={() => onStatusChange("all")} aria-label="Remove status filter" className={chipXCls}>
                                <X size={11} />
                            </button>
                        </span>
                    ) : (
                        <div className="relative">
                            <select value={status} onChange={(e) => onStatusChange(e.target.value)} className={pillSelectCls} aria-label="Filter by status">
                                <option value="all">Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                            <ChevronDown size={10} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8a9690]" aria-hidden="true" />
                        </div>
                    )}

                    <div className="relative">
                        <select value={sort} onChange={(e) => onSortChange(e.target.value)} className={pillSelectCls} aria-label="Sort research areas">
                            <option value="name">Sort: Name (A–Z)</option>
                            <option value="projects">Sort: Most projects</option>
                            <option value="publications">Sort: Most publications</option>
                        </select>
                        <ChevronDown size={10} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8a9690]" aria-hidden="true" />
                    </div>
                </div>

                <span className="font-sans text-[11px] text-[#8a9690]">
                    Showing {resultCount} {resultCount === 1 ? "area" : "areas"}
                </span>
            </div>
        </form>
    );
}