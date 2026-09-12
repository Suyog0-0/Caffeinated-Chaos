import { Input } from "@/components/ui/input";

export function ProjectFilters() {
  return (
    <form className="my-10 grid grid-cols-[1fr_220px_220px] border border-[#d7d5cd] bg-white max-sm:grid-cols-1">
      <Input
        className="min-h-14 rounded-none border-0 border-r border-[#d7d5cd] px-4 font-sans text-xs shadow-none focus-visible:ring-[#267457]"
        aria-label="Search projects"
        placeholder="Search projects"
      />
      <select
        className="border-r border-[#d7d5cd] bg-white px-4 font-sans text-xs outline-none focus:ring-2 focus:ring-[#267457] focus:ring-inset max-sm:min-h-14"
        aria-label="Filter projects by status"
        defaultValue="all"
      >
        <option value="all">All statuses</option>
        <option value="proposed">Proposed</option>
        <option value="ongoing">Ongoing</option>
        <option value="completed">Completed</option>
      </select>
      <select
        className="bg-white px-4 font-sans text-xs outline-none focus:ring-2 focus:ring-[#267457] focus:ring-inset max-sm:min-h-14"
        aria-label="Filter projects by research area"
        defaultValue="all"
      >
        <option value="all">All research areas</option>
        <option value="sustainable-cities">Sustainable cities</option>
        <option value="digital-society">Digital society</option>
      </select>
    </form>
  );
}
