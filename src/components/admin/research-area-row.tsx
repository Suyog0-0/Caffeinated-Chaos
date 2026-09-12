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

export function ResearchAreaRow({ researchArea, gridClassName }: { researchArea: ResearchAreaRowValue; gridClassName: string }) {
  const router = useRouter();
  const editHref = `/admin/research-areas/${researchArea.id}/edit`;

  function openEditor() {
    router.push(editHref);
  }

  return (
    <article
      aria-label={`Edit ${researchArea.name}`}
      className={`${gridClassName} group relative min-h-20 cursor-pointer border-t border-[#d4d5ce] py-4 first:border-t-0 hover:bg-[#f2f2ed] focus-visible:bg-[#f2f2ed] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#153c2e] md:py-3`}
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
      <div className="flex min-w-0 items-center gap-3 pr-20 md:pr-0">
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-[#e9ece7] text-[11px] font-bold text-[#315344]">{researchArea.name.slice(0, 2).toUpperCase()}</span>
        <div className="min-w-0"><strong className="block truncate text-[15px] font-bold text-[#17251f]">{researchArea.name}</strong><small className="mt-1 block truncate text-xs text-[#68756f]">/{researchArea.slug}</small></div>
      </div>
      <p className="flex items-center gap-2 text-xs text-[#68756f] before:w-24 before:font-bold before:text-[#374a41] before:content-['Status'] md:block md:before:hidden" data-label="Status"><i className={`inline-flex rounded-full border px-2 py-1 text-[11px] not-italic capitalize ${researchArea.publish_status === "published" ? "border-[#a9c0b6] bg-[#e9f0ec] text-[#204e3a]" : researchArea.publish_status === "preview" ? "border-[#d9ca91] bg-[#f7f0d9] text-[#6b5814]" : "border-[#c8cbc4] bg-[#eeeee9] text-[#53645c]"}`}>{researchArea.publish_status}</i></p>
      <p className="text-xs text-[#68756f] before:mr-2 before:inline-block before:w-24 before:font-bold before:text-[#374a41] before:content-['Availability'] md:before:hidden" data-label="Availability">{researchArea.is_active ? "Active" : "Inactive"}</p>
      <p className="block text-xs text-[#68756f] before:mr-2 before:inline-block before:w-24 before:font-bold before:text-[#374a41] before:content-['Source'] md:hidden lg:block lg:before:hidden" data-label="Source">{researchArea.is_demo_data ? "Demo data" : "College record"}</p>
      <div className="relative z-10 flex items-center justify-end gap-1.5 max-md:absolute max-md:right-0 max-md:top-3" onClick={(event) => event.stopPropagation()} onKeyDown={(event) => event.stopPropagation()}>
        <Link aria-label={`Edit ${researchArea.name}`} className="inline-flex size-9 items-center justify-center border border-[#d4d5ce] bg-[#fffefb] text-[#53645c] hover:border-[#153c2e] hover:text-[#153c2e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#153c2e]" href={editHref} title="Edit research area"><Pencil size={17} /></Link>
        <ResearchAreaDeleteButton id={researchArea.id} name={researchArea.name} />
      </div>
    </article>
  );
}
