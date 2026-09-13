import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
});

type Project = {
  status: string;
  title: string;
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
    <header className="relative isolate overflow-hidden border-b border-[#17251f]">
      {/* Full-section background image */}
      <Image
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        src="https://picsum.photos/seed/project-detail/1536/1024"
        alt=""
        fill
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 -z-10 bg-[#153c2e]/75" />

      {/* Content */}
      <div className="relative mx-auto flex min-h-[650px] w-[min(calc(100%_-_48px),1240px)] items-center py-20 max-sm:min-h-[600px] max-sm:w-[calc(100%_-_32px)]">
        <div className="max-w-4xl text-white">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 font-sans text-sm text-white/70"
          >
            <Link
              className="font-semibold text-white hover:underline underline-offset-4"
              href="/projects"
            >
              Projects
            </Link>

            <span aria-hidden="true" className="text-white/50">
              ›
            </span>

            <span className="max-w-[40ch] truncate">
              {project.title}
            </span>
          </nav>

          <h1 className="mt-4 text-[clamp(48px,7vw,90px)] font-normal leading-[.94] tracking-[-.045em]">
            {project.title}
          </h1>

          <dl className={`${inter.className} mt-12 flex gap-16 max-sm:grid max-sm:gap-5`}>
            {facts.map(([term, value]) => (
              <div key={term}>
                <dt className="text-[10px] font-bold uppercase tracking-wider text-white/70">
                  {term}
                </dt>

                <dd className="mt-1 text-lg font-semibold text-white">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </header>
  );
}
