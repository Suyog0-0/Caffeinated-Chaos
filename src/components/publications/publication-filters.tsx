import { Search, X, SlidersHorizontal, ChevronDown } from "lucide-react";

type PublicationFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  type: string;
  onTypeChange: (value: string) => void;
  year: string;
  onYearChange: (value: string) => void;
  author: string;
  onAuthorChange: (value: string) => void;
  area: string;
  onAreaChange: (value: string) => void;
  types: string[];
  years: number[];
  authors: string[];
  areas: string[];
};

const pillSelectCls =
  "cursor-pointer appearance-none rounded-full border border-[#d7d5cd] bg-white pl-3.5 pr-7 py-1.5 font-sans text-[11px] text-[#405149] outline-none transition-colors hover:border-[#267457] hover:text-[#267457]";

const activeChipCls =
  "flex items-center gap-1.5 rounded-full border border-[#267457]/25 bg-[#eef5f1] px-3 py-1.5 font-sans text-[11px] text-[#17251f]";

const chipXCls =
  "text-[#8a9690] transition-colors hover:text-[#153c2e]";

export function PublicationFilters({
  search,
  onSearchChange,
  type,
  onTypeChange,
  year,
  onYearChange,
  author,
  onAuthorChange,
  area,
  onAreaChange,
  types,
  years,
  authors,
  areas,
}: PublicationFiltersProps) {
  const activeCount = [type !== "all", year !== "all", author !== "all", area !== "all"].filter(Boolean).length;

  const quickSuggestions = areas.slice(0, 5);

  return (
    <div className="py-4 md:py-8 sticky top-16 md:top-20 z-40 bg-[#F8F7F3]/90 md:bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8E4DA]/70 md:border-[#E2DBD0] mb-8">
      <form className="mx-auto w-[min(calc(100%_-_48px),1240px)] max-sm:w-[calc(100%_-_32px)] space-y-3" onSubmit={(e) => e.preventDefault()}>
      <div className="relative flex items-center rounded-full border border-[#d0cfc7] bg-white px-4 shadow-sm transition-all focus-within:border-[#267457] focus-within:shadow-[0_0_0_3px_rgba(38,116,87,0.08)]">
        <Search size={15} className="shrink-0 text-[#8a9690]" aria-hidden="true" />
        <input
          className="min-h-[48px] flex-1 bg-transparent px-3 font-sans text-sm text-[#17251f] outline-none placeholder:font-light placeholder:tracking-wide placeholder:text-[#a0a89e]"
          aria-label="Search publications"
          placeholder="Search titles, authors or keywords…"
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

      {quickSuggestions.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-sans text-[10px] font-semibold uppercase tracking-widest text-[#8a9690]">
            Quick:
          </span>
          {quickSuggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onSearchChange(s)}
              className="rounded-full border border-[#d7d5cd] bg-white px-3 py-1 font-sans text-[11px] text-[#405149] transition-colors hover:border-[#267457] hover:text-[#267457]"
            >
              {s}
            </button>
          ))}
        </div>
      )}

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

        {year !== "all" ? (
          <span className={activeChipCls}>
            Year: {year}
            <button type="button" onClick={() => onYearChange("all")} aria-label="Remove year filter" className={chipXCls}>
              <X size={11} />
            </button>
          </span>
        ) : (
          <div className="relative">
            <select value={year} onChange={(e) => onYearChange(e.target.value)} className={pillSelectCls} aria-label="Filter by year">
              <option value="all">Year</option>
              {years.map((y) => (
                <option key={y} value={String(y)}>{y}</option>
              ))}
            </select>
            <ChevronDown size={10} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8a9690]" aria-hidden="true" />
          </div>
        )}

        {area !== "all" ? (
          <span className={activeChipCls}>
            Topic: {area}
            <button type="button" onClick={() => onAreaChange("all")} aria-label="Remove topic filter" className={chipXCls}>
              <X size={11} />
            </button>
          </span>
        ) : (
          <div className="relative">
            <select value={area} onChange={(e) => onAreaChange(e.target.value)} className={pillSelectCls} aria-label="Filter by topic">
              <option value="all">Topic</option>
              {areas.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
            <ChevronDown size={10} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8a9690]" aria-hidden="true" />
          </div>
        )}

        {type !== "all" ? (
          <span className={activeChipCls}>
            Type: {type}
            <button type="button" onClick={() => onTypeChange("all")} aria-label="Remove type filter" className={chipXCls}>
              <X size={11} />
            </button>
          </span>
        ) : (
          <div className="relative">
            <select value={type} onChange={(e) => onTypeChange(e.target.value)} className={pillSelectCls} aria-label="Filter by type">
              <option value="all">Type</option>
              {types.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <ChevronDown size={10} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8a9690]" aria-hidden="true" />
          </div>
        )}

        {author !== "all" ? (
          <span className={activeChipCls}>
            Author: {author}
            <button type="button" onClick={() => onAuthorChange("all")} aria-label="Remove author filter" className={chipXCls}>
              <X size={11} />
            </button>
          </span>
        ) : (
          <div className="relative">
            <select value={author} onChange={(e) => onAuthorChange(e.target.value)} className={pillSelectCls} aria-label="Filter by author">
              <option value="all">Author</option>
              {authors.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
            <ChevronDown size={10} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8a9690]" aria-hidden="true" />
          </div>
        )}
      </div>
      </form>
    </div>
  );
}