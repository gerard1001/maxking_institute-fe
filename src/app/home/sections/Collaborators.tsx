import React from "react";
import SectionTitle from "../../../components/SectionTitle";
import { FaHandshake, FaYoutube } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";

const Collaborators = () => {
  return (
    <div className="lg:p-10 p-2">
      <SectionTitle title="MEET OUR OUR collaborators" icon={FaHandshake} />
      <div className="lg:p-10 p-2 flex items-start flex-wrap lg:gap-8 gap-2">
        <div className="flex flex-col justify-center items-center p-3 flex-wrap rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] relative cursor-pointer hover:scale-110 ease-in transition-all duration-200 ">
          <CgWebsite className="absolute top-2 right-2 text-sky-600" />
          <img src="/icons/reca.svg" className="w-auto h-auto max-w-[180px]" />
        </div>
        <div className="flex flex-col justify-center items-center p-3 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] relative cursor-pointer hover:scale-110 ease-in transition-all duration-200 ">
          <FaYoutube className="absolute top-2 right-2 text-red-600" />
          <img src="/icons/rma.svg" className="max-w-[180px]" />
        </div>
      </div>
    </div>
  );
};

export default Collaborators;
