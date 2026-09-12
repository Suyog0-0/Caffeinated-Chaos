import Link from "next/link";
import { Suspense } from "react";
import { Plus } from "lucide-react";
import { PublicationDirectory } from "@/components/admin/publication-directory";

function PublicationListLoading() {
  return <div aria-label="Loading publications" className="admin-list-loading"><i /><i /><i /></div>;
}

export default async function PublicationsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; notice?: string; page?: string; query?: string; status?: string }>;
}) {
  const params = await searchParams;
  const query = params.query?.slice(0, 100) ?? "";
  const status = ["draft", "preview", "published"].includes(params.status ?? "") ? params.status! : "all";
  const parsedPage = Number(params.page ?? "1");
  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  return (
    <div className="admin-page-content">
      <header className="admin-page-header">
        <div><p>Content</p><h1>Publications</h1></div>
        <div className="admin-page-header-actions">
          <Link href="/admin/publications/new"><Plus size={18} /> Add publication</Link>
        </div>
      </header>

      {params.notice && (
        <p className="admin-notice" role="status">
          {params.notice === "created" && "Publication created successfully."}
          {params.notice === "updated" && "Publication updated successfully."}
          {params.notice === "deleted" && "Publication deleted permanently."}
        </p>
      )}
      {params.error && (
        <p className="admin-notice admin-notice-error" role="alert">
          {params.error === "delete-failed"
            ? "The publication could not be deleted. Check linked records and try again."
            : "The publication ID was invalid."}
        </p>
      )}

      <Suspense key={`${query}:${status}:${page}`} fallback={<PublicationListLoading />}>
        <PublicationDirectory page={page} query={query} status={status} />
      </Suspense>
    </div>
  );
}
