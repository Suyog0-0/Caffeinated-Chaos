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
    <div className="border-y border-neutral-300 bg-[#f4f2ec] px-6 py-10 md:px-10 lg:px-16 sticky top-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 md:flex-row md:items-center">
        <div className="relative md:basis-1/2">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          <Input
            value={value.query}
            onChange={(e) => onChange({ ...value, query: e.target.value })}
            placeholder="Search partners by name"
            className="border-neutral-300 bg-white pl-9 text-sm"
          />
        </div>

        <select
          value={value.category}
          onChange={(e) => onChange({ ...value, category: e.target.value })}
          className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-800 md:basis-1/4"
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
          className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-800 md:basis-1/4"
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
