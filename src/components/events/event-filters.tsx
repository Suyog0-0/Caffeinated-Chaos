// src/components/events/event-filters.tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X, ChevronDown, SlidersHorizontal, CalendarDays, Archive, LayoutGrid } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface EventFiltersProps {
    typeOptions: string[];
    areaOptions: { slug: string; name: string }[];
    totalCount?: number;
}

interface Tab {
    value: string;
    label: string;
    icon: React.ReactNode;
}

const TABS: Tab[] = [
    { value: "all", label: "All", icon: <LayoutGrid size={13} strokeWidth={2.25} /> },
    { value: "upcoming", label: "Upcoming", icon: <CalendarDays size={13} strokeWidth={2.25} /> },
    { value: "past", label: "Past", icon: <Archive size={13} strokeWidth={2.25} /> },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function FilterSelect({
    label,
    value,
    onChange,
    children,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    children: React.ReactNode;
}) {
    return (
        <label className="group relative block">
            <span className="sr-only">{label}</span>
            <select
                aria-label={label}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={[
                    "w-full cursor-pointer appearance-none rounded-xl border bg-white py-2.5 pl-4 pr-10",
                    "text-sm font-medium text-[#1c2b24] shadow-[0_1px_2px_rgba(20,29,24,0.04)]",
                    "transition-all duration-200 outline-none",
                    "hover:border-[#b8c4bc] hover:shadow-[0_2px_8px_rgba(20,29,24,0.06)]",
                    "focus-visible:border-[#0e2820] focus-visible:ring-4 focus-visible:ring-[#0e2820]/10",
                    value !== "all" ? "border-[#0e2820]" : "border-[#e2ded5]",
                ].join(" ")}
            >
                {children}
            </select>
            <ChevronDown
                size={15}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8a978f] transition-transform duration-200 group-focus-within:rotate-180"
            />
        </label>
    );
}

function ActiveChip({ label, onRemove }: { label: string; onRemove: () => void }) {
    return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0e2820]/15 bg-[#0e2820] py-1 pl-3 pr-1.5 text-xs font-medium text-white shadow-sm animate-[chipIn_180ms_ease-out]">
            {label}
            <button
                type="button"
                onClick={onRemove}
                aria-label={`Remove filter: ${label}`}
                className="grid size-4 place-items-center rounded-full bg-white/15 text-white/90 transition-colors hover:bg-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
                <X size={11} strokeWidth={2.5} />
            </button>
        </span>
    );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function EventFilters({ typeOptions, areaOptions, totalCount }: EventFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    /* URL → derived state */
    const query = searchParams.get("query") ?? "";
    const type = searchParams.get("type") ?? "all";
    const area = searchParams.get("area") ?? "all";
    const tab = searchParams.get("tab") ?? "all";

    const activeArea = areaOptions.find((a) => a.slug === area);

    /* Local state for the search input (debounced sync to URL) */
    const [searchInput, setSearchInput] = useState(query);
    const searchRef = useRef<HTMLInputElement>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

    useEffect(() => setSearchInput(query), [query]);

    /* Push a param update, preserving the rest of the URL */
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

    /* Keyboard: ESC clears search & blurs */
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                if (document.activeElement === searchRef.current) {
                    handleSearch("");
                    searchRef.current?.blur();
                }
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [handleSearch]);

    useEffect(() => () => clearTimeout(debounceRef.current), []);

    /* Sliding tab indicator (measured, no animation lib needed) */
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
    }, [tab, type, area]);

    const activeFiltersCount = [query, type !== "all", area !== "all"].filter(Boolean).length;

    return (
        <section className="sticky top-16 z-40 border-b border-[#e2ded5]/80 bg-[#f4f0e8]/85 py-4 backdrop-blur-xl md:top-20">
            {/* hairline top accent */}
            <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0e2820]/25 to-transparent" />

            <div className="mx-auto w-[min(calc(100%_-_48px),1240px)] max-sm:w-[calc(100%_-_32px)]">
                {/* Row 1: search + selects */}
                <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
                    {/* Search */}
                    <div className="group relative md:col-span-6">
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
                            placeholder="Search events, speakers, symposia…"
                            aria-label="Search events"
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
                        ) : (
                            <kbd className="pointer-events-none absolute right-3.5 top-1/2 hidden -translate-y-1/2 items-center gap-0.5 rounded-md border border-[#e2ded5] bg-[#ede8de] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#67756f] sm:flex">
                                ESC
                            </kbd>
                        )}
                    </div>

                    <div className="md:col-span-3">
                        <FilterSelect label="Filter by event format" value={type} onChange={(v) => handleFilter("type", v)}>
                            <option value="all">All formats</option>
                            {typeOptions.map((t) => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </FilterSelect>
                    </div>

                    <div className="md:col-span-3">
                        <FilterSelect label="Filter by research discipline" value={area} onChange={(v) => handleFilter("area", v)}>
                            <option value="all">All disciplines</option>
                            {areaOptions.map((a) => (
                                <option key={a.slug} value={a.slug}>{a.name}</option>
                            ))}
                        </FilterSelect>
                    </div>
                </div>

                {/* Row 2: segmented tabs + meta */}
                <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3">
                    <div
                        role="tablist"
                        aria-label="Event period"
                        className="relative inline-flex items-center gap-0.5 rounded-full border border-[#e2ded5] bg-white p-1 shadow-[0_1px_2px_rgba(20,29,24,0.04)]"
                    >
                        {/* sliding indicator */}
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
                                        "relative z-10 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors duration-200",
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

                    {/* right meta: count + clear */}
                    <div className="flex items-center gap-3 text-xs text-[#67756f]">
                        {totalCount !== undefined && (
                            <span className="tabular-nums">
                                <span className="font-semibold text-[#141d18]">{totalCount}</span>{" "}
                                {totalCount === 1 ? "event" : "events"}
                            </span>
                        )}
                        {activeFiltersCount > 0 && (
                            <button
                                type="button"
                                onClick={() => router.push("?", { scroll: false })}
                                className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-medium text-[#8a2b2b] transition-colors hover:bg-[#8a2b2b]/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a2b2b]/30"
                            >
                                <X size={12} strokeWidth={2.5} />
                                Clear {activeFiltersCount === 1 ? "filter" : `${activeFiltersCount} filters`}
                            </button>
                        )}
                    </div>
                </div>

                {/* Row 3: active filter chips */}
                {activeFiltersCount > 0 && (
                    <div className="mt-3 flex flex-wrap items-center gap-1.5" aria-label="Active filters">
                        <SlidersHorizontal size={13} className="mr-0.5 text-[#67756f]" aria-hidden />
                        {query && (
                            <ActiveChip
                                label={`“${query.length > 24 ? query.slice(0, 24) + "…" : query}”`}
                                onRemove={() => handleFilter("query", "")}
                            />
                        )}
                        {type !== "all" && <ActiveChip label={type} onRemove={() => handleFilter("type", "all")} />}
                        {area !== "all" && activeArea && (
                            <ActiveChip label={activeArea.name} onRemove={() => handleFilter("area", "all")} />
                        )}
                    </div>
                )}
            </div>

            {/* chip entrance animation */}
            <style jsx>{`
                @keyframes chipIn {
                    from { opacity: 0; transform: scale(0.85) translateY(2px); }
                    to   { opacity: 1; transform: scale(1) translateY(0); }
                }
            `}</style>
        </section>
    );
}