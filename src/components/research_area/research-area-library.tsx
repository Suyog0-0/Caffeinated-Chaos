"use client";

import { useMemo, useState } from "react";
import { ResearchAreaDirectory } from "./research-area-directory";
import { ResearchAreaFilters } from "./research-area-filters";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Area = {
    slug: string;
    name: string;
    description: string;
    active: boolean;
    projects: number;
    publications: number;
};

const PAGE_SIZE = 8;

export function ResearchAreaLibrary({ areas }: { areas: Area[] }) {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");
    const [sort, setSort] = useState("name");
    const [page, setPage] = useState(1);

    const filtered = useMemo(() => {
        const query = search.trim().toLowerCase();
        const result = areas.filter((a) => {
            if (status === "active" && !a.active) return false;
            if (status === "inactive" && a.active) return false;
            if (query) {
                const haystack = `${a.name} ${a.description}`.toLowerCase();
                if (!haystack.includes(query)) return false;
            }
            return true;
        });

        return result.sort((a, b) => {
            if (sort === "projects") return b.projects - a.projects;
            if (sort === "publications") return b.publications - a.publications;
            return a.name.localeCompare(b.name);
        });
    }, [areas, search, status, sort]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const safePage = Math.min(page, totalPages);
    const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

    function handleFilterChange(fn: () => void) {
        fn();
        setPage(1);
    }

    return (
        <>
            <div className="sticky top-[80px] z-40 py-4 md:py-6 px-4 md:px-6 lg:px-10 bg-[#f7f5ef]">
                <div className="max-w-7xl mx-auto">
                    <ResearchAreaFilters
                        search={search}
                        onSearchChange={(v) => handleFilterChange(() => setSearch(v))}
                        status={status}
                        onStatusChange={(v) => handleFilterChange(() => setStatus(v))}
                        sort={sort}
                        onSortChange={(v) => handleFilterChange(() => setSort(v))}
                        resultCount={filtered.length}
                    />
                </div>
            </div>

            <div className="mx-auto w-[min(calc(100%_-_48px),1240px)] max-sm:w-[calc(100%_-_32px)]">
                <ResearchAreaDirectory areas={paginated} />
            </div>

            {totalPages > 1 && (
                <div className="mx-auto w-[min(calc(100%_-_48px),1240px)] max-sm:w-[calc(100%_-_32px)]">
                    <div className="mt-10 flex items-center justify-between border-t border-[#d7d5cd] pt-6">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={safePage === 1}
                            className="flex items-center gap-1.5 rounded-full border border-[#d7d5cd] px-4 py-2 font-sans text-[11px] text-[#405149] transition-colors hover:border-[#17251f] hover:text-[#17251f] disabled:pointer-events-none disabled:opacity-40"
                        >
                            <ChevronLeft size={13} aria-hidden="true" />
                            Previous
                        </button>

                        <div className="flex items-center gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                                <button
                                    key={n}
                                    onClick={() => setPage(n)}
                                    className={`grid size-8 place-items-center rounded-full font-sans text-[11px] transition-colors ${n === safePage
                                        ? "bg-[#17251f] text-white"
                                        : "text-[#405149] hover:bg-[#eeeae0]"
                                        }`}
                                >
                                    {n}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={safePage === totalPages}
                            className="flex items-center gap-1.5 rounded-full border border-[#d7d5cd] px-4 py-2 font-sans text-[11px] text-[#405149] transition-colors hover:border-[#17251f] hover:text-[#17251f] disabled:pointer-events-none disabled:opacity-40"
                        >
                            Next
                            <ChevronRight size={13} aria-hidden="true" />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}