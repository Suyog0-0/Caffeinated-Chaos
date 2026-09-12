export function PublicationsHero() {
  return (
    <header className="mx-auto w-[min(calc(100%_-_48px),1240px)] border-b border-[#17251f] py-15 max-sm:w-[calc(100%_-_32px)]">
      <p className="mb-4 font-sans text-lg font-bold text-[#153c2e]">Publications</p>
      <h1 className="text-[clamp(54px,7vw,92px)] leading-[.94] font-normal tracking-[-.045em]">
        Evidence you can use.
      </h1>
      <p className="mt-6 max-w-4xl text-xl text-[#405149]">
        Browse journal articles, conference papers and reports produced across the research
        community.
      </p>
    </header>
  );
}
