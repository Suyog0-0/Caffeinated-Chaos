"use client";

import { useMemo, useState } from "react";
import { PublicationFilters } from "./publication-filters";
import { PublicationList } from "./publication-list";

type Publication = {
    id: string;
    type: string;
    year: number;
    title: string;
    authors: string;
    venue: string;
    area: string;
};

export function PublicationLibrary({
    publications,
    types,
    years,
    authors,
    areas,
}: {
    publications: Publication[];
    types: string[];
    years: number[];
    authors: string[];
    areas: string[];
}) {
    const [search, setSearch] = useState("");
    const [type, setType] = useState("all");
    const [year, setYear] = useState("all");
    const [author, setAuthor] = useState("all");
    const [area, setArea] = useState("all");

    const filtered = useMemo(() => {
        const query = search.trim().toLowerCase();
        return publications.filter((p) => {
            if (type !== "all" && p.type !== type) return false;
            if (year !== "all" && String(p.year) !== year) return false;
            if (author !== "all" && !p.authors.includes(author)) return false;
            if (area !== "all" && p.area !== area) return false;
            if (query) {
                const haystack = `${p.title} ${p.authors} ${p.venue}`.toLowerCase();
                if (!haystack.includes(query)) return false;
            }
            return true;
        });
    }, [publications, search, type, year, author, area]);

    return (
        <>
            <PublicationFilters
                search={search}
                onSearchChange={setSearch}
                type={type}
                onTypeChange={setType}
                year={year}
                onYearChange={setYear}
                author={author}
                onAuthorChange={setAuthor}
                area={area}
                onAreaChange={setArea}
                types={types}
                years={years}
                authors={authors}
                areas={areas}
                resultCount={filtered.length}
            />
            <div className="mx-auto w-[min(calc(100%_-_48px),1240px)] max-sm:w-[calc(100%_-_32px)] pb-24">
              <PublicationList publications={filtered} />
            </div>
        </>
    );
}
