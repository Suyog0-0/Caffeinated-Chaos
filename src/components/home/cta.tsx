import { FlaskConical, Search } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { pageShell, sectionTitle } from "./shared";

export function CTA() {
  return (
    <section className="py-20 text-center">
      <div className={`${pageShell} flex flex-col items-center`}>
        <FlaskConical aria-hidden size={34} strokeWidth={1.3} />
        <h2 className={`mt-4 ${sectionTitle}`}>There is more to discover.</h2>
        <p className="my-4 text-[#405149]">
          Search the whole Islington research ecosystem from one place.
        </p>
        <Link className={buttonVariants()} href="/search">
          Start exploring <Search size={17} />
        </Link>
      </div>
    </section>
  );
}
