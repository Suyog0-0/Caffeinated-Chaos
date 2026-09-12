const principles = [
    {
        index: "01 / Provenance",
        title: "Dataset Provenance & Lineage",
        description:
            "Every predictive model developed under college auspices must document training data licensing, synthetic balance procedures, and regional provenance records.",
    },
    {
        index: "02 / Fairness",
        title: "Regional Bias Auditing",
        description:
            "Natural language and vision architectures must undergo targeted parity tests to verify performance across low-resource Himalayan languages and localized dialects.",
    },
    {
        index: "03 / Agency",
        title: "Human Deterministic Override",
        description:
            "Autonomous decision workflows applied to academic grading, admissions, or institutional resources cannot run without verified manual audit channels.",
    },
    {
        index: "04 / Responsibility",
        title: "Compute & Carbon Disclosure",
        description:
            "All deep neural network training runs exceeding 100 GPU hours require explicit logging of cumulative watt-hours and carbon equivalent estimates in the final manuscript.",
    },
];

export function AiPrinciples() {
    return (
        <section className="bg-white py-20">
            <div className="mx-auto w-[min(calc(100%_-_48px),1240px)] max-sm:w-[calc(100%_-_32px)]">
                <div className="mb-10 flex items-baseline justify-between gap-4 border-t border-[#17251f] pt-4">
                    <div className="flex items-center gap-3">
                        <h2 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#17251f]">
                            Algorithmic &amp; AI Governance Framework
                        </h2>
                        <span className="text-xs text-[#73837b]">Editorial Precepts</span>
                    </div>
                    <span className="text-xs text-[#73837b]">Adopted 2024</span>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
                    {principles.map((p) => (
                        <div key={p.index} className="border-l border-[#e5e4de] pl-6">
                            <div className="mb-2 font-mono text-xs text-[#153c2e]">{p.index}</div>
                            <h3 className="mb-2 text-xl font-normal text-[#17251f]">{p.title}</h3>
                            <p className="text-xs leading-relaxed text-[#73837b]">{p.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}