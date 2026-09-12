// src/components/events/event-list.tsx
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, MapPin } from "lucide-react";

type Event = {
    id: string;
    title: string;
    event_type: string | null;
    description: string | null;
    location: string | null;
    start_at: string | null;
    end_at: string | null;
    registration_url: string | null;
    area: string | null;
    areaSlug: string | null;
    speakers: { name: string; photo_url: string | null }[];
};

function formatDateRange(startAt: string | null, endAt: string | null) {
    if (!startAt) return "Date to be announced";
    const start = new Date(startAt);
    const startLabel = start.toLocaleDateString("en-GB", { weekday: "long" });
    const startTime = start.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    if (!endAt) return `${startLabel} · ${startTime} BST`;
    const end = new Date(endAt);
    const endTime = end.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    return `${startLabel} · ${startTime} – ${endTime} BST`;
}

function formatDateBlock(startAt: string | null) {
    if (!startAt) return { month: "TBA", day: "--" };
    const d = new Date(startAt);
    return {
        month: d.toLocaleDateString("en-GB", { month: "short", year: "numeric" }),
        day: d.toLocaleDateString("en-GB", { day: "2-digit" }),
    };
}

function formatPastDate(startAt: string | null) {
    if (!startAt) return "TBA";
    return new Date(startAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function initials(name: string) {
    return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

export function EventList({ events }: { events: Event[] }) {
    const searchParams = useSearchParams();
    const query = (searchParams.get("query") || "").trim().toLowerCase();
    const type = searchParams.get("type") || "all";
    const area = searchParams.get("area") || "all";
    const tab = searchParams.get("tab") || "all";

    const filtered = events.filter((e) => {
        if (type !== "all" && e.event_type !== type) return false;
        if (area !== "all" && e.areaSlug !== area) return false;
        if (query) {
            const haystack = `${e.title} ${e.description ?? ""} ${e.speakers.map((s) => s.name).join(" ")}`.toLowerCase();
            if (!haystack.includes(query)) return false;
        }
        return true;
    });

    const now = new Date();
    const upcoming = filtered.filter((e) => !e.start_at || new Date(e.start_at) >= now);
    const past = filtered.filter((e) => e.start_at && new Date(e.start_at) < now);

    const showUpcoming = tab === "all" || tab === "upcoming";
    const showPast = tab === "all" || tab === "past";

    return (
        <>
            {showUpcoming && (
                <>
                    <div className="flex items-baseline justify-between border-b border-[#e5dfd3] pb-3 mb-6">
                        <h2 className="font-serif text-2xl text-[#0e2820]">Upcoming events</h2>
                        <span className="text-xs text-[#8a938c]">{upcoming.length} scheduled</span>
                    </div>

                    {upcoming.length === 0 ? (
                        <p className="text-sm text-[#68726c] pb-14">No upcoming events match your filters.</p>
                    ) : (
                        <div className="pb-16">
                            {upcoming.map((event, i) => {
                                const dateBlock = formatDateBlock(event.start_at);
                                const chair = event.speakers[0];
                                const primaryIsRegister = Boolean(event.registration_url);

                                return (
                                    <article
                                        key={event.id}
                                        className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 py-8 ${i === 0 ? "" : "border-t border-[#e5dfd3]"}`}
                                    >
                                        {/* Date column */}
                                        <div className="lg:col-span-2">
                                            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#0e6144]">
                                                {dateBlock.month}
                                            </p>
                                            <p className="font-serif text-4xl text-[#141d18] leading-none mt-1">{dateBlock.day}</p>
                                            <p className="text-xs text-[#8a938c] mt-1.5">{formatDateRange(event.start_at, event.end_at)}</p>
                                        </div>

                                        {/* Content column */}
                                        <div className="lg:col-span-7 space-y-2">
                                            {(event.event_type || event.area) && (
                                                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#8a938c]">
                                                    {event.event_type}
                                                    {event.event_type && event.area ? " · " : ""}
                                                    {event.area}
                                                </p>
                                            )}
                                            <h3 className="text-2xl font-serif text-[#141d18] leading-snug">
                                                <Link href={`/events/${event.id}`} className="hover:text-[#0e6144] transition-colors">
                                                    {event.title}
                                                </Link>
                                            </h3>
                                            {event.description && (
                                                <p className="max-w-[62ch] text-justify text-sm text-[#425048] leading-relaxed">{event.description}</p>
                                            )}
                                            <div className="pt-1.5 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#68726c]">
                                                {chair && (
                                                    <div className="flex items-center gap-2">
                                                        <span className="w-5 h-5 shrink-0 overflow-hidden rounded-full bg-[#0e2820] text-white flex items-center justify-center font-serif text-[10px]">
                                                            {chair.photo_url ? (
                                                                // eslint-disable-next-line @next/next/no-img-element
                                                                <img src={chair.photo_url} alt="" className="h-full w-full object-cover" />
                                                            ) : (
                                                                initials(chair.name)
                                                            )}
                                                        </span>
                                                        <span>{chair.name}</span>
                                                    </div>
                                                )}
                                                {event.location && (
                                                    <div className="flex items-center gap-1.5">
                                                        <MapPin size={13} className="text-[#8a938c]" aria-hidden="true" />
                                                        <span>{event.location}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Actions column */}
                                        <div className="lg:col-span-3 flex flex-row lg:flex-col gap-2.5 lg:items-stretch lg:justify-center">
                                            {primaryIsRegister ? (
                                                <>
                                                    <a
                                                        href={event.registration_url!}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex-1 lg:flex-none px-4 py-2.5 bg-[#0e2820] hover:bg-[#153c2e] text-white text-xs font-semibold rounded-sm text-center transition-colors"
                                                    >
                                                        Register
                                                    </a>
                                                    <Link
                                                        href={`/events/${event.id}`}
                                                        className="flex-1 lg:flex-none inline-flex items-center justify-center gap-1 px-4 py-2.5 text-xs font-medium text-[#0e2820] hover:text-[#0e6144] transition-colors"
                                                    >
                                                        View details
                                                        <ArrowUpRight size={13} aria-hidden="true" />
                                                    </Link>
                                                </>
                                            ) : (
                                                <Link
                                                    href={`/events/${event.id}`}
                                                    className="px-4 py-2.5 bg-[#0e2820] hover:bg-[#153c2e] text-white text-xs font-semibold rounded-sm text-center transition-colors"
                                                >
                                                    View details
                                                </Link>
                                            )}
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </>
            )}

            {showPast && past.length > 0 && (
                <>
                    <div className="flex items-baseline justify-between border-b border-[#e5dfd3] pb-3 mb-2">
                        <h2 className="font-serif text-2xl text-[#0e2820]">Past events</h2>
                        <span className="text-xs text-[#8a938c]">{past.length} archived</span>
                    </div>
                    <div className="pb-8">
                        {past.map((event) => (
                            <Link
                                key={event.id}
                                href={`/events/${event.id}`}
                                className="group grid grid-cols-[100px_1fr] sm:grid-cols-[140px_1fr] items-baseline gap-4 py-4 border-b border-[#e5dfd3]"
                            >
                                <span className="font-mono text-[11px] uppercase tracking-wide text-[#8a938c]">
                                    {formatPastDate(event.start_at)}
                                </span>
                                <span className="flex items-center gap-2 min-w-0">
                                    <h3 className="font-serif text-lg text-[#293530] group-hover:text-[#0e2820] transition-colors truncate">
                                        {event.title}
                                    </h3>
                                    <ArrowUpRight
                                        size={14}
                                        className="shrink-0 text-[#0e6144] opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0"
                                        aria-hidden="true"
                                    />
                                </span>
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </>
    );
}
