import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const tiers = [
    {
        index: "01",
        tier: "Tier 1",
        riskLabel: "Minimal Risk Protocol",
        badgeClass: "border-emerald-800/30 text-emerald-800",
        cycle: "5-Day Fast Cycle",
        title: "Secondary Datasets, Public Repositories & De-Identified Metrics",
        description:
            "Applies to projects using publicly released corpora, secondary metadata analysis, strictly anonymized historical records, or non-interventional software performance benchmarking.",
        auditor: "Departmental Ethics Representative · Exemption Certificate Issued",
    },
    {
        index: "02",
        tier: "Tier 2",
        riskLabel: "Expedited Committee Review",
        badgeClass: "border-teal-800/30 text-teal-800",
        cycle: "14-Day Calendar Cycle",
        title: "Field Sensor Deployment, Localized Logging & Passive Environmental Capture",
        description:
            "Covers physical IoT installations, ambient acoustic recorders in public urban zones, spatial imagery capture with low resolution, and non-invasive student device utility evaluation.",
        auditor: "Two Sub-Committee Fellows + Security Officer",
    },
    {
        index: "03",
        tier: "Tier 3",
        riskLabel: "Full Convened IRB Oversight",
        badgeClass: "border-amber-900/30 text-amber-900",
        cycle: "Monthly Sitting",
        title: "Human Interactions, Biometric Telemetry & Vulnerable Demographics",
        description:
            "Mandatory for user experience testing involving health-related telemetry, psychological cognitive state evaluations, surveys addressing vulnerable groups, or proprietary enterprise integration.",
        auditor: "Quorum of Full IRB + Independent External Ombudsperson",
    },
];

export function ReviewTiers() {
    return (
        <section className="bg-white py-20">
            <div className="mx-auto w-[min(calc(100%_-_48px),1240px)] max-sm:w-[calc(100%_-_32px)]">
                <div className="mb-2 flex items-baseline justify-between gap-4 border-t border-[#17251f] pt-4">
                    <div className="flex items-center gap-3">
                        <h2 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#17251f]">
                            Review Tiers &amp; Protocols
                        </h2>
                        <span className="text-xs text-[#73837b]">IRB Procedural Pipeline</span>
                    </div>
                    <span className="text-xs text-[#73837b]">Showing {tiers.length} tiers</span>
                </div>

                {tiers.map((t) => (
                    <div key={t.index}>
                        <Separator />
                        <article className="flex flex-col gap-6 py-8 md:flex-row md:items-start md:justify-between md:gap-12">
                            <div className="max-w-3xl flex-1">
                                <div className="mb-2.5 flex flex-wrap items-center gap-3">
                                    <span className="font-sans text-xs font-semibold uppercase tracking-wider text-[#17251f]">
                                        {t.tier}
                                    </span>
                                    <Badge variant="outline" className={t.badgeClass}>
                                        {t.riskLabel}
                                    </Badge>
                                    <span className="text-xs text-[#73837b]">{t.cycle}</span>
                                </div>
                                <h3 className="mb-2 text-2xl font-normal leading-tight text-[#17251f] md:text-3xl">
                                    {t.title}
                                </h3>
                                <p className="mb-3 text-sm leading-relaxed text-[#405149]">{t.description}</p>
                                <div className="text-xs text-[#73837b]">Auditor assignment: {t.auditor}</div>
                            </div>
                        </article>
                    </div>
                ))
                }
            </div >
        </section >
    );
}
