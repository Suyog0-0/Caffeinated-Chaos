import { Suspense } from "react";
import { OverviewDataLoading } from "@/components/admin/admin-loading";
import { OverviewData } from "@/components/admin/overview-data";

export default function AdminOverviewPage() {
  return (
    <div className="admin-page-content">
      <header className="admin-page-header">
        <div><p>Admin workspace</p><h1>Overview</h1></div>
        <span>Live data from Supabase</span>
      </header>
      <Suspense fallback={<OverviewDataLoading />}>
        <OverviewData />
      </Suspense>
    </div>
  );
}
