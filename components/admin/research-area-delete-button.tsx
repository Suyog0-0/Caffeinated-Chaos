"use client";

import { useState } from "react";
import { Trash2, X } from "lucide-react";
import { deleteResearchAreaAction } from "@/src/app/admin/research-area-actions";

export function ResearchAreaDeleteButton({ id, name }: { id: string; name: string }) {
  const [confirming, setConfirming] = useState(false);
  const action = deleteResearchAreaAction.bind(null, id);

  if (!confirming) {
    return (
      <button aria-label={`Delete ${name}`} onClick={(event) => { event.stopPropagation(); setConfirming(true); }} title="Delete research area" type="button">
        <Trash2 size={17} />
      </button>
    );
  }

  return (
    <div className="admin-delete-confirm" onClick={(event) => event.stopPropagation()} onKeyDown={(event) => event.stopPropagation()}>
      <button aria-label="Cancel deletion" onClick={() => setConfirming(false)} title="Cancel" type="button"><X size={16} /></button>
      <form action={action}><button type="submit">Delete permanently</button></form>
    </div>
  );
}
