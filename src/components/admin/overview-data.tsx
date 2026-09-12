import Link from "next/link";
import {
  AlertCircle,
  ArrowUpRight,
  Bell,
  BookOpen,
  CalendarClock,
  CalendarDays,
  Clock,
  FolderKanban,
  FlaskConical,
  Megaphone,
  Users,
} from "lucide-react";
import { requireAdmin } from "@/app/admin/admin-auth";

type RecentItem = {
  id: string;
  kind: "researcher" | "project" | "publication" | "event" | "grant" | "announcement";
  title: string;
  status: string;
  created_at: string;
};

const KIND_META: Record<RecentItem["kind"], { label: string; icon: typeof Users; href: (id: string) => string }> = {
  researcher: { label: "Researcher", icon: Users, href: (id) => `/admin/researchers/${id}/edit` },
  project: { label: "Project", icon: FolderKanban, href: (id) => `/admin/projects/${id}/edit` },
  publication: { label: "Publication", icon: BookOpen, href: (id) => `/admin/publications/${id}/edit` },
  event: { label: "Event", icon: CalendarDays, href: (id) => `/admin/events/${id}/edit` },
  grant: { label: "Grant", icon: Bell, href: (id) => `/admin/grants/${id}/edit` },
  announcement: { label: "Announcement", icon: Megaphone, href: (id) => `/admin/announcements/${id}/edit` },
};

function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

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
    supabase.from("researcher").select("id,name,publish_status,created_at").order("created_at", { ascending: false }).limit(5),
    supabase.from("project").select("id,title,publish_status,created_at").order("created_at", { ascending: false }).limit(5),
    supabase.from("publication").select("id,title,publish_status,created_at").order("created_at", { ascending: false }).limit(5),
    supabase.from("event").select("id,title,publish_status,created_at").order("created_at", { ascending: false }).limit(5),
    supabase.from("grant").select("id,title,publish_status,created_at").order("created_at", { ascending: false }).limit(5),
    supabase.from("announcement").select("id,title,publish_status,created_at").order("created_at", { ascending: false }).limit(5),
    supabase.from("event").select("id,title,start_at").eq("publish_status", "published").gte("start_at", new Date().toISOString()).order("start_at", { ascending: true }).limit(4),
    supabase.from("grant").select("id,title,deadline").eq("status", "open").gte("deadline", new Date().toISOString().slice(0, 10)).order("deadline", { ascending: true }).limit(4),
  ]);

  if (results.some((result) => result.error)) {
    return (
      <section className="admin-inline-state admin-overview-error">
        <AlertCircle size={24} />
        <div><h2>Overview data could not be loaded</h2><p>Check the Supabase connection and admin RLS policies, then refresh this page.</p></div>
      </section>
    );
  }

  const [
    researchers,
    projects,
    publications,
    areas,
    incomplete,
    unlinked,
    metadata,
    recentResearchers,
    recentProjects,
    recentPublications,
    recentEvents,
    recentGrants,
    recentAnnouncements,
    upcomingEvents,
    upcomingDeadlines,
  ] = results;

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

  const recentItems: RecentItem[] = [
    ...(recentResearchers.data ?? []).map((r) => ({ id: r.id, kind: "researcher" as const, title: r.name, status: r.publish_status, created_at: r.created_at })),
    ...(recentProjects.data ?? []).map((r) => ({ id: r.id, kind: "project" as const, title: r.title, status: r.publish_status, created_at: r.created_at })),
    ...(recentPublications.data ?? []).map((r) => ({ id: r.id, kind: "publication" as const, title: r.title, status: r.publish_status, created_at: r.created_at })),
    ...(recentEvents.data ?? []).map((r) => ({ id: r.id, kind: "event" as const, title: r.title, status: r.publish_status, created_at: r.created_at })),
    ...(recentGrants.data ?? []).map((r) => ({ id: r.id, kind: "grant" as const, title: r.title, status: r.publish_status, created_at: r.created_at })),
    ...(recentAnnouncements.data ?? []).map((r) => ({ id: r.id, kind: "announcement" as const, title: r.title, status: r.publish_status, created_at: r.created_at })),
  ]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 8);

  const events = upcomingEvents.data ?? [];
  const deadlines = upcomingDeadlines.data ?? [];

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

      <div className="admin-overview-split">
        <section className="admin-recent">
          <header>
            <div><Clock size={20} /><h2>Recent activity</h2></div>
            <p>The latest records added across the hub.</p>
          </header>
          {recentItems.length === 0 ? (
            <p className="admin-recent-empty">Nothing has been added yet.</p>
          ) : (
            <ul>
              {recentItems.map((item) => {
                const meta = KIND_META[item.kind];
                const Icon = meta.icon;
                return (
                  <li key={`${item.kind}-${item.id}`}>
                    <Link href={meta.href(item.id)}>
                      <span className="admin-recent-icon"><Icon size={16} strokeWidth={1.8} /></span>
                      <span className="admin-recent-body">
                        <strong>{item.title}</strong>
                        <small>{meta.label} · <i className={`admin-status admin-status-${item.status}`}>{item.status}</i></small>
                      </span>
                      <span className="admin-recent-time">{timeAgo(item.created_at)}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section className="admin-upcoming">
          <header>
            <div><CalendarClock size={20} /><h2>Upcoming</h2></div>
            <p>Events and grant deadlines on the horizon.</p>
          </header>

          <div className="admin-upcoming-group">
            <h3>Events</h3>
            {events.length === 0 ? (
              <p className="admin-recent-empty">No upcoming published events.</p>
            ) : (
              <ul>
                {events.map((event) => (
                  <li key={event.id}>
                    <Link href={`/admin/events/${event.id}/edit`}>
                      <span>{event.title}</span>
                      <small>{event.start_at ? formatDate(event.start_at) : "No date"}</small>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <Link className="admin-upcoming-link" href="/admin/events">View all events<ArrowUpRight size={14} /></Link>
          </div>

          <div className="admin-upcoming-group">
            <h3>Grant deadlines</h3>
            {deadlines.length === 0 ? (
              <p className="admin-recent-empty">No open grant deadlines.</p>
            ) : (
              <ul>
                {deadlines.map((grant) => (
                  <li key={grant.id}>
                    <Link href={`/admin/grants/${grant.id}/edit`}>
                      <span>{grant.title}</span>
                      <small>{grant.deadline ? formatDate(grant.deadline) : "No deadline"}</small>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <Link className="admin-upcoming-link" href="/admin/grants">View all grants<ArrowUpRight size={14} /></Link>
          </div>
        </section>
      </div>
    </>
  );
}