import { FlaskConical, Search } from "lucide-react";
import Link from "next/link";
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
        <Link
          className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0F2D24] text-white text-sm font-medium hover:bg-[#0B231B] transition-colors cursor-pointer"
          href="/search"
        >
          Start exploring <Search size={16} />
        </Link>      </div>
    </section>
  );
}
