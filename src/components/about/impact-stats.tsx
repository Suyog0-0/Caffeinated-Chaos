const stats = [
    ["6", "Research areas"],
    ["40+", "Active projects"],
    ["120+", "Published papers"],
    ["85", "Contributing researchers"],
] as const;

export function ImpactStats() {
    return (
        <section className="mx-auto w-[min(calc(100%_-_48px),1240px)] border-b border-[#17251f] py-16 max-sm:w-[calc(100%_-_32px)]">
            <p className="mb-8 font-sans text-xs font-bold text-[#153c2e]">Our impact</p>
            <div className="grid grid-cols-4 max-sm:grid-cols-2">
                {stats.map(([value, label], index) => (
                    <div
                        className={`${index ? "border-l border-[#d7d5cd] pl-[3vw] max-sm:border-l-0 max-sm:pl-0" : ""} ${index >= 2 ? "max-sm:mt-8" : ""}`}
                        key={label}
                    >
                        <p className="text-[56px] leading-none font-medium text-[#153c2e]">{value}</p>
                        <p className="mt-3 text-[#405149]">{label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}