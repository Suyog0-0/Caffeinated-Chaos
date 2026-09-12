import { Suspense } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import { ResearcherListLoading } from "@/components/admin/admin-loading";
import { ResearcherDirectory } from "@/components/admin/researcher-directory";
import { adminTw } from "@/components/admin/admin-tailwind";

export default async function ResearchersPage({
  searchParams,
}: {
  searchParams: Promise<{
    query?: string;
    status?: string;
    notice?: string;
    error?: string;
    page?: string;
  }>;
}) {
  const {
    query = "",
    status = "all",
    notice,
    error: actionError,
    page: requestedPage = "1",
  } = await searchParams;
  const parsedPage = Number.parseInt(requestedPage, 10);
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  return (
    <div className={adminTw.pageContent}>
      <header className={adminTw.pageHeader}>
        <div><p>Directory</p><h1>Researchers</h1></div>
        <div className={adminTw.headerActions}>
          <Link href="/admin/researchers/new"><Plus size={18} /> Add researcher</Link>
        </div>
      </header>

      {notice && (
        <p className={adminTw.notice} role="status">
          {notice === "created" && "Researcher created successfully."}
          {notice === "updated" && "Researcher updated successfully."}
          {notice === "deleted" && "Researcher deleted permanently."}
        </p>
      )}
      {actionError && (
        <p className={`${adminTw.notice} ${adminTw.noticeError}`} role="alert">
          {actionError === "delete-failed"
            ? "The researcher could not be deleted. Check linked records and try again."
            : "The researcher ID was invalid."}
        </p>
      )}

      <Suspense key={`${query}:${status}:${page}`} fallback={<ResearcherListLoading />}>
        <ResearcherDirectory page={page} query={query} status={status} />
      </Suspense>
    </div>
  );
}
