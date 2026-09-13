import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stages = [
  {
    stage: "STAGE 01",
    title: "Inquire",
    description:
      "Formulation of research questions through student-faculty colloquiums and literature scoping.",
    outputs: "Problem Abstract & Mentor Match",
  },
  {
    stage: "STAGE 02",
    title: "Fund & Sandbox",
    description:
      "Allocating seed capital, laboratory compute clusters, and completing institutional ethical reviews.",
    outputs: "IRB Clearance & Seed Grants",
  },
  {
    stage: "STAGE 03",
    title: "Collaborate",
    description:
      "Executing field work alongside external industry partners and civic testbeds for empirical verification.",
    outputs: "Open Datasets & Verified Models",
  },
  {
    stage: "STAGE 04",
    title: "Disseminate",
    description:
      "Open-access publication, policy translation whitepapers, and international conference keynotes.",
    outputs: "Indexed Papers & Data Toolkits",
  },
];

export function Methodology() {
  return (
    <section className="bg-[#f5f4ef] py-24 text-[#17251f]">
      <div className="mx-auto w-[min(calc(100%_-_48px),1240px)] max-sm:w-[calc(100%_-_32px)]">
        <p className="mb-4 font-sans text-sm font-bold uppercase tracking-wide text-[#73837b]">
          Our Methodology
        </p>
        <h2 className="text-[48px] leading-tight font-medium mb-6">
          From inception to published impact.
        </h2>
        <p className="max-w-2xl text-xl text-[#405149] mb-16">
          A reliable pipeline ensuring every inquiry receives mentorship, computational resources,
          and rigorous peer scrutiny.
        </p>
        <ol className="grid grid-cols-4 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {stages.map((s) => (
            <li key={s.stage}>
              <Card className="rounded-sm border border-[#e5e4de] bg-white p-8 shadow-sm h-full">
                <CardHeader className="px-0 pt-0">
                  <p className="font-sans text-xs font-bold uppercase tracking-wider text-[#73837b] mb-4">
                    {s.stage}
                  </p>
                  <CardTitle className="text-[28px] font-medium leading-tight mb-4">
                    <h3 className="contents">{s.title}</h3>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0 flex flex-col justify-between min-h-[180px]">
                  <p className="text-[#405149] text-base mb-8 leading-relaxed">{s.description}</p>
                  <div className="mt-auto">
                    <p className="font-sans text-xs font-medium text-[#17251f]">
                      Outputs: <span className="font-normal text-[#73837b]">{s.outputs}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}