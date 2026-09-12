import { Input } from "@/components/ui/input";

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
  return (
    <form
      className="my-10 grid grid-cols-[1fr_160px_120px_180px_180px] border border-[#d7d5cd] bg-white max-sm:grid-cols-1"
      onSubmit={(e) => e.preventDefault()}
    >
      <Input
        className="min-h-14 rounded-none border-0 border-r border-[#d7d5cd] px-4 font-sans text-xs shadow-none focus-visible:ring-[#267457]"
        aria-label="Search publications"
        placeholder="Search titles, authors or keywords"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select
        className="border-r border-[#d7d5cd] bg-white px-4 font-sans text-xs outline-none focus:ring-2 focus:ring-[#267457] focus:ring-inset max-sm:min-h-14"
        aria-label="Filter publications by type"
        value={type}
        onChange={(e) => onTypeChange(e.target.value)}
      >
        <option value="all">All types</option>
        {types.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <select
        className="border-r border-[#d7d5cd] bg-white px-4 font-sans text-xs outline-none focus:ring-2 focus:ring-[#267457] focus:ring-inset max-sm:min-h-14"
        aria-label="Filter publications by year"
        value={year}
        onChange={(e) => onYearChange(e.target.value)}
      >
        <option value="all">All years</option>
        {years.map((y) => (
          <option key={y} value={String(y)}>
            {y}
          </option>
        ))}
      </select>
      <select
        className="border-r border-[#d7d5cd] bg-white px-4 font-sans text-xs outline-none focus:ring-2 focus:ring-[#267457] focus:ring-inset max-sm:min-h-14"
        aria-label="Filter publications by author"
        value={author}
        onChange={(e) => onAuthorChange(e.target.value)}
      >
        <option value="all">All authors</option>
        {authors.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </select>
      <select
        className="bg-white px-4 font-sans text-xs outline-none focus:ring-2 focus:ring-[#267457] focus:ring-inset max-sm:min-h-14"
        aria-label="Filter publications by research area"
        value={area}
        onChange={(e) => onAreaChange(e.target.value)}
      >
        <option value="all">All research areas</option>
        {areas.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </select>
    </form>
  );
}