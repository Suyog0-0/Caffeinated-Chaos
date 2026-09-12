"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExternalLink, Pencil } from "lucide-react";
import { DeleteResearcherButton } from "@/components/admin/delete-researcher-button";
import { adminTw, statusTw } from "@/components/admin/admin-tailwind";

type ResearcherRowData = {
  id: string;
  name: string;
  position: string | null;
  department: string | null;
  email: string | null;
  photo_url: string | null;
  publish_status: string;
  is_demo_data: boolean;
};

export function ResearcherRow({ researcher }: { researcher: ResearcherRowData }) {
  const router = useRouter();
  const editHref = `/admin/researchers/${researcher.id}/edit`;
  const initials = researcher.name.split(" ").map((part) => part[0]).join("").slice(0, 2);

  function openEditor() {
    router.push(editHref);
  }

  return (
    <article
      aria-label={`Edit ${researcher.name}`}
      className={`${adminTw.row} ${adminTw.clickableRow}`}
      onClick={openEditor}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openEditor();
        }
      }}
      role="link"
      tabIndex={0}
    >
      <div className={adminTw.personName}>
        {researcher.photo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img alt="" src={researcher.photo_url} />
        ) : (
          <span>{initials}</span>
        )}
        <div><strong>{researcher.name}</strong><small>{researcher.position ?? researcher.email ?? "Position not added"}</small></div>
      </div>
      <p className={adminTw.rowMeta} data-label="Department">{researcher.department ?? "Not assigned"}</p>
      <p className={adminTw.rowMeta} data-label="Status"><i className={statusTw(researcher.publish_status)}>{researcher.publish_status}</i></p>
      <p className={adminTw.rowMeta} data-label="Source">{researcher.is_demo_data ? "Demo data" : "College record"}</p>
      <div className={adminTw.rowActions} onClick={(event) => event.stopPropagation()} onKeyDown={(event) => event.stopPropagation()}>
        <Link aria-label={`Edit ${researcher.name}`} href={editHref} title="Edit researcher"><Pencil size={17} /></Link>
        <Link aria-label={`View ${researcher.name}'s public profile`} href={`/people/${researcher.id}`} title="View public profile"><ExternalLink size={17} /></Link>
        <DeleteResearcherButton id={researcher.id} name={researcher.name} />
      </div>
    </article>
  );
}
