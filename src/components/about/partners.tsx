import { Building2, GraduationCap, Handshake, UsersRound } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const partners = [
  ["Local communities", UsersRound],
  ["Industry partners", Handshake],
  ["Academic networks", GraduationCap],
  ["Public institutions", Building2],
] as const;

export function Partners() {
  return (
    <section className="mx-auto w-[min(calc(100%_-_48px),1240px)] py-20 max-sm:w-[calc(100%_-_32px)]">
      <p className="mb-4 font-sans text-lg font-bold uppercase">Research partners</p>
      <h2 className="text-[42px] leading-tight font-medium">Built through collaboration.</h2>
      <p className="mt-6 max-w-2xl text-xl text-[#405149]">
        Every project on this hub grows out of a relationship — with the communities we study,
        the industries we work alongside, and the institutions that share our standards.
      </p>
      <Separator className="mt-8 bg-[#17251f]" />
      <div className="grid grid-cols-4 gap-x-6 max-sm:grid-cols-2 max-sm:gap-x-4">
        {partners.map(([label, Icon]) => (
          <div
            className="flex items-center gap-4 border-b border-[#d7d5cd] py-10 pr-5 pl-1 text-2xl"
            key={label}
          >
            <Icon className="text-[#153c2e]" size={26} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
