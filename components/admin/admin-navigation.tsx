"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  BookOpen,
  CalendarDays,
  ChevronDown,
  FlaskConical,
  FolderKanban,
  LayoutDashboard,
  Megaphone,
  Menu,
  Users,
} from "lucide-react";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/researchers", label: "Researchers", icon: Users },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/publications", label: "Publications", icon: BookOpen },
  { href: "/admin/events", label: "Events", icon: CalendarDays },
  { href: "/admin/grants", label: "Grants", icon: Bell },
  { href: "/admin/announcements", label: "Announcements", icon: Megaphone },
  { href: "/admin/research-areas", label: "Research Areas", icon: FlaskConical },
];

function Navigation({ pathname }: { pathname: string }) {
  return (
    <nav aria-label="Admin navigation" className="admin-nav">
      {links.map(({ href, label, icon: Icon }) => {
        const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
        return (
          <Link aria-current={active ? "page" : undefined} href={href} key={href}>
            <Icon aria-hidden="true" size={19} strokeWidth={1.7} />
            <span>{label}</span>
            {active && <i aria-hidden="true" />}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminNavigation() {
  const pathname = usePathname();
  const current = links.find(({ href }) =>
    href === "/admin" ? pathname === href : pathname.startsWith(href),
  );

  return (
    <>
      <details className="admin-mobile-nav">
        <summary>
          <Menu size={20} />
          <span>{current?.label ?? "Admin menu"}</span>
          <ChevronDown size={17} />
        </summary>
        <Navigation pathname={pathname} />
      </details>
      <div className="admin-desktop-nav"><Navigation pathname={pathname} /></div>
    </>
  );
}
