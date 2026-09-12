// src/app/events/[id]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { createServerClient } from "@/supabase/server";

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = createServerClient();

    const { data: event } = await supabase
        .from("event")
        .select("id, title, event_type, description, location, start_at, end_at, registration_url, event_speaker(researcher(id, name, position))")
        .eq("id", id)
        .eq("publish_status", "published")
        .single();

    if (!event) notFound();

    const speakers = (event.event_speaker as unknown as { researcher: { id: string; name: string; position: string | null } | null }[])
        ?.map((s) => s.researcher)
        .filter((r): r is { id: string; name: string; position: string | null } => Boolean(r)) ?? [];

    const start = event.start_at ? new Date(event.start_at) : null;
    const end = event.end_at ? new Date(event.end_at) : null;
    const dateLabel = start
        ? start.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
        : "Date to be announced";
    const timeLabel = start
        ? `${start.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}${end ? ` – ${end.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}` : ""
        }`
        : null;

    return (
        <main className="bg-[#FBF9F5] text-[#1A2420] min-h-screen pb-24">
            <div className="mx-auto w-[min(calc(100%_-_48px),960px)] max-sm:w-[calc(100%_-_32px)] pt-6">
                <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-sans text-sm text-[#405149]">
                    <Link className="text-[#153c2e] font-semibold hover:underline underline-offset-4" href="/events">
                        Events
                    </Link>
                    <span aria-hidden="true" className="text-[#87918c]">›</span>
                    <span className="truncate max-w-[40ch]">{event.title}</span>
                </nav>

                <div className="pt-8 pb-10 border-b border-[#E6DFD5]">
                    {event.event_type && (
                        <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-[#68726c] bg-[#f5f2ea] px-2 py-1 rounded mb-4">
                            {event.event_type}
                        </span>
                    )}
                    <h1 className="font-serif font-medium text-4xl sm:text-5xl text-[#0F2D24] tracking-tight leading-tight">
                        {event.title}
                    </h1>

                    <div className="mt-6 space-y-2 text-sm text-[#425048]">
                        <p><span className="font-semibold text-[#0e2820]">Schedule:</span> {dateLabel}{timeLabel ? ` · ${timeLabel}` : ""}</p>
                        {event.location && (
                            <p><span className="font-semibold text-[#0e2820]">Location:</span> {event.location}</p>
                        )}
                    </div>

                    {event.registration_url ? (
                        <a
                            href={event.registration_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-6 bg-[#0e2820] text-white text-sm font-semibold px-6 py-3 rounded-sm hover:bg-[#153c2e] transition-colors"
                        >
                            Register for this event
                        </a>
                    ) : (
                        <p className="mt-6 text-sm text-[#8a938c]">Registration is not open yet — check back soon.</p>
                    )}
                </div>

                <article className="pt-8 prose max-w-none">
                    <p className="text-base leading-relaxed whitespace-pre-wrap text-[#1A2420]">
                        {event.description ?? "No description available."}
                    </p>
                </article>

                {speakers.length > 0 && (
                    <div className="pt-10 border-t border-[#E6DFD5] mt-10">
                        <h2 className="font-serif text-2xl text-[#0F2D24] mb-4">Speakers</h2>
                        <div className="flex flex-wrap gap-3">
                            {speakers.map((speaker) => (
                                <Link
                                    key={speaker.id}
                                    href={`/people/${speaker.id}`}
                                    className="px-4 py-2 bg-white border border-[#E6DFD5] rounded-sm hover:border-[#0e2820] transition-colors"
                                >
                                    <span className="text-sm font-medium text-[#0F2D24]">{speaker.name}</span>
                                    {speaker.position && <span className="text-xs text-[#68726c]"> · {speaker.position}</span>}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}