export function ResearchAreasHeader() {
  return (
    <header className="mx-auto w-[min(calc(100%_-_48px),1240px)] border-b border-[#17251f] py-20 max-sm:w-[calc(100%_-_32px)]">
      <div className="mb-5 flex items-center gap-2.5">
        <span className="size-1.5 rounded-full bg-[#153c2e]" />
        <p className="font-sans text-sm font-bold text-[#153c2e]">Research areas</p>
      </div>
      <h1
        className="max-w-5xl font-normal"
        style={{
          fontSize: "clamp(60px, 8vw, 108px)",
          letterSpacing: "-0.05em",
          lineHeight: 0.9,
        }}
      >
        Begin with a question.
      </h1>
      <p
        className="max-w-3xl text-justify font-sans text-[20px] leading-8 text-[#405149] max-sm:text-[17px] max-sm:leading-7"
        style={{ marginTop: "clamp(38px, 4vw, 54px)" }}
      >
        Explore connected fields of inquiry, then follow each one to its people, projects and publications.
      </p>
    </header>
  );
}
