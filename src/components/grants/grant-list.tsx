// src/components/grants/grant-list.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { ChevronDown, ExternalLink } from "lucide-react";

export type Grant = {
    id: string;
    title: string;
    funder: string | null;
    description: string | null;
    eligibility: string | null;
    amount: number | null;
    currency: string | null;
    deadline: string | null;
    external_url: string | null;
    status: "open" | "closed" | "awarded" | string;
};

const STATUS_STYLES: Record<string, string> = {
    open: "bg-[#ecf7f2] text-[#0e6144] border border-[#c3ebd7]",
    awarded: "bg-[#fffbeb] text-[#92400e] border border-[#fde68a]",
    closed: "bg-[#f3f4f6] text-[#4b5563] border border-[#d1d5db]",
};

function statusLabel(status: string) {
    return status.charAt(0).toUpperCase() + status.slice(1);
}

function formatDeadline(deadline: string | null) {
    if (!deadline) return { month: "No", day: "deadline" };
    const d = new Date(deadline);
    return {
        month: d.toLocaleDateString("en-GB", { month: "short", year: "numeric" }),
        day: d.toLocaleDateString("en-GB", { day: "2-digit" }),
    };
}

function formatAmount(amount: number | null, currency: string | null) {
    if (!amount) return null;
    return `${currency ?? ""} ${amount.toLocaleString()}`.trim();
}

export function GrantList({ grants }: { grants: Grant[] }) {
    const searchParams = useSearchParams();
    const query = (searchParams.get("query") || "").trim().toLowerCase();
    const tab = searchParams.get("tab") || "all";
    const sort = searchParams.get("sort") || "deadline";

    const filtered = grants.filter((g) => {
        if (tab !== "all" && g.status !== tab) return false;
        if (query) {
            const haystack = `${g.title} ${g.funder ?? ""} ${g.description ?? ""} ${g.eligibility ?? ""}`.toLowerCase();
            if (!haystack.includes(query)) return false;
        }
        return true;
    });

    const sorted = [...filtered].sort((a, b) => {
        if (sort === "amount") return (b.amount ?? 0) - (a.amount ?? 0);
        if (sort === "title") return a.title.localeCompare(b.title);
        // deadline: soonest first, nulls last
        if (!a.deadline && !b.deadline) return 0;
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    });

    if (sorted.length === 0) {
        return (
            <div className="py-16 text-center">
                <p className="text-sm text-[#68726c]">No grants match your filters.</p>
            </div>
        );
    }

    return (
        <div className="pb-16">
            {sorted.map((grant, i) => {
                const deadline = formatDeadline(grant.deadline);
                const amount = formatAmount(grant.amount, grant.currency);
                const statusStyle = STATUS_STYLES[grant.status] ?? STATUS_STYLES.closed;

                return (
                    <details
                        key={grant.id}
                        className={`group ${i === 0 ? "" : "border-t border-[#e5dfd3]"}`}
                    >
                        <summary className="grid cursor-pointer grid-cols-1 list-none gap-4 py-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0e2820]/30 lg:grid-cols-12 lg:gap-8 lg:items-start [&::-webkit-details-marker]:hidden">
                            {/* Deadline column */}
                            <div className="lg:col-span-2">
                                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#0e6144]">
                                    {deadline.month}
                                </p>
                                <p className="mt-1 font-serif text-4xl leading-none text-[#141d18]">{deadline.day}</p>
                            </div>

                            {/* Content column */}
                            <div className="space-y-2 lg:col-span-7">
                                <span className={`inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium ${statusStyle}`}>
                                    {statusLabel(grant.status)}
                                </span>
                                <h2 className="font-serif text-2xl leading-snug text-[#141d18] group-hover:text-[#0e6144] transition-colors">
                                    {grant.title}
                                </h2>
                                {grant.funder && <p className="text-sm text-[#68726c]">{grant.funder}</p>}
                            </div>

                            {/* Amount + disclosure column */}
                            <div className="flex items-center justify-between gap-3 lg:col-span-3 lg:flex-col lg:items-end lg:justify-center">
                                {amount ? (
                                    <p className="font-serif text-lg text-[#0e2820]">{amount}</p>
                                ) : (
                                    <span />
                                )}
                                <ChevronDown
                                    size={18}
                                    className="shrink-0 text-[#8a938c] transition-transform duration-200 group-open:rotate-180"
                                    aria-hidden="true"
                                />
                            </div>
                        </summary>

                        <div className="max-w-[70ch] space-y-4 pb-8 pl-0 lg:pl-[calc(16.6667%+2rem)]">
                            <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#425048]">
                                {grant.description ?? "No further details available."}
                            </p>
                            {grant.eligibility && (
                                <div className="border-l-2 border-[#c3ebd7] pl-4">
                                    <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#8a938c]">
                                        Eligibility
                                    </p>
                                    <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-[#425048]">
                                        {grant.eligibility}
                                    </p>
                                </div>
                            )}
                            {grant.external_url && grant.status === "open" && (
                                <a
                                    href={grant.external_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 rounded-sm bg-[#0e2820] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#153c2e]"
                                >
                                    Apply now
                                    <ExternalLink size={13} aria-hidden="true" />
                                </a>
                            )}
                        </div>
                    </details>
                );
            })}
        </div>
    );
}
