import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { Search, ArrowRight, ChevronRight } from "lucide-react";

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
  
  if (query) {
    const { data, error } = await supabase.rpc("search_ecosystem", {
      search_term: query,
    });
    
    if (!error && data) {
      results = data;
    } else if (error) {
      console.error("Search error:", error);
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
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 text-xs font-bold tracking-widest text-gray-500 uppercase mb-4">
            <span className="w-2 h-2 bg-[#0B3B24] rounded-full"></span>
            Digital Repository & Academic Index
          </div>
          <h1 className="text-5xl md:text-6xl font-serif text-[#0B3B24] mb-6">
            Search the <span className="italic font-light">Digital Hub</span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Query across specialized research clusters, lab investigators, empirical publications, and active industry projects conducted across Islington R&D.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200 flex items-center mb-8">
          <div className="pl-4 text-gray-400">
            <Search size={20} />
          </div>
          <form method="GET" action="/search" className="flex-1 flex">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder=""
              className="w-full px-4 py-3 bg-transparent focus:outline-none text-lg"
            />
            <button 
              type="submit"
              className="bg-[#0B3B24] hover:bg-[#072517] text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              Search <ArrowRight size={18} />
            </button>
          </form>
        </div>

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
                {areas.map((item) => (
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
                {researchers.map((item) => (
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
                {projects.map((item) => (
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
                {publications.map((item) => {
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
