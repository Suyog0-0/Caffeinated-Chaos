"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export interface PartnerFilterState {
  query: string;
  category: string;
  researchType: string;
}

interface PartnerFiltersProps {
  categories: string[];
  researchTypes: string[];
  value: PartnerFilterState;
  onChange: (next: PartnerFilterState) => void;
}

export function PartnerFilters({
  categories,
  researchTypes,
  value,
  onChange,
}: PartnerFiltersProps) {
  return (
    <div className="sticky top-20 border-y border-[#e2ded5] bg-[#f4f2ec] py-10">
      <div className="mx-auto flex w-[min(calc(100%_-_48px),1240px)] max-sm:w-[calc(100%_-_32px)] flex-col gap-3 md:flex-row md:items-center">
        <div className="group relative md:basis-1/2">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a978f] transition-colors group-focus-within:text-[#0e2820]"
          />
          <Input
            value={value.query}
            onChange={(e) => onChange({ ...value, query: e.target.value })}
            placeholder="Search partners by name"
            className="h-11 rounded-xl border-[#e2ded5] bg-white pl-11 text-sm shadow-[0_1px_2px_rgba(20,29,24,0.04)] transition-all duration-200 hover:border-[#b8c4bc] hover:shadow-[0_2px_8px_rgba(20,29,24,0.06)] focus-visible:border-[#0e2820] focus-visible:ring-4 focus-visible:ring-[#0e2820]/10"
          />
        </div>

        <select
          value={value.category}
          onChange={(e) => onChange({ ...value, category: e.target.value })}
          className="rounded-md border border-[#e2ded5] bg-white px-3 py-2 text-sm text-[#1c2b24] md:basis-1/4"
        >
          <option value="all">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={value.researchType}
          onChange={(e) => onChange({ ...value, researchType: e.target.value })}
          className="rounded-md border border-[#e2ded5] bg-white px-3 py-2 text-sm text-[#1c2b24] md:basis-1/4"
        >
          <option value="all">All research types</option>
          {researchTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
