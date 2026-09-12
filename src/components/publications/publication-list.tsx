import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

type Publication = {
  id: string;
  type: string;
  year: number;
  title: string;
  authors: string;
  venue: string;
  area: string;
};

export function PublicationList({ publications }: { publications: Publication[] }) {
  if (publications.length === 0) {
    return (
      <div className="border-t border-[#17251f] py-20 text-center">
        <p className="text-sm text-[#8a9690]">No publications match your filters.</p>
      </div>
    );
  }

  return (
    <div className="border-t border-[#17251f] pb-16">
      {publications.map((item, index) => (
        <Link
          href={`/publications/${item.id}`}
          key={item.id}
          className="group flex min-h-[190px] items-start gap-7 border-b border-[#d7d5cd] py-8 transition-colors duration-300 hover:bg-[#faf9f5] focus-visible:bg-[#faf9f5] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#153c2e] max-sm:min-h-0 max-sm:gap-4 max-sm:py-7"
        >
          <span className="w-12 shrink-0 pt-1 text-lg font-semibold tabular-nums text-[#6e7772] transition-colors group-hover:text-[#153c2e] max-sm:w-8 max-sm:text-[15px]">
            {String(index + 1).padStart(2, "0")}
          </span>

          <span className="min-w-0 flex-1">
            <span className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold text-[#267457]">
              <span>{item.type}</span>
              <span aria-hidden="true" className="text-[#b8b8b1]">/</span>
              <span className="tabular-nums text-[#6e7772]">{item.year}</span>
              {item.area && item.area !== "Unassigned" && (
                <>
                  <span aria-hidden="true" className="text-[#b8b8b1]">/</span>
                  <span>{item.area}</span>
                </>
              )}
            </span>

            <strong
              className="block max-w-4xl font-medium text-[#17251f] transition-colors group-hover:text-[#153c2e]"
              style={{
                fontFamily: 'Garamond, "EB Garamond", "Times New Roman", serif',
                fontSize: "clamp(26px, 2.5vw, 34px)",
                letterSpacing: "-0.015em",
                lineHeight: 1.1,
              }}
            >
              {item.title}
            </strong>

            <span className="mt-4 block text-[14px] leading-6 text-[#405149]">
              {item.authors}
            </span>
            <span className="mt-1.5 block text-[13px] leading-6 text-[#78847e]">
              {item.venue}
            </span>
          </span>

          <span className="grid size-11 shrink-0 place-items-center border border-[#d7d5cd] bg-[#fffefb] text-[#17251f] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#153c2e] group-hover:bg-[#153c2e] group-hover:text-white max-sm:size-10">
            <ArrowUpRight aria-hidden="true" size={20} strokeWidth={1.8} />
          </span>
        </Link>
      ))}
    </div>
  );
}
