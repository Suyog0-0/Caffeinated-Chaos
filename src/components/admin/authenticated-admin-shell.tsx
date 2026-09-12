import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { requireAdmin } from "@/app/admin/admin-auth";

export async function AuthenticatedAdminShell({ children }: { children: React.ReactNode }) {
  const { admin } = await requireAdmin();

  return (
    <div className="admin-shell">
      <AdminSidebar admin={admin} />
      <main className="admin-main">{children}</main>
    </div>
  );
}
