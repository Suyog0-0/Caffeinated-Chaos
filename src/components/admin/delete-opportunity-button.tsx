"use client";

import { useState } from "react";
import { Trash2, X } from "lucide-react";
import { deleteOpportunityAction } from "@/app/opportunity-actions";

export function DeleteOpportunityButton({ id, title }: { id: string; title: string }) {
  const [confirming, setConfirming] = useState(false);
  const action = deleteOpportunityAction.bind(null, id);

  if (!confirming) {
    return (
      <button
        aria-label={`Delete ${title}`}
        className="inline-flex size-9 items-center justify-center border border-[#d4d5ce] bg-[#fffefb] text-[#53645c] transition-colors hover:border-[#8f3939] hover:text-[#8f3939] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8f3939]"
        onClick={() => setConfirming(true)}
        title="Delete opportunity"
        type="button"
      >
        <Trash2 size={17} />
      </button>
    );
  }

  return (
    <div className="absolute right-0 z-20 flex items-center gap-1 border border-[#d8bcbc] bg-[#fffefb] p-1 shadow-sm">
      <button
        aria-label="Cancel deletion"
        className="inline-flex size-8 items-center justify-center text-[#53645c] hover:bg-[#eeeee9] focus-visible:outline-2 focus-visible:outline-[#153c2e]"
        onClick={() => setConfirming(false)}
        title="Cancel"
        type="button"
      >
        <X size={16} />
      </button>
      <form action={action}>
        <button className="min-h-8 whitespace-nowrap bg-[#8f3939] px-3 text-xs font-bold text-white hover:bg-[#742d2d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8f3939]" type="submit">
          Delete permanently
        </button>
      </form>
    </div>
  );
}
