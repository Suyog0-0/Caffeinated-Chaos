import { createServerClient } from "@/supabase/server";

async function getPublishedCount(table: "research_area" | "project" | "publication" | "researcher") {
    const supabase = createServerClient();
    const { count } = await supabase
        .from(table)
        .select("*", { count: "exact", head: true })
        .eq("publish_status", "published");
    return count ?? 0;
}

export async function ImpactStats() {
    const [areas, projects, publications, researchers] = await Promise.all([
        getPublishedCount("research_area"),
        getPublishedCount("project"),
        getPublishedCount("publication"),
        getPublishedCount("researcher"),
    ]);

    const stats = [
        [String(areas), "Research areas"],
        [String(projects), "Active projects"],
        [String(publications), "Published papers"],
        [String(researchers), "Contributing researchers"],
    ] as const;

    return (
        <section className="mx-auto w-[min(calc(100%_-_48px),1240px)] border-b border-[#17251f] py-14 max-sm:w-[calc(100%_-_32px)]">
            <h2 className="mb-8 font-sans text-2xl font-medium uppercase tracking-wide">Our impact</h2>
            <div className="grid grid-cols-4 max-sm:grid-cols-2">
                {stats.map(([value, label], index) => (
                    <div
                        className={`${index ? "border-l border-[#d7d5cd] pl-[3vw] max-sm:border-l-0 max-sm:pl-0" : ""} ${index >= 2 ? "max-sm:mt-8" : ""}`}
                        key={label}
                    >
                        <p className="text-[56px] leading-none font-medium text-[#153c2e]">{value}</p>
                        <p className="mt-3 text-[#17251f] text-sm font-medium uppercase">{label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}