import { createClient } from "@/supabase/client";
import { PeopleHeader } from "@/components/people/people-hero";
import { PersonList } from "@/components/people/person-list";
import { PersonFilters } from "@/components/people/person-filters";

export default async function PeoplePage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; department?: string; area?: string }>;
}) {
  const { query, department, area } = await searchParams;
  const supabase = createClient();

  let req = supabase
    .from("researcher")
    .select(`
      id, name, department, position,
      project_researcher(count),
      publication_author(count)
    `)
    .eq("publish_status", "published")
    .order("name");

  if (department && department !== "All Departments" && department !== "All Faculty") {
    req = req.eq("department", department);
  }

  if (query) {
    req = req.ilike("name", `%${query}%`);
  }

  const { data } = await req;

  const researchers = (data ?? []).map((r) => {
    // Determine counts from the aggregated array response
    const projectsArray = r.project_researcher as unknown as { count: number }[];
    const papersArray = r.publication_author as unknown as { count: number }[];

    // In PostgREST, count=exact returns [{ count: N }] when selecting a related table with just count. 
    // If it's returning the rows themselves, taking length is fine. Let's handle both.
    const projectsCount = projectsArray?.[0]?.count ?? projectsArray?.length ?? 0;
    const papersCount = papersArray?.[0]?.count ?? papersArray?.length ?? 0;

    return {
      id: r.id,
      initials: r.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase(),
      department: r.department ?? "—",
      name: r.name,
      position: r.position ?? "—",
      projects: projectsCount,
      papers: papersCount,
    };
  });

  return (
    <main className="flex-grow bg-[#F8F7F3] md:bg-[#FAF7F2] pb-14 md:pb-24">
      <PeopleHeader />
      <PersonFilters />
      <PersonList researchers={researchers} />
    </main>
  );
}
