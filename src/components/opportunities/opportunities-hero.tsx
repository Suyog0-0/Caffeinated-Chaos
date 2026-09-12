import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function OpportunitiesHero() {
  return (
    <section className="bg-[#F8F7F4] pt-32 pb-12 px-6 md:px-12 border-b border-[#E5E2D9]">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-8">
          <Link href="/search" className="hover:text-gray-900 transition-colors">
            Academic Repository & Vacancies
          </Link>
          <ChevronRight size={14} className="text-gray-400" />
          <span className="text-gray-900">Academic Year 2026/2027</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-serif text-[#0B3B24] mb-6 tracking-tight">
              Academic <span className="italic font-light">Opportunities</span> & Research Alliances
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
              Assistantships, funded doctoral studentships, research internships, calls for papers, and active industry collaboration openings across Islington R&D labs.
            </p>
          </div>

          <div className="bg-[#EFECE5] border border-[#E5E2D9] rounded-xl p-6 flex flex-col sm:flex-row gap-8 lg:min-w-[400px] shadow-sm">
            <div>
              <div className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">
                AVAILABLE OPENINGS
              </div>
              <div className="text-2xl font-serif font-semibold text-[#0B3B24]">
                18 Positions
              </div>
            </div>
            <div className="w-px bg-[#D9D6CE] hidden sm:block"></div>
            <div className="h-px bg-[#D9D6CE] sm:hidden"></div>
            <div>
              <div className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">
                NEXT CYCLE CUTOFF
              </div>
              <div className="text-2xl font-serif font-semibold text-[#0B3B24]">
                Sept 15, 2026
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
