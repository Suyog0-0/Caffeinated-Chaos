import Link from "next/link";
import { ArrowRight, Calendar, Coins, UserCircle } from "lucide-react";

export type Opportunity = {
  id: string;
  title: string;
  type: string;
  description: string;
  deadline: string | null;
  status: string;
  areaSlug: string;
  areaName: string;
};

function getTypeColors(type: string) {
  const normalized = type.toLowerCase();
  if (normalized.includes("assistantship")) {
    return "bg-blue-50 text-blue-700 border-blue-100";
  } else if (normalized.includes("internship")) {
    return "bg-emerald-50 text-emerald-700 border-emerald-100";
  } else if (normalized.includes("call for papers")) {
    return "bg-amber-50 text-amber-700 border-amber-100";
  } else if (normalized.includes("collaboration") || normalized.includes("partner")) {
    return "bg-teal-50 text-teal-700 border-teal-100";
  } else if (normalized.includes("grant") || normalized.includes("fellowship")) {
    return "bg-purple-50 text-purple-700 border-purple-100";
  }
  return "bg-gray-50 text-gray-700 border-gray-100";
}

function getStatusMock(type: string) {
  const normalized = type.toLowerCase();
  if (normalized.includes("assistantship")) return "Fully Funded (3 Years)";
  if (normalized.includes("internship")) return "Paid • 6 Months (Hybrid)";
  if (normalized.includes("call for papers")) return "Journal Special Edition";
  if (normalized.includes("collaboration")) return "Industry & Municipal Partners";
  if (normalized.includes("fellowship")) return "Postdoctoral • 2 Years";
  if (normalized.includes("student job")) return "Part-time (20hr/week)";
  return "Open Opportunity";
}

function getStipendMock(type: string) {
  const normalized = type.toLowerCase();
  if (normalized.includes("assistantship")) return "Stipend: £21,500/year tax-free + Full Tuition waiver";
  if (normalized.includes("internship")) return "Salary: £18,000 pro rata";
  if (normalized.includes("call for papers")) return "Indexing: Impact Factor 5.8 • Q1 Scientific Journal";
  if (normalized.includes("collaboration")) return "Framework: 18-Month Co-Funded Grant & IP Sharing";
  if (normalized.includes("fellowship")) return "Salary: Grade 7 Research Scale (£38,000 - £44,000 p.a.)";
  return "Funding: Varies by project scope";
}

function getLeadMock(type: string) {
  const normalized = type.toLowerCase();
  if (normalized.includes("call for papers")) return "Editorial Desk: journal.aim@islington.edu";
  if (normalized.includes("collaboration")) return "Principal Investigator: Dr. James Whitfield";
  return "Lead: Dr. Amara Okafor (amara.okafor@islington.edu)";
}

export function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  const typeColors = getTypeColors(opportunity.type);
  const statusMock = getStatusMock(opportunity.type);
  const stipendMock = getStipendMock(opportunity.type);
  const leadMock = getLeadMock(opportunity.type);

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-md transition-all flex flex-col group h-full">
      <div className="flex justify-between items-start mb-6">
        <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full border ${typeColors}`}>
          {opportunity.type}
        </span>
        <span className="text-[10px] font-bold text-gray-500 uppercase px-3 py-1 rounded-full bg-[#F4F1EA]">
          {statusMock}
        </span>
      </div>
      
      <h3 className="text-xl font-serif text-[#0B3B24] font-semibold mb-2 line-clamp-2">
        {opportunity.title}
      </h3>
      
      <div className="flex items-center gap-2 mb-4">
        <span className="w-1.5 h-1.5 bg-[#0B3B24] rounded-full"></span>
        <span className="text-xs text-gray-500">{opportunity.areaName}</span>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
        {opportunity.description}
      </p>
      
      <div className="space-y-3 mb-8">
        <div className="flex items-start gap-3 text-xs text-gray-600">
          <Calendar size={14} className="mt-0.5 text-gray-400" />
          <span><strong className="text-gray-700">Deadline:</strong> {opportunity.deadline || 'Rolling basis'}</span>
        </div>
        <div className="flex items-start gap-3 text-xs text-gray-600">
          <Coins size={14} className="mt-0.5 text-gray-400" />
          <span>{stipendMock}</span>
        </div>
        <div className="flex items-start gap-3 text-xs text-gray-600">
          <UserCircle size={14} className="mt-0.5 text-gray-400" />
          <span>{leadMock}</span>
        </div>
      </div>

      <div className="mt-auto flex justify-end items-center pt-5 border-t border-gray-100">
        <Link 
          href={`/opportunities/${opportunity.id}`}
          className="bg-[#0B3B24] hover:bg-[#072517] text-white px-5 py-2 rounded-lg text-xs font-medium transition-colors"
        >
          {opportunity.type.toLowerCase().includes('call for papers') ? 'Author Portal' : 
           opportunity.type.toLowerCase().includes('collaboration') ? 'Partner Inquiry' : 'Apply Now'}
        </Link>
      </div>
    </div>
  );
}
