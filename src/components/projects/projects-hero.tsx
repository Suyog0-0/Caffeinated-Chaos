import Image from "next/image";

export function ProjectsHero() {
  return (
    <header className="relative isolate min-h-[600px] overflow-hidden bg-[#0d2a20] text-white">
      <Image
        className="absolute inset-0 -z-20 h-full w-full object-cover saturate-75"
        src="https://picsum.photos/seed/projects/1536/1024"
        alt=""
        fill
        priority
      />

      <div className="absolute inset-0 -z-10 bg-[#0d2a20]/70" />

      <div className="mx-auto flex min-h-[650px] w-[min(calc(100%_-_48px),1240px)] items-center max-sm:w-[calc(100%_-_32px)]">
        <div className="max-w-4xl">
          <p className="mb-4 font-sans text-xs font-bold text-[#b6c7bd]">
            Projects
          </p>

          <h1 className="text-[clamp(54px,7vw,92px)] leading-[.94] font-normal tracking-[-.045em]">
            Research in motion.
          </h1>

          <p className="mt-6 max-w-2xl text-xl text-[#c5d2cb]">
            Follow the work from its first question to the evidence and
            partnerships it creates.
          </p>
        </div>
      </div>
    </header>
  );
}
