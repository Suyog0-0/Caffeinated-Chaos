"use client";

import { useState } from "react";
import { OpportunityCard, type Opportunity } from "./opportunity-card";

export function OpportunitiesList({ opportunities }: { opportunities: Opportunity[] }) {
  const [activeFilter, setActiveFilter] = useState("All");

  // Dynamically generate filter options based on the actual data
  const uniqueTypes = Array.from(new Set(opportunities.map(op => op.type)));
  
  const filterOptions = [
    { label: "All", value: "All" },
    ...uniqueTypes.map(type => ({ label: type, value: type }))
  ];

  const filteredOpportunities = opportunities.filter(op => {
    if (activeFilter === "All") return true;
    return op.type === activeFilter;
  });

  const getFilterCount = (filterValue: string) => {
    if (filterValue === "All") return opportunities.length;
    return opportunities.filter(op => op.type === filterValue).length;
  };

  return (
    <section className="bg-[#F8F7F4] py-12 px-6 md:px-12 min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Filters */}
        <div className="flex flex-col lg:flex-row justify-between gap-6 mb-12">
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => {
              const count = getFilterCount(option.value);
              const isActive = activeFilter === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => setActiveFilter(option.value)}
                  className={`px-5 py-2 rounded-full font-medium text-sm transition-colors flex items-center gap-2 ${
                    isActive 
                      ? "bg-[#0B3B24] text-white" 
                      : "bg-white border border-[#E5E2D9] text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {option.label} 
                  <span className={isActive ? "opacity-80" : "opacity-50"}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-4">
            <select className="bg-white border border-[#E5E2D9] text-gray-700 text-sm rounded-lg px-4 py-2.5 min-w-[200px] focus:outline-none focus:border-[#0B3B24]">
              <option>All Departments & Labs</option>
              <option>Computer Science</option>
              <option>Health AI Lab</option>
            </select>
            <select className="bg-white border border-[#E5E2D9] text-gray-700 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#0B3B24]">
              <option>Sort: Deadline (Earliest)</option>
              <option>Sort: Deadline (Latest)</option>
              <option>Sort: Newest Added</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        {filteredOpportunities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {filteredOpportunities.map((op) => (
              <OpportunityCard key={op.id} opportunity={op} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-2xl border border-gray-200 mb-16">
            <p className="text-gray-500 font-serif text-lg">No opportunities found for the selected category.</p>
          </div>
        )}

      </div>
    </section>
  );
}
