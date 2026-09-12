type ResearcherDetail = {
  initials: string;
  department: string;
  name: string;
  position: string;
  area: string;
};

export function PersonDetailHero({ researcher }: { researcher: ResearcherDetail }) {
  return (
    <header className="mx-auto flex w-[min(calc(100%_-_48px),1240px)] items-center gap-10 border-b border-[#17251f] py-20 max-sm:w-[calc(100%_-_32px)] max-sm:items-start max-sm:gap-5">
      <span className="grid size-36 shrink-0 place-items-center rounded-full bg-[#153c2e] font-sans text-3xl text-white max-sm:size-20 max-sm:text-lg">
        {researcher.initials}
      </span>
      <section>
        <p className="mb-3 font-sans text-xs font-bold text-[#153c2e]">{researcher.department}</p>
        <h1 className="text-[clamp(48px,6vw,80px)] leading-[.94] font-normal tracking-[-.045em]">
          {researcher.name}
        </h1>
        <p className="mt-3 text-[#405149]">
          {researcher.position} · {researcher.area}
        </p>
      </section>
    </header>
  );
}
