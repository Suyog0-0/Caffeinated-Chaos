import Image from "next/image";

export function AboutHero() {
  return (
    <header className="mx-auto grid w-[min(calc(100%_-_48px),1240px)] grid-cols-[.85fr_1.15fr] items-center gap-[8vw] py-20 max-lg:grid-cols-1 max-sm:w-[calc(100%_-_32px)]">
      <div>
        <p className="mb-4 font-sans text-xs font-bold text-[#153c2e]">About R&amp;D</p>
        <h1 className="text-[clamp(54px,7vw,92px)] leading-[.94] font-normal tracking-[-.045em]">
          Curiosity with somewhere to go.
        </h1>
        <p className="mt-6 max-w-2xl text-xl text-[#405149]">
          We help ideas move—from an early question, to shared inquiry, to evidence that improves
          lives.
        </p>
      </div>
      <Image
        className="h-[500px] w-full object-cover max-sm:h-[300px]"
        src="/research-collaboration.png"
        alt="Researchers collaborating in a Kathmandu computing lab"
        width={1536}
        height={1024}
        priority
      />
    </header>
  );
}
