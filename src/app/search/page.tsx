import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { Search, ArrowRight, ChevronRight, Layers, Users, Briefcase, FileText } from "lucide-react";
import { getResearchMetrics } from "@/components/home/data/metrics";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params?.q || "";
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let results: any[] = [];
  let metrics = { researchers: 0, projects: 0, publications: 0, researchAreas: 0 };
  
  if (query) {
    const { data, error } = await supabase.rpc("search_ecosystem", {
      search_term: query,
    });
    
    if (!error && data) {
      results = data;
    } else if (error) {
      console.error("Search error:", error);
    }
  } else {
    try {
      metrics = await getResearchMetrics();
    } catch (err) {
      console.error("Failed to load metrics for empty search state:", err);
    }
  }

  // Group results
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const grouped = results.reduce((acc, result) => {
    if (!acc[result.result_type]) acc[result.result_type] = [];
    acc[result.result_type].push(result);
    return acc;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {} as Record<string, any[]>);

  const areas = grouped["research_area"] || [];
  const researchers = grouped["researcher"] || [];
  const projects = grouped["project"] || [];
  const publications = grouped["publication"] || [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getUrl = (type: string, id: string, metadata?: any) => {
    switch (type) {
      case "research_area": return `/research-areas/${metadata?.slug || id}`;
      case "researcher": return `/people/${id}`;
      case "project": return `/projects/${metadata?.slug || id}`;
      case "publication": return `/publications/${id}`;
      default: return "#";
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <main className="min-h-screen bg-[#F8F7F4] text-[#1A1A1A] font-sans pb-24" style={{ paddingTop: "120px" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-3 text-xs font-bold tracking-widest text-gray-500 uppercase mb-4">
            <span className="w-2 h-2 bg-[#0B3B24] rounded-full"></span>
            Digital Repository & Academic Index
          </div>
          <h1 className="text-5xl md:text-6xl font-serif text-[#0B3B24] mb-6">
            Search the <span className="italic font-light">Digital Hub</span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Query across specialized research clusters, researchers, empirical publications, active industry projects and events conducted across Islington R&D.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200 flex items-center mb-12">
          <div className="pl-4 text-gray-400">
            <Search size={20} />
          </div>
          <form method="GET" action="/search" className="flex-1 flex">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search for research areas, researchers, projects, publications, or events..."
              className="w-full px-4 py-3 bg-transparent focus:outline-none text-lg"
            />
            <button 
              type="submit"
              className="bg-[#0B3B24] hover:bg-[#072517] text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors cursor-pointer"
            >
              Search <ArrowRight size={18} />
            </button>
          </form>
        </div>

        {/* Zero-State: Pillar Cards + Tips (Rendered when no query) */}
        {!query && (
          <div className="flex flex-col gap-10 mb-16">
            
            {/* Browse by Records Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-[11px] font-bold tracking-widest text-gray-400 uppercase">
                    Browse Categories
                  </span>
                  <h2 className="text-2xl font-serif text-[#0B3B24] font-semibold mt-1">
                    Explore by Records
                  </h2>
                </div>
                <span className="text-xs text-gray-500 hidden sm:inline-block">
                  Select a category to view all indexed records
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Research Areas */}
                <Link
                  href="/research-areas"
                  className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#0B3B24]/40 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#0B3B24]/10 text-[#0B3B24] flex items-center justify-center mb-5 group-hover:bg-[#0B3B24] group-hover:text-white transition-colors">
                      <Layers size={22} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-serif font-semibold text-[#0B3B24] group-hover:underline">
                        Research Areas
                      </h3>
                      <span className="text-[11px] font-medium bg-[#F4F1EA] text-[#405149] px-2.5 py-0.5 rounded-full">
                        {metrics.researchAreas} clusters
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed mb-6">
                      Specialized academic disciplines, methodology clusters, and thematic research focus areas.
                    </p>
                  </div>
                  <div className="flex items-center text-xs font-semibold text-[#0B3B24] pt-4 border-t border-gray-100 gap-1 group-hover:gap-2 transition-all">
                    Browse areas <ArrowRight size={13} />
                  </div>
                </Link>

                {/* Researchers & Faculty */}
                <Link
                  href="/people"
                  className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#0B3B24]/40 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#0B3B24]/10 text-[#0B3B24] flex items-center justify-center mb-5 group-hover:bg-[#0B3B24] group-hover:text-white transition-colors">
                      <Users size={22} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-serif font-semibold text-[#0B3B24] group-hover:underline">
                        Faculty & Fellows
                      </h3>
                      <span className="text-[11px] font-medium bg-[#F4F1EA] text-[#405149] px-2.5 py-0.5 rounded-full">
                        {metrics.researchers} profiles
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed mb-6">
                      Directory of faculty investigators, academic supervisors, postdoctoral researchers, and scholars.
                    </p>
                  </div>
                  <div className="flex items-center text-xs font-semibold text-[#0B3B24] pt-4 border-t border-gray-100 gap-1 group-hover:gap-2 transition-all">
                    View directory <ArrowRight size={13} />
                  </div>
                </Link>

                {/* Active Projects */}
                <Link
                  href="/projects"
                  className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#0B3B24]/40 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#0B3B24]/10 text-[#0B3B24] flex items-center justify-center mb-5 group-hover:bg-[#0B3B24] group-hover:text-white transition-colors">
                      <Briefcase size={22} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-serif font-semibold text-[#0B3B24] group-hover:underline">
                        Active Projects
                      </h3>
                      <span className="text-[11px] font-medium bg-[#F4F1EA] text-[#405149] px-2.5 py-0.5 rounded-full">
                        {metrics.projects} active
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed mb-6">
                      Funded empirical projects, software engineering testbeds, and collaborative industrial initiatives.
                    </p>
                  </div>
                  <div className="flex items-center text-xs font-semibold text-[#0B3B24] pt-4 border-t border-gray-100 gap-1 group-hover:gap-2 transition-all">
                    Explore projects <ArrowRight size={13} />
                  </div>
                </Link>

                {/* Publications */}
                <Link
                  href="/publications"
                  className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#0B3B24]/40 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#0B3B24]/10 text-[#0B3B24] flex items-center justify-center mb-5 group-hover:bg-[#0B3B24] group-hover:text-white transition-colors">
                      <FileText size={22} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-serif font-semibold text-[#0B3B24] group-hover:underline">
                        Publications
                      </h3>
                      <span className="text-[11px] font-medium bg-[#F4F1EA] text-[#405149] px-2.5 py-0.5 rounded-full">
                        {metrics.publications} papers
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed mb-6">
                      Peer-reviewed journal articles, conference papers, technical reports, and working whitepapers.
                    </p>
                  </div>
                  <div className="flex items-center text-xs font-semibold text-[#0B3B24] pt-4 border-t border-gray-100 gap-1 group-hover:gap-2 transition-all">
                    Read publications <ArrowRight size={13} />
                  </div>
                </Link>
              </div>
            </section>

          </div>
        )}

        {/* Filters / Stats Row */}
        {query && (
          <div className="flex flex-wrap items-center justify-between gap-4 mb-16 text-sm">
            <div className="flex flex-wrap gap-2">
              <div className="bg-[#0B3B24] text-white px-5 py-2 rounded-full font-medium">
                All Results <span className="ml-1 opacity-80">{results.length}</span>
              </div>
              <div className="bg-white border border-gray-200 text-gray-600 px-5 py-2 rounded-full font-medium">
                Research Areas <span className="ml-1 opacity-50">{areas.length}</span>
              </div>
              <div className="bg-white border border-gray-200 text-gray-600 px-5 py-2 rounded-full font-medium">
                Researchers <span className="ml-1 opacity-50">{researchers.length}</span>
              </div>
              <div className="bg-white border border-gray-200 text-gray-600 px-5 py-2 rounded-full font-medium">
                Projects <span className="ml-1 opacity-50">{projects.length}</span>
              </div>
              <div className="bg-white border border-gray-200 text-gray-600 px-5 py-2 rounded-full font-medium">
                Publications <span className="ml-1 opacity-50">{publications.length}</span>
              </div>
            </div>
            <div className="text-gray-500">
              Showing {results.length} of {results.length} results
            </div>
          </div>
        )}

        {/* Results Sections */}
        {query && results.length === 0 && (
          <div className="text-center py-20 text-gray-500 text-lg font-serif">
            No results found for &quot;{query}&quot;. Please try a different term.
          </div>
        )}

        <div className="flex flex-col gap-16">
          
          {/* Research Areas */}
          {areas.length > 0 && (
            <section>
              <div className="flex justify-between items-baseline mb-6 border-b border-gray-200 pb-2">
                <h2 className="text-2xl font-serif text-[#0B3B24] flex items-center gap-3">
                  Research Areas <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-md font-sans">{areas.length} results</span>
                </h2>
                <a href="#" className="text-sm text-gray-500 hover:text-[#0B3B24] flex items-center gap-1">Explore all clusters <ArrowRight size={14}/></a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {areas.map((item: any) => (
                  <Link key={item.id} href={getUrl("research_area", item.id, item.metadata)} className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-md transition-all flex flex-col group">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-serif text-[#0B3B24] font-semibold">{item.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">{item.description}</p>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100 text-xs text-gray-500 font-medium">
                      <div className="flex gap-4">
                        <span>{item.metadata?.researcher_count || 0} Researchers</span>
                        <span>{item.metadata?.project_count || 0} Projects</span>
                      </div>
                      <ChevronRight size={14} className="text-gray-300 group-hover:text-[#0B3B24]" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Researchers */}
          {researchers.length > 0 && (
            <section>
              <div className="flex justify-between items-baseline mb-6 border-b border-gray-200 pb-2">
                <h2 className="text-2xl font-serif text-[#0B3B24] flex items-center gap-3">
                  Researchers & Faculty <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-md font-sans">{researchers.length} results</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {researchers.map((item: any) => (
                  <Link key={item.id} href={getUrl("researcher", item.id, item.metadata)} className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-md transition-all flex flex-col group">
                    <div className="w-12 h-12 bg-[#0B3B24] rounded-full flex items-center justify-center text-white font-serif text-lg mb-4">
                      {getInitials(item.title)}
                    </div>
                    <h3 className="text-lg font-serif text-[#0B3B24] font-semibold">{item.title}</h3>
                    <p className="text-gray-500 text-xs mt-1 mb-4">
                      {item.metadata?.department || 'Department'} • {item.metadata?.position || 'Faculty'}
                    </p>
                    <div className="flex gap-2 mb-6">
                      <span className="text-[10px] bg-[#F4F1EA] text-gray-600 px-2 py-1 rounded">Research Area</span>
                      <span className="text-[10px] bg-[#F4F1EA] text-gray-600 px-2 py-1 rounded">Faculty</span>
                    </div>
                    <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-100 text-xs text-gray-500 font-medium">
                      <span>{item.metadata?.project_count || 0} Projects | {item.metadata?.publication_count || 0} Papers</span>
                      <ChevronRight size={14} className="text-gray-300 group-hover:text-[#0B3B24]" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <div className="flex justify-between items-baseline mb-6 border-b border-gray-200 pb-2">
                <h2 className="text-2xl font-serif text-[#0B3B24] flex items-center gap-3">
                  Active Projects <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-md font-sans">{projects.length} results</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((item: any) => (
                  <Link key={item.id} href={getUrl("project", item.id, item.metadata)} className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-md transition-all flex flex-col group">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                        {item.metadata?.slug || 'PRJ-0000-00'}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider bg-green-50 text-green-700 px-2 py-1 rounded font-semibold border border-green-100">
                        {item.metadata?.status || 'Active'}
                      </span>
                    </div>
                    <h3 className="text-xl font-serif text-[#0B3B24] font-semibold mb-3">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2 flex-1">{item.description}</p>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100 text-xs text-gray-500 font-medium">
                      <span>Lead: <span className="text-gray-800">{item.metadata?.lead_researcher || 'TBA'}</span></span>
                      <span className="flex items-center gap-1 group-hover:text-[#0B3B24]">Project Details <ArrowRight size={12}/></span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Publications */}
          {publications.length > 0 && (
            <section>
              <div className="flex justify-between items-baseline mb-6 border-b border-gray-200 pb-2">
                <h2 className="text-2xl font-serif text-[#0B3B24] flex items-center gap-3">
                  Publications <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-md font-sans">{publications.length} results</span>
                </h2>
              </div>
              <div className="flex flex-col gap-4">
                {publications.map((item: any) => {
                  const authors = item.metadata?.authors ? (Array.isArray(item.metadata.authors) ? item.metadata.authors.join(", ") : item.metadata.authors) : "Unknown Authors";
                  return (
                    <div key={item.id} className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-sm transition-all flex flex-col md:flex-row justify-between items-center gap-6 group">
                      <div className="flex-1">
                        <div className="text-[10px] uppercase tracking-wider text-gray-400 font-medium mb-2">
                          {item.metadata?.type || 'Publication'} • {item.metadata?.year || new Date().getFullYear()} • {item.metadata?.venue || 'Journal'}
                        </div>
                        <Link href={getUrl("publication", item.id, item.metadata)}>
                          <h3 className="text-lg font-serif text-[#0B3B24] font-semibold mb-2 group-hover:underline">{item.title}</h3>
                        </Link>
                        {item.description && <p className="text-gray-600 text-sm mb-3 line-clamp-1">{item.description}</p>}
                        <div className="text-xs text-gray-500">
                          Authors: <span className="text-gray-700">{authors}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

        </div>
      </div>
    </main>
  );
}
