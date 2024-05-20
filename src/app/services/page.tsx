import React from "react";
import ServicesSection from "../training-center/sections/ServicesSection";
import OpportunitiesSection from "../training-center/sections/OpportunitiesSection";

const Services = () => {
  return (
    <div className="lg:p-10 p-4 py-14 max-w-[1400px] mx-auto">
      <ServicesSection />
      <OpportunitiesSection />
    </div>
  );
};

export default Services;
