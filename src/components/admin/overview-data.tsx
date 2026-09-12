import Link from "next/link";
import {
  AlertCircle,
  ArrowUpRight,
  BookOpen,
  FolderKanban,
  FlaskConical,
  Users,
} from "lucide-react";
import { requireAdmin } from "@/app/admin/admin-auth";

export async function OverviewData() {
  const { supabase } = await requireAdmin();
  const results = await Promise.all([
    supabase.from("researcher").select("*", { count: "exact", head: true }),
    supabase.from("project").select("*", { count: "exact", head: true }).eq("status", "ongoing"),
    supabase.from("publication").select("*", { count: "exact", head: true }),
    supabase.from("research_area").select("*", { count: "exact", head: true }).eq("is_active", true),
    supabase.from("researcher").select("*", { count: "exact", head: true }).or("biography.is.null,email.is.null,department.is.null"),
    supabase.from("project").select("*", { count: "exact", head: true }).is("research_area_id", null),
    supabase.from("publication").select("*", { count: "exact", head: true }).or("summary.is.null,publication_type.is.null,year.is.null"),
  ]);

  if (results.some((result) => result.error)) {
    return (
      <section className="admin-inline-state admin-overview-error">
        <AlertCircle size={24} />
        <div><h2>Overview data could not be loaded</h2><p>Check the Supabase connection and admin RLS policies, then refresh this page.</p></div>
      </section>
    );
  }

  const [researchers, projects, publications, areas, incomplete, unlinked, metadata] = results;
  const stats = [
    { label: "Researchers", value: researchers.count, icon: Users, href: "/admin/researchers" },
    { label: "Active projects", value: projects.count, icon: FolderKanban, href: "/admin/projects" },
    { label: "Publications", value: publications.count, icon: BookOpen, href: "/admin/publications" },
    { label: "Research areas", value: areas.count, icon: FlaskConical, href: "/admin/research-areas" },
  ];
  const attention = [
    { label: "Incomplete researcher profiles", count: incomplete.count, href: "/admin/researchers" },
    { label: "Projects without a research area", count: unlinked.count, href: "/admin/projects" },
    { label: "Publications missing metadata", count: metadata.count, href: "/admin/publications" },
  ];

  return (
    <>
      <section className="admin-stat-grid" aria-label="Research hub statistics">
        {stats.map(({ label, value, icon: Icon, href }) => (
          <Link href={href} key={label}>
            <span><Icon size={19} strokeWidth={1.7} /></span>
            <strong>{value ?? "—"}</strong>
            <small>{label}</small>
            <ArrowUpRight className="admin-stat-arrow" size={17} />
          </Link>
        ))}
      </section>

      <section className="admin-attention">
        <header>
          <div><AlertCircle size={20} /><h2>Needs attention</h2></div>
          <p>Records that may need a quick review.</p>
        </header>
        <div>
          {attention.map((item) => (
            <Link href={item.href} key={item.label}>
              <span>{item.count ?? "—"}</span>
              <p>{item.label}</p>
              <ArrowUpRight size={17} />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
