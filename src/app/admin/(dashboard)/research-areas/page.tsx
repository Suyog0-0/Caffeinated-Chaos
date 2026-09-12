import Link from "next/link";
import { Plus } from "lucide-react";
import { Suspense } from "react";
import { ResearcherListLoading } from "@/components/admin/admin-loading";
import { ResearchAreaDirectory } from "@/components/admin/research-area-directory";

export default async function ResearchAreasAdminPage({
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
    error,
    page: requestedPage = "1",
  } = await searchParams;
  const parsedPage = Number.parseInt(requestedPage, 10);
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  return (
    <div className="admin-page-content">
      <header className="admin-page-header">
        <div><p>Taxonomy</p><h1>Research Areas</h1></div>
        <div className="admin-page-header-actions">
          <Link href="/admin/research-areas/new"><Plus size={18} /> Add research area</Link>
        </div>
      </header>

      {notice && (
        <p className="admin-notice" role="status">
          {notice === "created" && "Research area created successfully."}
          {notice === "updated" && "Research area updated successfully."}
          {notice === "deleted" && "Research area deleted permanently."}
        </p>
      )}
      {error && (
        <p className="admin-notice admin-notice-error" role="alert">
          {error === "delete-failed"
            ? "The research area could not be deleted. Check linked projects and try again."
            : "The research area ID was invalid."}
        </p>
      )}

      <Suspense key={`${query}:${status}:${page}`} fallback={<ResearcherListLoading />}>
        <ResearchAreaDirectory page={page} query={query} status={status} />
      </Suspense>
    </div>
  );
}
