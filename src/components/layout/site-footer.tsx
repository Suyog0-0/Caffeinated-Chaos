import Link from "next/link";

export function SiteFooter() {
  return (
    <footer
      className="bg-[#081813] text-[#869b91] pt-16 pb-12 border-t border-white/10"
      id="contact"
      style={{ marginTop: "auto" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Top columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Identity column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-white text-[#081813] flex items-center justify-center font-serif text-sm font-bold rounded-xs">
                IR
              </div>
              <span className="text-white font-serif text-base font-semibold">
                Islington Research
              </span>
            </div>
            <p className="text-xs text-[#a2b5ab] leading-relaxed max-w-sm mb-4">
              Open inquiry. Shared evidence. Meaningful change.
            </p>
            <div className="text-[11.5px] text-[#71857c] font-mono">
              Kamal Marg, Kamal Pokhari · Kathmandu, Nepal
            </div>
          </div>

          {/* Discover */}
          <div className="lg:col-span-3 text-xs">
            <h4 className="text-white font-semibold uppercase tracking-widest text-[11px] mb-4">
              Discover
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link className="hover:text-white transition-colors" href="/research-areas">
                  Research areas
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors" href="/people">
                  Researchers
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors" href="/projects">
                  Projects
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors" href="/publications">
                  Publications
                </Link>
              </li>
            </ul>
          </div>

          {/* R&D Hub */}
          <div className="lg:col-span-2 text-xs">
            <h4 className="text-white font-semibold uppercase tracking-widest text-[11px] mb-4">
              R&amp;D Hub
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link className="hover:text-white transition-colors" href="/aboutsection">
                  About us
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors" href="/aboutsection">
                  Vision &amp; mission
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors" href="/aboutsection">
                  Partners
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors" href="/admin">
                  Admin workspace
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 text-xs">
            <h4 className="text-white font-semibold uppercase tracking-widest text-[11px] mb-4">
              Islington College
            </h4>
            <ul className="space-y-2.5">
              <li className="text-[#a2b5ab]">Kamal Marg, Kamal Pokhari</li>
              <li className="text-[#a2b5ab]">Kathmandu, Nepal</li>
              <li>
                <a
                  className="hover:text-white transition-colors"
                  href="mailto:research@islingtoncollege.edu.np"
                >
                  research@islingtoncollege.edu.np
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#71857c] gap-4">
          <div>
            © 2026 Islington College Research &amp; Development. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <span>Built for curiosity</span>
          </div>
        </div>
      </div>
    </footer>
  );
}