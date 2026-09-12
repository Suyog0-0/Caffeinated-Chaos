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
            className: "max-sm:mt-6",
          })}
          href="/publications"
        >
          View publication library
        </Link>
      </header>

      <div className="border-t border-[#17251f]">
        {publications.map((publication) => (
          <article
            className="grid min-h-40 grid-cols-[54px_1fr_230px_40px] items-center gap-6 border-b border-[#d7d5cd] max-sm:grid-cols-[45px_1fr_36px] max-sm:py-6"
            key={publication.id}
          >
            <span className="grid h-14 w-10 place-items-center border border-[#d7d5cd] bg-white text-[#153c2e]">
              <BookOpen aria-hidden size={21} />
            </span>

            <div>
              <div className="mb-2 flex gap-2">
                {publication.publication_type && (
                  <Badge>{publication.publication_type}</Badge>
                )}

                {publication.year && (
                  <Badge>{publication.year}</Badge>
                )}
              </div>

              <h3 className="max-w-3xl text-[22px] leading-tight font-medium">
                <Link href={`/publications/${publication.id}`}>
                  {publication.title}
                </Link>
              </h3>
            </div>

            <p className="text-[13px] leading-tight text-[#405149] max-sm:col-start-2">
              {publication.venue}
            </p>

            <Link
              className={buttonVariants({
                variant: "outline",
                size: "icon",
                className:
                  "max-sm:col-start-3 max-sm:row-span-2 max-sm:row-start-1",
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
