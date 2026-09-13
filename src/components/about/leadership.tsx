// src/components/about/leadership.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createServerClient } from "@/supabase/server";

interface LeadershipRow {
  id: string;
  name: string;
  position: string | null;
  biography: string | null;
  photo_url: string | null;
}

interface LeadershipPerson {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  photoUrl: string | null;
  initials: string;
  linkText: string;
  href: string;
}

const MAX_PEOPLE = 3;

// Ordered by seniority signal in `position` text. There's no dedicated
// "is_leadership" column on `researcher`, so this section is populated by
// matching on title text — earlier patterns in this list outrank later ones
// when picking who appears, so department heads surface before professors.
const TITLE_PRIORITY: RegExp[] = [
  /director/i,
  /\bhead\b/i,
  /\blead\b/i,
  /chair/i,
  /advisor/i,
  /professor/i,
  /fellow/i,
];

function titlePriority(position: string): number {
  const rank = TITLE_PRIORITY.findIndex((pattern) => pattern.test(position));
  return rank === -1 ? TITLE_PRIORITY.length : rank;
}

function linkFor(position: string): { linkText: string; href: string } {
  if (/ethic/i.test(position)) return { linkText: "Ethics Standards", href: "/ethics" };
  if (/partner/i.test(position)) return { linkText: "Partner Enquiries", href: "/partners" };
  return { linkText: "View Publications", href: "/publications" };
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

async function getLeadership(): Promise<LeadershipPerson[]> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("researcher")
    .select("id, name, position, biography, photo_url")
    .eq("publish_status", "published")
    .order("name", { ascending: true })
    .returns<LeadershipRow[]>();

  if (error) {
    console.error("Leadership: failed to load researchers:", error.message);
    return [];
  }
  if (!data) return [];

  return data
    .filter((row): row is LeadershipRow & { position: string } =>
      Boolean(row.position && titlePriority(row.position) < TITLE_PRIORITY.length),
    )
    .sort((a, b) => titlePriority(a.position) - titlePriority(b.position) || a.name.localeCompare(b.name))
    .slice(0, MAX_PEOPLE)
    .map((row) => ({
      id: row.id,
      name: row.name,
      role: row.position,
      bio: row.biography,
      photoUrl: row.photo_url,
      initials: getInitials(row.name),
      ...linkFor(row.position),
    }));
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#47c97e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d2a20] rounded-sm";

export async function Leadership() {
  const people = await getLeadership();

  if (people.length === 0) return null;

  return (
    <section className="bg-[#0d2a20] py-20 text-white">
      <div className="mx-auto w-[min(calc(100%_-_48px),1240px)] max-sm:w-[calc(100%_-_32px)]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-3 font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#47c97e]">
              Leadership &amp; Governance
            </p>
            <h2 className="max-w-xl text-[40px] leading-[1.1] font-medium max-sm:text-[30px]">
              Guided by researchers and educators.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[#b7c6be]">
            Faculty chairs and lab leads committed to high academic rigor and societal utility.
          </p>
        </div>

        <ul className="grid grid-cols-3 gap-px overflow-hidden rounded-sm bg-[#173e2e] max-sm:grid-cols-1">
          {people.map((person) => (
            <li key={person.id} className="bg-[#0d2a20]">
              <Link
                href={person.href}
                className={`group flex h-full flex-col gap-5 p-7 transition-colors hover:bg-[#103327] ${focusRing}`}
              >
                <div className="flex items-center gap-3">
                  {person.photoUrl ? (
                    // Arbitrary admin-provided URL, not covered by
                    // next.config.ts's remote image allowlist — plain <img>,
                    // same convention used for researcher photos elsewhere.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={person.photoUrl}
                      alt={person.name}
                      className="size-12 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="grid size-12 shrink-0 place-items-center rounded-full border border-[#173e2e] bg-[#103327] font-sans text-sm text-[#47c97e]"
                    >
                      {person.initials}
                    </span>
                  )}
                  <div className="min-w-0">
                    <h3 className="truncate text-[17px] font-medium leading-tight">{person.name}</h3>
                    <p className="truncate font-sans text-[11px] font-bold uppercase tracking-wider text-[#47c97e]">
                      {person.role}
                    </p>
                  </div>
                </div>

                {person.bio && (
                  <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-[#b7c6be]">
                    {person.bio}
                  </p>
                )}

                <span className="inline-flex items-center gap-1.5 font-sans text-xs font-medium text-[#47c97e] transition-colors group-hover:text-white">
                  {person.linkText}
                  <ArrowRight
                    size={14}
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}