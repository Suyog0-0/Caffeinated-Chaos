const disclosures = [
    {
        title: "Definitions of Research Misconduct",
        body: "Research misconduct encompasses fabrication, falsification, unauthorized alteration of machine outputs, or plagiarism in proposing, performing, reviewing, or reporting research. It does not include honest error or differences of opinion in analytical methodology.",
        open: true,
    },
    {
        title: "Authorship Attribution & CRediT Taxonomy",
        body: "Islington Research adopts the Contributor Roles Taxonomy (CRediT). All published student and faculty contributors must fulfill at least two substantive roles (e.g., formal analysis, hardware prototyping, or original draft composition). Ghost or honorary authorship is strictly forbidden.",
        open: false,
    },
    {
        title: "Conflicts of Interest & Sponsored Research",
        body: "All financial, equity, or in-kind support from external commercial enterprises must be formally declared upon protocol submission. Industry sponsors are barred from vetoing academic conclusions or delaying publication for more than 45 days.",
        open: false,
    },
];

export function IntegrityDisclosures() {
    return (
        <section className="bg-white py-20">
            <div className="mx-auto w-[min(calc(100%_-_48px),1240px)] max-sm:w-[calc(100%_-_32px)]">
                <div className="mb-8 flex items-baseline justify-between gap-4 border-t border-[#17251f] pt-4">
                    <div className="flex items-center gap-3">
                        <h2 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#17251f]">
                            Integrity Disclosures &amp; Safe Harbor
                        </h2>
                        <span className="text-xs text-[#73837b]">Academic Standards</span>
                    </div>
                    <span className="text-xs text-[#73837b]">Zero Tolerance Policy</span>
                </div>

                <div className="space-y-4">
                    {disclosures.map((d) => (
                        <details key={d.title} className="group border-b border-[#e5e4de] pb-4" open={d.open}>
                            <summary className="flex cursor-pointer list-none items-center justify-between py-2 text-[#17251f] [&::-webkit-details-marker]:hidden">
                                <h3 className="text-2xl font-normal group-hover:text-[#153c2e]">{d.title}</h3>
                                <span className="pl-4 font-mono text-lg leading-none text-[#73837b] group-open:hidden">+</span>
                                <span className="hidden pl-4 font-mono text-lg leading-none text-[#73837b] group-open:inline">−</span>
                            </summary>
                            <div className="pr-6 pt-2 text-sm leading-relaxed text-[#405149]">{d.body}</div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}