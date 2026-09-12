export function ResearchAreasHeader() {
  return (
    <header className="mx-auto w-[min(calc(100%_-_48px),1240px)] border-b border-[#17251f] py-20 max-sm:w-[calc(100%_-_32px)]">
      <div className="flex items-center gap-2.5 mb-4">
        <span className="size-1.5 rounded-full bg-[#153c2e]" />
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-[#153c2e]">Research Areas</p>
      </div>
      <h1 className="text-[clamp(54px,7vw,92px)] leading-[.94] font-normal tracking-[-.045em]">
        Begin with a question.
      </h1>
      <p className="mt-6 max-w-2xl text-xl italic text-[#405149]">
        Explore connected fields of inquiry, then follow each one to its people, projects and publications.
      </p>
    </header>
  );
}
