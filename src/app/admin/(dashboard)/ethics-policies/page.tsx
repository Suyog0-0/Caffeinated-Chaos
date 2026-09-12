import { Suspense } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { EthicsPolicyDirectory } from "@/components/admin/ethics-policy-directory";
import { ResearcherListLoading } from "@/components/admin/admin-loading";
import { adminTw } from "@/components/admin/admin-tailwind";

export default async function EthicsPoliciesAdminPage({
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
    <div className={adminTw.pageContent}>
      <header className={adminTw.pageHeader}>
        <div><p>Governance</p><h1>Ethics Policies</h1></div>
        <div className={adminTw.headerActions}>
          <Link href="/admin/ethics-policies/new"><Plus size={18} /> Add policy</Link>
        </div>
      </header>

      {notice && (
        <p className={adminTw.notice} role="status">
          {notice === "created" && "Ethics policy created successfully."}
          {notice === "updated" && "Ethics policy updated successfully."}
          {notice === "deleted" && "Ethics policy deleted permanently."}
        </p>
      )}
      {error && (
        <p className={`${adminTw.notice} ${adminTw.noticeError}`} role="alert">
          {error === "delete-failed"
            ? "The ethics policy could not be deleted. Check linked records and RLS, then try again."
            : "The ethics policy ID was invalid."}
        </p>
      )}

      <Suspense key={`${query}:${status}:${page}`} fallback={<ResearcherListLoading />}>
        <EthicsPolicyDirectory page={page} query={query} status={status} />
      </Suspense>
    </div>
  );
}
