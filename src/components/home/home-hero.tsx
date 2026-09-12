import { Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { kicker, pageShell } from "./shared";

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
          <p className="my-7 max-w-2xl text-[21px] leading-relaxed text-[#405149]">
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
              className="border-0 bg-transparent px-0 focus-visible:ring-0"
              id="home-search"
              name="q"
              type="search"
              placeholder="Search a topic, researcher or paper"
            />
            <Button className="max-sm:col-span-2" size="lg" type="submit">
              Explore
            </Button>
          </form>
          <nav
            className="mt-5 flex flex-wrap gap-x-4 gap-y-2 font-sans text-[11px] text-[#405149]"
            aria-label="Suggested searches"
          >
            <span className="font-bold">Explore:</span>
            {[
              ["Responsible AI", "Responsible+AI"],
              ["Climate resilience", "Climate+resilience"],
              ["Digital education", "Digital+education"],
            ].map(([label, query]) => (
              <Link
                className="underline underline-offset-4"
                href={`/search?q=${query}`}
                key={query}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="relative min-h-[500px] max-sm:min-h-[430px]">
          <div className="absolute inset-[58px_5px_44px_84px] rotate-[7deg] bg-[#e1c451] max-sm:inset-[46px_2px_33px_58px]" />
          <div className="absolute inset-[28px_41px_68px_45px] -rotate-[5deg] border border-[#c9c7bd] bg-[#eeeae0] shadow-xl max-sm:inset-[20px_22px_49px_25px]" />
          <Card className="absolute inset-[24px_35px_54px_34px] z-2 rotate-[.8deg] p-3 shadow-2xl max-sm:inset-[15px_20px_45px_14px]">
            <CardHeader className="flex-row justify-between border-b border-[#17251f] p-3 font-sans text-[9px] font-bold">
              <span>Islington research paper</span>
              <span>No. 08</span>
            </CardHeader>
            <CardContent className="p-6 max-sm:p-4">
              <p className="mb-2 font-sans text-[10px] font-bold text-[#153c2e]">
                Urban intelligence
              </p>
              <h2 className="max-w-md text-[clamp(33px,3.6vw,46px)] leading-none font-medium tracking-tight max-sm:text-[34px]">
                Can a city learn from the people who move through it?
              </h2>
              <p className="my-4 max-w-sm text-[15px] text-[#405149]">
                A community-led study of mobility data, public space and more inclusive decisions
                for Kathmandu.
              </p>
              <Separator className="mb-5" />
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-full bg-[#153c2e] font-sans text-[10px] text-white">
                  NM
                </span>
                <span>
                  <strong className="block text-[13px]">Nisha Maharjan</strong>
                  <small className="block font-sans text-[9px] text-[#405149]">
                    Lead researcher
                  </small>
                </span>
              </div>
            </CardContent>
          </Card>
          <p className="absolute right-5 bottom-0 z-4 font-sans text-[10px] text-[#405149]">
            <span className="mr-3 font-bold text-[#17251f]">Featured work</span> Five-minute read
          </p>
        </div>
      </div>
    </section>
  );
}
