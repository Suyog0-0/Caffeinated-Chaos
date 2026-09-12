export function PeopleHeader() {
  return (
    <section className="pt-6 md:pt-14 pb-12 px-4 md:px-6 lg:px-10 border-b border-[#E2DBD0]/70 md:border-[#E2DBD0] max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-end">
        <div className="lg:col-span-8">
          <h1 className="font-serif text-[38px] sm:text-5xl lg:text-7xl font-semibold tracking-tight text-[#121E19] md:text-[#141A17] leading-[1.08] md:leading-[1.05]">
            Find an expert. <br />
            <span className="italic font-normal text-[#0F2D24] font-light">Explore their work.</span>
          </h1>
          <p className="mt-3 md:mt-6 text-[14.5px] sm:text-xl text-[#5C5952] md:text-[#4D5B53] font-normal md:font-light max-w-2xl leading-relaxed">
            Meet the faculty, research fellows, and laboratory directors turning theoretical questions into empirical evidence, open-source architectures, and practical industry change.
          </p>
        </div>

        {/* Desktop only vital stats strip */}
        <div className="hidden lg:block lg:col-span-4 bg-[#F0ECE4]/80 border border-[#E2DBD0] p-6 rounded-lg backdrop-blur-sm">
          <h2 className="text-xs uppercase tracking-widest font-semibold text-[#6C7B72] mb-4 pb-2 border-b border-[#E2DBD0]">
            Islington R&D Capacity
          </h2>
          <div className="grid grid-cols-2 gap-y-4 gap-x-6">
            <div>
              <div className="font-serif text-3xl font-semibold text-[#0B251E]">148</div>
              <div className="text-xs text-[#4D5B53] font-medium mt-0.5">Appointed Researchers</div>
            </div>
            <div>
              <div className="font-serif text-3xl font-semibold text-[#0B251E]">24</div>
              <div className="text-xs text-[#4D5B53] font-medium mt-0.5">Specialized Labs</div>
            </div>
            <div>
              <div className="font-serif text-3xl font-semibold text-[#0B251E]">380+</div>
              <div className="text-xs text-[#4D5B53] font-medium mt-0.5">Active External Grants</div>
            </div>
            <div>
              <div className="font-serif text-3xl font-semibold text-[#0B251E]">42</div>
              <div className="text-xs text-[#4D5B53] font-medium mt-0.5">Patents & Licensures</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
