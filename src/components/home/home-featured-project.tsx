import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { pageShell, sectionTitle } from "./shared";

const projectDetails = [
  ["Status", "Ongoing"],
  ["Research area", "Sustainable cities"],
  ["Team", "6 researchers"],
];

const readings = [
  "h-[38%]",
  "h-[52%]",
  "h-[48%]",
  "h-[68%]",
  "h-[61%]",
  "h-[79%]",
  "h-[72%]",
  "h-[88%]",
  "h-[67%]",
  "h-[73%]",
  "h-[55%]",
  "h-[63%]",
];

export function FeaturedProject() {
  return (
    <section className="bg-[#0d2a20] py-24 text-white max-sm:py-16">
      <div
        className={`${pageShell} grid grid-cols-[.9fr_1.1fr] items-center gap-[10vw] max-sm:grid-cols-1 max-sm:gap-12`}
      >
        <div>
          <p className="mb-4 font-sans text-xs font-bold text-[#b6c7bd]">Project in focus</p>
          <h2 className={sectionTitle}>
            Small sensors.
            <br />A clearer city.
          </h2>
          <p className="my-6 max-w-xl text-[#c9d4ce]">
            Researchers and student collaborators are building a street-level picture of heat and
            air quality—evidence that local communities can use.
          </p>
          <dl className="mt-10 grid grid-cols-3 border-y border-[#496057]">
            {projectDetails.map(([term, detail]) => (
              <div className="py-4 pr-3" key={term}>
                <dt className="font-sans text-[9px] text-[#9eb0a6]">{term}</dt>
                <dd className="mt-1 text-[15px]">{detail}</dd>
              </div>
            ))}
          </dl>
          <Link
            className={buttonVariants({
              variant: "link",
              className: "mt-8 text-white hover:text-[#e1c451]",
            })}
            href="/projects/community-climate-sensors"
          >
            Read the project <ArrowUpRight aria-hidden size={17} />
          </Link>
        </div>
        <Card className="min-h-[410px] border-[#416055] bg-[#15372c] text-white shadow-[16px_16px_0_#0a2119]">
          <CardHeader className="flex-row justify-between font-sans text-[10px] text-[#b7c7bf]">
            <span>Community sensor 04</span>
            <span>Kalanki · 14:30</span>
          </CardHeader>
          <CardContent className="flex min-h-[330px] flex-col p-8 pt-0">
            <div className="mt-4 flex items-baseline gap-3">
              <strong className="text-[clamp(76px,8vw,110px)] leading-[.8] font-normal tracking-[-.06em]">
                31.8
              </strong>
              <span className="font-sans text-[11px] text-[#bdcbc4]">°C street temperature</span>
            </div>
            <div className="mt-auto flex h-32 items-end gap-2 border-b border-[#769087]">
              {readings.map((height, index) => (
                <span className={`${height} flex-1 bg-[#e1c451]`} key={`${height}-${index}`} />
              ))}
            </div>
            <p className="mt-3 font-sans text-[9px] text-[#aebeb6]">
              Readings from the last twelve hours
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
