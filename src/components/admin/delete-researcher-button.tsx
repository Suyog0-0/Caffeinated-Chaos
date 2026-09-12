"use client";

import { useState } from "react";
import { Trash2, X } from "lucide-react";
import { deleteResearcherAction } from "@/app/admin/actions";
import { adminTw } from "@/components/admin/admin-tailwind";

export function DeleteResearcherButton({ id, name }: { id: string; name: string }) {
  const [confirming, setConfirming] = useState(false);
  const action = deleteResearcherAction.bind(null, id);

  if (!confirming) {
    return (
      <button aria-label={`Delete ${name}`} onClick={() => setConfirming(true)} title="Delete researcher" type="button">
        <Trash2 size={17} />
      </button>
    );
  }

  return (
    <div className={adminTw.deleteConfirm}>
      <button aria-label="Cancel deletion" onClick={() => setConfirming(false)} title="Cancel" type="button"><X size={16} /></button>
      <form action={action}><button type="submit">Delete permanently</button></form>
    </div>
  );
}
