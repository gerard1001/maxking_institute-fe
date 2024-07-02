import React from "react";
import { FaRegCopyright } from "react-icons/fa";

const DashboardFooter = () => {
  return (
    <div className="w-full bg-stone-200 border-t h-fit flex flex-col items-center justify-center py-2">
      <h1 className="text-accent font-semibold text-sm">
        Max King's Institute, Kigali Rwanda
      </h1>
      <div className="text-sm text-gray-700 flex items-center">
        Copyright <FaRegCopyright className="w-3 mx-[2px]" /> 2024, All Rights
        Reserved
      </div>
    </div>
  );
};

export default DashboardFooter;
