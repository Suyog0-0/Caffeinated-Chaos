import { Button } from "@/components/ui/button";

export function EngageCTA() {
  return (
    <section className="bg-[#f5f4ef] pt-10 pb-24 text-[#17251f]">
      <div className="mx-auto w-[min(calc(100%_-_48px),1240px)] max-sm:w-[calc(100%_-_32px)]">
        <div className="bg-[#0a2318] rounded-xl p-16 text-white grid grid-cols-[1.2fr_1fr] items-center gap-16 max-lg:grid-cols-1 max-lg:p-10">
          <div>
            <p className="mb-6 font-sans text-xs font-bold uppercase tracking-wider text-[#47c97e]">
              Engage with R&D
            </p>
            <h2 className="text-[44px] leading-tight font-medium mb-6">
              Ready to initiate or sponsor an inquiry?
            </h2>
            <p className="text-[17px] text-[#b7c6be] max-w-xl leading-relaxed">
              We welcome collaboration proposals from faculty scholars, curious graduate candidates,
              and civic partners seeking evidence-based answers.
            </p>
          </div>
          <div className="flex gap-4 justify-end max-lg:justify-start flex-wrap">
            <Button className="bg-white text-[#0a2318] hover:bg-[#e5e4de] rounded-sm px-8 py-7 text-sm font-semibold tracking-wide">
              Submit Research Proposal
            </Button>
            <Button
              variant="outline"
              className="border-[#47c97e] text-white hover:bg-white/10 hover:text-white rounded-sm px-8 py-7 text-sm font-semibold tracking-wide bg-transparent"
            >
              Browse Active Grant Cycles
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
