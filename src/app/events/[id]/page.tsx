// src/app/events/[id]/page.tsx
import { notFound } from "next/navigation";
import { createServerClient } from "@/supabase/server";
import { EventDetailHero } from "@/components/events/event-detail-hero";
import { EventSidebar } from "@/components/events/event-sidebar";

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = createServerClient();

    const { data: event } = await supabase
        .from("event")
        .select("id, title, event_type, description, location, start_at, end_at, registration_url, research_area(name), event_speaker(researcher(id, name, position, photo_url))")
        .eq("id", id)
        .eq("publish_status", "published")
        .single();

    if (!event) notFound();

    const speakers = (event.event_speaker as unknown as { researcher: { id: string; name: string; position: string | null; photo_url: string | null } | null }[])
        ?.map((s) => s.researcher)
        .filter((r): r is { id: string; name: string; position: string | null; photo_url: string | null } => Boolean(r)) ?? [];

    const area = (event.research_area as unknown as { name: string } | null)?.name ?? null;

    const start = event.start_at ? new Date(event.start_at) : null;
    const end = event.end_at ? new Date(event.end_at) : null;
    const dateLabel = start
        ? start.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
        : "Date to be announced";
    const timeLabel = start
        ? `${start.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}${end ? ` – ${end.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}` : ""} BST`
        : null;

    return (
        <main className="bg-[#FBF9F5] pb-24">
            <EventDetailHero
                title={event.title}
                eventType={event.event_type}
                area={area}
                dateLabel={dateLabel}
                timeLabel={timeLabel}
                location={event.location}
            />

            <div className="mx-auto grid w-[min(calc(100%_-_48px),1240px)] grid-cols-[1fr_340px] gap-[6vw] pt-14 max-lg:grid-cols-1 max-lg:gap-10 max-sm:w-[calc(100%_-_32px)]">
                <article>
                    <h2 className="font-serif text-2xl text-[#0F2D24] mb-4">About this event</h2>
                    <div className="prose max-w-none">
                        <p className="text-base leading-relaxed whitespace-pre-wrap text-[#293530]">
                            {event.description ?? "No description available."}
                        </p>
                    </div>
                </article>

                <EventSidebar
                    registrationUrl={event.registration_url}
                    dateLabel={dateLabel}
                    timeLabel={timeLabel}
                    location={event.location}
                    speakers={speakers}
                />
            </div>
        </main>
    );
}