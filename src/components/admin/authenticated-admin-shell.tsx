import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { requireAdmin } from "@/app/admin/admin-auth";
import { adminTw } from "@/components/admin/admin-tailwind";

export async function AuthenticatedAdminShell({ children }: { children: React.ReactNode }) {
  const { admin } = await requireAdmin();

  return (
    <div className={adminTw.shell}>
      <AdminSidebar admin={admin} />
      <main className={adminTw.main}>{children}</main>
    </div>
  );
}
