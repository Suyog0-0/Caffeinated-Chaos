import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Publication = {
  id: string;
  type: string;
  year: number;
  title: string;
  authors: string;
  venue: string;
  area: string;
};

export function PublicationList({ publications }: { publications: Publication[] }) {
  return (
    <div className="border-t border-[#17251f]">
      {publications.map((item, index) => (
        <Card
          className="rounded-none border-0 border-b border-[#d7d5cd] bg-transparent py-0 shadow-none"
          key={item.id}
        >
          <CardContent className="grid min-h-44 grid-cols-[45px_1fr_230px_120px] items-center gap-6 p-0 max-sm:grid-cols-[28px_1fr] max-sm:py-6">
            <span className="font-sans text-[10px]">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <Badge className="border-0 p-0 font-sans text-[9px] font-normal text-[#153c2e]">
                {item.type} · {item.year}
              </Badge>
              <h2 className="my-1 text-[25px] leading-tight font-medium">
                <Link className="hover:underline" href={`/publications/${item.id}`}>
                  {item.title}
                </Link>
              </h2>
              <small className="font-sans text-[10px] text-[#405149]">{item.authors}</small>
            </div>
            <div className="grid gap-2 max-sm:col-start-2">
              <small className="font-sans text-[10px]">{item.venue}</small>
              <b className="text-[13px] font-medium">{item.area}</b>
            </div>
            <Link
              className={buttonVariants({
                variant: "outline",
                className:
                  "h-auto rounded-none border-[#17251f] p-3 font-sans text-[10px] max-sm:col-start-2",
              })}
              href={`/publications/${item.id}`}
            >
              Read abstract <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
