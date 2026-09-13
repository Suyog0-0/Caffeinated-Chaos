// src/components/about/engage-cta.tsx
import Link from "next/link";

const RESEARCH_PROPOSAL_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdG8Lb3SgR6PqoH6IYmZ8o9xGCdQDXtMgyl_l77-7DwuWCs-g/viewform";

export function EngageCTA() {
  return (
    <section
      className="bg-[#f5f4ef] py-16 sm:py-20 lg:py-24"
      aria-labelledby="engage-cta-title"
    >
      <div className="mx-auto w-[min(calc(100%_-_48px),1240px)] max-sm:w-[calc(100%_-_32px)]">
        <div className="relative overflow-hidden bg-[#0a2318] px-6 py-10 text-white sm:px-10 sm:py-12 lg:px-16 lg:py-14">
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
            <div className="max-w-3xl">
              <div className="mb-6 flex items-center gap-3 text-[#47c97e]">
                <span
                  aria-hidden="true"
                  className="h-px w-8 bg-[#47c97e]"
                />
                <p className="text-xs font-bold uppercase tracking-[0.14em]">
                  Engage with R&amp;D
                </p>
              </div>

              <h2
                id="engage-cta-title"
                className="about-display max-w-2xl text-[clamp(2.25rem,4.5vw,3.75rem)] font-normal leading-[1.02] tracking-[-0.035em]"
              >
                Ready to initiate or sponsor an inquiry?
              </h2>

              <div className="my-7 h-px w-full max-w-xl bg-white/10" />

              <p className="max-w-2xl text-base leading-7 text-[#b7c6be] sm:text-lg sm:leading-8">
                We welcome collaboration proposals from faculty scholars,
                curious graduate candidates, and civic partners seeking
                evidence-based answers.
              </p>
            </div>

            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
              <a
                href={RESEARCH_PROPOSAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center bg-white px-6 py-3 text-sm font-semibold tracking-[0.01em] text-[#0a2318] transition-colors hover:bg-[#e5e4de] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a2318] sm:px-7"
              >
                Submit Research Proposal
                <span className="sr-only"> (opens in a new tab)</span>
              </a>

              <Link
                href="/grants"
                className="inline-flex min-h-12 items-center justify-center border border-[#47c97e] px-6 py-3 text-sm font-semibold tracking-[0.01em] text-white transition-colors hover:bg-[#47c97e]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#47c97e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a2318] sm:px-7"
              >
                Browse Active Grant Cycles
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
