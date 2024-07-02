import React from "react";
import ServicesSection from "../e-campus/sections/ServicesSection";
import Footer from "@/components/Footer";
// import DivisionsSection from "../e-campus/sections/DivisionsSection";

const Services = () => {
  return (
    <div className="">
      <div className="lg:p-10 p-4 py-14 max-w-[1400px] mx-auto">
        <ServicesSection />
        <div className="h-32" />
        {/* <DivisionsSection /> */}
      </div>
      <Footer />
    </div>
  );
};

export default Services;
