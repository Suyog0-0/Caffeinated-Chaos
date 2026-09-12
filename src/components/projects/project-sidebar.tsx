// src/components/projects/project-sidebar.tsx
import { Users } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type Project = { status: string };
type Researcher = { id: string; initials: string; name: string };

export function ProjectSidebar({
  project,
  researchers,
}: {
  project: Project;
  researchers: Researcher[];
}) {
  return (
    <aside>
      <h2 className="mb-6 flex items-center gap-3 text-4xl font-medium">
        <Users size={25} aria-hidden="true" /> Project team
      </h2>
      {researchers.map((person) => (
        <Card
          className="rounded-none border-0 border-t border-[#d7d5cd] bg-transparent py-0 shadow-none ring-0"
          key={person.id}
        >
          <CardContent className="p-0">
            <Link
              className="flex items-center gap-3 py-3 transition-colors hover:bg-[#f6f3eb]"
              href={`/people/${person.id}`}
            >
              <span className="grid size-10 place-items-center rounded-full bg-[#eeeae0] font-sans text-[9px]">
                {person.initials}
              </span>
              <b className="font-medium">{person.name}</b>
            </Link>
          </CardContent>
        </Card>
      ))}
      <h2 className="mt-12 mb-6 text-4xl font-medium">Current status</h2>
      <Badge className="rounded-none bg-[#eeeae0] px-3 py-2 font-sans text-[11px] font-normal text-[#17251f]">
        {project.status}
      </Badge>
    </aside>
  );
}