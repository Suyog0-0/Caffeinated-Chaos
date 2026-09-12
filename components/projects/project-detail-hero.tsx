import Image from "next/image";
import Link from "next/link";

type Project = {
  status: string;
  title: string;
  summary: string;
  area: string;
  start: string;
  end: string;
};

export function ProjectDetailHero({ project }: { project: Project }) {
  const facts = [
    ["Research area", project.area],
    ["Timeline", `${project.start}—${project.end}`],
  ];

  return (
    <header className="mx-auto grid w-[min(calc(100%_-_48px),1240px)] grid-cols-[1.1fr_.9fr] items-center gap-[7vw] border-b border-[#17251f] py-16 max-lg:grid-cols-1 max-sm:w-[calc(100%_-_32px)]">
      <div>
        <p className="font-sans text-[10px]">
          <Link className="hover:underline" href="/projects">
            Projects
          </Link>{" "}
          / {project.status}
        </p>
        <h1 className="mt-3 text-[clamp(48px,5.5vw,75px)] leading-[.94] font-normal tracking-[-.045em]">
          {project.title}
        </h1>
        <p className="mt-6 max-w-2xl text-xl text-[#405149]">{project.summary}</p>
        <dl className="mt-10 flex gap-12 max-sm:grid max-sm:gap-4">
          {facts.map(([term, value]) => (
            <div key={term}>
              <dt className="font-sans text-[9px] text-[#405149]">{term}</dt>
              <dd className="mt-1 text-lg">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <Image
        className="h-[430px] w-full object-cover max-sm:h-[300px]"
        src="https://picsum.photos/seed/project-detail/1536/1024"
        alt="Researchers gathering environmental data"
        width={1536}
        height={1024}
        priority
      />
    </header>
  );
}
