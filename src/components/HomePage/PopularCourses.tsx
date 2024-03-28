import React from "react";
import SectionTitle from "../SectionTitle";
import { IoIosArrowRoundForward } from "react-icons/io";
import Link from "next/link";

export const ViewAll = (page: string) => {
  return (
    <Link
      href={page}
      className="flex items-center gap-[2px] text-sm font-semibold  cursor-pointer group"
    >
      View All{" "}
      <IoIosArrowRoundForward className="text-lg duration-100 group-hover:transform group-hover:translate-x-1" />
    </Link>
  );
};

const PopularCourses = () => {
  return (
    <div className="p-10">
      <SectionTitle
        title="POPULAR COURSES"
        image="/icons/popular-dark.svg"
        rightSideActions={ViewAll("/about")}
      />
      <div className="pt-10 flex items-center gap-5 w-full justify-center min-h-80 bg-emerald-100"></div>
    </div>
  );
};

export default PopularCourses;
