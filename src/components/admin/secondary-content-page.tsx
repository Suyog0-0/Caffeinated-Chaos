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
    <div className="admin-page-content">
      <header className="admin-page-header">
        <div><p>{item.section}</p><h1>{item.title}</h1></div>
        <div className="admin-page-header-actions"><Link href={`${item.route}/new`}><Plus size={18} /> Add {item.singular}</Link></div>
      </header>
      {notice && <p className="admin-notice" role="status">{notice === "created" && `${item.title.slice(0, -1)} created successfully.`}{notice === "updated" && `${item.title.slice(0, -1)} updated successfully.`}{notice === "deleted" && `${item.title.slice(0, -1)} deleted permanently.`}</p>}
      {error && <p className="admin-notice admin-notice-error" role="alert">{error === "delete-failed" ? `The ${item.singular} could not be deleted. Check linked records and RLS, then try again.` : `The ${item.singular} ID was invalid.`}</p>}
      <Suspense key={`${kind}:${query}:${status}:${page}`} fallback={<ResearcherListLoading />}>
        <SecondaryContentDirectory kind={kind} page={page} query={query} status={status} />
      </Suspense>
    </div>
  );
}
