import Link from "next/link";
import {
  AlertCircle,
  ArrowUpRight,
  Bell,
  BookOpen,
  ChartColumnBig,
  BriefcaseBusiness,
  CalendarClock,
  CalendarDays,
  Clock,
  FolderKanban,
  FlaskConical,
  Megaphone,
  Users,
} from "lucide-react";
import { requireAdmin } from "@/app/admin/admin-auth";
import { OverviewStatusChart } from "@/components/admin/overview-status-chart";
import { adminTw, statusTw } from "@/components/admin/admin-tailwind";

type RecentItem = {
  id: string;
  kind: "researcher" | "project" | "publication" | "event" | "grant" | "announcement" | "opportunity";
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
  opportunity: { label: "Opportunity", icon: BriefcaseBusiness, href: (id) => `/admin/opportunities/${id}/edit` },
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

function countByPublishStatus(rows: { publish_status: string | null }[]) {
  return rows.reduce(
    (totals, row) => {
      if (row.publish_status === "published") {
        totals.published += 1;
      } else if (row.publish_status === "preview") {
        totals.preview += 1;
      } else {
        totals.draft += 1;
      }
      return totals;
    },
    { published: 0, preview: 0, draft: 0 },
  );
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
    supabase.from("opportunity").select("id,title,publish_status,created_at").order("created_at", { ascending: false }).limit(5),
    supabase.from("event").select("id,title,start_at").eq("publish_status", "published").gte("start_at", new Date().toISOString()).order("start_at", { ascending: true }).limit(4),
    supabase.from("grant").select("id,title,deadline").eq("status", "open").gte("deadline", new Date().toISOString().slice(0, 10)).order("deadline", { ascending: true }).limit(4),
    supabase.from("researcher").select("publish_status"),
    supabase.from("project").select("publish_status"),
    supabase.from("publication").select("publish_status"),
    supabase.from("research_area").select("publish_status"),
  ]);

  if (results.some((result) => result.error)) {
    return (
      <section className={`${adminTw.inlineState} mt-[34px]`}>
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
    recentOpportunities,
    upcomingEvents,
    upcomingDeadlines,
    researcherStatuses,
    projectStatuses,
    publicationStatuses,
    areaStatuses,
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
  const allAttentionClear = attention.every((item) => (item.count ?? 0) === 0);
  const chartData = [
    { type: "Researchers", ...countByPublishStatus(researcherStatuses.data ?? []) },
    { type: "Projects", ...countByPublishStatus(projectStatuses.data ?? []) },
    { type: "Publications", ...countByPublishStatus(publicationStatuses.data ?? []) },
    { type: "Research areas", ...countByPublishStatus(areaStatuses.data ?? []) },
  ];

  const recentItems: RecentItem[] = [
    ...(recentResearchers.data ?? []).map((r) => ({ id: r.id, kind: "researcher" as const, title: r.name, status: r.publish_status, created_at: r.created_at })),
    ...(recentProjects.data ?? []).map((r) => ({ id: r.id, kind: "project" as const, title: r.title, status: r.publish_status, created_at: r.created_at })),
    ...(recentPublications.data ?? []).map((r) => ({ id: r.id, kind: "publication" as const, title: r.title, status: r.publish_status, created_at: r.created_at })),
    ...(recentEvents.data ?? []).map((r) => ({ id: r.id, kind: "event" as const, title: r.title, status: r.publish_status, created_at: r.created_at })),
    ...(recentGrants.data ?? []).map((r) => ({ id: r.id, kind: "grant" as const, title: r.title, status: r.publish_status, created_at: r.created_at })),
    ...(recentAnnouncements.data ?? []).map((r) => ({ id: r.id, kind: "announcement" as const, title: r.title, status: r.publish_status, created_at: r.created_at })),
    ...(recentOpportunities.data ?? []).map((r) => ({ id: r.id, kind: "opportunity" as const, title: r.title, status: r.publish_status ?? "draft", created_at: r.created_at ?? new Date(0).toISOString() })),
  ]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 8);

  const events = upcomingEvents.data ?? [];
  const deadlines = upcomingDeadlines.data ?? [];

  return (
    <>
      <section className="mt-[34px] grid grid-cols-4 border border-[#d4d5ce] bg-[#fffefb] max-[980px]:grid-cols-2 [&>a]:relative [&>a]:min-h-[174px] [&>a]:border-r [&>a]:border-[#d4d5ce] [&>a]:p-6 [&>a:nth-child(4)]:border-r-0 [&>a>span]:text-[#36594b] [&_strong]:mt-[26px] [&_strong]:block [&_strong]:font-sans [&_strong]:text-[44px] [&_strong]:font-normal [&_strong]:leading-none [&_small]:mt-[7px] [&_small]:block [&_small]:text-[13px] [&_small]:text-[#66736d] max-[980px]:[&>a:nth-child(2)]:border-r-0 max-[980px]:[&>a:nth-child(-n+2)]:border-b max-[720px]:mt-6 max-[720px]:[&>a]:min-h-[142px] max-[720px]:[&>a]:p-[18px] max-[720px]:[&_strong]:mt-5 max-[720px]:[&_strong]:text-[38px]" aria-label="Research hub statistics">
        {stats.map(({ label, value, icon: Icon, href }) => (
          <Link className="group" href={href} key={label}>
            <span><Icon size={19} strokeWidth={1.7} /></span>
            <strong>{value ?? "—"}</strong>
            <small>{label}</small>
            <ArrowUpRight className="absolute right-6 top-6 text-[#8c9691] group-hover:text-[#153c2e] max-[720px]:right-[18px] max-[720px]:top-[18px]" size={17} />
          </Link>
        ))}
      </section>

      <section className="mt-[30px] border border-[#d4d5ce] bg-[#fffefb] [&>header]:flex [&>header]:justify-between [&>header]:gap-6 [&>header]:border-b [&>header]:border-[#d4d5ce] [&>header]:px-[26px] [&>header]:py-6 [&>div]:grid [&>div]:grid-cols-3 max-[980px]:[&>div]:grid-cols-1 max-[720px]:[&>header]:block max-[720px]:[&>header]:p-5">
        <header>
          <div className={`flex items-center gap-2.5 ${allAttentionClear ? "text-[#24724c]" : "text-[#9a7d11]"}`}><AlertCircle size={20} /><h2 className="m-0 font-sans text-[27px] font-medium text-[#17251f]">{allAttentionClear ? "Everything is in perfect condition" : "Needs attention"}</h2></div>
          <p className="mt-1.5 text-[13px] text-[#68756f] max-[720px]:mt-[9px]">{allAttentionClear ? "All tracked records are complete and ready." : "Records that may need a quick review."}</p>
        </header>
        <div>
          {attention.map((item) => (
            <Link className="grid min-h-[108px] grid-cols-[42px_1fr_auto] items-center gap-3 border-r border-[#d4d5ce] px-[26px] py-[22px] last:border-r-0 max-[980px]:border-b max-[980px]:border-r-0 max-[980px]:last:border-b-0 max-[720px]:min-h-[88px] max-[720px]:px-5 max-[720px]:py-4" href={item.href} key={item.label}>
              <span className={`grid h-9 w-9 place-items-center rounded-full font-bold ${allAttentionClear ? "bg-[#e4f1e9] text-[#24724c]" : "bg-[#f4ecd0] text-[#715d15]"}`}>{item.count ?? "—"}</span>
              <p>{item.label}</p>
              <ArrowUpRight size={17} />
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-6 border border-[#d4d5ce] bg-[#fffefb] [&>header]:border-b [&>header]:border-[#d4d5ce] [&>header]:px-6 [&>header]:py-[22px] max-[720px]:[&>header]:px-5">
        <header>
          <div className="flex items-center gap-2.5 text-[#36594b]"><ChartColumnBig size={20} /><h2 className="m-0 font-sans text-[23px] font-medium text-[#17251f]">Content visibility</h2></div>
          <p className="mt-1.5 text-[13px] text-[#68756f]">Publishing readiness across the four core content collections.</p>
        </header>
        <OverviewStatusChart data={chartData} />
      </section>

      <div className="mt-6 grid grid-cols-[1.4fr_1fr] items-start gap-6 max-[980px]:grid-cols-1">
        <section className="border border-[#d4d5ce] bg-[#fffefb] [&>header]:border-b [&>header]:border-[#d4d5ce] [&>header]:px-6 [&>header]:py-[22px] [&>ul]:m-0 [&>ul]:list-none [&>ul]:p-0 [&>ul>li]:border-t [&>ul>li]:border-[#e4e5df] [&>ul>li:first-child]:border-t-0">
          <header>
            <div className="flex items-center gap-2.5 text-[#36594b]"><Clock size={20} /><h2 className="m-0 font-sans text-[23px] font-medium text-[#17251f]">Recent activity</h2></div>
            <p className="mt-1.5 text-[13px] text-[#68756f]">The latest records added across the hub.</p>
          </header>
          {recentItems.length === 0 ? (
            <p className="p-6 text-[13px] text-[#68756f]">Nothing has been added yet.</p>
          ) : (
            <ul>
              {recentItems.map((item) => {
                const meta = KIND_META[item.kind];
                const Icon = meta.icon;
                return (
                  <li key={`${item.kind}-${item.id}`}>
                    <Link className="flex items-center gap-3 px-6 py-3.5 hover:bg-[#f5f4ef]" href={meta.href(item.id)}>
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#e7e8e2] text-[#36594b]"><Icon size={16} strokeWidth={1.8} /></span>
                      <span className="block min-w-0 flex-1 [&_strong]:block [&_strong]:truncate [&_strong]:font-sans [&_strong]:text-[15px] [&_strong]:font-semibold [&_small]:mt-0.5 [&_small]:block [&_small]:text-xs [&_small]:text-[#68756f]">
                        <strong>{item.title}</strong>
                        <small>{meta.label} · <i className={`${statusTw(item.status)} !px-[7px] !py-px !text-[10px]`}>{item.status}</i></small>
                      </span>
                      <span className="shrink-0 whitespace-nowrap text-[11px] text-[#9ba39f]">{timeAgo(item.created_at)}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section className="border border-[#d4d5ce] bg-[#fffefb] [&>header]:border-b [&>header]:border-[#d4d5ce] [&>header]:px-6 [&>header]:py-[22px]">
          <header>
            <div className="flex items-center gap-2.5 text-[#36594b]"><CalendarClock size={20} /><h2 className="m-0 font-sans text-[23px] font-medium text-[#17251f]">Upcoming</h2></div>
            <p className="mt-1.5 text-[13px] text-[#68756f]">Events and grant deadlines on the horizon.</p>
          </header>

          <div className="px-6 py-5 [&_h3]:mb-1 [&_h3]:text-[11px] [&_h3]:font-bold [&_h3]:uppercase [&_h3]:tracking-[.03em] [&_h3]:text-[#68756f] [&>ul]:m-0 [&>ul]:list-none [&>ul]:p-0 [&>ul>li>a]:flex [&>ul>li>a]:items-center [&>ul>li>a]:justify-between [&>ul>li>a]:gap-2.5 [&>ul>li>a]:border-t [&>ul>li>a]:border-[#eceee7] [&>ul>li>a]:py-2.5 [&>ul>li:first-child>a]:border-t-0 [&>ul>li>a>span]:min-w-0 [&>ul>li>a>span]:truncate [&>ul>li>a>span]:text-sm [&>ul>li>a>span]:text-[#17251f] [&>ul>li>a>small]:shrink-0 [&>ul>li>a>small]:text-xs [&>ul>li>a>small]:text-[#68756f]">
            <h3>Events</h3>
            {events.length === 0 ? (
              <p className="p-6 text-[13px] text-[#68756f]">No upcoming published events.</p>
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
            <Link className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-bold text-[#36594b] underline underline-offset-[3px]" href="/admin/events">View all events<ArrowUpRight size={14} /></Link>
          </div>

          <div className="border-t border-[#d4d5ce] px-6 py-5 [&_h3]:mb-1 [&_h3]:text-[11px] [&_h3]:font-bold [&_h3]:uppercase [&_h3]:tracking-[.03em] [&_h3]:text-[#68756f] [&>ul]:m-0 [&>ul]:list-none [&>ul]:p-0 [&>ul>li>a]:flex [&>ul>li>a]:items-center [&>ul>li>a]:justify-between [&>ul>li>a]:gap-2.5 [&>ul>li>a]:border-t [&>ul>li>a]:border-[#eceee7] [&>ul>li>a]:py-2.5 [&>ul>li:first-child>a]:border-t-0 [&>ul>li>a>span]:min-w-0 [&>ul>li>a>span]:truncate [&>ul>li>a>span]:text-sm [&>ul>li>a>span]:text-[#17251f] [&>ul>li>a>small]:shrink-0 [&>ul>li>a>small]:text-xs [&>ul>li>a>small]:text-[#68756f]">
            <h3>Grant deadlines</h3>
            {deadlines.length === 0 ? (
              <p className="p-6 text-[13px] text-[#68756f]">No open grant deadlines.</p>
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
            <Link className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-bold text-[#36594b] underline underline-offset-[3px]" href="/admin/grants">View all grants<ArrowUpRight size={14} /></Link>
          </div>
        </section>
      </div>
    </>
  );
}
