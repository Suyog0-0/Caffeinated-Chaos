import { BookOpen } from "lucide-react";
import Link from "next/link";

type Publication = {
    type: string;
    title: string;
    authors: string;
    year: number;
    venue: string;
    area: string;
};

export function PublicationDetailHero({ publication }: { publication: Publication }) {
    const facts = [
        ["Year", publication.year],
        ["Venue", publication.venue],
        ["Research area", publication.area],
    ];

    return (
        <header className="mx-auto w-[min(calc(100%_-_48px),1240px)] border-b border-[#17251f] py-20 max-sm:w-[calc(100%_-_32px)]">
            <p className="flex items-center gap-2 font-sans text-[12px]">
                <BookOpen size={14} aria-hidden="true" />
                <Link className="hover:underline" href="/publications">
                    Publications
                </Link>{" > "}
                {publication.type.charAt(0).toUpperCase() +
                    publication.type.slice(1).toLowerCase()}
            </p>
            <h1 className="mt-4 max-w-5xl text-[clamp(48px,6vw,80px)] leading-[.96] font-normal tracking-[-.04em]">
                {publication.title}
            </h1>
            <p className="mt-6 max-w-2xl text-2xl text-[#405149]">{publication.authors}</p>
            <dl className="mt-12 flex gap-14 manpmx-sm:grid max-sm:gap-4">
                {facts.map(([term, value]) => (
                    <div key={term}>
                        <dt className="font-sans text-[11px] text-[#405149]">{term}</dt>
                        <dd className="mt-1 text-xl">{value}</dd>
                    </div>
                ))}
            </dl>
        </header>
    );
}
