import { ArrowUpRight, FlaskConical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getRandomProject } from "./data/project";
import { pageShell, sectionTitle } from "./shared";

export async function FeaturedProject() {
  const project = await getRandomProject();

  if (!project) {
    return null;
  }

  return (
    <section className="relative overflow-hidden border-b border-[#d7d5cd] bg-[#153c2e] py-24 text-[#fffefb] max-sm:py-16">
      <Image
        fill
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 object-cover opacity-30"
        sizes="100vw"
        src="/tree.png"
      />

      <div className={`${pageShell} relative z-10`}>
        <div className="mb-12">
          <FlaskConical
            aria-hidden
            className="mb-6"
            size={28}
            strokeWidth={1.4}
          />

          <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-[#c7d4ce]">
            Featured research
          </p>

          <h2 className={`${sectionTitle} mt-3`}>
            One project from the work happening now.
          </h2>
        </div>

        <div className="grid border border-[#6f8a7d] bg-[#12362d]/35 backdrop-blur-[1px] transition-colors duration-300 hover:border-[#aac0b6] lg:grid-cols-[1.2fr_.8fr]">
          <div className="p-8 sm:p-10">
            <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-[#c7d4ce]">
              {project.research_area?.name ?? "Research"}
            </p>

            <h3 className="mt-4 max-w-2xl text-4xl leading-[1.08] font-medium tracking-[-0.025em] sm:text-5xl">
              {project.title}
            </h3>

            {project.description && (
              <p className="mt-6 max-w-2xl text-justify font-sans text-[19px] leading-8 text-[#d7e0db] max-sm:text-left max-sm:text-[17px]">
                {project.description}
              </p>
            )}

            <Link
              className={buttonVariants({
                variant: "link",
                className: "mt-10 w-fit px-0 font-sans text-[15px] font-semibold text-[#b9c4be] transition-all hover:translate-x-1 hover:text-white",
              })}
              href={`/projects/${project.slug}`}
            >
              View project
              <ArrowUpRight aria-hidden size={16} />
            </Link>
          </div>

          <div className="border-t border-[#6f8a7d] p-8 sm:p-10 lg:border-l lg:border-t-0">
            <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-[#c7d4ce]">
              Objective
            </p>

            <p className="mt-4 text-justify font-sans text-[19px] leading-8 text-[#eaf1ed] max-sm:text-left max-sm:text-[17px]">
              {project.description ??
                "Explore the project's research objectives and current work."}
            </p>

            <div className="mt-10 border-t border-[#6f8a7d] pt-6">
              <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-[#c7d4ce]">
                Research area
              </p>

              <p className="mt-2 font-sans text-[18px] font-semibold text-[#fffefb]">
                {project.research_area?.name ?? "Not specified"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
