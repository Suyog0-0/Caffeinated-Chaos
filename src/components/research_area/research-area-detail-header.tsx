import Link from "next/link";
import type { areas } from "@/lib/dummy-data";

type ResearchArea = (typeof areas)[number];

export function ResearchAreaDetailHeader({ area }: { area: ResearchArea }) {
  return (
    <header className="mx-auto w-[min(calc(100%_-_48px),1240px)] border-b border-[#17251f] py-20 max-sm:w-[calc(100%_-_32px)]">
      <p className="font-sans text-[10px]">
        <Link className="underline-offset-4 hover:underline" href="/research-areas">
          Research areas
        </Link>{" "}
        / {area.name}
      </p>
      <h1 className="mt-3 text-[clamp(54px,7vw,92px)] leading-[.94] font-normal tracking-[-.045em]">
        {area.name}
      </h1>
      <p className="mt-6 max-w-2xl text-xl text-[#405149]">{area.description}</p>
      <dl className="mt-12 flex gap-14 max-sm:grid max-sm:gap-4">
        <div>
          <dt className="font-sans text-[9px] text-[#405149]">Area lead</dt>
          <dd className="mt-1 text-lg">{area.lead}</dd>
        </div>
        <div>
          <dt className="font-sans text-[9px] text-[#405149]">Active projects</dt>
          <dd className="mt-1 text-lg">{area.projects}</dd>
        </div>
        <div>
          <dt className="font-sans text-[9px] text-[#405149]">Publications</dt>
          <dd className="mt-1 text-lg">{area.publications}</dd>
        </div>
      </dl>
    </header>
  );
}
