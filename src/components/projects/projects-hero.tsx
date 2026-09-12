import Image from "next/image";

export function ProjectsHero() {
  return (
    <header className="bg-[#0d2a20] py-16 text-white">
      <div className="mx-auto grid w-[min(calc(100%_-_48px),1240px)] grid-cols-2 items-center gap-[8vw] max-lg:grid-cols-1 max-sm:w-[calc(100%_-_32px)]">
        <div>
          <p className="mb-4 font-sans text-xs font-bold text-[#b6c7bd]">Projects</p>
          <h1 className="text-[clamp(54px,7vw,92px)] leading-[.94] font-normal tracking-[-.045em]">
            Research in motion.
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-[#c5d2cb]">
            Follow the work from its first question to the evidence and partnerships it creates.
          </p>
        </div>
        <Image
          className="h-[390px] w-full object-cover saturate-75 max-sm:h-[300px]"
          src="https://picsum.photos/seed/projects/1536/1024"
          alt="Student researchers checking an environmental sensor in Kathmandu"
          width={1536}
          height={1024}
          priority
        />
      </div>
    </header>
  );
}
