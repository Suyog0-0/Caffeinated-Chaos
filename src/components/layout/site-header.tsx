// src/components/layout/site-header.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const navLinks = [
  { href: "/research-areas", label: "Research areas" },
  { href: "/people", label: "People" },
  { href: "/projects", label: "Projects" },
  { href: "/publications", label: "Publications" },
  { href: "/events", label: "Events" },
  { href: "/grants", label: "Grants" },
  { href: "/aboutsection", label: "About R&D" },
  { href: "/partners", label: "Partners" },
];

export function SiteHeader() {
  const path = usePathname();

  return (
    <header className={`${poppins.className} sticky top-0 z-20 border-b border-[#d7d5cd] bg-[rgba(255,254,251,0.96)] backdrop-blur-[12px]`}>
      <div className="mx-auto flex min-h-[82px] w-[min(calc(100%-48px),1240px)] items-center gap-[34px] max-[760px]:w-[min(calc(100%-32px),1240px)] max-[760px]:min-h-[70px]">
        {/* Brand */}
        <Link
          className="flex flex-none items-center gap-3"
          href="/"
          aria-label="Islington Research home"
        >
          <span className="grid aspect-square w-[43px] place-items-center bg-[#153c2e] text-xl leading-none text-[#fffefb] max-[760px]:w-[38px]">
            IR
          </span>
          <span>
            <strong className="block text-xl font-semibold leading-[1.05] tracking-[-0.01em] max-[760px]:text-[17px]">
              Islington Research
            </strong>
            <small className="mt-[5px] block text-[10px] text-[#405149] max-[760px]:hidden">
              Research &amp; Development Hub
            </small>
          </span>
        </Link>

        {/* Primary nav */}
        <nav
          className="ml-auto flex items-center gap-7 text-[13px] max-[1020px]:hidden"
          aria-label="Primary navigation"
        >
          {navLinks.map((link) => {
            const isActive = path.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  "relative after:absolute after:-bottom-2 after:left-0 after:h-px after:bg-[#153c2e] after:transition-[right] after:duration-200 after:content-['']",
                  isActive
                    ? "font-bold after:right-0"
                    : "after:right-full hover:after:right-0",
                ].join(" ")}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Search link */}
        <Link
          className="relative flex items-center gap-[9px] border-l border-[#d7d5cd] px-[14px] py-[11px] text-xs font-bold max-[1020px]:ml-auto max-[760px]:hidden"
          href="/search"
          aria-label="Search research"
        >
          <svg
            aria-hidden="true"
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>
          <span>Search</span>
        </Link>

        {/* Mobile menu */}
        <details className="group relative ml-auto hidden max-[760px]:block">
          <summary
            aria-label="Toggle navigation"
            className="flex h-[42px] w-[42px] cursor-pointer list-none items-center justify-center border border-[#d7d5cd] text-[#17251f] transition-colors duration-150 [&::-webkit-details-marker]:hidden hover:bg-[#eeeae0] group-open:border-[#153c2e] group-open:bg-[#153c2e] group-open:text-[#fffefb]"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="block"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </summary>
          <nav
            aria-label="Mobile navigation"
            className="absolute left-0 right-0 top-[70px] hidden grid-cols-1 border-b border-[#d7d5cd] bg-[#fffefb] px-4 pb-[18px] pt-3 shadow-[0_18px_30px_rgba(23,37,31,0.1)] group-open:grid"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border-b border-[#d7d5cd] px-1 py-[11px] text-[13px]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/search"
              className="border-b border-[#d7d5cd] px-1 py-[11px] text-[13px]"
            >
              Search
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
