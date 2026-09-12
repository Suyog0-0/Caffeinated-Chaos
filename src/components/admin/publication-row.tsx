"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExternalLink, Pencil } from "lucide-react";
import { DeletePublicationButton } from "@/components/admin/delete-publication-button";

export type PublicationRowData = {
  id: string;
  title: string;
  publication_type: string | null;
  year: number | null;
  venue: string | null;
  publish_status: string;
  is_ijmr: boolean;
};

export function PublicationRow({ publication }: { publication: PublicationRowData }) {
  const router = useRouter();
  const editHref = `/admin/publications/${publication.id}/edit`;

  return (
    <article
      aria-label={`Edit ${publication.title}`}
      className="admin-researcher-row admin-clickable-row"
      onClick={() => router.push(editHref)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          router.push(editHref);
        }
      }}
      role="link"
      tabIndex={0}
    >
      <div className="admin-researcher-name">
        <span>{publication.is_ijmr ? "IJ" : "P"}</span>
        <div>
          <strong>{publication.title}</strong>
          <small>{publication.venue ?? "Venue not added"}</small>
        </div>
      </div>
      <p data-label="Type">{publication.publication_type ?? "Not specified"}</p>
      <p data-label="Status"><i className={`admin-status admin-status-${publication.publish_status}`}>{publication.publish_status}</i></p>
      <p data-label="Year">{publication.year ?? "Not set"}</p>
      <div className="admin-row-actions" onClick={(event) => event.stopPropagation()} onKeyDown={(event) => event.stopPropagation()}>
        <Link aria-label={`Edit ${publication.title}`} href={editHref} title="Edit publication"><Pencil size={17} /></Link>
        <Link aria-label={`View ${publication.title}`} href={`/publications/${publication.id}`} target="_blank" title="View publication"><ExternalLink size={17} /></Link>
        <DeletePublicationButton id={publication.id} title={publication.title} />
      </div>
    </article>
  );
}
