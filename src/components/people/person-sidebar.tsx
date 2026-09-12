import { BookOpen, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/src/components/ui/badge";
import { Separator } from "@/src/components/ui/separator";

type ResearcherDetail = {
  orcid: string;
  area: string;
  papers: number;
};

type PublicationSummary = {
  id: string;
  type: string;
  year: number;
  title: string;
};

export function PersonSidebar({
  researcher,
  publications,
}: {
  researcher: ResearcherDetail;
  publications: PublicationSummary[];
}) {
  return (
    <aside>
      <h2 className="mb-6 text-4xl font-medium">Profile</h2>
      <dl>
        <Separator />
        <div className="py-3">
          <dt className="font-sans text-[9px] text-[#405149]">ORCID</dt>
          <dd className="mt-1 flex items-center gap-2 text-[15px]">
            {researcher.orcid}
            <ExternalLink aria-hidden="true" size={13} />
          </dd>
        </div>
        <Separator />
        <div className="py-3">
          <dt className="font-sans text-[9px] text-[#405149]">Research area</dt>
          <dd className="mt-1 text-[15px]">{researcher.area}</dd>
        </div>
        <Separator />
        <div className="py-3">
          <dt className="font-sans text-[9px] text-[#405149]">Publications</dt>
          <dd className="mt-1 text-[15px]">{researcher.papers}</dd>
        </div>
      </dl>

      {publications.length > 0 && (
        <>
          <h2 className="mt-12 mb-6 text-4xl font-medium">Selected publications</h2>
          {publications.map((publication) => (
            <Link
              className="block border-t border-[#d7d5cd] py-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#153c2e]"
              href={`/publications/${publication.id}`}
              key={publication.id}
            >
              <Badge className="gap-2 border-0 p-0">
                <BookOpen aria-hidden="true" size={13} />
                {publication.type} · {publication.year}
              </Badge>
              <p className="mt-1 text-[15px] leading-tight">{publication.title}</p>
            </Link>
          ))}
        </>
      )}
    </aside>
  );
}
