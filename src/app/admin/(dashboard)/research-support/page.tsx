import { Suspense } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ResourceDirectory } from "@/components/admin/resource-directory";
import { ResearcherListLoading } from "@/components/admin/admin-loading";
import { adminTw } from "@/components/admin/admin-tailwind";

export default async function ResearchSupportAdminPage({
  searchParams,
}: {
  searchParams: Promise<{
    query?: string;
    status?: string;
    category?: string;
    notice?: string;
    error?: string;
    page?: string;
  }>;
}) {
  const {
    query = "",
    status = "all",
    category = "all",
    notice,
    error,
    page: requestedPage = "1",
  } = await searchParams;
  const parsedPage = Number.parseInt(requestedPage, 10);
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  return (
    <div className={adminTw.pageContent}>
      <header className={adminTw.pageHeader}>
        <div><p>Guidance</p><h1>Research Support</h1></div>
        <div className={adminTw.headerActions}><Link href="/admin/research-support/new"><Plus size={18} /> Add resource</Link></div>
      </header>

      {notice && (
        <p className={adminTw.notice} role="status">
          {notice === "created" && "Resource created successfully."}
          {notice === "updated" && "Resource updated successfully."}
          {notice === "deleted" && "Resource deleted permanently."}
        </p>
      )}
      {error && (
        <p className={`${adminTw.notice} ${adminTw.noticeError}`} role="alert">
          {error === "delete-failed"
            ? "The resource could not be deleted. Check linked records and RLS, then try again."
            : "The resource ID was invalid."}
        </p>
      )}

      <Suspense key={`${query}:${status}:${category}:${page}`} fallback={<ResearcherListLoading />}>
        <ResourceDirectory category={category} page={page} query={query} status={status} />
      </Suspense>
    </div>
  );
}
