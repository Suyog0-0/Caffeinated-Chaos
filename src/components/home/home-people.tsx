import { ArrowUpRight, ChevronRight, Users } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { people } from "./data";
import { kicker, pageShell, sectionTitle } from "./shared";
import { createClient } from "@/supabase/client";

export function People() {

  return (
    <section className="border-y border-[#d7d5cd] bg-[#fffefb] py-24 max-sm:py-16">
      <div
        className={`${pageShell} grid grid-cols-[.8fr_1.2fr] items-center gap-[10vw] max-sm:grid-cols-1 max-sm:gap-10`}
      >
        <div>
          <Users aria-hidden className="mb-6" size={28} strokeWidth={1.4} />
          <p className={kicker}>Research is a collective act</p>
          <h2 className={sectionTitle}>Meet the people behind the work.</h2>
          <p className="mt-5 max-w-md text-[#405149]">
            Find expertise, shared interests and opportunities to collaborate across the college.
          </p>
          <Link className={buttonVariants({ variant: "link", className: "mt-8" })} href="/people">
            Explore the directory <ChevronRight aria-hidden size={16} />
          </Link>
        </div>
        <div className="border-t border-[#17251f]">
          {people.map((person) => (
            <Link
              className="grid min-h-28 grid-cols-[54px_1fr_auto_24px] items-center gap-4 border-b border-[#d7d5cd] max-sm:grid-cols-[50px_1fr_22px]"
              href={`/people/${person.id}`}
              key={person.id}
            >
              <span className="grid size-11 place-items-center rounded-full bg-[#eeeae0] font-sans text-[10px] font-bold text-[#153c2e]">
                {person.initials}
              </span>
              <span>
                <strong className="block text-xl font-medium">{person.name}</strong>
                <small className="block font-sans text-[10px] text-[#405149]">{person.role}</small>
              </span>
              <span className="font-sans text-[10px] text-[#405149] max-sm:hidden">
                {person.papers} papers
              </span>
              <ArrowUpRight aria-hidden size={18} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
