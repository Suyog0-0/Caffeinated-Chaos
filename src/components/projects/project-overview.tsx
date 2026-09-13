// src/components/projects/project-overview.tsx
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Inter } from "next/font/google";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
});

const sectionHeading =
  "font-serif text-4xl font-medium tracking-tight text-[#0F2D24]";

type Publication = {
  id: string;
  type: string;
  year: number | null;
  title: string;
  authors: string;
};

export function ProjectOverview({
  objective,
  publications,
  summary,
}: {
  objective: string | null;
  publications: Publication[];
  summary: string | null;
}) {
  return (
    <section>
      {summary && (
        <div className="mb-12">
          <h2 className={`${sectionHeading} mb-6`}>Summary</h2>
          <p
            className={`${inter.className} max-w-3xl whitespace-pre-line text-justify text-[18px] leading-relaxed text-[#405149]`}
          >
            {summary}
          </p>
        </div>
      )}

      {objective && (
        <div className="mb-12">
          <h2 className={`${sectionHeading} mb-6`}>Objective</h2>
          <p
            className={`${inter.className} max-w-3xl whitespace-pre-line text-justify text-[18px] leading-relaxed text-[#405149]`}
          >
            {objective}
          </p>
        </div>
      )}

      <h2 className={`${sectionHeading} mb-6`}>Related publications</h2>
      <Separator className="bg-[#d7d5cd]" />

      {publications.length === 0 ? (
        <p className={`${inter.className} py-6 text-sm text-[#66766e]`}>
          No publications have been linked to this project yet.
        </p>
      ) : (
        publications.map((item) => (
          <Card
            className="rounded-none border-0 border-b border-[#d7d5cd] bg-transparent py-0 shadow-none ring-0"
            key={item.id}
          >
            <CardContent className="p-0">
              <Link
                className="group block py-6"
                href={`/publications/${item.id}`}
              >
                <small className="font-sans text-[9px] text-[#153c2e]">
                  {item.type}
                  {item.year ? ` · ${item.year}` : ""}
                </small>
                <h3 className="my-1 flex items-center gap-2 text-2xl font-medium">
                  {item.title}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                    size={17}
                  />
                </h3>
                {item.authors && (
                  <p
                    className={`${inter.className} text-justify text-sm leading-relaxed text-[#405149]`}
                  >
                    {item.authors}
                  </p>
                )}
              </Link>
            </CardContent>
          </Card>
        ))
      )}
    </section>
  );
}
