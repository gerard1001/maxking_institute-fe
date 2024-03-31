import React from "react";
import opportunities from "@/lib/utils/opportunities.json";

const OpportunitiesSection = () => {
  return (
    <div className="flex flex-col items-start gap-6 mt-10">
      <h1 className="text-accent text-xl font-bold uppercase mx-auto">
        Opportunities
      </h1>
      <div className="flex items-center flex-wrap gap-8 lg:justify-start justify-center w-full pt-6">
        {opportunities?.map((opportunity, index: number) => {
          return (
            <div
              key={opportunity.id}
              className="w-[250px] aspect-video shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg p-3 cursor-pointer transition-all duration-200  hover:scale-105"
            >
              <div className="border-dotted  rounded-md border-[1.5px] border-secondary w-full h-full flex flex-col items-center justify-center">
                <h1 className="text-secondary uppercase font-bold sm:text-2xl text-xl">
                  {opportunity.title}
                </h1>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OpportunitiesSection;
