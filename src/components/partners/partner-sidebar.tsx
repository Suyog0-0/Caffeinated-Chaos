import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type {
  PartnerProjectLink,
  PartnerPublicationLink,
} from "./partner-actions";

interface PartnerSidebarProps {
  projects: PartnerProjectLink[];
  publications: PartnerPublicationLink[];
}

const sectionTitle =
  "font-serif text-[30px] font-medium leading-none tracking-[-0.02em] text-[#0f2d24]";

export function PartnerSidebar({ projects, publications }: PartnerSidebarProps) {
  return (
    <aside className="border-t border-[#aeb7b1] pt-6 lg:border-t-0 lg:border-l lg:pl-10">
      <LinkedSection count={projects.length} title="Projects">
        {projects.length === 0 ? (
          <EmptyState>There are no public projects linked yet.</EmptyState>
        ) : (
          <ul className="mt-5 border-t border-[#d0cec5]">
            {projects.map((project) => (
              <li className="border-b border-[#d0cec5]" key={project.id}>
                <Link
                  className="group flex items-start justify-between gap-4 py-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#153c2e]"
                  href={`/projects/${project.slug}`}
                >
                  <span>
                    {project.status && (
                      <span className="mb-1 block font-sans text-[11px] font-semibold capitalize text-[#68766f]">
                        {project.status}
                      </span>
                    )}
                    <span className="font-serif text-[19px] leading-[1.2] text-[#182820] decoration-1 underline-offset-4 group-hover:underline">
                      {project.title}
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-[#607169] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    size={16}
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </LinkedSection>

      <LinkedSection count={publications.length} title="Publications">
        {publications.length === 0 ? (
          <EmptyState>There are no public publications linked yet.</EmptyState>
        ) : (
          <ul className="mt-5 border-t border-[#d0cec5]">
            {publications.map((publication) => (
              <li className="border-b border-[#d0cec5]" key={publication.id}>
                <Link
                  className="group flex items-start justify-between gap-4 py-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#153c2e]"
                  href={`/publications/${publication.id}`}
                >
                  <span>
                    {publication.year && (
                      <span className="mb-1 block font-sans text-[11px] font-semibold text-[#68766f]">
                        {publication.year}
                      </span>
                    )}
                    <span className="font-serif text-[19px] leading-[1.2] text-[#182820] decoration-1 underline-offset-4 group-hover:underline">
                      {publication.title}
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-[#607169] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    size={16}
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </LinkedSection>
    </aside>
  );
}

function LinkedSection({
  children,
  count,
  title,
}: {
  children: React.ReactNode;
  count: number;
  title: string;
}) {
  return (
    <section className="mb-14 last:mb-0">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className={sectionTitle}>{title}</h2>
        <span className="font-sans text-xs font-semibold text-[#68766f]">
          {count}
        </span>
      </div>
      {children}
    </section>
  );
}

function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-5 border-t border-[#d0cec5] py-5 font-sans text-sm leading-6 text-[#68766f]">
      {children}
    </p>
  );
}
