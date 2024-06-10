import Footer from "@/components/Footer";
import React from "react";
import MembershipPage from "./membership/page";
import OpportunitiesSection from "../training-center/sections/OpportunitiesSection";

const Community = () => {
  return (
    <>
      <OpportunitiesSection />
      <MembershipPage />
      <Footer />
    </>
  );
};

export default Community;
