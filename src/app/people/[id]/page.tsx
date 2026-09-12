import { notFound } from "next/navigation";
import { createClient } from "@/supabase/client";
import Link from "next/link";

export default async function ResearcherProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createClient();

  const { data: p } = await supabase
    .from("researcher")
    .select(`
      id, name, department, position, biography, orcid,
      researcher_research_area(research_area(name)),
      project_researcher(project(slug, status, title, description)),
      publication_author(publication(id, title, publication_type, year))
    `)
    .eq("id", id)
    .eq("publish_status", "published")
    .single();

  if (!p) notFound();

  // Parse areas
  const areas = (p.researcher_research_area as unknown as { research_area: { name: string } }[])
    ?.map(rra => rra.research_area?.name)
    .filter(Boolean) ?? [];
  const primaryArea = areas[0] ?? "—";

  type ProjRow = { project: { slug: string; status: string; title: string; description: string | null } };
  const currentProjects = (p.project_researcher as unknown as ProjRow[])
    .map(pr => pr.project)
    .filter(proj => proj && proj.status !== 'archived')
    .map(proj => ({
      slug: proj.slug,
      status: proj.status,
      title: proj.title,
      summary: proj.description ?? "",
    }));

  type PubRow = { publication: { id: string; title: string; publication_type: string | null; year: number | null } };
  const publications = (p.publication_author as unknown as PubRow[])
    .map(pa => pa.publication)
    .filter(Boolean)
    .map(pub => ({
      id: pub.id,
      title: pub.title,
      type: pub.publication_type ?? "Publication",
      year: pub.year ?? 0,
    }));

  const initials = p.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="bg-[#FBF9F5] text-[#1A2420] font-sans antialiased selection:bg-[#E8EFEA] selection:text-[#0F2D24] min-h-screen flex flex-col">
      {/* Breadcrumb — matching project slug style */}
      <div className="mx-auto w-[min(calc(100%_-_48px),1240px)] max-sm:w-[calc(100%_-_32px)] pt-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-sans text-sm text-[#405149]">
          <Link className="text-[#153c2e] font-semibold hover:underline underline-offset-4" href="/people">
            People
          </Link>
          <span aria-hidden="true" className="text-[#87918c]">›</span>
          <span className="truncate max-w-[40ch]">{p.name}</span>
        </nav>
      </div>

      <main className="flex-grow mx-auto w-[min(calc(100%_-_48px),1240px)] max-sm:w-[calc(100%_-_32px)] py-10">
        {/* HeroProfileHeader */}
        <section className="pb-10 border-b border-[#E6DFD5]">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
              <div className="relative flex-shrink-0">
                <div aria-label={`${p.name} Monogram`} className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#374151] text-white flex items-center justify-center font-serif text-3xl sm:text-4xl font-normal tracking-wider shadow-inner">
                  {initials}
                </div>
              </div>
              <div className="space-y-2.5">
                <p className="text-xs text-[#6B7280] font-medium">{p.department ?? "Department"}</p>
                <h1 className="font-serif font-medium text-4xl sm:text-5xl lg:text-6xl text-[#0F2D24] tracking-tight leading-none" style={{ fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"', letterSpacing: '-0.02em' }}>
                  {p.name}
                </h1>
                <p className="text-base sm:text-lg text-[#637068] font-normal pt-1">
                  {p.position ?? "Researcher"} <span className="text-[#CDC3B4] px-1">·</span> <span className="text-[#1A2420] font-medium">{primaryArea}</span>
                </p>
                <div className="flex flex-wrap gap-y-2 gap-x-4 pt-1 text-xs text-[#637068]">
                  {p.orcid && (
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-[#0F2D24]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                      <a href={`https://orcid.org/${p.orcid}`} target="_blank" rel="noopener noreferrer" className="text-[#0F2D24] hover:underline font-mono text-[11px] cursor-pointer">{p.orcid}</a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MainContentGrid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 pt-10">
          {/* LEFT COLUMN */}
          <section className="lg:col-span-8 space-y-12">
            <article className="space-y-4">
              <div className="border-b border-[#E6DFD5] pb-2 flex items-baseline justify-between">
                <h2 className="font-serif text-3xl text-[#0F2D24] tracking-tight">Biography</h2>
                <span className="text-xs uppercase tracking-widest text-[#637068] font-medium">Curriculum Excerpt</span>
              </div>
              <div className="prose max-w-none text-[#1A2420] text-base leading-relaxed space-y-4">
                <p className="text-sm sm:text-base text-stone-700 whitespace-pre-wrap">
                  {p.biography ?? "No biography available."}
                </p>
              </div>
            </article>

            {currentProjects.length > 0 && (
              <article className="space-y-6">
                <div className="border-b border-[#E6DFD5] pb-2 flex items-baseline justify-between">
                  <h2 className="font-serif text-3xl text-[#0F2D24] tracking-tight">Current projects</h2>
                </div>
                <div className="space-y-4">
                  {currentProjects.map(proj => (
                    <Link key={proj.slug} href={`/projects/${proj.slug}`} className="block">
                      <div className="p-6 bg-white border border-[#E6DFD5] rounded hover:border-[#CDC3B4] transition duration-200 shadow-sm cursor-pointer">
                        <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#0F2D24] hover:text-[#0B231B] transition">
                          {proj.title}
                        </h3>
                        <p className="text-sm text-stone-700 mt-2 leading-relaxed">
                          {proj.summary}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </article>
            )}

            {publications.length > 0 && (
              <article className="space-y-6">
                <div className="border-b border-[#E6DFD5] pb-2 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                  <h2 className="font-serif text-3xl text-[#0F2D24] tracking-tight">Selected publications</h2>
                </div>
                <div className="divide-y divide-[#E6DFD5]">
                  {publications.map(pub => (
                    <div key={pub.id} className="py-5 first:pt-2 space-y-2 group cursor-pointer">
                      <div className="flex items-center gap-2 text-xs text-[#637068]">
                        <span className="font-semibold text-[#0F2D24] tracking-wide uppercase">{pub.type}</span>
                        <span>·</span>
                        <span className="font-medium text-[#0F2D24]">{pub.year}</span>
                      </div>
                      <h4 className="font-serif text-xl text-[#0F2D24] transition leading-snug font-medium">
                        {pub.title}
                      </h4>
                    </div>
                  ))}
                </div>
              </article>
            )}
          </section>

          {/* RIGHT SIDEBAR */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="space-y-6">
              <div className="border-b border-[#E6DFD5] pb-2">
                <h2 className="font-serif text-3xl text-[#0F2D24] tracking-tight">Profile</h2>
              </div>
              <div className="space-y-4 text-xs">
                {p.orcid && (
                  <div className="border-b border-[#E6DFD5] pb-3">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#637068] block mb-1">ORCID ID</span>
                    <a className="font-mono text-sm text-[#0F2D24] hover:underline flex items-center gap-1.5 font-medium group cursor-pointer" href={`https://orcid.org/${p.orcid}`} rel="noopener noreferrer" target="_blank">
                      <span>{p.orcid}</span>
                    </a>
                  </div>
                )}
                <div className="border-b border-[#E6DFD5] pb-3">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#637068] block mb-1">Primary Research Area</span>
                  <p className="text-sm font-medium text-[#0F2D24]">
                    {primaryArea}
                  </p>
                </div>
                <div className="border-b border-[#E6DFD5] pb-3">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#637068] block mb-1">Publications in Hub Registry</span>
                  <p className="text-2xl font-serif font-medium text-[#0F2D24]">
                    {publications.length}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs uppercase font-mono tracking-wider text-[#637068]">Subject Taxonomy & Keywords</h3>
                <div className="flex flex-wrap gap-1.5">
                  {areas.map(area => (
                    <span key={area} className="text-xs px-2.5 py-1 bg-white border border-[#E6DFD5] rounded text-[#1A2420]">{area}</span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
