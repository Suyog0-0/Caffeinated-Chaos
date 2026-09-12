import { Card } from "@/components/ui/card";

const members = [
    {
        role: "IRB Chair",
        name: "Dr. Marcus Vance",
        title: "Senior Fellow, Ethics & Open Inquiry",
        term: "Term: 2023–2026",
    },
    {
        role: "Institutional Delegate",
        name: "Prof. Sunita Koirala",
        title: "Director of R&D, Islington College",
        term: "Ex-Officio",
    },
    {
        role: "External Ombudsperson",
        name: "Dr. Aruna Shrestha",
        title: "Bioethics Specialist, Kathmandu Valley Bio-Council",
        term: "External / Non-Affiliated",
    },
    {
        role: "Legal & Regulatory",
        name: "Adv. Pradeep Thapa",
        title: "Counsel for Digital Rights & Technology Law",
        term: "Legal Advisory",
    },
];

export function IrbCommittee() {
    return (
        <section className="bg-[#f5f4ef] py-20">
            <div className="mx-auto w-[min(calc(100%_-_48px),1240px)] max-sm:w-[calc(100%_-_32px)]">
                <div className="mb-8 flex items-baseline justify-between gap-4 border-t border-[#17251f] pt-4">
                    <div className="flex items-center gap-3">
                        <h2 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#17251f]">
                            Institutional Review Board (IRB)
                        </h2>
                        <span className="text-xs text-[#73837b]">Appointed Roster &amp; Oversight</span>
                    </div>
                    <span className="text-xs text-[#73837b]">Biennial mandate (2024–2026)</span>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {members.map((m) => (
                        <Card
                            key={m.name}
                            className="flex h-52 flex-col justify-between rounded-sm border border-[#e5e4de] bg-white/60 p-6 shadow-none"
                        >
                            <div>
                                <span className="mb-1 block font-sans text-[11px] uppercase tracking-wider text-[#73837b]">
                                    {m.role}
                                </span>
                                <h3 className="text-base font-medium text-[#17251f]">{m.name}</h3>
                                <p className="mt-0.5 text-xs text-[#73837b]">{m.title}</p>
                            </div>
                            <div className="border-t border-[#e5e4de] pt-3 text-[11px]">
                                <span className="text-[#73837b]">{m.term}</span>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}