import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type Project = {
  slug: string;
  status: string;
  area: string;
  title: string;
  summary: string;
  lead: string;
};

const statusColor = {
  Ongoing: "bg-[#267457]",
  Completed: "bg-[#2a5776]",
} as const;

export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div className="border-t border-[#17251f]">
      {projects.map((project) => (
        <Card
          className="rounded-none border-0 border-b border-[#d7d5cd] bg-transparent py-0 shadow-none"
          key={project.slug}
        >
          <CardContent className="p-0">
            <Link
              className="group grid min-h-40 grid-cols-[16px_1fr_220px_55px] items-center gap-6 transition-colors hover:bg-[#f6f3eb] max-sm:grid-cols-[14px_1fr] max-sm:py-6"
              href={`/projects/${project.slug}`}
            >
              <span
                className={`size-2 rounded-full ${statusColor[project.status as keyof typeof statusColor] ?? "bg-[#87918c]"}`}
                aria-hidden="true"
              />
              <div>
                <Badge className="border-0 p-0 font-sans text-[9px] font-normal text-[#153c2e]">
                  {project.status} · {project.area}
                </Badge>
                <h2 className="my-1 text-[25px] font-medium">{project.title}</h2>
                <small className="block max-w-2xl text-sm text-[#405149]">{project.summary}</small>
              </div>
              <b className="font-sans text-[10px] max-sm:col-start-2">{project.lead}</b>
              <ArrowUpRight
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 max-sm:col-start-2"
                size={17}
                aria-hidden="true"
              />
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
