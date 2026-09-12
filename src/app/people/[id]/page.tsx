// src/app/people/[id]/page.tsx
import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Mail, GraduationCap, ArrowUpRight } from "lucide-react";
import { createServerClient } from "@/supabase/server";

// Public profile content doesn't need to be re-fetched on every request;
// cache the rendered page for 5 minutes per researcher id.
export const revalidate = 300;

type PageParams = { params: Promise<{ id: string }> };

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface ResearchAreaRef {
  research_area: { name: string } | null;
}

interface ProjectRef {
  slug: string;
  status: string;
  title: string;
  description: string | null;
}

interface ProjectResearcherRef {
  project: ProjectRef | null;
}

interface PublicationAuthorRef {
  researcher: { name: string } | null;
}

interface PublicationRef {
  id: string;
  title: string;
  publication_type: string | null;
  year: number | null;
  publication_author: PublicationAuthorRef[];
}

interface PublicationAuthorshipRef {
  publication: PublicationRef | null;
}

interface ResearcherProfileRow {
  id: string;
  name: string;
  department: string | null;
  position: string | null;
  biography: string | null;
  orcid: string | null;
  photo_url: string | null;
  email: string | null;
  google_scholar_url: string | null;
  researcher_research_area: ResearchAreaRef[];
  project_researcher: ProjectResearcherRef[];
  publication_author: PublicationAuthorshipRef[];
}

// Wrapped in React's cache() so generateMetadata and the page component share
// a single Supabase round trip per request instead of fetching twice.
const getResearcherProfile = cache(async (id: string) => {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("researcher")
    .select(
      `
      id, name, department, position, biography, orcid, photo_url, email, google_scholar_url,
      researcher_research_area ( research_area ( name ) ),
      project_researcher ( project ( slug, status, title, description ) ),
      publication_author ( publication ( id, title, publication_type, year, publication_author ( researcher ( name ) ) ) )
    `,
    )
    .eq("id", id)
    .eq("publish_status", "published")
    .single<ResearcherProfileRow>();

  if (error || !data) return null;
  return data;
});

// ---------------------------------------------------------------------------
// Pure helpers (no re-render cost, easy to unit test in isolation)
// ---------------------------------------------------------------------------

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getResearchAreas(row: ResearcherProfileRow): string[] {
  return row.researcher_research_area
    .map((entry) => entry.research_area?.name)
    .filter((name): name is string => Boolean(name));
}

function getProjects(row: ResearcherProfileRow) {
  return row.project_researcher
    .map((entry) => entry.project)
    .filter((project): project is ProjectRef => Boolean(project))
    .map((project) => ({
      slug: project.slug,
      status: project.status,
      title: project.title,
      summary: project.description ?? "",
    }));
}

function getPublications(row: ResearcherProfileRow) {
  return row.publication_author
    .map((entry) => entry.publication)
    .filter((publication): publication is PublicationRef => Boolean(publication))
    .map((publication) => ({
      id: publication.id,
      title: publication.title,
      type: publication.publication_type ?? "Publication",
      year: publication.year,
      authors: publication.publication_author
        .map((author) => author.researcher?.name)
        .filter((name): name is string => Boolean(name))
        .join(", "),
    }));
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { id } = await params;
  const researcher = await getResearcherProfile(id);

  if (!researcher) {
    return { title: "Researcher not found | Islington Research" };
  }

  const role = researcher.position ?? "Researcher";
  const description =
    researcher.biography?.slice(0, 155) ??
    `${role}${researcher.department ? ` in ${researcher.department}` : ""} at Islington Research.`;

  return {
    title: `${researcher.name} | Islington Research`,
    description,
  };
}

