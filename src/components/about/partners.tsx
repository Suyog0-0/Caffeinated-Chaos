import {
  Building2,
  GraduationCap,
  Handshake,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

interface Partner {
  readonly label: string;
  readonly icon: LucideIcon;
  readonly description: string;
}

const partners: readonly Partner[] = [
  {
    label: "Local communities",
    icon: UsersRound,
    description:
      "Participatory monitoring, regional environmental sensing, and public school technology programs.",
  },
  {
    label: "Industry partners",
    icon: Handshake,
    description:
      "Sponsored research, machine intelligence prototypes, and direct internship incubators.",
  },
  {
    label: "Academic networks",
    icon: GraduationCap,
    description:
      "International university consortiums, dual-fellowships, and joint peer-review panels.",
  },
  {
    label: "Public institutions",
    icon: Building2,
    description:
      "Municipal ministries, urban planning registries, and national climate adaptation agencies.",
  },
];

export function Partners() {
  return (
    <section
      aria-labelledby="research-partners-heading"
      className="bg-[#f5f4ef] pb-14 text-[#17251f] sm:pb-16 lg:pb-20"
    >
      <div className="mx-auto w-[calc(100%-32px)] max-w-[1240px] border-t border-[#d7d5cd] pt-14 sm:w-[calc(100%-48px)] sm:pt-16 lg:pt-20">
        <div className="max-w-4xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#73837b] sm:text-sm">
            Research partners
          </p>

          <h2
            id="research-partners-heading"
            className="about-display max-w-3xl text-3xl font-medium leading-[1.1] tracking-[-0.025em] sm:text-4xl lg:text-[48px]"
          >
            Built through collaboration.
          </h2>

          <p className="mt-5 max-w-3xl text-base leading-7 text-[#405149] sm:mt-6 sm:text-lg sm:leading-8 lg:text-xl">
            Every project on this hub grows out of a relationship — with the
            communities we study, the industries we work alongside, and the
            institutions that share our standards.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 border-t border-[#d7d5cd] sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
          {partners.map(({ label, icon: Icon, description }, index) => (
            <li
              key={label}
              className={[
                "group px-0 py-8 sm:px-6 sm:py-9 lg:px-7 lg:py-8",
                index % 2 === 1 ? "sm:border-l sm:border-[#d7d5cd]" : "",
                index >= 2 ? "sm:border-t sm:border-[#d7d5cd] lg:border-t-0" : "",
                index > 0 ? "lg:border-l lg:border-[#d7d5cd]" : "",
              ].join(" ")}
            >
              <div className="flex h-full flex-col">
                <div className="mb-7 flex h-11 w-11 items-center justify-center border border-[#deddd6] bg-[#faf9f5] text-[#153c2e] transition-colors duration-200 group-hover:border-[#153c2e]/25">
                  <Icon
                    size={21}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                </div>

                <div className="mt-auto">
                  <h3 className="about-display text-lg font-medium leading-6 tracking-[-0.01em] text-[#17251f] sm:text-xl">
                    {label}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#405149] sm:text-[15px]">
                    {description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
