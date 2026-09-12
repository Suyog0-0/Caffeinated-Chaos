import { Users } from "lucide-react";
import Link from "next/link";

type Researcher = { id: string; initials: string; name: string; photoUrl?: string | null };
type Publication = { id: string; type: string; year: number; title: string };

export function ResearchAreaSidebar({
  researchers,
  publications,
}: {
  researchers: Researcher[];
  publications: Publication[];
}) {
  return (
    <aside>
      <h2 className="mb-6 flex items-center gap-3 text-4xl font-medium">
        <Users size={24} aria-hidden="true" /> People
      </h2>
      <ul className="flex flex-col">
        {researchers.map((researcher) => (
          <li key={researcher.id} className="border-t border-[#d7d5cd] first:border-t-0">
            <Link
              className="flex items-center gap-3 py-3 transition-colors hover:text-[#153c2e]"
              href={`/people/${researcher.id}`}
            >
              {researcher.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  alt=""
                  className="size-12 shrink-0 rounded-full object-cover"
                  src={researcher.photoUrl}
                />
              ) : (
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#eeeae0] font-sans text-[10px]">
                  {researcher.initials}
                </span>
              )}
              <span className="text-lg font-medium">{researcher.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      <h2 className="mt-12 mb-6 text-4xl font-medium">Recent outputs</h2>
      {publications.map((publication) => (
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
