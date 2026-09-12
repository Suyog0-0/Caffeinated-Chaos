import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";

type Publication = {
  id: string;
  type: string;
  year: number;
  title: string;
  authors: string;
};

const objectives = [
  "Gather useful evidence with community partners.",
  "Test methods in real operating conditions.",
  "Publish findings in an accessible form.",
];

export function ProjectOverview({ publications }: { publications: Publication[] }) {
  return (
    <section>
      <h2 className="mb-6 text-4xl font-medium">About the project</h2>
      <p className="max-w-3xl text-[22px]">
        This dummy project page shows how objectives, progress and linked research records will
        appear once Supabase content is connected.
      </p>

      <h2 className="mt-12 mb-6 text-4xl font-medium">Objectives</h2>
      <ol>
        {objectives.map((item) => (
          <li className="flex items-center gap-3 border-b border-[#d7d5cd] py-3" key={item}>
            <CheckCircle2 className="text-[#267457]" size={18} aria-hidden="true" />
            {item}
          </li>
        ))}
      </ol>

      <h2 className="mt-12 mb-6 text-4xl font-medium">Related publications</h2>
      <Separator className="bg-[#d7d5cd]" />
      {publications.map((item) => (
        <Card
          className="rounded-none border-0 border-b border-[#d7d5cd] bg-transparent py-0 shadow-none"
          key={item.id}
        >
          <CardContent className="p-0">
            <Link className="group block py-6" href={`/publications/${item.id}`}>
              <small className="font-sans text-[9px] text-[#153c2e]">
                {item.type} · {item.year}
              </small>
              <h3 className="my-1 flex items-center gap-2 text-2xl font-medium">
                {item.title}
                <ArrowUpRight
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                  size={17}
                  aria-hidden="true"
                />
              </h3>
              <p className="text-sm text-[#405149]">{item.authors}</p>
            </Link>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
