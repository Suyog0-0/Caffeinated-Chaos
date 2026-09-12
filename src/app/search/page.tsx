import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params?.q || "";
  
  // Instantiate the client directly since server.ts was removed
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
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

  const getUrl = (type: string, id: string) => {
    switch (type) {
      case "research_area": return `/research-areas/${id}`;
      case "researcher": return `/people/${id}`;
      case "project": return `/projects/${id}`;
      case "publication": return `/publications/${id}`;
      default: return "#";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "research_area": return "Research areas";
      case "researcher": return "Researchers";
      case "project": return "Projects";
      case "publication": return "Publications";
      default: return "Results";
    }
  };

  // Group results by type
  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.result_type]) acc[result.result_type] = [];
    acc[result.result_type].push(result);
    return acc;
  }, {} as Record<string, any[]>);

  // Define the order in which groups should appear
  const GROUP_ORDER = ['research_area', 'researcher', 'project', 'publication'];

  return (
    <main className="shell mx-auto max-w-5xl px-4" style={{ paddingTop: "100px", minHeight: "60vh" }}>
      <div className="max-w-2xl mb-12">
        <h1 className="text-4xl font-serif mb-8 text-gray-900">Search the Digital Hub</h1>
        <form method="GET" action="/search" className="flex gap-4">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search for research areas, people, projects..."
            className="flex-1 p-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-green-800 font-sans"
          />
          <button 
            type="submit"
            className="px-8 py-3 bg-green-900 text-white font-serif rounded-sm hover:bg-green-950 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {query && results.length === 0 && (
        <div className="text-gray-500 italic mt-8 font-serif">
          Found 0 results for "{query}". Try adjusting your search term.
        </div>
      )}

      {query && results.length > 0 && (
        <div className="flex flex-col gap-12 mt-12 pb-16">
          {GROUP_ORDER.map((type) => {
            const group = groupedResults[type];
            if (!group || group.length === 0) return null;

            return (
              <div key={type} className="grid grid-cols-1 md:grid-cols-12 gap-6 border-t border-gray-200 pt-8">
                {/* Left Column: Group Label & Count */}
                <div className="md:col-span-3">
                  <h2 className="text-xl font-serif text-green-900 font-semibold mb-1">
                    {getTypeLabel(type)}
                  </h2>
                  <p className="text-sm text-gray-500 font-sans">
                    {group.length} result{group.length !== 1 ? 's' : ''}
                  </p>
                </div>

                {/* Right Column: Flat Cards */}
                <div className="md:col-span-9 flex flex-col gap-4">
                  {group.map((result: any) => (
                    <Link 
                      key={`${result.result_type}-${result.id}`} 
                      href={getUrl(result.result_type, result.id)}
                      className="block p-6 border border-gray-200 bg-white hover:border-green-800 transition-colors group"
                    >
                      <h3 className="text-xl font-serif text-green-900 mb-2">
                        {result.title}
                      </h3>
                      {result.description && (
                        <p className="text-gray-600 font-sans text-sm leading-relaxed line-clamp-2">
                          {result.description}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
