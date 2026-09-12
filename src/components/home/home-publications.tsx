import { ArrowUpRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { kicker, pageShell, sectionTitle } from "./shared";
import { getPublications } from "./data/publications";
export async function Publications() {
  const publications = await getPublications();

  return (
    <section className={`${pageShell} py-24 max-sm:py-16`}>
      <header className="mb-12 flex items-end justify-between gap-10 max-sm:block">
        <div>
          <p className={kicker}>Recently published</p>
          <h2 className={sectionTitle}>New thinking, ready to read</h2>
        </div>

        <Link
          className={buttonVariants({
            variant: "outline",
            className: "h-11 rounded-md border-[#c9c7bd] bg-[#fffefb] px-5 font-sans text-[14px] font-semibold text-[#153c2e] shadow-none transition-all hover:-translate-y-0.5 hover:border-[#153c2e] hover:bg-[#153c2e] hover:text-white max-sm:mt-6",
          })}
          href="/publications"
        >
          View publication library
        </Link>
      </header>

      <div className="border-t border-[#17251f]">
        {publications.map((publication) => (
          <article
            className="group grid min-h-[154px] grid-cols-[58px_minmax(0,1fr)_280px_44px] items-center gap-7 border-b border-[#d7d5cd] py-7 transition-colors duration-300 hover:bg-[#faf9f5] max-lg:grid-cols-[52px_minmax(0,1fr)_210px_42px] max-sm:grid-cols-[45px_1fr_38px] max-sm:gap-4 max-sm:py-6"
            key={publication.id}
          >
            <span className="grid h-14 w-10 place-items-center border border-[#d7d5cd] bg-white text-[#153c2e] transition-all duration-300 group-hover:border-[#153c2e] group-hover:bg-[#edf4f0]">
              <BookOpen aria-hidden size={21} />
            </span>

            <div>
              <div className="mb-3 flex gap-2">
                {publication.publication_type && (
                  <Badge className="font-sans text-[11px] font-semibold capitalize">{publication.publication_type}</Badge>
                )}

                {publication.year && (
                  <Badge className="font-sans text-[11px] font-semibold">{publication.year}</Badge>
                )}
              </div>

              <h3 className="max-w-4xl text-[25px] font-medium leading-snug tracking-[-0.01em] max-sm:text-[20px]">
                <Link className="transition-colors group-hover:text-[#153c2e]" href={`/publications/${publication.id}`}>
                  {publication.title}
                </Link>
              </h3>
            </div>

            <p className="font-sans text-[14px] leading-6 text-[#405149] max-sm:col-start-2 max-sm:text-[13px]">
              {publication.venue}
            </p>

            <Link
              className={buttonVariants({
                variant: "outline",
                size: "icon",
                className:
                  "size-10 rounded-md border-[#d7d5cd] bg-white text-[#153c2e] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#153c2e] group-hover:bg-[#153c2e] group-hover:text-white max-sm:col-start-3 max-sm:row-span-2 max-sm:row-start-1",
              })}
              href={`/publications/${publication.id}`}
              aria-label={`Open ${publication.title}`}
            >
              <ArrowUpRight aria-hidden size={19} />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
