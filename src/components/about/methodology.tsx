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
] as const;

export function Methodology() {
  return (
    <section
      className="bg-[#f5f4ef] py-16 text-[#17251f] sm:py-20 lg:py-24"
      aria-labelledby="methodology-title"
    >
      <div className="mx-auto w-[min(calc(100%_-_48px),1240px)] max-sm:w-[calc(100%_-_32px)]">
        <div className="max-w-3xl">
          <div className="mb-5 flex items-center gap-3 text-[#153c2e]">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-[#153c2e]"
            />

            <p className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-[#73837b]">
              Our Methodology
            </p>
          </div>

          <h2
            id="methodology-title"
            className="max-w-2xl text-[clamp(2.5rem,5vw,4rem)] font-normal leading-[1.02] tracking-[-0.04em]"
          >
            From inception to published impact.
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-7 text-[#405149] sm:text-lg sm:leading-8">
            A reliable pipeline ensuring every inquiry receives mentorship,
            computational resources, and rigorous peer scrutiny.
          </p>
        </div>

        <ol className="mt-12 grid border-t border-[#d7d5cd] sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage, index) => (
            <li
              key={stage.stage}
              className={[
                "group flex min-w-0 flex-col py-7 sm:py-8 lg:min-h-[330px] lg:py-9",
                index > 0
                  ? "border-t border-[#d7d5cd] sm:pl-8 lg:border-l lg:border-t-0"
                  : "",
                index % 2 === 0 ? "sm:pr-8" : "sm:pl-8 sm:pr-0",
                index > 1 ? "lg:pl-8" : "",
                index === 1 ? "lg:pr-8" : "",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-sans text-xs font-bold tracking-[0.12em] text-[#73837b]">
                  {stage.stage}
                </span>

                <span
                  aria-hidden="true"
                  className="mt-1 h-px w-6 shrink-0 bg-[#d7d5cd] transition-colors duration-200 group-hover:bg-[#153c2e]"
                />
              </div>

              <h3 className="mt-8 max-w-[12ch] text-[clamp(1.75rem,3vw,2.25rem)] font-medium leading-[1.05] tracking-[-0.025em] text-[#153c2e]">
                {stage.title}
              </h3>

              <p className="mt-5 max-w-sm text-sm leading-7 text-[#405149]">
                {stage.description}
              </p>

              <div className="mt-auto border-t border-[#e1dfd8] pt-5">
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.09em] text-[#17251f]">
                  Outputs
                </p>

                <p className="mt-2 text-sm leading-6 text-[#73837b]">
                  {stage.outputs}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}