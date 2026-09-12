"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { ResearchAreaDeleteButton } from "@/components/admin/research-area-delete-button";

export type ResearchAreaRowValue = {
  id: string;
  slug: string;
  name: string;
  publish_status: string;
  is_active: boolean;
  is_demo_data: boolean;
};

export function ResearchAreaRow({ researchArea }: { researchArea: ResearchAreaRowValue }) {
  const router = useRouter();
  const editHref = `/admin/research-areas/${researchArea.id}/edit`;

  function openEditor() {
    router.push(editHref);
  }

  return (
    <article
      aria-label={`Edit ${researchArea.name}`}
      className="admin-researcher-row admin-clickable-row"
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
      <div className="admin-researcher-name">
        <span>{researchArea.name.slice(0, 2).toUpperCase()}</span>
        <div><strong>{researchArea.name}</strong><small>/{researchArea.slug}</small></div>
      </div>
      <p data-label="Status"><i className={`admin-status admin-status-${researchArea.publish_status}`}>{researchArea.publish_status}</i></p>
      <p data-label="Availability">{researchArea.is_active ? "Active" : "Inactive"}</p>
      <p data-label="Source">{researchArea.is_demo_data ? "Demo data" : "College record"}</p>
      <div className="admin-row-actions" onClick={(event) => event.stopPropagation()} onKeyDown={(event) => event.stopPropagation()}>
        <Link aria-label={`Edit ${researchArea.name}`} href={editHref} title="Edit research area"><Pencil size={17} /></Link>
        <ResearchAreaDeleteButton id={researchArea.id} name={researchArea.name} />
      </div>
    </article>
  );
}
