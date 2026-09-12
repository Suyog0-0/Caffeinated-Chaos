// src/app/grants/page.tsx
import { createServerClient } from "@/supabase/server";

// Nothing on this page is request-specific, so cache it and revalidate
// periodically instead of fetching on every request (same pattern as
// /projects and /publications).
export const revalidate = 300;

function getStatusStyles(status: string) {
    switch (status) {
        case "open":
            return "bg-[#ecf7f2] text-[#0e6144] border border-[#c3ebd7]";
        case "awarded":
            return "bg-[#fffbeb] text-[#92400e] border border-[#fde68a]";
        default:
            return "bg-[#f3f4f6] text-[#4b5563] border border-[#d1d5db]";
    }
}

function formatDeadline(deadline: string | null) {
    if (!deadline) return "No deadline listed";
    return new Date(deadline).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function formatAmount(amount: number | null, currency: string | null) {
    if (!amount) return null;
    return `${currency ?? ""} ${amount.toLocaleString()}`.trim();
}

export default async function GrantsPage() {
    const supabase = createServerClient();

    const { data } = await supabase
        .from("grant")
        .select("id, title, funder, description, amount, currency, deadline, external_url, status")
        .eq("publish_status", "published")
        .order("deadline", { ascending: true });

    const grants = data ?? [];

    return (
        <main className="pb-24">
            <header className="bg-[#0d2a20] py-16 text-white">
                <div className="mx-auto w-[min(calc(100%_-_48px),1240px)] max-sm:w-[calc(100%_-_32px)]">
                    <p className="mb-4 font-sans text-xs font-bold text-[#b6c7bd]">Grants & Funding</p>
                    <h1 className="text-[clamp(44px,6vw,76px)] leading-[.98] font-normal tracking-[-.03em]">
                        Funding to move research forward.
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg text-[#c5d2cb]">
                        Browse open funding opportunities, check eligibility and deadlines, and apply directly.
                    </p>
                </div>
            </header>

            <section className="mx-auto w-[min(calc(100%_-_48px),1240px)] max-sm:w-[calc(100%_-_32px)] pt-10">
                {grants.length === 0 ? (
                    <p className="text-sm text-[#68726c]">No grants published yet — check back soon.</p>
                ) : (
                    <div className="space-y-4">
                        {grants.map((grant) => (
                            <details
                                key={grant.id}
                                className="bg-white border border-[#e5dfd3] rounded-sm p-6 group"
                            >
                                <summary className="flex flex-wrap items-start justify-between gap-4 cursor-pointer list-none">
                                    <div>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium mb-2 ${getStatusStyles(grant.status)}`}>
                                            {grant.status.charAt(0).toUpperCase() + grant.status.slice(1)}
                                        </span>
                                        <h2 className="font-serif text-xl font-semibold text-[#141d18]">{grant.title}</h2>
                                        {grant.funder && <p className="text-sm text-[#68726c] mt-0.5">{grant.funder}</p>}
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-xs uppercase tracking-wide text-[#8a938c]">Deadline</p>
                                        <p className="text-sm font-semibold text-[#0e2820]">{formatDeadline(grant.deadline)}</p>
                                    </div>
                                </summary>

                                <div className="mt-4 pt-4 border-t border-[#e5dfd3] space-y-3">
                                    {formatAmount(grant.amount, grant.currency) && (
                                        <p className="text-sm text-[#425048]">
                                            <span className="font-semibold text-[#0e2820]">Amount:</span> {formatAmount(grant.amount, grant.currency)}
                                        </p>
                                    )}
                                    <p className="text-sm text-[#425048] whitespace-pre-wrap">
                                        {grant.description ?? "No further details available."}
                                    </p>
                                    {grant.external_url && grant.status === "open" && (
                                        <a
                                            href={grant.external_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block bg-[#0e2820] text-white text-sm font-semibold px-5 py-2.5 rounded-sm hover:bg-[#153c2e] transition-colors"
                                        >
                                            Apply now
                                        </a>
                                    )}
                                </div>
                            </details>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}