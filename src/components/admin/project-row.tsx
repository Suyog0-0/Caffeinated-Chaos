"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExternalLink, Pencil, Trash2, X } from "lucide-react";
import { useState } from "react";
import { deleteProjectAction } from "@/app/projects-actions";
import { adminTw, statusTw } from "@/components/admin/admin-tailwind";

type ProjectRowData = {
  id: string;
  slug: string;
  title: string;
  status: string;
  publish_status: string;
  researchArea: string;
};

export function ProjectRow({ project }: { project: ProjectRowData }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const editHref = `/admin/projects/${project.id}/edit`;

  function openEditor() {
    router.push(editHref);
  }

  return (
    <article
      aria-label={`Edit ${project.title}`}
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
      <div className={adminTw.personName}><div><strong>{project.title}</strong><small>/{project.slug}</small></div></div>
      <p className={adminTw.rowMeta} data-label="Research area">{project.researchArea}</p>
      <p className={adminTw.rowMeta} data-label="Project status"><i className={statusTw(project.status)}>{project.status}</i></p>
      <p className={adminTw.rowMeta} data-label="Visibility"><i className={statusTw(project.publish_status)}>{project.publish_status}</i></p>
      <div className={adminTw.rowActions} onClick={(event) => event.stopPropagation()} onKeyDown={(event) => event.stopPropagation()}>
        <Link aria-label={`Edit ${project.title}`} href={editHref} title="Edit project"><Pencil size={17} /></Link>
        <Link aria-label={`View ${project.title} on the public site`} href={`/projects/${project.slug}`} target="_blank" title="View public project"><ExternalLink size={17} /></Link>
        {!confirming ? (
          <button aria-label={`Delete ${project.title}`} onClick={() => setConfirming(true)} title="Delete project" type="button"><Trash2 size={17} /></button>
        ) : (
          <div className={adminTw.deleteConfirm}>
            <button aria-label="Cancel deletion" onClick={() => setConfirming(false)} title="Cancel" type="button"><X size={16} /></button>
            <form action={deleteProjectAction.bind(null, project.id)}><button type="submit">Delete permanently</button></form>
          </div>
        )}
      </div>
    </article>
  );
}
