// src/app/events/page.tsx
import { Suspense } from "react";
import { createServerClient } from "@/supabase/server";
import { EventFilters } from "@/components/events/event-filters";
import { EventList } from "@/components/events/event-list";

// Nothing on this page is request-specific (page.tsx never reads
// searchParams itself — EventList/EventFilters do), so cache it and
// revalidate periodically, same pattern as /projects and /publications.
export const revalidate = 300;

export default async function EventsPage() {
    const supabase = createServerClient();

    const { data } = await supabase
        .from("event")
        .select("id, title, event_type, description, location, start_at, end_at, registration_url, research_area(name, slug), event_speaker(researcher(name))")
        .eq("publish_status", "published")
        .order("start_at", { ascending: true });

    const events = (data ?? []).map((e) => {
        const area = e.research_area as unknown as { name: string; slug: string } | null;
        return {
            ...e,
            area: area?.name ?? null,
            areaSlug: area?.slug ?? null,
            speakers: (e.event_speaker as unknown as { researcher: { name: string } | null }[])
                ?.map((s) => s.researcher?.name)
                .filter((name): name is string => Boolean(name)) ?? [],
        };
    });

    // Build filter options from the real data instead of hardcoding, so
    // filters always match what's actually published (same approach as
    // /projects' area filter).
    const typeOptions = Array.from(new Set(events.map((e) => e.event_type).filter((t): t is string => Boolean(t))));
    const areaOptions = Array.from(
        new Map(events.filter((e) => e.areaSlug).map((e) => [e.areaSlug as string, e.area as string])).entries()
    ).map(([slug, name]) => ({ slug, name }));

    return (
        <main className="pb-24">
            <header className="bg-[#0d2a20] py-16 text-white">
                <div className="mx-auto w-[min(calc(100%_-_48px),1240px)] max-sm:w-[calc(100%_-_32px)]">
                    <p className="mb-4 font-sans text-xs font-bold text-[#b6c7bd]">Events</p>
                    <h1 className="text-[clamp(44px,6vw,76px)] leading-[.98] font-normal tracking-[-.03em]">
                        Conferences, talks and workshops.
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg text-[#c5d2cb]">
                        Find upcoming and past research events, and register for the ones you want to attend.
                    </p>
                </div>
            </header>

            <Suspense fallback={null}>
                <EventFilters typeOptions={typeOptions} areaOptions={areaOptions} />
            </Suspense>

            <section className="mx-auto w-[min(calc(100%_-_48px),1240px)] max-sm:w-[calc(100%_-_32px)] pt-10">
                <Suspense fallback={null}>
                    <EventList events={events} />
                </Suspense>
            </section>
        </main>
    );
}