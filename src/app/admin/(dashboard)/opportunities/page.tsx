import { Suspense } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { OpportunityDirectory } from "@/components/admin/opportunity-directory";
import { ResearcherListLoading } from "@/components/admin/admin-loading";
import { adminTw } from "@/components/admin/admin-tailwind";

export default async function OpportunitiesAdminPage({
  searchParams,
}: {
  searchParams: Promise<{
    query?: string;
    visibility?: string;
    state?: string;
    notice?: string;
    error?: string;
    page?: string;
  }>;
}) {
  const {
    query = "",
    visibility = "all",
    state = "all",
    notice,
    error,
    page: requestedPage = "1",
  } = await searchParams;
  const parsedPage = Number.parseInt(requestedPage, 10);
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  return (
    <div className={adminTw.pageContent}>
      <header className="flex min-h-20 items-end justify-between gap-5 border-b border-[#c9cbc4] pb-5">
        <div><p className="mb-1 text-xs font-bold text-[#33473e]">Engagement</p><h1 className="text-4xl font-medium tracking-[-0.035em] text-[#17251f] sm:text-[3.25rem] sm:leading-none">Opportunities</h1></div>
        <Link className="inline-flex min-h-11 items-center gap-2 bg-[#153c2e] px-4 text-[13px] font-bold text-white hover:bg-[#204e3a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#153c2e]" href="/admin/opportunities/new"><Plus size={18} /> Add opportunity</Link>
      </header>

      {notice && <p className="mt-5 border border-[#a9c0b6] bg-[#e9f0ec] px-4 py-3 text-sm text-[#204e3a]" role="status">{notice === "created" && "Opportunity created successfully."}{notice === "updated" && "Opportunity updated successfully."}{notice === "deleted" && "Opportunity deleted permanently."}</p>}
      {error && <p className="mt-5 border border-[#d8bcbc] bg-[#f7eaea] px-4 py-3 text-sm text-[#7a3030]" role="alert">{error === "delete-failed" ? "The opportunity could not be deleted. Check linked records and RLS, then try again." : "The opportunity ID was invalid."}</p>}

      <Suspense key={`${query}:${visibility}:${state}:${page}`} fallback={<ResearcherListLoading />}>
        <OpportunityDirectory page={page} query={query} state={state} visibility={visibility} />
      </Suspense>
    </div>
  );
}
