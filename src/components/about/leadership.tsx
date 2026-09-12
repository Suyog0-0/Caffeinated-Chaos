import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const leaders = [
  [
    "SK",
    "Prof. Sunita Koirala",
    "Director of Research & Development",
    "Chair in Applied Computing. Former Fulbright Senior Scholar specializing in distributed sensor protocols and rural high-latency mesh networks.",
    "View Publications",
  ],
  [
    "BR",
    "Dr Bikash Rai",
    "Research Programmes Lead",
    "Fellow in Big Data Architectures. Supervises undergraduate honor theses, lab hardware allocations, and cross-institutional seed grants.",
    "View Publications",
  ],
  [
    "MJ",
    "Meena Joshi",
    "Partnerships & Impact Lead",
    "Coordinates technology transfer, civic partner integration, and IP governance to ensure college research benefits public health and municipal infrastructure.",
    "Partner Enquiries",
  ],
  [
    "MV",
    "Dr Marcus Vance",
    "Ethics & Open Science Advisor",
    "Oversees research data integrity protocols, FAIR data compliance, and human algorithmic ethics boards across all active cohorts.",
    "Ethics Standards",
  ],
];

export function Leadership() {
  return (
    <section className="bg-[#0d2a20] py-20 text-white">
      <div className="mx-auto w-[min(calc(100%_-_48px),1240px)] max-sm:w-[calc(100%_-_32px)]">
        <p className="mb-4 font-sans text-xs font-bold uppercase tracking-wider text-[#47c97e]">
          Leadership & Governance
        </p>
        <h2 className="text-[48px] leading-tight font-medium mb-6">
          Guided by researchers and educators.
        </h2>
        <p className="max-w-3xl text-xl text-[#b7c6be] mb-12">
          Our advisory council unites faculty chairs, lab directors, and student ethics representatives committed to high academic rigor and societal utility.
        </p>
        <div className="grid grid-cols-4 gap-8 border-t border-[#173e2e] pt-12 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {leaders.map(([initials, name, role, desc, linkText]) => (
            <Card
              className="rounded-none border-0 bg-transparent flex flex-col justify-between h-full text-white shadow-none"
              key={initials}
            >
              <div>
                <CardHeader className="px-0 pt-0 pb-6">
                  <span className="grid size-14 place-items-center rounded-full border border-[#173e2e] font-sans text-[18px] text-[#47c97e] bg-[#103327]">
                    {initials}
                  </span>
                  <CardTitle className="mt-6 text-[24px] font-medium leading-tight">{name}</CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-8">
                  <p className="font-sans text-xs font-bold uppercase tracking-wider text-[#47c97e] mb-4">
                    {role}
                  </p>
                  <p className="text-base text-[#b7c6be] leading-relaxed">{desc}</p>
                </CardContent>
              </div>
              <div className="px-0 mt-auto pt-4">
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 font-sans text-sm font-medium text-[#47c97e] hover:text-white transition-colors"
                >
                  {linkText} <ArrowRight size={16} />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
