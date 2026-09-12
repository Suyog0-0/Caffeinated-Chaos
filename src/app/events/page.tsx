// src/app/events/page.tsx
import Link from "next/link";
import { createServerClient } from "@/supabase/server";

// Nothing on this page is request-specific, so cache it and revalidate
// periodically instead of fetching on every request (same pattern as
// /projects and /publications).
export const revalidate = 300;

function formatDateRange(startAt: string | null, endAt: string | null) {
    if (!startAt) return "Date to be announced";
    const start = new Date(startAt);
    const startLabel = start.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
    const startTime = start.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    if (!endAt) return `${startLabel} · ${startTime}`;
    const end = new Date(endAt);
    const endTime = end.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    return `${startLabel} · ${startTime} – ${endTime}`;
}

export default async function EventsPage() {
    const supabase = createServerClient();

    const { data } = await supabase
        .from("event")
        .select("id, title, event_type, description, location, start_at, end_at, registration_url, event_speaker(researcher(name))")
        .eq("publish_status", "published")
        .order("start_at", { ascending: true });

    const events = (data ?? []).map((e) => ({
        ...e,
        speakers: (e.event_speaker as unknown as { researcher: { name: string } | null }[])
            ?.map((s) => s.researcher?.name)
            .filter((name): name is string => Boolean(name)) ?? [],
    }));
    const now = new Date();
    const upcoming = events.filter((e) => !e.start_at || new Date(e.start_at) >= now);
    const past = events.filter((e) => e.start_at && new Date(e.start_at) < now);

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

            <section className="mx-auto w-[min(calc(100%_-_48px),1240px)] max-sm:w-[calc(100%_-_32px)] pt-10">
                <h2 className="font-serif text-2xl text-[#0e2820] mb-5">Upcoming</h2>
                {upcoming.length === 0 ? (
                    <p className="text-sm text-[#68726c] pb-8">No upcoming events right now — check back soon.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-14">
                        {upcoming.map((event) => (
                            <Link
                                key={event.id}
                                href={`/events/${event.id}`}
                                className="block bg-white border border-[#e5dfd3] hover:border-[#0e2820] rounded-sm p-6 shadow-xs hover:shadow-md transition-all duration-200"
                            >
                                {event.event_type && (
                                    <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-[#68726c] bg-[#f5f2ea] px-2 py-1 rounded mb-3">
                                        {event.event_type}
                                    </span>
                                )}
                                <h3 className="font-serif text-xl font-semibold text-[#141d18]">{event.title}</h3>
                                <p className="mt-2 text-sm text-[#425048]">{formatDateRange(event.start_at, event.end_at)}</p>
                                {event.location && <p className="text-sm text-[#68726c]">{event.location}</p>}
                                {event.speakers.length > 0 && (
                                    <p className="mt-2 text-xs text-[#8a938c]">Speakers: {event.speakers.join(", ")}</p>
                                )}
                            </Link>
                        ))}
                    </div>
                )}

                {past.length > 0 && (
                    <>
                        <h2 className="font-serif text-2xl text-[#0e2820] mb-5">Past events</h2>
                        <div className="divide-y divide-[#e5dfd3]">
                            {past.map((event) => (
                                <Link
                                    key={event.id}
                                    href={`/events/${event.id}`}
                                    className="flex items-center justify-between py-4 group"
                                >
                                    <div>
                                        <h3 className="font-serif text-lg text-[#425048] group-hover:text-[#0e2820]">{event.title}</h3>
                                        <p className="text-xs text-[#8a938c]">{formatDateRange(event.start_at, event.end_at)}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </section>
        </main>
    );
}