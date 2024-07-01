"use client";

import React from "react";
import opportunities from "@/lib/utils/opportunities.json";
import { useRouter } from "next/navigation";

const OpportunitiesSection = () => {
  const router = useRouter();
  return (
    <div
      className="flex flex-col items-center lg:gap-4 gap-2 mt-10 2xl:pt-0 pt-8"
      id="opportunities"
    >
      <h1 className="xl:text-4xl text-2xl font-bold mb-4 text-secondary-foreground text-center">
        Opportunities
      </h1>
      <h2 className="mb-4 text-secondary-foreground text-center xl:text-3xl text-xl">
        Explore Exciting Opportunities with Our App
      </h2>

      <div className="flex items-center flex-wrap gap-8 justify-center w-full pt-6">
        {opportunities?.map((opportunity, index: number) => {
          return (
            <div
              key={opportunity.id}
              className="w-[250px] aspect-video shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg p-3 cursor-pointer transition-all duration-200  hover:scale-105"
              onClick={() => {
                router.push(`${opportunity.link}`);
              }}
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
