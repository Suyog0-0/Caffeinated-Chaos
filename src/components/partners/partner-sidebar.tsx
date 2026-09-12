import Link from "next/link";
import { ArrowRight, FileText, FolderKanban } from "lucide-react";
import { Card } from "@/components/ui/card";
import type {
  PartnerProjectLink,
  PartnerPublicationLink,
} from "./partners-actions";

interface PartnerSidebarProps {
  projects: PartnerProjectLink[];
  publications: PartnerPublicationLink[];
}

export function PartnerSidebar({ projects, publications }: PartnerSidebarProps) {
  return (
    <div className="space-y-6">
      <Card className="rounded-md border border-neutral-200 p-6">
        <h3 className="flex items-center gap-2 font-serif text-lg text-[#0d2818]">
          <FolderKanban className="h-4 w-4" />
          Projects
        </h3>
        {projects.length === 0 ? (
          <p className="mt-3 text-sm text-neutral-500">
            No linked projects yet.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {projects.map((project) => (
              <li key={project.id}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group flex items-start justify-between gap-2 text-sm text-neutral-700 hover:text-[#0d2818]"
                >
                  <span>{project.title}</span>
                  <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card className="rounded-md border border-neutral-200 p-6">
        <h3 className="flex items-center gap-2 font-serif text-lg text-[#0d2818]">
          <FileText className="h-4 w-4" />
          Publications
        </h3>
        {publications.length === 0 ? (
          <p className="mt-3 text-sm text-neutral-500">
            No linked publications yet.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {publications.map((publication) => (
              <li key={publication.id}>
                <Link
                  href={`/publications/${publication.id}`}
                  className="group flex items-start justify-between gap-2 text-sm text-neutral-700 hover:text-[#0d2818]"
                >
                  <span>
                    {publication.title}
                    {publication.year ? ` (${publication.year})` : ""}
                  </span>
                  <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
