import { Suspense } from "react";
import { AdminShellLoading } from "@/components/admin/admin-loading";
import { AuthenticatedAdminShell } from "@/components/admin/authenticated-admin-shell";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<AdminShellLoading />}>
      <AuthenticatedAdminShell>{children}</AuthenticatedAdminShell>
    </Suspense>
  );
}
