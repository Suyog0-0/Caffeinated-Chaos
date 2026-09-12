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
        <p className="font-sans text-sm text-[#8a9690]">No publications match your filters.</p>
      </div>
    );
  }

  return (
    <div className="border-t border-[#17251f] pb-16">
      {publications.map((item, index) => (
        <article
          key={item.id}
          className="group border-b border-[#d7d5cd] transition-colors hover:bg-[#f7f6f2]"
        >

          <div className="grid grid-cols-[56px_1fr] max-sm:grid-cols-1">


            <div className="flex items-start justify-center pt-8 max-sm:hidden">
              <span className="font-sans text-[11px] tabular-nums text-[#b0afa8]">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>


            <div className="grid grid-cols-[1fr_160px] items-center gap-6 border-l border-[#d7d5cd] px-6 py-8 max-sm:grid-cols-1 max-sm:border-l-0 max-sm:px-0 max-sm:py-6">


              <div className="min-w-0">

                <div className="mb-2.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-widest text-[#267457]">
                    {item.type}
                  </span>
                  <span className="text-[#c8c6bd]">·</span>
                  <span className="font-sans text-[10px] tabular-nums text-[#8a9690]">
                    {item.year}
                  </span>
                  {item.area && (
                    <>
                      <span className="text-[#c8c6bd]">·</span>
                      <span className="rounded-sm bg-[#eef5f1] px-1.5 py-0.5 font-sans text-[9px] font-medium uppercase tracking-wider text-[#267457]">
                        {item.area}
                      </span>
                    </>
                  )}
                </div>


                <h2 className="mb-2 text-xl font-medium leading-snug tracking-tight text-[#17251f] max-sm:text-lg">
                  <Link
                    className="decoration-[#267457]/40 underline-offset-3 transition-colors hover:text-[#267457] hover:underline"
                    href={`/publications/${item.id}`}
                  >
                    {item.title}
                  </Link>
                </h2>


                <p className="mb-3 font-sans text-xs leading-relaxed text-[#405149]">
                  {item.authors}
                </p>


                <p className="font-sans text-[11px] leading-relaxed text-[#8a9690]">
                  {item.venue}
                </p>
              </div>


              <div className="flex items-center justify-center max-sm:justify-start">
                <Link
                  href={`/publications/${item.id}`}
                  className="group inline-flex items-center gap-1.5 border-b border-transparent pb-px font-sans text-[11px] font-medium uppercase tracking-widest text-[#17251f] transition-all duration-200 hover:border-[#267457] hover:text-[#267457]"
                >
                  Read abstract
                  <ArrowUpRight
                    size={12}
                    strokeWidth={1.8}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>

            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
