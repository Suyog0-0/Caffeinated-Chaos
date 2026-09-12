// src/components/events/event-sidebar.tsx
import Link from "next/link";
import { Calendar, Clock, MapPin, ArrowUpRight } from "lucide-react";

type Speaker = { id: string; name: string; position: string | null; photo_url: string | null };

function initials(name: string) {
    return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

export function EventSidebar({
    registrationUrl,
    dateLabel,
    timeLabel,
    location,
    speakers,
}: {
    registrationUrl: string | null;
    dateLabel: string;
    timeLabel: string | null;
    location: string | null;
    speakers: Speaker[];
}) {
    return (
        <aside className="space-y-5 lg:sticky lg:top-24 h-fit">
            {/* Registration card */}
            <div className="bg-white border border-[#e5dfd3] rounded-sm p-6 shadow-xs">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8a938c] mb-3">Attendance</p>
                {registrationUrl ? (
                    <>
                        <a
                            href={registrationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full bg-[#0e2820] hover:bg-[#153c2e] text-white text-sm font-semibold px-5 py-3 rounded-sm transition-colors"
                        >
                            Register for this event
                            <ArrowUpRight size={15} aria-hidden="true" />
                        </a>
                        <p className="mt-3 text-xs text-[#8a938c] text-center">Opens the official registration page</p>
                    </>
                ) : (
                    <p className="text-sm text-[#68726c]">Registration is not open yet — check back soon.</p>
                )}
            </div>

            {/* Schedule + location card */}
            <div className="bg-white border border-[#e5dfd3] rounded-sm p-6 shadow-xs space-y-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8a938c]">Event details</p>
                <div className="flex items-start gap-3">
                    <Calendar size={16} className="text-[#0e6144] mt-0.5 shrink-0" aria-hidden="true" />
                    <div>
                        <p className="text-xs text-[#8a938c]">Date</p>
                        <p className="text-sm font-medium text-[#141d18]">{dateLabel}</p>
                    </div>
                </div>
                {timeLabel && (
                    <div className="flex items-start gap-3">
                        <Clock size={16} className="text-[#0e6144] mt-0.5 shrink-0" aria-hidden="true" />
                        <div>
                            <p className="text-xs text-[#8a938c]">Time</p>
                            <p className="text-sm font-medium text-[#141d18]">{timeLabel}</p>
                        </div>
                    </div>
                )}
                {location && (
                    <div className="flex items-start gap-3">
                        <MapPin size={16} className="text-[#0e6144] mt-0.5 shrink-0" aria-hidden="true" />
                        <div>
                            <p className="text-xs text-[#8a938c]">Location</p>
                            <p className="text-sm font-medium text-[#141d18]">{location}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Speakers card */}
            {speakers.length > 0 && (
                <div className="bg-white border border-[#e5dfd3] rounded-sm p-6 shadow-xs">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8a938c] mb-4">
                        {speakers.length > 1 ? "Speakers" : "Speaker"}
                    </p>
                    <div className="space-y-3">
                        {speakers.map((speaker) => (
                            <Link
                                key={speaker.id}
                                href={`/people/${speaker.id}`}
                                className="flex items-center gap-3 group -mx-2 px-2 py-1.5 rounded-sm hover:bg-[#f9f7f2] transition-colors"
                            >
                                <span className="w-9 h-9 shrink-0 rounded-full overflow-hidden bg-[#0e2820] text-white flex items-center justify-center font-serif text-xs">
                                    {speaker.photo_url ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={speaker.photo_url}
                                            alt={speaker.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        initials(speaker.name)
                                    )}
                                </span>
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-[#141d18] group-hover:text-[#0e6144] transition-colors truncate">
                                        {speaker.name}
                                    </p>
                                    {speaker.position && (
                                        <p className="text-xs text-[#8a938c] truncate">{speaker.position}</p>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </aside>
    );
}