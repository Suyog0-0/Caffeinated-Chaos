const sops = [
    {
        index: "04",
        code: "SOP-01",
        category: "Data Governance",
        title: "Informed Consent Protocols in Ubiquitous & Distributed Sensor Environments",
        note: "Requires dual physical signage and broadcast beacon notification for continuous recording experiments.",
        version: "v3.1",
    },
    {
        index: "05",
        code: "SOP-02",
        category: "Security & Storage",
        title: "Cold-Storage, Cryptographic Hashing & Sovereignty of Field Datasets",
        note: "Stipulates AES-256 air-gapped backups for high-elevation terrain measurements prior to cloud synchronization.",
        version: "v2.4",
    },
    {
        index: "06",
        code: "SOP-03",
        category: "Laboratory Safety",
        title: "Undergraduate Supervision, Soldering & High-Voltage Microelectronics",
        note: "Bench safety certifications, ventilation thresholds, and incident reporting sequences in Maker Space 2.",
        version: "v4.0",
    },
    {
        index: "07",
        code: "SOP-04",
        category: "Dual-Use Evaluation",
        title: "Collaborative Industry IP, Commercial Licensing & Risk Pre-Screening",
        note: "Review guidelines for sponsored student research with third-party software vendors and international consortia.",
        version: "v1.8",
    },
];

export function SopList() {
    return (
        <section className="bg-[#f5f4ef] py-20">
            <div className="mx-auto w-[min(calc(100%_-_48px),1240px)] max-sm:w-[calc(100%_-_32px)]">
                <div className="mb-8 flex items-baseline justify-between gap-4 border-t border-[#17251f] pt-4">
                    <div className="flex items-center gap-3">
                        <h2 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#17251f]">
                            Standard Operating Procedures
                        </h2>
                        <span className="text-xs text-[#73837b]">Operational Compliance Manuals</span>
                    </div>
                    <span className="text-xs text-[#73837b]">Current revisions</span>
                </div>

                <div className="divide-y divide-[#e5e4de] border-b border-[#e5e4de]">
                    {sops.map((s) => (
                        <div
                            key={s.code}
                            className="flex flex-col justify-between gap-4 py-6 sm:flex-row sm:items-baseline"
                        >
                            <div className="flex items-baseline gap-6 sm:gap-10">
                                <span className="w-8 shrink-0 font-mono text-xs text-[#73837b]">{s.index}</span>
                                <div>
                                    <div className="mb-1 flex items-center gap-2">
                                        <span className="font-mono text-[11px] font-medium text-[#153c2e]">{s.code}</span>
                                        <span className="text-xs text-[#73837b]">·</span>
                                        <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-[#73837b]">
                                            {s.category}
                                        </span>
                                    </div>
                                    <h3 className="text-base font-medium text-[#17251f] sm:text-lg">{s.title}</h3>
                                    <p className="mt-1 text-xs text-[#73837b]">{s.note}</p>
                                </div>
                            </div>
                            <div className="flex shrink-0 items-center gap-4 pl-14 text-xs font-medium sm:pl-0">
                                <span className="font-mono text-[#73837b]">{s.version}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section >
    );
}