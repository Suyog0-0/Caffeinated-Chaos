// src/components/projects/project-sidebar.tsx
import { Users, Handshake, Calendar } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type Project = { status: string };
type Researcher = { id: string; initials: string; name: string; photoUrl?: string | null };
type Partner = { id: string; name: string; logo_url: string | null; website: string | null };
type ProjectEvent = { id: string; title: string; event_type: string | null; start_at: string | null };

export function ProjectSidebar({
  project,
  researchers,
  leadResearchers = [],
  partners = [],
  events = [],
}: {
  project: Project;
  researchers: Researcher[];
  leadResearchers?: Researcher[];
  partners?: Partner[];
  events?: ProjectEvent[];
}) {
  return (
    <aside>
      {leadResearchers.length > 0 && (
        <>
          <h2 className="mb-6 flex items-center gap-3 text-4xl font-medium">
            <Users size={25} aria-hidden="true" /> Lead researcher{leadResearchers.length > 1 ? "s" : ""}
          </h2>
          {leadResearchers.map((person) => (
            <Card
              className="rounded-none border-0 border-t border-[#d7d5cd] bg-transparent py-0 shadow-none ring-0"
              key={person.id}
            >
              <CardContent className="p-0">
                <Link
                  className="flex items-center gap-3 py-3 transition-colors hover:bg-[#f6f3eb]"
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
                  <b className="font-medium">{person.name}</b>
                </Link>
              </CardContent>
            </Card>
          ))}
        </>
      )}

      <h2 className={`mb-6 flex items-center gap-3 text-4xl font-medium ${leadResearchers.length > 0 ? "mt-12" : ""}`}>
        <Users size={25} aria-hidden="true" /> Project team
      </h2>
      {researchers.map((person) => (
        <Card
          className="rounded-none border-0 border-t border-[#d7d5cd] bg-transparent py-0 shadow-none ring-0"
          key={person.id}
        >
          <CardContent className="p-0">
            <Link
              className="flex items-center gap-3 py-3 transition-colors hover:bg-[#f6f3eb]"
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
              <b className="font-medium">{person.name}</b>
            </Link>
          </CardContent>
        </Card>
      ))}
      <h2 className="mt-12 mb-6 text-4xl font-medium">Current status</h2>
      <Badge className="rounded-none bg-[#eeeae0] px-3 py-2 font-sans text-[11px] font-normal text-[#17251f]">
        {project.status}
      </Badge>

      {partners.length > 0 && (
        <>
          <h2 className="mt-12 mb-6 flex items-center gap-3 text-4xl font-medium">
            <Handshake size={25} aria-hidden="true" /> Partners
          </h2>
          {partners.map((partner) => (
            <Card
              className="rounded-none border-0 border-t border-[#d7d5cd] bg-transparent py-0 shadow-none ring-0"
              key={partner.id}
            >
              <CardContent className="p-0">
                {partner.website ? (
                  <a
                    className="flex items-center gap-3 py-3 transition-colors hover:bg-[#f6f3eb]"
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <PartnerLogo partner={partner} />
                    <b className="font-medium">{partner.name}</b>
                  </a>
                ) : (
                  <div className="flex items-center gap-3 py-3">
                    <PartnerLogo partner={partner} />
                    <b className="font-medium">{partner.name}</b>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </>
      )}

      {events.length > 0 && (
        <>
          <h2 className="mt-12 mb-6 flex items-center gap-3 text-4xl font-medium">
            <Calendar size={25} aria-hidden="true" /> Related events
          </h2>
          {events.map((event) => (
            <Card
              className="rounded-none border-0 border-t border-[#d7d5cd] bg-transparent py-0 shadow-none ring-0"
              key={event.id}
            >
              <CardContent className="p-0">
                <Link className="block py-3 transition-colors hover:bg-[#f6f3eb]" href={`/events/${event.id}`}>
                  <b className="font-medium">{event.title}</b>
                  {event.start_at && (
                    <p className="text-sm text-[#405149]">
                      {new Date(event.start_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                    </p>
                  )}
                </Link>
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </aside>
  );
}

function PartnerLogo({ partner }: { partner: Partner }) {
  if (partner.logo_url) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img alt="" className="size-12 shrink-0 rounded-full object-cover" src={partner.logo_url} />
    );
  }
  const initials = partner.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  return (
    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#eeeae0] font-sans text-[10px]">
      {initials}
    </span>
  );
}