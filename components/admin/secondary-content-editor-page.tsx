import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { SecondaryContentForm } from "@/components/admin/secondary-content-form";
import { requireAdmin } from "@/src/app/admin/admin-auth";
import type { SecondaryContentKind } from "@/src/app/admin/secondary-content-actions";

const content = {
  event: { title: "Event", route: "/admin/events" },
  grant: { title: "Grant", route: "/admin/grants" },
  announcement: { title: "Announcement", route: "/admin/announcements" },
} as const;

export async function SecondaryContentEditorPage({ kind, id }: { kind: SecondaryContentKind; id?: string }) {
  const item = content[kind];
  let record;
  if (id) {
    const { supabase } = await requireAdmin();
    const { data } = await supabase.from(kind).select("*").eq("id", id).maybeSingle();
    if (!data) notFound();
    record = data;
  }
  return (
    <div className="admin-page-content admin-editor-page">
      <header className="admin-page-header">
        <div><Link className="admin-header-back-link" href={item.route}><ArrowLeft size={16} /> {item.title}s</Link><h1>{id ? `Edit ${item.title.toLowerCase()}` : `Add ${item.title.toLowerCase()}`}</h1></div>
      </header>
      <SecondaryContentForm item={record} kind={kind} />
    </div>
  );
}
