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
  callForPapers: "https://ijmr.islingtoncollege.edu.np/index.php/IJMR/login?source=https%3A%2F%2Fijmr.islingtoncollege.edu.np%2Findex.php%2FIJMR%2Fsubmission",
};

export function IJMRSection() {
  return (
    <section className="bg-[#0d2818] px-6 py-20 text-[#f4f2ec] md:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium text-[#9fb8a8]">
          Islington Journal of Multidisciplinary Research
        </p>

        <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="max-w-xl font-serif text-4xl leading-tight md:text-5xl">
            Where our partners publish their findings.
          </h2>

          <div className="flex flex-wrap gap-3">
            <a
              href={IJMR_LINKS.visit}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "default" }),
                "bg-white text-[#0d2818] hover:bg-neutral-100"
              )}
            >
              Visit IJMR
            </a>

            <Link
              href={IJMR_LINKS.about}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "border-[#f4f2ec]/40 bg-transparent text-[#f4f2ec] hover:bg-white/10"
              )}
            >
              <a href={IJMR_LINKS.about} target="_blank" rel="noreferrer">
                About IJMR
              </a>
              About IJMR
            </Link>
              <a href={IJMR_LINKS.about} target="_blank" rel="noreferrer">
                About IJMR
              </a>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <IJMRCard
            icon={<Newspaper className="h-5 w-5" />}
            title="Latest articles"
            description="Recent research published by our partners and researchers."
            href={IJMR_LINKS.latestArticles}
          />

          <IJMRCard
            icon={<BookOpen className="h-5 w-5" />}
            title="Current issue"
            description="Browse the full table of contents for the latest volume."
            href={IJMR_LINKS.currentIssue}
          />

          <IJMRCard
            icon={<FileUp className="h-5 w-5" />}
            title="Submit a paper"
            description="Guidelines and the submission portal for new manuscripts."
            href={IJMR_LINKS.submitPaper}
          />

          <IJMRCard
            icon={<Megaphone className="h-5 w-5" />}
            title="Call for papers"
            description="Open themes and deadlines for upcoming issues."
            href={IJMR_LINKS.callForPapers}
          />
        </div>
      </div>
    </section>
  );
}

function IJMRCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  const isExternal = href.startsWith("http");

  const content = (
    <Card className="h-full rounded-md border border-white/15 bg-white/5 p-6 transition-colors hover:border-white/40 hover:bg-white/10">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
        {icon}
      </div>

      <h3 className="mt-4 font-serif text-lg text-white">{title}</h3>

      <p className="mt-2 text-sm leading-relaxed text-[#cdd8cf]">
        {description}
      </p>
    </Card>
  );

  return isExternal ? (
    <a href={href} target="_blank" rel="noreferrer">
      {content}
    </a>
  ) : (
    <Link href={href}>{content}</Link>
  );
}
