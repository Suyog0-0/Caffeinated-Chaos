export function OpportunitiesHero({
  totalOpenings,
  nextCycleCutoff,
}: {
  totalOpenings: number;
  nextCycleCutoff: string;
}) {
  return (
    <header className="border-b border-[#d7d5cd] bg-[#f7f5ef] text-[#17251f]">
      <div className="mx-auto w-[min(calc(100%_-_48px),1240px)] py-16 max-sm:w-[calc(100%_-_32px)] sm:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end lg:gap-20">
          <div className="max-w-4xl">
            <p className="mb-6 text-sm font-semibold text-[#52635b]">
              Opportunities <span className="mx-2 text-[#a4ada7]">/</span>
              Academic year 2026–27
            </p>

            <h1
              className="max-w-[16ch] text-[clamp(3.25rem,6.5vw,5.75rem)] font-normal leading-[0.94] tracking-[-0.045em] text-[#153c2e]"
              style={{
                fontFamily:
                  'Garamond, "EB Garamond", "Times New Roman", serif',
              }}
            >
              Find the work that moves your research forward.
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-[#52635b] sm:text-lg sm:leading-8">
              Explore funded research roles, doctoral opportunities, calls for
              papers, and collaboration openings across Islington R&amp;D.
            </p>
          </div>

          <dl className="grid grid-cols-2 border-y border-[#bfc5c0] lg:grid-cols-1">
            <div className="py-5 pr-5 lg:grid lg:grid-cols-[1fr_auto] lg:items-end lg:gap-6 lg:pr-0">
              <dt className="text-xs font-semibold text-[#68776f]">
                Open listings
              </dt>
              <dd className="mt-2 text-3xl font-semibold tracking-[-0.035em] text-[#153c2e] lg:mt-0">
                {totalOpenings.toString().padStart(2, "0")}
              </dd>
            </div>

            <div className="border-l border-[#bfc5c0] py-5 pl-5 lg:grid lg:grid-cols-[1fr_auto] lg:items-end lg:gap-6 lg:border-l-0 lg:border-t lg:pl-0">
              <dt className="text-xs font-semibold text-[#68776f]">
                Nearest deadline
              </dt>
              <dd className="mt-2 text-base font-semibold text-[#153c2e] lg:mt-0">
                {nextCycleCutoff}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </header>
  );
}
