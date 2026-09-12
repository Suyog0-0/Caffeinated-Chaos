import { ArrowUpRight, ChevronRight, Users } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getResearchers } from "./data/researcher";
import { kicker, pageShell, sectionTitle } from "./shared";
import Image from "next/image";

export async function People() {
  const researchers = await getResearchers();

  return (
    <section className="border-y border-[#d7d5cd] bg-[#fffefb] py-24 max-sm:py-16">
      <div
        className={`${pageShell} grid grid-cols-[.8fr_1.2fr] items-center gap-[10vw] max-sm:grid-cols-1 max-sm:gap-10`}
      >
        <div>
          <Users aria-hidden className="mb-6" size={28} strokeWidth={1.4} />

          <p className={kicker}>Research is a collective act</p>

          <h2 className={sectionTitle}>
            Meet the people behind the work.
          </h2>

          <p className="mt-5 max-w-md font-sans text-[18px] leading-8 text-[#405149]">
            Find expertise, shared interests and opportunities to collaborate
            across the college.
          </p>

          <Link
            className={buttonVariants({
              variant: "link",
              className: "mt-8 font-sans text-[16px] font-semibold text-[#153c2e] transition-transform hover:translate-x-1",
            })}
            href="/people"
          >
            Explore the directory
            <ChevronRight aria-hidden size={16} />
          </Link>
        </div>

        <div className="border-t border-[#17251f]">
{researchers.map((person) => {
  const initials = person.name
    .split(" ")
    .map((word: string) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Link
      className="group grid min-h-28 grid-cols-[54px_1fr_24px] items-center gap-4 border-b border-[#d7d5cd] transition-colors duration-300 hover:bg-[#faf9f5] max-sm:grid-cols-[50px_1fr_22px]"
      href={`/people/${person.id}`}
      key={person.id}
    >
 <div className="relative size-11 overflow-hidden rounded-full bg-[#eeeae0]">
  {person.photo_url ? (
    <Image
      src={person.photo_url}
      alt={person.name}
      fill
      sizes="44px"
      className="object-cover"
    />
  ) : (
    <span className="grid size-full place-items-center font-sans text-[10px] font-bold text-[#153c2e]">
      {initials}
    </span>
  )}
</div> 
      <span>
        <strong className="block text-[24px] font-medium leading-tight transition-colors group-hover:text-[#153c2e] max-sm:text-[20px]">
          {person.name}
        </strong>

        <small className="mt-1 block font-sans text-[12px] leading-5 text-[#405149]">
          {person.position}
          {person.department && ` · ${person.department}`}
        </small>
      </span>

      <ArrowUpRight aria-hidden className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" size={18} />
    </Link>
  );
})}        </div>
      </div>
    </section>
  );
}
