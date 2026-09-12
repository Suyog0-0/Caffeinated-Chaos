import { Users } from "lucide-react";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
});

const sectionHeading =
  "font-serif text-4xl font-medium tracking-tight text-[#0F2D24]";

type Publication = { type: string; venue: string; doi?: string | null };
type Researcher = { id: string; initials: string; name: string; photoUrl?: string | null };

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
    <aside className={inter.className}>
      <h2 className={`${sectionHeading} mb-6 flex items-center gap-3`}>
        <Users size={24} aria-hidden="true" /> Authors
      </h2>
      <ul className="flex flex-col">
        {researchers.map((person) => (
          <li key={person.id} className="border-t border-[#d7d5cd] first:border-t-0">
            <Link
              className="flex items-center gap-3 py-3 transition-colors hover:text-[#153c2e]"
              href={`/people/${person.id}`}
            >
              {person.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  alt=""
                  className="size-12 shrink-0 rounded-full object-cover"
                  src={person.photoUrl}
                />
              ) : (
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#eeeae0] font-sans text-[10px]">
                  {person.initials}
                </span>
              )}
              <span className="text-lg font-medium">{person.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <h2 className={`${sectionHeading} mt-12 mb-6`}>Publication details</h2>
      <dl>
        {details.map(([term, value]) => (
          <div className="border-t border-[#d7d5cd] py-3" key={term}>
            <dt className="text-[11px] font-semibold text-[#405149]">{term}</dt>
            <dd className="mt-1 text-base">{value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
