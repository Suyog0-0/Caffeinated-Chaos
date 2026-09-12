import Link from "next/link";
import { publications, researchers } from "@/lib/dummy-data";

export function ResearchAreaSidebar({ areaName }: { areaName: string }) {
  const areaResearchers = researchers.filter((researcher) => researcher.area === areaName);
  const areaPublications = publications.filter((publication) => publication.area === areaName);

  return (
    <aside>
      <h2 className="mb-6 text-4xl font-medium">People</h2>
      {areaResearchers.map((researcher) => (
        <Link
          className="flex items-center gap-3 border-t border-[#d7d5cd] py-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#153c2e]"
          href={`/people/${researcher.id}`}
          key={researcher.id}
        >
          <span className="grid size-10 place-items-center rounded-full bg-[#eeeae0] font-sans text-[9px]">
            {researcher.initials}
          </span>
          <strong className="font-medium">{researcher.name}</strong>
        </Link>
      ))}

      <h2 className="mt-12 mb-6 text-4xl font-medium">Recent outputs</h2>
      {areaPublications.map((publication) => (
        <Link
          className="block border-t border-[#d7d5cd] py-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#153c2e]"
          href={`/publications/${publication.id}`}
          key={publication.id}
        >
          <small className="font-sans text-[9px] text-[#153c2e]">
            {publication.type} · {publication.year}
          </small>
          <p className="mt-1 text-[15px] leading-tight">{publication.title}</p>
        </Link>
      ))}
    </aside>
  );
}
