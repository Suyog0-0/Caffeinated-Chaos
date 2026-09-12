import { Suspense } from "react";
import { OverviewDataLoading } from "@/components/admin/admin-loading";
import { OverviewData } from "@/components/admin/overview-data";
import { adminTw } from "@/components/admin/admin-tailwind";

export default function AdminOverviewPage() {
  return (
    <div className={adminTw.pageContent}>
      <header className={adminTw.pageHeader}>
        <div><p>Admin workspace</p><h1>Overview</h1></div>
      </header>
      <Suspense fallback={<OverviewDataLoading />}>
        <OverviewData />
      </Suspense>
    </div>
  );
}
