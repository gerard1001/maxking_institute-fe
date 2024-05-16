import React from "react";
import SectionTitle from "../../../components/SectionTitle";
import { GrBlockQuote } from "react-icons/gr";

const Testimonials = () => {
  return (
    <div className="lg:p-10 p-2" id="testimonials">
      <SectionTitle title="WHAT PEOPLE SAY" icon={GrBlockQuote} />
      <div className="lg:pt-10 pt-4 flex items-center gap-5 w-full justify-center min-h-80 bg-emerald-100"></div>
    </div>
  );
};

export default Testimonials;
