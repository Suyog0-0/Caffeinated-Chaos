// src/app/grants/page.tsx
import { Suspense } from "react";
import { createServerClient } from "@/supabase/server";
import { GrantFilters } from "@/components/grants/grant-filters";
import { GrantList, type Grant } from "@/components/grants/grant-list";

// Nothing on this page is request-specific (page.tsx never reads
// searchParams itself — GrantList/GrantFilters do), so cache it and
// revalidate periodically, same pattern as /events and /projects.
export const revalidate = 300;

export default async function GrantsPage() {
    const supabase = createServerClient();

    const { data } = await supabase
        .from("grant")
        .select("id, title, funder, description, amount, currency, deadline, external_url, status")
        .eq("publish_status", "published")
        .order("deadline", { ascending: true });

    const grants: Grant[] = data ?? [];
    const openCount = grants.filter((g) => g.status === "open").length;
    const awardedCount = grants.filter((g) => g.status === "awarded").length;

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
                    <div className="mt-8 grid max-w-lg grid-cols-3 gap-6 border-t border-[#1e3a2d] pt-6">
                        <div>
                            <span className="block font-serif text-2xl">{grants.length}</span>
                            <span className="block text-[11px] uppercase tracking-wide text-[#8fa89a]">Total grants</span>
                        </div>
                        <div>
                            <span className="block font-serif text-2xl text-[#6fd9a8]">{openCount}</span>
                            <span className="block text-[11px] uppercase tracking-wide text-[#8fa89a]">Open now</span>
                        </div>
                        <div>
                            <span className="block font-serif text-2xl">{awardedCount}</span>
                            <span className="block text-[11px] uppercase tracking-wide text-[#8fa89a]">Awarded</span>
                        </div>
                    </div>
                </div>
            </header>

            {grants.length === 0 ? (
                <section className="mx-auto w-[min(calc(100%_-_48px),1240px)] max-sm:w-[calc(100%_-_32px)] pt-16">
                    <p className="text-sm text-[#68726c]">No grants published yet — check back soon.</p>
                </section>
            ) : (
                <>
                    <Suspense fallback={null}>
                        <GrantFilters totalCount={grants.length} />
                    </Suspense>

                    <section className="mx-auto w-[min(calc(100%_-_48px),1240px)] max-sm:w-[calc(100%_-_32px)] pt-4">
                        <Suspense fallback={null}>
                            <GrantList grants={grants} />
                        </Suspense>
                    </section>
                </>
            )}
        </main>
    );
}