import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { projects } from "@/lib/dummy-data";

export function ResearchAreaProjects({ areaName }: { areaName: string }) {
  const areaProjects = projects.filter((project) => project.area === areaName);

  return (
    <section>
      <h2 className="mb-6 text-4xl font-medium">Work in this area</h2>
      {areaProjects.map((project) => (
        <Link
          className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#153c2e]"
          href={`/projects/${project.slug}`}
          key={project.slug}
        >
          <Card className="border-x-0 border-b-0 bg-transparent">
            <CardContent className="py-6">
              <Badge className="border-0 p-0">{project.status}</Badge>
              <h3 className="my-1 flex items-center gap-2 text-2xl font-medium">
                {project.title}
                <ArrowUpRight
                  aria-hidden="true"
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                  size={17}
                />
              </h3>
              <p className="text-sm text-[#405149]">{project.summary}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </section>
  );
}
