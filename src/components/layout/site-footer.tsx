// src/components/site-footer.tsx
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Mail, MapPin } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface FooterLink {
  href: string;
  label: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const NAV_COLUMNS: FooterColumn[] = [
  {
    title: "Discover",
    links: [
      { href: "/research-areas", label: "Research areas" },
      { href: "/people", label: "Researchers" },
      { href: "/projects", label: "Projects" },
      { href: "/publications", label: "Publications" },
      { href: "/aboutsection", label: "Partners" },
    ],
  },
  {
    title: "R&D Hub",
    links: [
      { href: "/aboutsection", label: "About us" },
      { href: "/opportunities", label: "Opportunities" },
      { href: "/ethics", label: "Ethics" },
      { href: "/ijmr", label: "IJMR" },
      { href: "/resources", label: "Resources" },
      { href: "/admin", label: "Admin workspace" },
    ],
  },
];

const ADDRESS_LINES = ["Kamal Marg, Kamal Pokhari", "Kathmandu, Nepal"];
const CONTACT_EMAIL = "research@islingtoncollege.edu.np";

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function FooterLinkItem({ link }: { link: FooterLink }) {
  return (
    <li>
      <Link
        href={link.href}
        className="group inline-flex items-center gap-1.5 rounded-sm py-1 font-sans text-[15px] font-medium leading-[1.6] tracking-[0.01em] text-[#a8bfb2] transition-colors duration-200 hover:text-[#f2ede2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9c08a]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1b14]"
      >
        <span className="relative">
          {link.label}
          <span
            aria-hidden
            className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#d9c08a] transition-[width] duration-200 ease-out group-hover:w-full"
          />
        </span>
        <ArrowUpRight
          size={13}
          className="-translate-x-0.5 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-60"
          aria-hidden
        />
      </Link>
    </li>
  );
}

function FooterColumnBlock({ column }: { column: FooterColumn }) {
  return (
    <nav aria-label={column.title} className="lg:col-span-2">
      <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#d9c08a]">
        {column.title}
      </h3>
      <ul className="space-y-2.5">
        {column.links.map((link) => (
          <FooterLinkItem key={`${column.title}-${link.label}`} link={link} />
        ))}
      </ul>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component (Server Component)                                  */
/* ------------------------------------------------------------------ */

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="mt-auto border-t border-[#d9c08a]/20 bg-[#0a1b14] pb-12 pt-20 text-[#9db4a8]"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Top section */}
        <div className="grid grid-cols-1 gap-14 border-b border-white/10 pb-16 md:grid-cols-2 lg:grid-cols-12">
          {/* Identity */}
          <div className="md:col-span-2 lg:col-span-5">
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-3.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9c08a]/60 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a1b14]"
              aria-label="Islington Research — home"
            >
              <span
                aria-hidden
                className="grid size-10 place-items-center rounded-[5px] bg-[#f2ede2] font-serif text-[15px] font-bold text-[#0a1b14]"
              >
                IR
              </span>
              <span className="font-serif text-[22px] font-semibold tracking-tight text-[#f2ede2]">
                Islington Research
              </span>
            </Link>

            <p className="mb-8 max-w-md font-serif text-[19px] italic leading-[1.55] text-[#c4d4ca]">
              Open inquiry. Shared evidence.{" "}
              <span className="text-[#e9dfc8]">Meaningful change.</span>
            </p>

            <address className="flex items-start gap-2.5 font-sans text-sm not-italic leading-relaxed text-[#7f958a]">
              <MapPin size={15} className="mt-1 shrink-0" aria-hidden />
              <span>{ADDRESS_LINES.join(" · ")}</span>
            </address>

            <Link
              href="/research-areas"
              className="group mt-6 inline-flex items-center gap-2.5 rounded-full border border-[#d9c08a]/35 px-5 py-2.5 font-sans text-sm font-medium text-[#e9dfc8] transition-all duration-200 hover:border-[#d9c08a]/70 hover:bg-[#d9c08a]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9c08a]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1b14]"
            >
              View research areas
              <ArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </div>

          {/* Navigation columns */}
          {NAV_COLUMNS.map((column) => (
            <FooterColumnBlock key={column.title} column={column} />
          ))}

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#d9c08a]">
              Contact
            </h3>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="group inline-flex max-w-full items-center gap-2.5 rounded-sm py-1 font-sans text-[15px] text-[#c4d4ca] transition-colors duration-200 hover:text-[#f2ede2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9c08a]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1b14]"
            >
              <Mail size={15} className="shrink-0 text-[#7f958a] transition-colors group-hover:text-[#d9c08a]" aria-hidden />
              <span className="relative break-all">
                {CONTACT_EMAIL}
                <span
                  aria-hidden
                  className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#d9c08a] transition-[width] duration-200 ease-out group-hover:w-full"
                />
              </span>
            </a>
            <p className="mt-5 max-w-xs font-sans text-sm leading-relaxed text-[#7f958a]">
              For collaboration, partnerships, or research inquiries, reach out to the
              R&amp;D office.
            </p>
          </div>
        </div>

        {/* Legal strip */}
        <div className="flex flex-col items-center justify-between gap-4 pt-9 sm:flex-row">
          <p className="font-sans text-[13px] tracking-[0.01em] text-[#7f958a]">
            © {year} Islington College Research &amp; Development. All rights reserved.
          </p>
          <p className="font-serif text-[15px] italic tracking-[0.02em] text-[#9db4a8]">
            Caffeinated chaos<span className="text-[#d9c08a]">.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
