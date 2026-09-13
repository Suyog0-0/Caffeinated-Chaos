// src/components/about/partners.tsx
import { Building2, GraduationCap, Handshake, UsersRound } from "lucide-react";

const partners = [
  [
    "Local communities",
    UsersRound,
    "Participatory monitoring, regional environmental sensing, and public school technology programs.",
  ],
  [
    "Industry partners",
    Handshake,
    "Sponsored research, machine intelligence prototypes, and direct internship incubators.",
  ],
  [
    "Academic networks",
    GraduationCap,
    "International university consortiums, dual-fellowships, and joint peer-review panels.",
  ],
  [
    "Public institutions",
    Building2,
    "Municipal ministries, urban planning registries, and national climate adaptation agencies.",
  ],
] as const;

export function Partners() {
  return (
    <section className="bg-[#f5f4ef] pb-10 text-[#17251f]">
      <div className="mx-auto w-[min(calc(100%_-_48px),1240px)] border-t border-[#d7d5cd] pt-20 max-sm:w-[calc(100%_-_32px)]">
        <p className="mb-4 font-sans text-sm font-bold uppercase tracking-wide text-[#73837b]">
          Research partners
        </p>
        <h2 className="text-[48px] leading-tight font-medium mb-6">
          Built through collaboration.
        </h2>
        <p className="max-w-3xl text-xl text-[#405149] mb-12">
          Every project on this hub grows out of a relationship — with the communities we study,
          the industries we work alongside, and the institutions that share our standards.
        </p>

        <ul className="grid grid-cols-4 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {partners.map(([label, Icon, desc]) => (
            <li
              className="rounded-sm border border-[#e5e4de] bg-white p-8 shadow-sm flex flex-col gap-6"
              key={label}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-[#f5f4ef]">
                <Icon className="text-[#153c2e]" size={24} aria-hidden="true" />
              </div>
              <div>
                <h3 className="mb-3 text-[22px] font-medium leading-tight">{label}</h3>
                <p className="text-base text-[#405149] leading-relaxed">{desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}