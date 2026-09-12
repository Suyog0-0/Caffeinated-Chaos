"use client";

import { useState } from "react";
import { ResourceHero } from "@/components/research-support/resource-hero";
import { ResourceSection } from "@/components/research-support/resource-section";

type Resource = {
    id: string;
    title: string;
    category: string | null;
    description: string | null;
    file_url: string | null;
    content: string | null;
    badge: string | null;
    created_at: string;
};

export function ResourceContent({
    categories,
    resources,
}: {
    categories: string[];
    resources: Resource[];
}) {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <>
            <ResourceHero categories={categories} searchQuery={searchQuery} onSearchChange={setSearchQuery} />
            {categories.map((category, index) => (
                <ResourceSection
                    key={category}
                    category={category}
                    index={index}
                    resources={resources.filter((r) => (r.category ?? "General") === category)}
                    searchQuery={searchQuery}
                />
            ))}
            {searchQuery.trim() &&
                categories.every((category) => {
                    const q = searchQuery.toLowerCase();
                    return !resources
                        .filter((r) => (r.category ?? "General") === category)
                        .some((r) => r.title.toLowerCase().includes(q) || (r.description ?? "").toLowerCase().includes(q));
                }) && (
                    <section className="py-24 bg-white">
                        <div className="mx-auto w-[min(calc(100%_-_48px),1240px)] max-sm:w-[calc(100%_-_32px)] text-center">
                            <p className="text-[#73837b] text-sm">
                                No resources found for &ldquo;{searchQuery}&rdquo;.
                            </p>
                        </div>
                    </section>
                )}
        </>
    );
}