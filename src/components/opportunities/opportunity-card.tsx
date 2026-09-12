import { Calendar } from "lucide-react";

export type Opportunity = {
  id: string;
  title: string;
  type: string;
  description: string;
  deadline: string | null;
  status: string;
  applicationUrl: string;
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

export function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  const typeColors = getTypeColors(opportunity.type);
  const statusDisplay = opportunity.status.charAt(0).toUpperCase() + opportunity.status.slice(1);

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-md transition-all flex flex-col group h-full">
      <div className="flex justify-between items-start mb-6">
        <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full border ${typeColors}`}>
          {opportunity.type}
        </span>
        <span className="text-[10px] font-bold text-gray-500 uppercase px-3 py-1 rounded-full bg-[#F4F1EA]">
          {statusDisplay}
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
      </div>

      <div className="mt-auto flex justify-end items-center pt-5 border-t border-gray-100">
        <a 
          href={opportunity.applicationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#0B3B24] hover:bg-[#072517] text-white px-5 py-2 rounded-lg text-xs font-medium transition-colors"
        >
          {opportunity.type.toLowerCase().includes('call for papers') ? 'Author Portal' : 
           opportunity.type.toLowerCase().includes('collaboration') ? 'Partner Inquiry' : 'Apply Now'}
        </a>
      </div>
    </div>
  );
}
