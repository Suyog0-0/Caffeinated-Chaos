// src/components/about/mission-statements.tsx

const statements = [
  {
    label: "Our vision",
    title: "A college where research belongs to everyone.",
    copy: "Students, faculty and partners can find one another, share methods and build work that matters beyond the campus.",
  },
  {
    label: "Our mission",
    title: "Make good research easier to begin and easier to discover.",
    copy: "We connect expertise, projects and publications while supporting rigorous, responsible inquiry.",
  },
] as const;

export function MissionStatements() {
  return (
    <section
      className="mx-auto w-[min(calc(100%_-_48px),1240px)] border-b border-[#17251f]/15 max-sm:w-[calc(100%_-_32px)]"
      aria-label="Our vision and mission"
    >
      <div className="grid grid-cols-2 max-sm:grid-cols-1">
        {statements.map((statement, index) => (
          <article
            key={statement.label}
            className={[
              "py-14 sm:py-16 lg:py-20",
              index === 0
                ? "pr-6 sm:pr-10 lg:pr-[7vw]"
                : "border-l border-[#d7d5cd] pl-6 sm:pl-10 lg:pl-[7vw]",
              index === 1
                ? "max-sm:border-l-0 max-sm:border-t max-sm:border-[#d7d5cd] max-sm:pl-0"
                : "",
            ].join(" ")}
          >
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.16em] text-[#73837b]">
              {statement.label}
            </p>

            <h2 className="about-display max-w-xl text-[clamp(2.25rem,4.5vw,3.5rem)] font-normal leading-[1.04] tracking-[-0.035em] text-[#153c2e]">
              {statement.title}
            </h2>

            <div
              aria-hidden="true"
              className="my-7 h-px w-10 bg-[#153c2e]"
            />

            <p className="max-w-xl text-base leading-7 text-[#405149] sm:text-lg sm:leading-8">
              {statement.copy}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
