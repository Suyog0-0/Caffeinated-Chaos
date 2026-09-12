import Image from "next/image";
import { ExternalLink, LogOut } from "lucide-react";
import { AdminNavigation } from "@/components/admin/admin-navigation";
import { logoutAction } from "@/app/admin/actions";
import { adminTw } from "@/components/admin/admin-tailwind";

export function AdminSidebar({
  admin,
}: {
  admin: { name: string; email: string; role: string };
}) {
  return (
    <aside className={adminTw.sidebar}>
      <div className={adminTw.brand}>
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
        className={adminTw.publicLink}
        href="/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <ExternalLink size={17} />
        Go to public site
      </a>

      <div className={adminTw.account}>
        <span className="grid h-[34px] w-[34px] place-items-center rounded-full bg-[#213451] text-[11px] font-bold text-white">{admin.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</span>
        <div className="min-w-0">
          <strong className="block truncate text-[13px] text-white">{admin.name}</strong>
          <small className="mt-0.5 block text-[11px] text-[#8996aa]">{admin.role === "super_admin" ? "Super admin" : "Admin"}</small>
        </div>
        <form action={logoutAction}>
          <button className="grid cursor-pointer place-items-center border-0 bg-transparent p-[7px] text-[#8996aa] hover:text-white" aria-label="Sign out" title="Sign out" type="submit">
            <LogOut size={18} />
          </button>
        </form>
      </div>
    </aside>
  );
}
