// src/components/about/about-hero.tsx
import Image from "next/image";

export function AboutHero() {
  return (
    <header className="mx-auto w-[min(calc(100%_-_48px),1240px)] py-16 sm:py-20 lg:py-24 max-sm:w-[calc(100%_-_32px)]">
      <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-[7vw]">
        <div className="max-w-2xl">
          <div className="mb-6 flex items-center gap-3 text-[#153c2e]">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-[#153c2e]"
            />
            <p className="text-sm font-bold uppercase tracking-[0.12em]">
              About R&amp;D
            </p>
          </div>

          <h1 className="about-display max-w-[11ch] text-[clamp(3.5rem,7vw,5.75rem)] font-normal leading-[0.93] tracking-[-0.045em] text-[#153c2e]">
            Curiosity with somewhere to go.
          </h1>

          <div className="mt-8 h-px w-full max-w-md bg-[#153c2e]/15" />

          <p className="mt-8 max-w-xl text-lg leading-8 text-[#405149] sm:text-xl sm:leading-9">
            We help ideas move—from an early question, to shared inquiry, to
            evidence that improves lives.
          </p>
        </div>

        <figure className="min-w-0">
          <div className="relative overflow-hidden bg-[#153c2e]/5">
            <Image
              className="h-auto w-full object-cover"
              src="/research-collaboration.png"
              alt="Researchers collaborating in a Kathmandu computing lab"
              width={1536}
              height={1024}
              sizes="(max-width: 1023px) 100vw, 55vw"
              priority
            />
          </div>
        </figure>
      </div>
    </header>
  );
}
