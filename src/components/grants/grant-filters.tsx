// src/components/grants/grant-filters.tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X, ChevronDown, Landmark, CheckCircle2, Award } from "lucide-react";

interface GrantFiltersProps {
    totalCount: number;
}

interface Tab {
    value: string;
    label: string;
    icon: React.ReactNode;
}

const TABS: Tab[] = [
    { value: "all", label: "All", icon: <Landmark size={13} strokeWidth={2.25} /> },
    { value: "open", label: "Open", icon: <CheckCircle2 size={13} strokeWidth={2.25} /> },
    { value: "awarded", label: "Awarded", icon: <Award size={13} strokeWidth={2.25} /> },
];

const SORT_OPTIONS = [
    { value: "deadline", label: "Deadline: soonest" },
    { value: "amount", label: "Amount: highest first" },
    { value: "title", label: "Title: A–Z" },
] as const;

export function GrantFilters({ totalCount }: GrantFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const query = searchParams.get("query") ?? "";
    const tab = searchParams.get("tab") ?? "all";
    const sort = searchParams.get("sort") ?? "deadline";

    const [searchInput, setSearchInput] = useState(query);
    const searchRef = useRef<HTMLInputElement>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

    useEffect(() => setSearchInput(query), [query]);

    const handleFilter = useCallback(
        (key: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value && value !== "all") params.set(key, value);
            else params.delete(key);
            const qs = params.toString();
            router.push(qs ? `?${qs}` : "?", { scroll: false });
        },
        [router, searchParams],
    );

    const handleSearch = useCallback(
        (value: string) => {
            setSearchInput(value);
            clearTimeout(debounceRef.current);
            debounceRef.current = setTimeout(() => handleFilter("query", value.trim()), 300);
        },
        [handleFilter],
    );

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape" && document.activeElement === searchRef.current) {
                handleSearch("");
                searchRef.current?.blur();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [handleSearch]);

    useEffect(() => () => clearTimeout(debounceRef.current), []);

    const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
    const [indicator, setIndicator] = useState({ left: 0, width: 0 });

    useEffect(() => {
        const measure = () => {
            const el = tabRefs.current.get(tab);
            if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
        };
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, [tab]);

    const activeFiltersCount = [query].filter(Boolean).length;

    return (
        <section className="sticky top-16 z-40 border-b border-[#e2ded5]/80 bg-[#f4f0e8]/85 py-4 backdrop-blur-xl md:top-20">
            <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0e2820]/25 to-transparent" />

            <div className="mx-auto w-[min(calc(100%_-_48px),1240px)] max-sm:w-[calc(100%_-_32px)]">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
                    <div className="group relative md:col-span-7">
                        <Search
                            size={16}
                            aria-hidden
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8a978f] transition-colors group-focus-within:text-[#0e2820]"
                        />
                        <input
                            ref={searchRef}
                            type="text"
                            value={searchInput}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder="Search grants by title or funder…"
                            aria-label="Search grants"
                            className={[
                                "w-full rounded-xl border bg-white py-2.5 pl-11 text-sm text-[#1c2b24]",
                                "placeholder-[#9aa79f] shadow-[0_1px_2px_rgba(20,29,24,0.04)]",
                                "transition-all duration-200 outline-none",
                                "hover:border-[#b8c4bc] hover:shadow-[0_2px_8px_rgba(20,29,24,0.06)]",
                                "focus-visible:border-[#0e2820] focus-visible:ring-4 focus-visible:ring-[#0e2820]/10",
                                searchInput ? "border-[#0e2820] pr-10" : "border-[#e2ded5] pr-16",
                            ].join(" ")}
                        />
                        {searchInput ? (
                            <button
                                type="button"
                                onClick={() => { handleSearch(""); searchRef.current?.focus(); }}
                                aria-label="Clear search"
                                className="absolute right-3 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-full bg-[#ede8de] text-[#67756f] transition-colors hover:bg-[#e2ded5] hover:text-[#141d18] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0e2820]/30"
                            >
                                <X size={13} strokeWidth={2.5} />
                            </button>
                        ) : null}
                    </div>

                    <div className="md:col-span-5">
                        <label className="group relative block">
                            <span className="sr-only">Sort grants</span>
                            <select
                                aria-label="Sort grants"
                                value={sort}
                                onChange={(e) => handleFilter("sort", e.target.value)}
                                className={[
                                    "w-full cursor-pointer appearance-none rounded-xl border bg-white py-2.5 pl-4 pr-10",
                                    "text-sm font-medium text-[#1c2b24] shadow-[0_1px_2px_rgba(20,29,24,0.04)]",
                                    "transition-all duration-200 outline-none",
                                    "hover:border-[#b8c4bc] hover:shadow-[0_2px_8px_rgba(20,29,24,0.06)]",
                                    "focus-visible:border-[#0e2820] focus-visible:ring-4 focus-visible:ring-[#0e2820]/10",
                                    "border-[#e2ded5]",
                                ].join(" ")}
                            >
                                {SORT_OPTIONS.map((opt) => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                            <ChevronDown
                                size={15}
                                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8a978f] transition-transform duration-200 group-focus-within:rotate-180"
                            />
                        </label>
                    </div>
                </div>

                <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3">
                    <div
                        role="tablist"
                        aria-label="Grant status"
                        className="relative inline-flex items-center gap-0.5 rounded-full border border-[#e2ded5] bg-white p-1 shadow-[0_1px_2px_rgba(20,29,24,0.04)]"
                    >
                        <span
                            aria-hidden
                            className="absolute top-1 bottom-1 rounded-full bg-[#0e2820] shadow-[0_2px_6px_rgba(14,40,32,0.35)] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
                            style={{ left: indicator.left, width: indicator.width }}
                        />
                        {TABS.map(({ value, label, icon }) => {
                            const active = tab === value;
                            return (
                                <button
                                    key={value}
                                    ref={(el) => { if (el) tabRefs.current.set(value, el); }}
                                    role="tab"
                                    aria-selected={active}
                                    type="button"
                                    onClick={() => handleFilter("tab", value)}
                                    className={[
                                        "relative z-10 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold transition-colors duration-200",
                                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0e2820]/30",
                                        active ? "text-white" : "text-[#5c6a63] hover:text-[#141d18]",
                                    ].join(" ")}
                                >
                                    {icon}
                                    {label}
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-[#67756f]">
                        <span className="tabular-nums">
                            <span className="font-semibold text-[#141d18]">{totalCount}</span>{" "}
                            {totalCount === 1 ? "grant" : "grants"}
                        </span>
                        {activeFiltersCount > 0 && (
                            <button
                                type="button"
                                onClick={() => router.push("?", { scroll: false })}
                                className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-medium text-[#8a2b2b] transition-colors hover:bg-[#8a2b2b]/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a2b2b]/30"
                            >
                                <X size={12} strokeWidth={2.5} />
                                Clear search
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}