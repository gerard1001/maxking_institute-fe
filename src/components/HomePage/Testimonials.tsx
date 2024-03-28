import React from "react";
import SectionTitle from "../SectionTitle";
import { GrBlockQuote } from "react-icons/gr";

const Testimonials = () => {
  return (
    <div className="p-10">
      <SectionTitle title="WHAT PEOPLE SAY" icon={GrBlockQuote} />
      <div className="pt-10 flex items-center gap-5 w-full justify-center min-h-80 bg-emerald-100"></div>
    </div>
  );
};

export default Testimonials;
