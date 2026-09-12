"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ResourceHero({
    categories,
    searchQuery,
    onSearchChange,
}: {
    categories: string[];
    searchQuery?: string;
    onSearchChange?: (value: string) => void;
}) {
    return (
        <header className="bg-[#0d2a20] py-16 text-white">
            <div className="mx-auto w-[min(calc(100%_-_48px),1240px)] max-sm:w-[calc(100%_-_32px)]">
                <p className="mb-4 font-sans text-xs font-bold uppercase tracking-wider text-[#b6c7bd]">
                    Research Support &amp; Resources
                </p>
                <h1 className="max-w-4xl text-[clamp(46px,6vw,76px)] leading-[1.05] font-normal tracking-[-.025em]">
                    Tools, templates, and protocols for every stage of inquiry.
                </h1>
                <p className="mt-6 max-w-3xl text-xl text-[#c5d2cb]">
                    Access methodology handbooks, institutional grant templates, publication guidelines, and data
                    management protocols designed for faculty, visiting fellows, and graduate researchers.
                </p>

                <div className="relative mt-10 max-w-2xl">
                    <Search
                        size={16}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8fa79b]"
                        aria-hidden="true"
                    />
                    <Input
                        type="text"
                        value={searchQuery ?? ""}
                        onChange={(e) => onSearchChange?.(e.target.value)}
                        placeholder="Search resources, methodology guides, grant templates, or datasets..."
                        className="h-12 rounded-full border-[#28453a] bg-[#123227] pl-11 text-sm text-white placeholder:text-[#8fa79b] focus-visible:ring-white/40"
                    />
                </div>

                {categories.length > 0 && (
                    <div className="mt-5 flex flex-wrap items-center gap-2">
                        <span className="mr-1 font-sans text-[11px] font-semibold uppercase tracking-wider text-[#8fa79b]">
                            Quick:
                        </span>
                        {categories.map((label) => (
                            <Button
                                key={label}
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => onSearchChange?.(label)}
                                className="rounded-full border-[#28453a] bg-[#123227] text-xs text-[#dfe9e3] hover:bg-[#153c2e] hover:text-white"
                            >
                                {label}
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        </header>
    );
}