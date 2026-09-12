import { Input } from "@/components/ui/input";

export function PublicationFilters() {
  return (
    <form className="my-10 grid grid-cols-[1fr_220px_220px] border border-[#d7d5cd] bg-white max-sm:grid-cols-1">
      <Input
        className="min-h-14 rounded-none border-0 border-r border-[#d7d5cd] px-4 font-sans text-xs shadow-none focus-visible:ring-[#267457]"
        aria-label="Search publications"
        placeholder="Search titles, authors or keywords"
      />
      <select
        className="border-r border-[#d7d5cd] bg-white px-4 font-sans text-xs outline-none focus:ring-2 focus:ring-[#267457] focus:ring-inset max-sm:min-h-14"
        aria-label="Filter publications by type"
        defaultValue="all"
      >
        <option value="all">All types</option>
        <option value="journal">Journal</option>
        <option value="conference">Conference</option>
        <option value="report">Report</option>
      </select>
      <select
        className="bg-white px-4 font-sans text-xs outline-none focus:ring-2 focus:ring-[#267457] focus:ring-inset max-sm:min-h-14"
        aria-label="Filter publications by year"
        defaultValue="all"
      >
        <option value="all">All years</option>
        <option value="2026">2026</option>
        <option value="2025">2025</option>
      </select>
    </form>
  );
}
