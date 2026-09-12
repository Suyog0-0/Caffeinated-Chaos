import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { areas } from "@/lib/dummy-data";

export function ResearchAreaDirectory() {
  return (
    <section className="mx-auto w-[min(calc(100%_-_48px),1240px)] max-sm:w-[calc(100%_-_32px)]">
      {areas.map((area, index) => (
        <Link
          className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#153c2e]"
          href={`/research-areas/${area.slug}`}
          key={area.slug}
        >
          <Card className="min-h-48 border-x-0 border-t-0 bg-transparent">
            <CardContent className="grid min-h-48 grid-cols-[55px_1fr_220px_auto] items-center gap-7 p-0 max-sm:grid-cols-[35px_1fr] max-sm:py-7">
              <span className="font-sans text-[10px]">0{index + 1}</span>
              <article>
                <h2 className="text-[32px] font-medium">{area.name}</h2>
                <p className="mt-2 max-w-2xl text-[15px] text-[#405149]">{area.description}</p>
              </article>
              <dl className="flex gap-7 max-sm:col-start-2">
                <div>
                  <dt className="font-sans text-[10px] text-[#405149]">Projects</dt>
                  <dd className="mt-1 text-[22px]">{area.projects}</dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] text-[#405149]">Publications</dt>
                  <dd className="mt-1 text-[22px]">{area.publications}</dd>
                </div>
              </dl>
              <strong className="flex items-center gap-2 font-sans text-[10px] max-sm:col-start-2">
                View area
                <ArrowUpRight
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  size={15}
                />
              </strong>
            </CardContent>
          </Card>
        </Link>
      ))}
    </section>
  );
}
