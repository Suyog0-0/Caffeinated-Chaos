export function PublicationsHero() {
  return (
    <header className="mx-auto w-[min(calc(100%_-_48px),1240px)] border-b border-[#17251f] py-15 max-sm:w-[calc(100%_-_32px)]">
      <p className="mb-4 text-lg font-bold text-[#153c2e]">Publications</p>
      <h1
        className="font-normal"
        style={{
          fontFamily: 'Garamond, "EB Garamond", "Times New Roman", serif',
          fontSize: "clamp(54px, 7vw, 92px)",
          letterSpacing: "-0.045em",
          lineHeight: 0.94,
        }}
      >
        Evidence you can use.
      </h1>
      <p className="mt-6 max-w-4xl text-xl leading-relaxed text-[#405149]">
        Browse journal articles, conference papers and reports produced across the research
        community.
      </p>
    </header>
  );
}
