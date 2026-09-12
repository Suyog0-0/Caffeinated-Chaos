import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

type Project = {
  slug: string;
  status: string;
  title: string;
  summary: string;
};

export function PublicationOverview({
  summary,
  project,
}: {
  summary: string;
  project?: Project;
}) {
  return (
    <section>
      <h2 className="mb-6 text-4xl font-medium">Abstract</h2>
      <p className="max-w-3xl text-[22px]">{summary}</p>
      {project && (
        <>
          <h2 className="mt-12 mb-6 text-4xl font-medium">Related project</h2>
          <Card className="rounded-none border-0 border-t border-[#d7d5cd] bg-transparent py-0 shadow-none">
            <CardContent className="p-0">
              <Link className="group block py-6" href={`/projects/${project.slug}`}>
                <small className="font-sans text-[9px] text-[#153c2e]">{project.status}</small>
                <h3 className="my-1 flex items-center gap-2 text-2xl font-medium">
                  {project.title}
                  <ArrowUpRight
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                    size={17}
                    aria-hidden="true"
                  />
                </h3>
                <p className="text-sm text-[#405149]">{project.summary}</p>
              </Link>
            </CardContent>
          </Card>
        </>
      )}
    </section>
  );
}
