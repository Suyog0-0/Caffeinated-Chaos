"use client";

import { useState } from "react";
import { EthicsHero } from "@/components/ethics/ethics-hero";
import { PolicySection } from "@/components/ethics/policy-section";

type PolicyRow = {
    id: string;
    title: string;
    category: string | null;
    content: string | null;
    file_url: string | null;
};

export function EthicsContent({
    categories,
    policies,
}: {
    categories: string[];
    policies: PolicyRow[];
}) {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <>
            <EthicsHero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
            {categories.map((category, index) => (
                <PolicySection
                    key={category}
                    category={category}
                    index={index}
                    policies={policies.filter((p) => (p.category ?? "General") === category)}
                    searchQuery={searchQuery}
                />
            ))}
            {searchQuery.trim() &&
                categories.every((category) => {
                    const q = searchQuery.toLowerCase();
                    return !policies
                        .filter((p) => (p.category ?? "General") === category)
                        .some(
                            (p) =>
                                p.title.toLowerCase().includes(q) ||
                                (p.content ?? "").toLowerCase().includes(q)
                        );
                }) && (
                    <section className="py-24 bg-white">
                        <div className="mx-auto w-[min(calc(100%_-_48px),1240px)] max-sm:w-[calc(100%_-_32px)] text-center">
                            <p className="text-[#73837b] text-sm">
                                No policies found for &ldquo;{searchQuery}&rdquo;.
                            </p>
                        </div>
                    </section>
                )}
        </>
    );
}
