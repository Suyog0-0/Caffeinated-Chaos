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
      <p className="mb-4 font-sans text-xs font-bold text-[#153c2e]">Research partners</p>
      <h2 className="text-[42px] leading-tight font-medium">Built through collaboration.</h2>
      <Separator className="mt-8 bg-[#17251f]" />
      <div className="grid grid-cols-4 max-sm:grid-cols-2">
        {partners.map(([label, Icon]) => (
          <div
            className="flex items-center gap-3 border-b border-[#d7d5cd] py-6 pr-5 text-lg"
            key={label}
          >
            <Icon className="text-[#153c2e]" size={18} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
