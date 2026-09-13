// src/components/about/impact-stats.tsx
import { createServerClient } from "@/supabase/server";

type PublishedCountTable =
    | "research_area"
    | "project"
    | "publication"
    | "researcher";

interface ImpactStat {
    readonly label: string;
    readonly value: number | null;
}

async function getPublishedCount(
    supabase: ReturnType<typeof createServerClient>,
    table: PublishedCountTable,
): Promise<number | null> {
    const { count, error } = await supabase
        .from(table)
        .select("*", { count: "exact", head: true })
        .eq("publish_status", "published");

    if (error) {
        console.error(`Failed to fetch published count for "${table}"`, error);
        return null;
    }

    return count ?? 0;
}

export async function ImpactStats() {
    const supabase = createServerClient();

    const [areas, projects, publications, researchers] = await Promise.all([
        getPublishedCount(supabase, "research_area"),
        getPublishedCount(supabase, "project"),
        getPublishedCount(supabase, "publication"),
        getPublishedCount(supabase, "researcher"),
    ]);

    const stats: ImpactStat[] = [
        {
            value: areas,
            label: "Research areas",
        },
        {
            value: projects,
            label: "Active projects",
        },
        {
            value: publications,
            label: "Published papers",
        },
        {
            value: researchers,
            label: "Contributing researchers",
        },
    ];

    return (
        <section
            className="mx-auto w-[min(calc(100%_-_48px),1240px)] border-b border-[#17251f]/20 py-14 sm:py-16 lg:py-20 max-sm:w-[calc(100%_-_32px)]"
            aria-labelledby="impact-stats-title"
        >
            <div className="mb-8 flex items-center justify-between gap-6 sm:mb-10">
                <div>
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[#153c2e]/70">
                        By the numbers
                    </p>

                    <h2
                        id="impact-stats-title"
                        className="font-sans text-2xl font-medium tracking-[-0.02em] text-[#17251f] sm:text-3xl"
                    >
                        Our impact
                    </h2>
                </div>
            </div>

            <div className="grid grid-cols-2 border-t border-[#d7d5cd] lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <article
                        key={stat.label}
                        className={[
                            "relative pt-7 sm:pt-8",
                            "pr-5 sm:pr-8 lg:pr-10",
                            index >= 2
                                ? "border-t border-[#d7d5cd] lg:border-t-0"
                                : "",
                            index % 2 === 1
                                ? "border-l border-[#d7d5cd] pl-5 sm:pl-8 lg:border-l lg:pl-10"
                                : "",
                            index > 1 && index % 2 === 0
                                ? "lg:border-l lg:pl-10"
                                : "",
                        ].join(" ")}
                    >
                        <p
                            className="text-[clamp(2.75rem,5vw,4.25rem)] font-medium leading-none tracking-[-0.045em] text-[#153c2e] tabular-nums"
                            aria-label={
                                stat.value === null
                                    ? `${stat.label}: unavailable`
                                    : `${stat.label}: ${stat.value}`
                            }
                        >
                            {stat.value ?? "—"}
                        </p>

                        <p className="mt-4 max-w-[12rem] text-xs font-semibold uppercase leading-5 tracking-[0.1em] text-[#17251f]/75 sm:text-sm">
                            {stat.label}
                        </p>
                    </article>
                ))}
            </div>
        </section>
    );
}
