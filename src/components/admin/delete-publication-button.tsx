"use client";

import { useState } from "react";
import { Trash2, X } from "lucide-react";
import { deletePublicationAction } from "@/app/publications-actions";

export function DeletePublicationButton({ id, title }: { id: string; title: string }) {
  const [confirming, setConfirming] = useState(false);
  const action = deletePublicationAction.bind(null, id);

  if (!confirming) {
    return (
      <button aria-label={`Delete ${title}`} onClick={(event) => { event.stopPropagation(); setConfirming(true); }} title="Delete publication" type="button">
        <Trash2 size={17} />
      </button>
    );
  }

  return (
    <div className="admin-delete-confirm" onClick={(event) => event.stopPropagation()}>
      <button aria-label="Cancel deletion" onClick={() => setConfirming(false)} title="Cancel" type="button"><X size={16} /></button>
      <form action={action}><button type="submit">Delete permanently</button></form>
    </div>
  );
}
