// src/components/partners/partner-ijmr-section.tsx
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen, FileUp, Megaphone, Newspaper } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Islington Journal of Multidisciplinary Research — swap these links for
// the journal's real URLs / internal routes once they're available.
const IJMR_LINKS = {
  about: "https://ijmr.islingtoncollege.edu.np/index.php/IJMR/about",
  visit: "https://ijmr.islingtoncollege.edu.np",
  latestArticles: "https://ijmr.islingtoncollege.edu.np/index.php/IJMR/index",
  currentIssue: "https://ijmr.islingtoncollege.edu.np/index.php/IJMR/issue/view/2",
  submitPaper: "https://ijmr.islingtoncollege.edu.np/index.php/IJMR/about/submissions",
  callForPapers:
    "https://ijmr.islingtoncollege.edu.np/index.php/IJMR/login?source=https%3A%2F%2Fijmr.islingtoncollege.edu.np%2Findex.php%2FIJMR%2Fsubmission",
};

const buttonFocusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-1 focus-visible:ring-offset-[#0d2818]";

function isExternalHref(href: string): boolean {
  return href.startsWith("http");
}

export function IJMRSection() {
  return (
    <section className="bg-[#0d2818] px-6 py-20 text-[#f4f2ec] md:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium tracking-wide text-[#9fb8a8]">
          Islington Journal of Multidisciplinary Research
        </p>

        <div className="mt-4 flex flex-col justify-between gap-8 border-b border-white/10 pb-10 md:flex-row md:items-end md:gap-6">
          <h2 className="max-w-xl font-serif text-4xl leading-tight md:text-5xl">
            Where our partners publish their findings.
          </h2>

          <div className="flex flex-wrap gap-3">
            <IJMRButton href={IJMR_LINKS.visit} variant="solid">
              Visit IJMR
            </IJMRButton>
            <IJMRButton href={IJMR_LINKS.about} variant="outline">
              About IJMR
            </IJMRButton>
          </div>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <li>
            <IJMRCard
              icon={<Newspaper className="h-5 w-5" aria-hidden="true" />}
              title="Latest articles"
              description="Recent research published by our partners and researchers."
              href={IJMR_LINKS.latestArticles}
            />
          </li>
          <li>
            <IJMRCard
              icon={<BookOpen className="h-5 w-5" aria-hidden="true" />}
              title="Current issue"
              description="Browse the full table of contents for the latest volume."
              href={IJMR_LINKS.currentIssue}
            />
          </li>
          <li>
            <IJMRCard
              icon={<FileUp className="h-5 w-5" aria-hidden="true" />}
              title="Submit a paper"
              description="Guidelines and the submission portal for new manuscripts."
              href={IJMR_LINKS.submitPaper}
            />
          </li>
          <li>
            <IJMRCard
              icon={<Megaphone className="h-5 w-5" aria-hidden="true" />}
              title="Call for papers"
              description="Open themes and deadlines for upcoming issues."
              href={IJMR_LINKS.callForPapers}
            />
          </li>
        </ul>
      </div>
    </section>
  );
}

function IJMRButton({
  href,
  variant,
  children,
}: {
  href: string;
  variant: "solid" | "outline";
  children: ReactNode;
}) {
  const className = cn(
    buttonVariants({ variant: variant === "solid" ? "default" : "outline" }),
    "h-11 gap-2 rounded-sm px-6 text-sm font-semibold",
    variant === "solid"
      ? "bg-white text-[#0d2818] hover:bg-neutral-100"
      : "border-white/40 bg-transparent text-[#f4f2ec] hover:bg-white/10",
    buttonFocusRing,
  );

  if (isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}

function IJMRCard({
  icon,
  title,
  description,
  href,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  const content = (
    <Card className="h-full rounded-md border border-white/15 bg-white/5 p-6 transition-colors duration-150 group-hover/link:border-white/40 group-hover/link:bg-white/10 group-focus-visible/link:border-white/40 group-focus-visible/link:bg-white/10">
      <div className="flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/10 transition-colors duration-150 group-hover/link:border-white/25 group-hover/link:bg-white/20 group-focus-visible/link:border-white/25 group-focus-visible/link:bg-white/20">
          {icon}
        </div>
        <ArrowUpRight
          className="h-4 w-4 text-[#9fb8a8] opacity-0 transition-opacity duration-150 group-hover/link:opacity-100 group-focus-visible/link:opacity-100"
          aria-hidden="true"
        />
      </div>

      <h3 className="mt-4 font-serif text-xl leading-snug text-white transition-colors group-hover:text-[#9fb8a8]">{title}</h3>

      <p className="mt-2 text-sm leading-relaxed text-[#cdd8cf]">{description}</p>
    </Card>
  );

  const linkClassName = "group/link block rounded-md focus-visible:outline-none";

  if (isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={linkClassName}>
        {content}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={linkClassName}>
      {content}
    </Link>
  );
}