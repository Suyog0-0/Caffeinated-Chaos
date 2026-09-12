import Image from "next/image";
import { ExternalLink, LogOut } from "lucide-react";
import { AdminNavigation } from "@/components/admin/admin-navigation";
import { logoutAction } from "@/src/app/admin/actions";

export function AdminSidebar({
  admin,
}: {
  admin: { name: string; email: string; role: string };
}) {
  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <Image
          alt="IJMR — Journal of Multidisciplinary Research"
          height={67}
          priority
          src="/ijmr-logo-white.svg"
          width={170}
        />
        <small>Admin workspace</small>
      </div>

      <AdminNavigation />

      <a
        className="admin-public-link"
        href="/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <ExternalLink size={17} />
        Go to public site
      </a>

      <div className="admin-account">
        <span>{admin.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</span>
        <div>
          <strong>{admin.name}</strong>
          <small>{admin.role === "super_admin" ? "Super admin" : "Admin"}</small>
        </div>
        <form action={logoutAction}>
          <button aria-label="Sign out" title="Sign out" type="submit">
            <LogOut size={18} />
          </button>
        </form>
      </div>
    </aside>
  );
}
