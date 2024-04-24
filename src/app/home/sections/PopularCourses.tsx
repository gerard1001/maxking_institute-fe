import React from "react";
import SectionTitle from "../../../components/SectionTitle";
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
    <div className="lg:p-10 p-2">
      <SectionTitle
        title="POPULAR COURSES"
        image="/icons/popular-dark.svg"
        rightSideActions={ViewAll("/about")}
      />
      <div className="lg:pt-10 pt-2 flex items-center gap-5 w-full justify-center min-h-80 bg-yellow-200"></div>
    </div>
  );
};

export default PopularCourses;
