import { Users } from "lucide-react";
import Link from "next/link";

type Publication = { type: string; venue: string; doi?: string | null };
type Researcher = { id: string; initials: string; name: string };

export function PublicationSidebar({
  publication,
  researchers,
}: {
  publication: Publication;
  researchers: Researcher[];
}) {
  const details = [
    ["Type", publication.type.charAt(0).toUpperCase() + publication.type.slice(1).toLowerCase()],
    ["Venue", publication.venue],
    ["DOI", publication.doi || "Added when published"],
  ];

  return (
    <aside>
      <h2 className="mb-6 flex items-center gap-3 text-4xl font-medium">
        <Users size={24} aria-hidden="true" /> Authors
      </h2>
      <ul className="flex flex-col">
        {researchers.map((person) => (
          <li key={person.id} className="border-t border-[#d7d5cd] first:border-t-0">
            <Link
              className="flex items-center gap-3 py-3 transition-colors hover:text-[#153c2e]"
              href={`/people/${person.id}`}
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#eeeae0] font-sans text-[9px]">
                {person.initials}
              </span>
              <span className="text-lg font-medium">{person.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <h2 className="mt-12 mb-6 text-4xl font-medium">Publication details</h2>
      <dl>
        {details.map(([term, value]) => (
          <div className="border-t border-[#d7d5cd] py-3" key={term}>
            <dt className="font-sans text-[11px] text-[#405149]">{term}</dt>
            <dd className="mt-1 text-base">{value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
