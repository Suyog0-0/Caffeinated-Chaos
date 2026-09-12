// src/components/events/event-detail-hero.tsx
import Link from "next/link";
import { Calendar, Clock, MapPin } from "lucide-react";

export function EventDetailHero({
    title,
    eventType,
    area,
    dateLabel,
    timeLabel,
    location,
}: {
    title: string;
    eventType: string | null;
    area: string | null;
    dateLabel: string;
    timeLabel: string | null;
    location: string | null;
}) {
    return (
        <header className="bg-[#0d2a20] text-white pt-8 pb-14 border-b border-[#1e3a2d]">
            <div className="mx-auto w-[min(calc(100%_-_48px),1240px)] max-sm:w-[calc(100%_-_32px)]">
                <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[#9db1a6] mb-8">
                    <Link className="hover:text-white transition-colors" href="/events">
                        Events
                    </Link>
                    <span aria-hidden="true" className="text-[#4c6154]">/</span>
                    <span className="truncate max-w-[40ch] text-[#c5d2cb]">{title}</span>
                </nav>

                <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] font-mono uppercase tracking-[0.12em] text-[#73d8b0] mb-5">
                    {eventType && <span>{eventType}</span>}
                    {eventType && area && <span className="text-[#3c5949]">·</span>}
                    {area && <span className="text-[#9db1a6]">{area}</span>}
                </p>

                <h1 className="font-serif font-normal text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.05] max-w-4xl">
                    {title}
                </h1>

                <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-[#c5d2cb] border-t border-[#1e3a2d] pt-6">
                    <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-[#4ebe92]" aria-hidden="true" />
                        <span>{dateLabel}</span>
                    </div>
                    {timeLabel && (
                        <div className="flex items-center gap-2">
                            <Clock size={16} className="text-[#4ebe92]" aria-hidden="true" />
                            <span>{timeLabel}</span>
                        </div>
                    )}
                    {location && (
                        <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-[#4ebe92]" aria-hidden="true" />
                            <span>{location}</span>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}