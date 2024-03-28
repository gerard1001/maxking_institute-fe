import React from "react";
import SectionTitle from "../SectionTitle";
import Image from "next/image";

const CourseUpdates = () => {
  return (
    <div className="p-10">
      <SectionTitle title="COURSE UPDATES" image="/icons/updates.svg" />
      <div className="pt-10 flex items-center gap-5 w-full justify-center">
        <div className="bg-pink w-56 h-32 rounded-md flex flex-col items-center gap-3 justify-center text-white text-xl font-bold">
          <Image
            src="/icons/new-white.svg"
            width={30}
            height={30}
            alt="Norman"
          />
          <h1>New Courses</h1>
        </div>
        <div className="bg-primary w-56 h-32 rounded-md flex flex-col items-center gap-3 justify-center text-white text-xl font-bold">
          <Image
            src="/icons/popular-white.svg"
            width={30}
            height={30}
            alt="Norman"
          />
          <h1>Popular Courses</h1>
        </div>
        <div className="bg-secondary w-56 h-32 rounded-md flex flex-col items-center gap-3 justify-center text-white text-xl font-bold">
          <Image
            src="/icons/upcoming-white.svg"
            width={30}
            height={30}
            alt="Norman"
          />
          <h1>Upcoming Courses</h1>
        </div>
      </div>
    </div>
  );
};

export default CourseUpdates;
