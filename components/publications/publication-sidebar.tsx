import { Users } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

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
    ["Type", publication.type],
    ["Venue", publication.venue],
    ["DOI", publication.doi || "Added when published"],
  ];

  return (
    <aside>
      <h2 className="mb-6 flex items-center gap-3 text-4xl font-medium">
        <Users size={24} aria-hidden="true" /> Authors
      </h2>
      {researchers.map((person) => (
        <Card
          className="rounded-none border-0 border-t border-[#d7d5cd] bg-transparent py-0 shadow-none"
          key={person.id}
        >
          <CardContent className="p-0">
            <Link
              className="flex items-center gap-3 py-3 transition-colors hover:bg-[#f6f3eb]"
              href={`/people/${person.id}`}
            >
              <span className="grid size-10 place-items-center rounded-full bg-[#eeeae0] font-sans text-[9px]">
                {person.initials}
              </span>
              <b className="font-medium">{person.name}</b>
            </Link>
          </CardContent>
        </Card>
      ))}
      <h2 className="mt-12 mb-6 text-4xl font-medium">Publication details</h2>
      <dl>
        {details.map(([term, value]) => (
          <div className="border-t border-[#d7d5cd] py-3" key={term}>
            <dt className="font-sans text-[9px] text-[#405149]">{term}</dt>
            <dd className="mt-1 text-[15px]">{value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