// ---------------------------------------------------------------------------
// Shared class fragments (kept local to this file — not reused elsewhere yet)
// ---------------------------------------------------------------------------

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2D24] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF9F5] rounded-sm";

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function ResearcherProfilePage({ params }: PageParams) {
  const { id } = await params;
  const researcher = await getResearcherProfile(id);

  if (!researcher) notFound();

  const areas = getResearchAreas(researcher);
  const primaryArea = areas[0] ?? null;
  const projects = getProjects(researcher);
  const publications = getPublications(researcher);
  const initials = getInitials(researcher.name);

  return (
    <div className="flex min-h-screen flex-col bg-[#FBF9F5] font-sans text-[#1A2420] antialiased selection:bg-[#E8EFEA] selection:text-[#0F2D24]">
      {/* Breadcrumb */}
      <div className="mx-auto w-[min(calc(100%_-_48px),1240px)] pt-6 max-sm:w-[calc(100%_-_32px)]">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-sans text-sm text-[#405149]">
          <Link
            className={`font-semibold text-[#153c2e] hover:underline underline-offset-4 ${focusRing}`}
            href="/people"
          >
            People
          </Link>
          <span aria-hidden="true" className="text-[#87918c]">
            ›
          </span>
          <span className="max-w-[40ch] truncate" aria-current="page">
            {researcher.name}
          </span>
        </nav>
      </div>

      <main className="mx-auto w-[min(calc(100%_-_48px),1240px)] flex-grow py-10 max-sm:w-[calc(100%_-_32px)]">
        {/* Hero */}
        <section className="border-b border-[#E6DFD5] pb-10">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:gap-8">
            <div className="relative shrink-0">
              {researcher.photo_url ? (
                // Arbitrary admin-provided URL, not in next.config.ts's allowed
                // remote image hosts — plain <img>, same convention used for
                // researcher photos elsewhere in the app (event speakers, etc).
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={researcher.photo_url}
                  alt={researcher.name}
                  className="h-28 w-28 rounded-full object-cover shadow-inner sm:h-36 sm:w-36"
                />
              ) : (
                <div
                  role="img"
                  aria-label={`${researcher.name} avatar`}
                  className="flex h-28 w-28 items-center justify-center rounded-full bg-[#0F2D24] font-serif text-3xl font-normal tracking-wider text-white shadow-inner sm:h-36 sm:w-36 sm:text-4xl"
                >
                  {initials}
                </div>
              )}
            </div>

            <div className="space-y-2.5">
              {researcher.department && (
                <p className="text-xs font-medium uppercase tracking-wider text-[#6B7280]">
                  {researcher.department}
                </p>
              )}
              <h1
                className="font-serif text-4xl font-medium leading-none tracking-tight text-[#0F2D24] sm:text-5xl lg:text-6xl"
                style={{ fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"', letterSpacing: "-0.02em" }}
              >
                {researcher.name}
              </h1>
              <p className="pt-1 text-base font-normal text-[#637068] sm:text-lg">
                {researcher.position ?? "Researcher"}
                {primaryArea && (
                  <>
                    <span className="px-1 text-[#CDC3B4]">·</span>
                    <span className="font-medium text-[#1A2420]">{primaryArea}</span>
                  </>
                )}
              </p>

              {(researcher.orcid || researcher.email || researcher.google_scholar_url) && (
                <ul className="flex flex-wrap gap-x-4 gap-y-2 pt-1 text-xs text-[#637068]">
                  {researcher.orcid && (
                    <li className="flex items-center gap-1.5">
                      <svg
                        className="h-4 w-4 text-[#0F2D24]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.8"
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        />
                      </svg>
                      <a
                        href={`https://orcid.org/${researcher.orcid}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`font-mono text-[11px] text-[#0F2D24] hover:underline ${focusRing}`}
                      >
                        {researcher.orcid}
                        <span className="sr-only"> (opens ORCID profile in a new tab)</span>
                      </a>
                    </li>
                  )}
                  {researcher.email && (
                    <li className="flex items-center gap-1.5">
                      <Mail className="h-4 w-4 text-[#0F2D24]" aria-hidden="true" />
                      <a
                        href={`mailto:${researcher.email}`}
                        className={`font-mono text-[11px] text-[#0F2D24] hover:underline ${focusRing}`}
                      >
                        {researcher.email}
                      </a>
                    </li>
                  )}
                  {researcher.google_scholar_url && (
                    <li className="flex items-center gap-1.5">
                      <GraduationCap className="h-4 w-4 text-[#0F2D24]" aria-hidden="true" />
                      <a
                        href={researcher.google_scholar_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`font-mono text-[11px] text-[#0F2D24] hover:underline ${focusRing}`}
                      >
                        Google Scholar
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  )}
                </ul>
              )}
            </div>
          </div>
        </section>

        {/* Main content grid */}
        <div className="grid grid-cols-1 gap-10 pt-10 sm:gap-14 lg:grid-cols-12">
          {/* Left column */}
          <section className="space-y-12 lg:col-span-8">
            <article className="space-y-4">
              <div className="flex items-baseline justify-between border-b border-[#E6DFD5] pb-2">
                <h2 className="font-serif text-4xl tracking-tight text-[#0F2D24]">Biography</h2>
                <span className="text-xs font-medium uppercase tracking-widest text-[#637068]">
                  Curriculum Excerpt
                </span>
              </div>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#405149] sm:text-base">
                {researcher.biography ?? "No biography available yet."}
              </p>
            </article>

            {projects.length > 0 && (
              <article className="space-y-6">
                <h2 className="border-b border-[#E6DFD5] pb-2 font-serif text-3xl tracking-tight text-[#0F2D24]">
                  Projects
                </h2>
                <ul className="space-y-4">
                  {projects.map((project) => (
                    <li key={project.slug}>
                      <Link
                        href={`/projects/${project.slug}`}
                        className={`block rounded border border-[#E6DFD5] bg-white p-6 shadow-sm transition duration-200 hover:border-[#CDC3B4] ${focusRing}`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="font-serif text-xl font-medium text-[#0F2D24] sm:text-2xl">
                            {project.title}
                          </h3>
                          <span className="shrink-0 rounded border border-[#E6DFD5] px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-[#637068]">
                            {project.status}
                          </span>
                        </div>
                        {project.summary && (
                          <p className="mt-2 text-sm leading-relaxed text-[#405149]">{project.summary}</p>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            )}

            {publications.length > 0 && (
              <article className="space-y-6">
                <h2 className="border-b border-[#E6DFD5] pb-2 font-serif text-4xl tracking-tight text-[#0F2D24]">
                  Selected publications
                </h2>
                <ul className="divide-y divide-[#E6DFD5]">
                  {publications.map((publication) => (
                    <li key={publication.id}>
                      <Link
                        href={`/publications/${publication.id}`}
                        className={`group block space-y-2 py-5 first:pt-2 ${focusRing}`}
                      >
                        <div className="flex items-center gap-2 text-xs text-[#637068]">
                          <span className="font-semibold uppercase tracking-wide text-[#0F2D24]">
                            {publication.type}
                          </span>
                          {publication.year && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="font-medium text-[#0F2D24]">{publication.year}</span>
                            </>
                          )}
                        </div>
                        <h3 className="flex items-center gap-2 font-serif text-xl font-medium leading-snug text-[#0F2D24] transition-colors group-hover:text-[#0B231B]">
                          {publication.title}
                          <ArrowUpRight
                            className="opacity-0 transition-opacity group-hover:opacity-100"
                            size={17}
                            aria-hidden="true"
                          />
                        </h3>
                        {publication.authors && (
                          <p className="text-sm text-[#637068]">{publication.authors}</p>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            )}
          </section>

          {/* Right sidebar */}
          <aside className="space-y-8 lg:col-span-4" aria-label="Profile details">
            <div className="space-y-6">
              <h2 className="border-b border-[#E6DFD5] pb-2 font-serif text-3xl tracking-tight text-[#0F2D24]">
                Profile
              </h2>
              <dl className="space-y-4 text-xs">
                {researcher.orcid && (
                  <div className="border-b border-[#E6DFD5] pb-3">
                    <dt className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-[#637068]">
                      ORCID ID
                    </dt>
                    <dd>
                      <a
                        href={`https://orcid.org/${researcher.orcid}`}
                        rel="noopener noreferrer"
                        target="_blank"
                        className={`font-mono text-sm font-medium text-[#0F2D24] hover:underline ${focusRing}`}
                      >
                        {researcher.orcid}
                      </a>
                    </dd>
                  </div>
                )}
                {researcher.email && (
                  <div className="border-b border-[#E6DFD5] pb-3">
                    <dt className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-[#637068]">
                      Email
                    </dt>
                    <dd>
                      <a
                        href={`mailto:${researcher.email}`}
                        className={`flex items-center gap-1.5 font-mono text-sm font-medium text-[#0F2D24] hover:underline ${focusRing}`}
                      >
                        <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                        {researcher.email}
                      </a>
                    </dd>
                  </div>
                )}
                {researcher.google_scholar_url && (
                  <div className="border-b border-[#E6DFD5] pb-3">
                    <dt className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-[#637068]">
                      Google Scholar
                    </dt>
                    <dd>
                      <a
                        href={researcher.google_scholar_url}
                        rel="noopener noreferrer"
                        target="_blank"
                        className={`flex items-center gap-1.5 font-mono text-sm font-medium text-[#0F2D24] hover:underline ${focusRing}`}
                      >
                        <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
                        View profile
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </dd>
                  </div>
                )}
                <div className="border-b border-[#E6DFD5] pb-3">
                  <dt className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-[#637068]">
                    Primary research area
                  </dt>
                  <dd className="text-sm font-medium text-[#0F2D24]">{primaryArea ?? "Not specified"}</dd>
                </div>
                <div className="pb-1">
                  <dt className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-[#637068]">
                    Publications in hub registry
                  </dt>
                  <dd className="font-serif text-2xl font-medium text-[#0F2D24]">{publications.length}</dd>
                </div>
              </dl>
            </div>

            {areas.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#637068]">
                  Subject taxonomy &amp; keywords
                </h3>
                <ul className="flex flex-wrap gap-1.5">
                  {areas.map((area) => (
                    <li
                      key={area}
                      className="rounded border border-[#E6DFD5] bg-white px-2.5 py-1 text-xs text-[#1A2420]"
                    >
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}
