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

const TITLE_PRIORITY: readonly RegExp[] = [
  /director/i,
  /\bhead\b/i,
  /\blead\b/i,
  /chair/i,
  /advisor/i,
  /professor/i,
  /fellow/i,
];

function getTitlePriority(position: string): number {
  const priority = TITLE_PRIORITY.findIndex((pattern) =>
    pattern.test(position),
  );

  return priority === -1 ? TITLE_PRIORITY.length : priority;
}

function getLeadershipLink(
  position: string,
): Pick<LeadershipPerson, "linkText" | "href"> {
  if (/ethic/i.test(position)) {
    return {
      linkText: "Ethics Standards",
      href: "/ethics",
    };
  }

  if (/partner/i.test(position)) {
    return {
      linkText: "Partner Enquiries",
      href: "/partners",
    };
  }

  return {
    linkText: "View Publications",
    href: "/publications",
  };
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  return parts
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
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
    console.error(
      "Leadership: failed to load researchers:",
      error.message,
    );

    return [];
  }

  const leadershipRows = (data ?? [])
    .filter(
      (row): row is LeadershipRow & { position: string } =>
        typeof row.position === "string" &&
        row.position.trim().length > 0 &&
        getTitlePriority(row.position) < TITLE_PRIORITY.length,
    )
    .sort((a, b) => {
      const priorityDifference =
        getTitlePriority(a.position) - getTitlePriority(b.position);

      if (priorityDifference !== 0) {
        return priorityDifference;
      }

      return a.name.localeCompare(b.name);
    })
    .slice(0, MAX_PEOPLE);

  return leadershipRows.map((row) => ({
    id: row.id,
    name: row.name,
    role: row.position,
    bio: row.biography,
    photoUrl: row.photo_url,
    initials: getInitials(row.name),
    ...getLeadershipLink(row.position),
  }));
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#47c97e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d2a20]";

export async function Leadership() {
  const people = await getLeadership();

  if (people.length === 0) {
    return null;
  }

  return (
    <section
      className="bg-[#0d2a20] py-16 text-white sm:py-20 lg:py-24"
      aria-labelledby="leadership-title"
    >
      <div className="mx-auto w-[min(calc(100%_-_48px),1240px)] max-sm:w-[calc(100%_-_32px)]">
        <div className="mb-10 grid gap-8 border-b border-white/10 pb-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12 lg:pb-10">
          <div className="max-w-3xl">
            <div className="mb-5 flex items-center gap-3 text-[#47c97e]">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-[#47c97e]"
              />

              <p className="font-sans text-xs font-bold uppercase tracking-[0.16em]">
                Leadership &amp; Governance
              </p>
            </div>

            <h2
              id="leadership-title"
              className="max-w-2xl text-[clamp(2.25rem,4.5vw,3.75rem)] font-normal leading-[1.02] tracking-[-0.035em]"
            >
              Guided by researchers and educators.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-[#b7c6be] lg:pb-1 lg:text-right">
            Faculty chairs and lab leads committed to high academic rigor and
            societal utility.
          </p>
        </div>

        <ul className="grid border border-[#173e2e] lg:grid-cols-3">
          {people.map((person, index) => (
            <li
              key={person.id}
              className={[
                "min-w-0",
                index > 0 ? "border-t border-[#173e2e] lg:border-t-0" : "",
                index > 0 ? "lg:border-l" : "",
              ].join(" ")}
            >
              <Link
                href={person.href}
                className={`group flex min-h-full flex-col p-6 transition-colors duration-200 hover:bg-[#103327] sm:p-7 lg:p-8 ${focusRing}`}
              >
                <div className="flex items-center gap-4">
                  {person.photoUrl ? (
                    // Researcher photo URLs are admin-provided and may come
                    // from origins that are not included in next.config.ts.
                    // Keep the existing native <img> approach until an image
                    // host allowlist is established application-wide.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={person.photoUrl}
                      alt=""
                      width={56}
                      height={56}
                      className="size-14 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="grid size-14 shrink-0 place-items-center rounded-full border border-[#28503f] bg-[#103327] font-sans text-sm font-medium text-[#47c97e]"
                    >
                      {person.initials}
                    </span>
                  )}

                  <div className="min-w-0">
                    <h3 className="truncate text-base font-medium tracking-[-0.01em] text-white sm:text-[17px]">
                      {person.name}
                    </h3>

                    <p className="mt-1 truncate font-sans text-[10px] font-bold uppercase tracking-[0.13em] text-[#47c97e] sm:text-[11px]">
                      {person.role}
                    </p>
                  </div>
                </div>

                <div className="mt-7 flex flex-1 flex-col">
                  {person.bio ? (
                    <p className="line-clamp-4 max-w-xl text-sm leading-7 text-[#b7c6be]">
                      {person.bio}
                    </p>
                  ) : (
                    <p className="text-sm leading-7 text-[#71867d]">
                      Academic and research leadership within the R&amp;D
                      community.
                    </p>
                  )}

                  <span className="mt-8 inline-flex min-h-11 items-center gap-2 self-start font-sans text-xs font-semibold text-[#47c97e] transition-colors duration-200 group-hover:text-white">
                    <span>{person.linkText}</span>

                    <ArrowRight
                      size={14}
                      strokeWidth={1.75}
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
