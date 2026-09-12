import { GraduationCap, Link2, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import type { PartnerRecord } from "./partners-actions";

export function PartnerOverview({ partner }: { partner: PartnerRecord }) {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-serif text-2xl text-[#0d2818]">Biography</h2>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-neutral-700">
          {partner.bio ||
            partner.description ||
            "A biography for this partner hasn't been added yet."}
        </p>
      </div>

      <Separator className="bg-neutral-200" />

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <h3 className="flex items-center gap-2 text-sm font-medium text-neutral-500">
            <GraduationCap className="h-4 w-4" />
            Education
          </h3>
          <p className="mt-2 text-[15px] text-neutral-700">
            {partner.education || "Not provided"}
          </p>
        </div>

        <div>
          <h3 className="flex items-center gap-2 text-sm font-medium text-neutral-500">
            <Mail className="h-4 w-4" />
            Contact
          </h3>
          {partner.email ? (
            <a
              href={`mailto:${partner.email}`}
              className="mt-2 inline-block text-[15px] text-[#0d2818] hover:underline"
            >
              {partner.email}
            </a>
          ) : (
            <p className="mt-2 text-[15px] text-neutral-700">Not provided</p>
          )}
        </div>

        <div>
          <h3 className="flex items-center gap-2 text-sm font-medium text-neutral-500">
            <Link2 className="h-4 w-4" />
            Google Scholar
          </h3>
          {partner.google_scholar_url ? (
            <a
              href={partner.google_scholar_url}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block text-[15px] text-[#0d2818] hover:underline"
            >
              View profile
            </a>
          ) : (
            <p className="mt-2 text-[15px] text-neutral-700">Not provided</p>
          )}
        </div>

        <div>
          <h3 className="flex items-center gap-2 text-sm font-medium text-neutral-500">
            <Link2 className="h-4 w-4" />
            ORCID
          </h3>
          {partner.orcid ? (
            <a
              href={`https://orcid.org/${partner.orcid}`}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block text-[15px] text-[#0d2818] hover:underline"
            >
              {partner.orcid}
            </a>
          ) : (
            <p className="mt-2 text-[15px] text-neutral-700">Not provided</p>
          )}
        </div>
      </div>
    </div>
  );
}
