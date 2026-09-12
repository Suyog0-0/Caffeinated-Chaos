import Link from "next/link";

export function OpportunitiesCTA() {
  return (
    <section className="bg-[#EFECE5] py-16 px-6 md:px-12 border-t border-[#E5E2D9]">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <div className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">
            FOR PRINCIPAL INVESTIGATORS & INDUSTRY R&D
          </div>
          <h2 className="text-2xl font-serif text-[#0B3B24] font-semibold mb-2">
            Have an open grant call or seeking doctoral talent?
          </h2>
          <p className="text-gray-600 text-sm">
            Submit your project scope, laboratory vacancy, or inter-institutional symposium call to be indexed across the Islington Research Registry.
          </p>
        </div>
        
        <div className="flex items-center gap-4 shrink-0">
          <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLSdG8Lb3SgR6PqoH6IYmZ8o9xGCdQDXtMgyl_l77-7DwuWCs-g/viewform" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0B3B24] hover:bg-[#072517] text-white px-6 py-3 rounded-lg font-medium transition-colors text-sm"
          >
            Submit Opportunity Notice
          </a>

        </div>
      </div>
    </section>
  );
}
