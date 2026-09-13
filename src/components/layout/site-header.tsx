"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

type NavLink = {
  href: string;
  label: string;
};

type IconProps = {
  className?: string;
};

const navLinks: readonly NavLink[] = [
  { href: "/research-areas", label: "Research areas" },
  { href: "/people", label: "People" },
  { href: "/projects", label: "Projects" },
  { href: "/publications", label: "Publications" },
  { href: "/events", label: "Events" },
  { href: "/grants", label: "Grants" },
  { href: "/aboutsection", label: "About R&D" },
  { href: "/partners", label: "Partners" },
];

function isActivePath(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/* -------------------------------------------------------------------------- */
/* Icons                                                                      */
/* -------------------------------------------------------------------------- */

function SearchIcon({ className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function MenuIcon({ className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

function CloseIcon({ className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M5 5l14 14" />
      <path d="M19 5 5 19" />
    </svg>
  );
}

function ArrowIcon({ className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Brand                                                                      */
/* -------------------------------------------------------------------------- */

function Brand() {
  return (
    <Link
      href="/"
      aria-label="Islington Research home"
      className={[
        "group flex min-w-0 items-center gap-3",
        "outline-none",
        "focus-visible:ring-2 focus-visible:ring-[#153c2e]/25",
        "focus-visible:ring-offset-4",
        "focus-visible:ring-offset-[#fffefb]",
      ].join(" ")}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/ijmr-logo-white.svg"
        alt="IJMR"
        className={[
          "h-[40px] w-auto shrink-0",
          "object-contain",
          "transition-transform duration-200",
          "group-hover:scale-[1.03]",
          "max-[759px]:h-[34px]",
        ].join(" ")}
      />

      <span className="min-w-0">
        <span
          className={[
            "block truncate",
            "text-[20px] font-semibold leading-[1.05]",
            "tracking-[-0.025em] text-[#17251f]",
            "max-[759px]:text-[17px]",
            "max-[370px]:text-[16px]",
          ].join(" ")}
        >
          Islington Research
        </span>

        <span
          className={[
            "mt-[6px] block truncate",
            "text-[9px] font-medium uppercase leading-none",
            "tracking-[0.11em] text-[#405149]",
            "max-[759px]:hidden",
          ].join(" ")}
        >
          Research &amp; Development Hub
        </span>
      </span>
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Desktop navigation                                                         */
/* -------------------------------------------------------------------------- */

function DesktopNavigation({
  pathname,
}: {
  pathname: string;
}) {
  return (
    <nav
      aria-label="Primary navigation"
      className="ml-auto hidden min-[1080px]:flex"
    >
      <div className="flex items-center">
        {navLinks.map((link, index) => {
          const active = isActivePath(pathname, link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={[
                "group relative px-[11px] py-[13px]",
                "text-[12px] leading-none",
                "tracking-[-0.005em]",
                "outline-none",
                "transition-colors duration-150",
                "focus-visible:text-[#153c2e]",
                index === 0 ? "pl-[8px]" : "",
                active
                  ? "font-semibold text-[#153c2e]"
                  : "font-medium text-[#26372f] hover:text-[#153c2e]",
              ].join(" ")}
            >
              <span className="relative">
                {link.label}

                <span
                  aria-hidden="true"
                  className={[
                    "absolute -bottom-[7px] left-0",
                    "h-px w-full origin-left",
                    "bg-[#153c2e]",
                    "transition-transform duration-200",
                    active
                      ? "scale-x-100"
                      : [
                        "scale-x-0",
                        "group-hover:scale-x-100",
                        "group-focus-visible:scale-x-100",
                      ].join(" "),
                  ].join(" ")}
                />
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

/* -------------------------------------------------------------------------- */
/* Desktop search                                                             */
/* -------------------------------------------------------------------------- */

function DesktopSearch() {
  return (
    <Link
      href="/search"
      aria-label="Search research"
      className={[
        "group flex min-h-[42px] items-center gap-2",
        "border-l border-[#d7d5cd]",
        "pl-5 pr-1",
        "text-[12px] font-semibold text-[#26372f]",
        "outline-none",
        "transition-colors duration-150",
        "hover:text-[#153c2e]",
        "focus-visible:text-[#153c2e]",
      ].join(" ")}
    >
      <SearchIcon className="shrink-0 transition-transform duration-150 group-hover:scale-[1.04]" />

      <span>Search</span>
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Mobile navigation item                                                     */
/* -------------------------------------------------------------------------- */

function MobileNavItem({
  link,
  index,
  pathname,
}: {
  link: NavLink;
  index: number;
  pathname: string;
}) {
  const active = isActivePath(pathname, link.href);

  return (
    <Link
      href={link.href}
      aria-current={active ? "page" : undefined}
      className={[
        "group flex min-h-[58px] items-center justify-between",
        "border-b border-[#e1dfd8]",
        "px-1",
        "text-[14px]",
        "outline-none",
        "transition-colors duration-150",
        "hover:bg-[#f2efe7]",
        "focus-visible:bg-[#f2efe7]",
        index === navLinks.length - 1 ? "border-b-0" : "",
        active
          ? "font-semibold text-[#153c2e]"
          : "font-medium text-[#26372f]",
      ].join(" ")}
    >
      <span className="flex min-w-0 items-center">
        <span
          aria-hidden="true"
          className={[
            "mr-3 h-[6px] w-[6px] shrink-0",
            "bg-[#153c2e]",
            "transition-opacity duration-150",
            active
              ? "opacity-100"
              : "opacity-0 group-hover:opacity-40",
          ].join(" ")}
        />

        <span className="truncate">{link.label}</span>
      </span>

      <ArrowIcon
        className={[
          "shrink-0 opacity-35",
          "transition-[opacity,transform] duration-150",
          "group-hover:translate-x-0.5 group-hover:opacity-100",
        ].join(" ")}
      />
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Mobile menu                                                                */
/* -------------------------------------------------------------------------- */

function MobileMenu({
  pathname,
}: {
  pathname: string;
}) {
  return (
    <details className="group relative ml-auto hidden max-[1079px]:block">
      <summary
        aria-label="Open navigation menu"
        className={[
          "relative flex h-[44px] w-[44px]",
          "cursor-pointer list-none items-center justify-center",
          "overflow-hidden",
          "border border-[#d7d5cd]",
          "bg-[#fffefb]",
          "text-[#17251f]",
          "outline-none",
          "[&::-webkit-details-marker]:hidden",
          "transition-[background-color,border-color,color] duration-200",
          "hover:border-[#153c2e]",
          "hover:bg-[#f2efe7]",
          "focus-visible:border-[#153c2e]",
          "focus-visible:ring-2",
          "focus-visible:ring-[#153c2e]/20",
          "focus-visible:ring-offset-2",
          "focus-visible:ring-offset-[#fffefb]",
          "group-open:border-[#153c2e]",
          "group-open:bg-[#153c2e]",
          "group-open:text-[#fffefb]",
          "max-[759px]:h-[42px]",
          "max-[759px]:w-[42px]",
        ].join(" ")}
      >
        {/* Hamburger */}
        <span
          aria-hidden="true"
          className={[
            "absolute inset-0 grid place-items-center",
            "transition-[transform,opacity] duration-200",
            "group-open:rotate-90",
            "group-open:scale-0",
            "group-open:opacity-0",
          ].join(" ")}
        >
          <MenuIcon />
        </span>

        {/* Close */}
        <span
          aria-hidden="true"
          className={[
            "absolute inset-0 grid place-items-center",
            "rotate-90 scale-0 opacity-0",
            "transition-[transform,opacity] duration-200",
            "group-open:rotate-0",
            "group-open:scale-100",
            "group-open:opacity-100",
          ].join(" ")}
        >
          <CloseIcon />
        </span>
      </summary>

      {/* ------------------------------------------------------------------ */}
      {/* Responsive menu                                                     */}
      {/* ------------------------------------------------------------------ */}

      <nav
        aria-label="Mobile navigation"
        className={[
          "fixed left-0 right-0 z-40",
          "top-[70px]",
          "border-b border-[#d7d5cd]",
          "bg-[#fffefb]",
          "shadow-[0_18px_40px_rgba(23,37,31,0.08)]",
          "min-[760px]:top-[76px]",
          "max-h-[calc(100dvh-70px)]",
          "overflow-y-auto",
          "overscroll-contain",
          "opacity-0 invisible pointer-events-none",
          "translate-y-[-8px]",
          "transition-[opacity,transform,visibility] duration-200",
          "group-open:visible",
          "group-open:pointer-events-auto",
          "group-open:translate-y-0",
          "group-open:opacity-100",
        ].join(" ")}
      >
        <div className="mx-auto w-[min(calc(100%-32px),1240px)]">
          {/* Menu heading */}
          <div className="flex items-end justify-between border-b border-[#d7d5cd] py-5">
            <div>
              <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#708078]">
                Islington Research
              </p>

              <p className="text-[18px] font-semibold leading-tight tracking-[-0.02em] text-[#17251f]">
                Explore
              </p>
            </div>

            <span className="pb-[2px] text-[10px] font-medium uppercase tracking-[0.12em] text-[#708078]">
              Menu
            </span>
          </div>

          {/* Navigation links */}
          <div className="py-2">
            {navLinks.map((link, index) => (
              <MobileNavItem
                key={link.href}
                link={link}
                index={index}
                pathname={pathname}
              />
            ))}
          </div>

          {/* Search */}
          <div className="border-t border-[#d7d5cd] py-4">
            <Link
              href="/search"
              aria-label="Search research"
              className={[
                "group flex min-h-[52px]",
                "items-center justify-between",
                "border border-[#153c2e]",
                "bg-[#153c2e]",
                "px-4",
                "text-[13px] font-semibold text-[#fffefb]",
                "outline-none",
                "transition-colors duration-150",
                "hover:border-[#214d3d]",
                "hover:bg-[#214d3d]",
                "focus-visible:ring-2",
                "focus-visible:ring-[#153c2e]/25",
                "focus-visible:ring-offset-2",
                "focus-visible:ring-offset-[#fffefb]",
              ].join(" ")}
            >
              <span className="flex items-center gap-3">
                <SearchIcon />
                <span>Search research</span>
              </span>

              <ArrowIcon
                className="transition-transform duration-150 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          {/* Footer detail */}
          <div className="border-t border-[#d7d5cd] py-4">
            <p className="text-[10px] leading-relaxed tracking-[0.01em] text-[#708078]">
              Research &amp; Development Hub
            </p>
          </div>
        </div>
      </nav>
    </details>
  );
}

/* -------------------------------------------------------------------------- */
/* Header                                                                     */
/* -------------------------------------------------------------------------- */

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header
      className={[
        poppins.className,
        "sticky top-0 z-50",
        "border-b border-[#d7d5cd]",
        "bg-[#fffefb]/96",
        "backdrop-blur-[10px]",
      ].join(" ")}
    >
      <div
        className={[
          "mx-auto flex items-center",
          "w-[min(calc(100%-48px),1240px)]",
          "min-h-[82px]",
          "gap-8",
          "max-[1079px]:min-h-[76px]",
          "max-[759px]:w-[min(calc(100%-32px),1240px)]",
          "max-[759px]:min-h-[70px]",
          "max-[420px]:gap-2.5",
        ].join(" ")}
      >
        <Brand />

        <DesktopNavigation pathname={pathname} />

        <div className="ml-1 hidden min-[1080px]:block">
          <DesktopSearch />
        </div>

        <MobileMenu pathname={pathname} />
      </div>
    </header>
  );
}