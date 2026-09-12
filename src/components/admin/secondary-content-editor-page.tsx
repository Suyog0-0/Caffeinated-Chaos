import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { SecondaryContentForm } from "@/components/admin/secondary-content-form";
import { requireAdmin } from "@/app/admin/admin-auth";
import type { SecondaryContentKind } from "@/app/secondary-content-actions";
import type { PersonOption, SelectedPerson } from "@/components/admin/people-picker";

const content = {
  event: { title: "Event", route: "/admin/events" },
  grant: { title: "Grant", route: "/admin/grants" },
  announcement: { title: "Announcement", route: "/admin/announcements" },
} as const;

export async function SecondaryContentEditorPage({ kind, id }: { kind: SecondaryContentKind; id?: string }) {
  const item = content[kind];
  const { supabase } = await requireAdmin();
  let record;
  let researchers: PersonOption[] = [];
  let speakers: SelectedPerson[] = [];

  if (id) {
    const { data } = await supabase.from(kind).select("*").eq("id", id).maybeSingle();
    if (!data) notFound();
    record = data;
  }

  if (kind === "event") {
    const [{ data: researcherRows }, { data: speakerRows }] = await Promise.all([
      supabase
        .from("researcher")
        .select("id, name, position, department, email, photo_url")
        .order("name"),
      id
        ? supabase
            .from("event_speaker")
            .select("researcher:researcher_id(id, name, position, department, email, photo_url)")
            .eq("event_id", id)
        : Promise.resolve({ data: [] }),
    ]);

    researchers = (researcherRows ?? []) as PersonOption[];
    speakers = (speakerRows ?? [])
      .flatMap((row) => row.researcher ? [row.researcher] : [])
      .map((researcher) => researcher as unknown as SelectedPerson);
  }

  return (
    <div className="mx-auto w-[min(calc(100%-2rem),55rem)] py-10 sm:w-[min(calc(100%-2.75rem),55rem)] sm:py-14">
      <header className="border-b border-[#c9cbc4] pb-5">
        <div><Link className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#53645c] hover:text-[#153c2e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#153c2e]" href={item.route}><ArrowLeft size={16} /> {item.title}s</Link><h1 className="text-4xl font-medium tracking-[-0.035em] text-[#17251f] sm:text-[3.25rem] sm:leading-none">{id ? `Edit ${item.title.toLowerCase()}` : `Add ${item.title.toLowerCase()}`}</h1></div>
      </header>
      <SecondaryContentForm item={record} kind={kind} researchers={researchers} speakers={speakers} />
    </div>
  );
}
