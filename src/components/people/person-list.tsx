import Link from "next/link";

type ResearcherSummary = {
  id: string;
  initials: string;
  department: string;
  name: string;
  position: string;
  projects: number;
  papers: number;
};

export function PersonList({ researchers }: { researchers: ResearcherSummary[] }) {
  return (
    <section className="py-4 md:py-12 px-4 md:px-6 lg:px-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-7">
        {researchers.map((researcher) => (
          <Link
            className="group block outline-none"
            href={`/people/${researcher.id}`}
            key={researcher.id}
          >
            <article className="bg-[#FFFFFF] border border-[#E8E4DA]/90 md:border-[#E2DBD0] rounded-2xl md:rounded-lg p-4 md:p-6 flex flex-col justify-between h-full transition-all duration-300 hover:border-[#1B473A] md:hover:border-[#0B251E] hover:shadow-lg md:hover:-translate-y-1">
              <div>
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div className="flex md:block items-center gap-3.5 md:gap-0">
                    <div className="relative shrink-0">
                      <div className="w-[52px] h-[52px] md:w-14 md:h-14 rounded-full bg-[#374151] md:bg-[#374151] text-white flex items-center justify-center font-serif text-lg font-medium shadow-inner tracking-wide">
                        {researcher.initials}
                      </div>
                    </div>
                    <div className="md:hidden">
                      <p className="text-[11px] text-neutral-500 font-medium">{researcher.department} · {researcher.position}</p>
                      <h2 className="font-serif text-[20px] font-medium leading-tight text-neutral-900 mt-0.5">
                        {researcher.name}
                      </h2>
                    </div>
                  </div>
                </div>
                
                <div className="hidden md:block">
                  <h3 className="font-serif text-2xl font-bold text-[#141A17] leading-snug group-hover:text-[#1A2420] transition-colors truncate">
                    {researcher.name}
                  </h3>
                  <p className="text-xs font-medium text-[#6B7280] mt-0.5 mb-3 truncate">
                    {researcher.department} · {researcher.position}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 md:mb-6 mt-3 md:mt-0">
                  <span className="text-[10px] bg-[#F4F1EA] md:bg-[#F0ECE4] text-[#2D453E] md:text-[#2F3C35] px-2 py-0.5 rounded font-medium">Research Area</span>
                  <span className="text-[10px] bg-[#F4F1EA] md:bg-[#F0ECE4] text-[#2D453E] md:text-[#2F3C35] px-2 py-0.5 rounded font-medium">Faculty</span>
                </div>
              </div>
              <div className="mt-4 md:mt-0 pt-3.5 md:pt-4 border-t border-[#E8E4DA]/60 md:border-[#E2DBD0]/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3 text-neutral-500 md:text-[#4D5B53] font-medium">
                  <span><strong className="text-neutral-800 md:text-[#141A17] font-semibold md:font-bold">{researcher.projects}</strong> Projects</span>
                  <span className="w-1 h-1 rounded-full bg-neutral-300 md:bg-[#E2DBD0]"></span>
                  <span><strong className="text-neutral-800 md:text-[#141A17] font-semibold md:font-bold">{researcher.papers}</strong> Papers</span>
                </div>
                <div className="inline-flex md:hidden items-center gap-1 text-xs font-semibold text-[#0F2C23]">
                  <span>Profile</span>
                  <svg className="w-3.5 h-3.5 stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
                <div className="hidden md:flex w-7 h-7 rounded-full bg-[#F3EFE7] group-hover:bg-[#0B251E] group-hover:text-white items-center justify-center text-[#2F3C35] transition-colors">
                  ↗
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
