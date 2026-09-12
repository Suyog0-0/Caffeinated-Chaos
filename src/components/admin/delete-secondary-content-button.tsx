"use client";

import { useState } from "react";
import { Trash2, X } from "lucide-react";
import {
  deleteSecondaryContentAction,
  type SecondaryContentKind,
} from "@/app/secondary-content-actions";

export function DeleteSecondaryContentButton({
  id,
  kind,
  title,
}: {
  id: string;
  kind: SecondaryContentKind;
  title: string;
}) {
  const [confirming, setConfirming] = useState(false);
  const action = deleteSecondaryContentAction.bind(null, kind, id);
  if (!confirming) {
    return <button aria-label={`Delete ${title}`} onClick={() => setConfirming(true)} title={`Delete ${kind}`} type="button"><Trash2 size={17} /></button>;
  }
  return (
    <div className="admin-delete-confirm" onClick={(event) => event.stopPropagation()}>
      <button aria-label="Cancel deletion" onClick={() => setConfirming(false)} title="Cancel" type="button"><X size={16} /></button>
      <form action={action}><button type="submit">Delete permanently</button></form>
    </div>
  );
}
