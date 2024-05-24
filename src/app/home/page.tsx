"use client";

import ImageSlider from "./sections/ImageSlider";
import WhyUs from "./sections/WhyUs";
import CourseCategories from "./sections/CourseCategories";
import PopularCourses from "./sections/PopularCourses";
import Articles from "./sections/Articles";
import Collaborators from "./sections/Collaborators";
import Testimonials from "./sections/Testimonials";
import Footer from "@/components/Footer";
// @ts-ignore
import TawkTo from "next-tawkto";
import React from "react";

const HomePage = () => {
  React.useEffect(() => {
    var tawk = new TawkTo(
      process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID,
      process.env.NEXT_PUBLIC_TAWK_ID
    );

    tawk.onStatusChange((status: any) => {
      // console.log(status);
    });
  }, []);

  // React.useEffect(() => {
  //   if (!window) return;

  //   if (process.env.NEXT_PUBLIC_ENVIRONMENT !== "live") return;

  //   new tawkTo(   process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID,
  // process.env.NEXT_PUBLIC_TAWK_ID);
  // }, []);
  return (
    <div className="pt-4">
      <ImageSlider />
      <WhyUs />
      <CourseCategories />
      <div className="flex items-start">
        <div className="min-h-40 w-full">
          {/* <CourseUpdates /> */}
          <PopularCourses />
        </div>
        {/* <div className="bg-yellow-100 min-h-40 w-[22%] xl:block hidden"></div> */}
      </div>
      <Articles />
      <Collaborators />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default HomePage;
