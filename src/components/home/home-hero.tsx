import { Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { kicker, pageShell } from "./shared";
import { HeroPaperStack } from "./hero-paper-stack";

export function Hero() {
  return (
    <section className="overflow-hidden border-b border-[#d7d5cd] bg-[#fffefb]">
      <div
        className={`${pageShell} grid min-h-[650px] grid-cols-[1.05fr_.75fr] items-center gap-[6vw] py-16 max-lg:grid-cols-1 max-lg:gap-8`}
      >
        <div>
          <p className={kicker}>Ideas, evidence and people—connected</p>
          <h1 className="max-w-3xl text-[clamp(58px,6.5vw,94px)] leading-[.91] font-normal tracking-[-.045em] text-balance max-sm:text-[clamp(50px,15vw,68px)]">
            Research that begins here, and matters everywhere.
          </h1>
          <p className="my-7 max-w-2xl text-[21px] leading-relaxed text-[#405149] font-sans">
            Discover the people, projects and publications shaping Islington College’s growing
            research community.
          </p>
          <form
            className="grid min-h-16 max-w-2xl grid-cols-[24px_1fr_auto] items-center gap-3 border border-[#b7b9b3] bg-white py-1.5 pr-2 pl-4 shadow-[7px_7px_0_#eeeae0] focus-within:outline-2 focus-within:outline-offset-3 focus-within:outline-[#153c2e] max-sm:grid-cols-[20px_1fr]"
            action="/search"
          >
            <Search aria-hidden size={21} />
            <label className="sr-only" htmlFor="home-search">
              Search the research ecosystem
            </label>
            <Input
              className="border-0 bg-transparent px-0 placeholder:font-sans focus-visible:ring-0 "
              id="home-search"
              name="q"
              type="search"
              placeholder ="Search a topic, researcher or paper"
            />
            <Button className="font-sans font-medium max-sm:col-span-2" size="lg" type="submit">
              Explore
            </Button>
          </form>
          <nav
            className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 font-sans text-[15px] text-[#405149]"
            aria-label="Suggested searches"
          >
            <span className="font-bold text-[#153c2e]">Explore:</span>
            {[
              ["Responsible AI", "Responsible+AI"],
              ["Climate resilience", "Climate+resilience"],
              ["Digital education", "Digital+education"],
            ].map(([label, query]) => (
              <Link
                className="font-semibold underline decoration-[#b9b7ae] underline-offset-4 transition-colors hover:text-[#153c2e] hover:decoration-[#153c2e]"
                href={`/search?q=${query}`}
                key={query}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <HeroPaperStack />
      </div>
    </section>
  );
}
