import { ArrowUpRight, CalendarDays } from "lucide-react";

export type Opportunity = {
  id: string;
  title: string;
  type: string;
  description: string;
  deadline: string | null;
  status: string;
  applicationUrl: string;
  areaSlug: string;
  areaName: string;
};

function formatDeadline(deadline: string | null) {
  if (!deadline) return "Rolling basis";

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${deadline}T00:00:00Z`));
}

function getActionLabel(type: string) {
  const normalized = type.toLowerCase();

  if (normalized.includes("call for papers")) return "Visit author portal";
  if (normalized.includes("collaboration")) return "Start a partner inquiry";
  return "View application";
}

export function OpportunityCard({
  opportunity,
  index,
}: {
  opportunity: Opportunity;
  index: number;
}) {
  const statusDisplay =
    opportunity.status.charAt(0).toUpperCase() + opportunity.status.slice(1);

  return (
    <li
      className={[
        "border-b border-[#bfc5c0]",
        index % 2 === 1 ? "lg:border-l lg:border-[#bfc5c0]" : "",
      ].join(" ")}
    >
      <a
        href={opportunity.applicationUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={[
          "group flex min-h-[390px] cursor-pointer flex-col py-8 transition-colors hover:bg-[#f1efe8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#153c2e] sm:py-10",
          index % 2 === 0 ? "lg:pr-10" : "lg:pl-10",
        ].join(" ")}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="font-semibold text-[#153c2e]">
            {opportunity.type}
          </span>
          <span className="inline-flex items-center gap-2 text-[#68776f]">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-[#2d8a5b]"
            />
            {statusDisplay}
          </span>
        </div>

        <div className="mt-9 flex flex-1 flex-col">
          <p className="text-xs font-semibold text-[#7a877f]">
            {opportunity.areaName}
          </p>

          <h3
            className="mt-3 max-w-[24ch] text-[clamp(1.75rem,3vw,2.35rem)] font-medium leading-[1.06] tracking-[-0.025em] text-[#153c2e] decoration-1 underline-offset-4 group-hover:underline"
            style={{
              fontFamily:
                'Garamond, "EB Garamond", "Times New Roman", serif',
            }}
          >
            {opportunity.title}
          </h3>

          <p className="mt-5 line-clamp-3 max-w-xl text-sm leading-7 text-[#52635b] sm:text-[15px]">
            {opportunity.description}
          </p>

          <div className="mt-auto flex flex-col gap-5 border-t border-[#d7d5cd] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-xs text-[#68776f]">
              <CalendarDays size={15} aria-hidden="true" />
              <span>
                Deadline&nbsp;
                <strong className="font-semibold text-[#33463c]">
                  {formatDeadline(opportunity.deadline)}
                </strong>
              </span>
            </div>

            <span className="inline-flex min-h-10 items-center gap-2 self-start text-sm font-semibold text-[#153c2e] underline decoration-[#9eaaa3] underline-offset-4 transition-colors group-hover:decoration-[#153c2e]">
              {getActionLabel(opportunity.type)}
              <ArrowUpRight
                size={15}
                aria-hidden="true"
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </div>
        </div>
      </a>
    </li>
  );
}
