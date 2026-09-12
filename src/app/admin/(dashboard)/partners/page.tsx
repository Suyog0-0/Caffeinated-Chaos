import { Suspense } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PartnerDirectory } from "@/components/admin/partner-directory";
import { ResearcherListLoading } from "@/components/admin/admin-loading";
import { adminTw } from "@/components/admin/admin-tailwind";

export default async function PartnersAdminPage({ searchParams }: { searchParams: Promise<{ query?: string; status?: string; type?: string; notice?: string; error?: string; page?: string }> }) {
  const { query = "", status = "all", type = "all", notice, error, page: requestedPage = "1" } = await searchParams;
  const parsedPage = Number.parseInt(requestedPage, 10);
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  return (
    <div className={adminTw.pageContent}>
      <header className={adminTw.pageHeader}>
        <div><p>Network</p><h1>Partners</h1></div>
        <div className={adminTw.headerActions}><Link href="/admin/partners/new"><Plus size={18} /> Add partner</Link></div>
      </header>
      {notice && <p className={adminTw.notice} role="status">{notice === "created" && "Partner created successfully."}{notice === "updated" && "Partner updated successfully."}{notice === "deleted" && "Partner deleted permanently."}</p>}
      {error && <p className={`${adminTw.notice} ${adminTw.noticeError}`} role="alert">{error === "delete-failed" ? "The partner could not be deleted. Check linked projects, publications, and RLS, then try again." : "The partner ID was invalid."}</p>}
      <Suspense key={`${query}:${status}:${type}:${page}`} fallback={<ResearcherListLoading />}>
        <PartnerDirectory page={page} query={query} status={status} type={type} />
      </Suspense>
    </div>
  );
}
