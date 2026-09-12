import { Suspense } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ResearcherListLoading } from "@/components/admin/admin-loading";
import { SecondaryContentDirectory } from "@/components/admin/secondary-content-directory";
import type { SecondaryContentKind } from "@/app/secondary-content-actions";

const content = {
  event: { title: "Events", section: "Engagement", route: "/admin/events", singular: "event" },
  grant: { title: "Grants", section: "Funding", route: "/admin/grants", singular: "grant" },
  announcement: { title: "Announcements", section: "Communication", route: "/admin/announcements", singular: "announcement" },
} as const;

export async function SecondaryContentPage({
  kind,
  searchParams,
}: {
  kind: SecondaryContentKind;
  searchParams: Promise<{ query?: string; status?: string; notice?: string; error?: string; page?: string }>;
}) {
  const { query = "", status = "all", notice, error, page: requestedPage = "1" } = await searchParams;
  const parsedPage = Number.parseInt(requestedPage, 10);
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const item = content[kind];
  return (
    <div className="mx-auto w-[min(calc(100%-2rem),73.75rem)] py-10 sm:w-[min(calc(100%-2.75rem),73.75rem)] sm:py-14">
      <header className="flex min-h-20 items-end justify-between gap-5 border-b border-[#c9cbc4] pb-5">
        <div><p className="mb-1 text-xs font-bold text-[#33473e]">{item.section}</p><h1 className="text-4xl font-medium tracking-[-0.035em] text-[#17251f] sm:text-[3.25rem] sm:leading-none">{item.title}</h1></div>
        <div><Link className="inline-flex min-h-11 items-center gap-2 bg-[#153c2e] px-4 text-[13px] font-bold text-white transition-colors hover:bg-[#204e3a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#153c2e]" href={`${item.route}/new`}><Plus size={18} /> Add {item.singular}</Link></div>
      </header>
      {notice && <p className="mt-5 border border-[#a9c0b6] bg-[#e9f0ec] px-4 py-3 text-sm text-[#204e3a]" role="status">{notice === "created" && `${item.title.slice(0, -1)} created successfully.`}{notice === "updated" && `${item.title.slice(0, -1)} updated successfully.`}{notice === "deleted" && `${item.title.slice(0, -1)} deleted permanently.`}</p>}
      {error && <p className="mt-5 border border-[#d8bcbc] bg-[#f7eaea] px-4 py-3 text-sm text-[#7a3030]" role="alert">{error === "delete-failed" ? `The ${item.singular} could not be deleted. Check linked records and RLS, then try again.` : `The ${item.singular} ID was invalid.`}</p>}
      <Suspense key={`${kind}:${query}:${status}:${page}`} fallback={<ResearcherListLoading />}>
        <SecondaryContentDirectory kind={kind} page={page} query={query} status={status} />
      </Suspense>
    </div>
  );
}
