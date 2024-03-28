import type { Metadata } from "next";
import ImageSlider from "@/components/HomePage/ImageSlider";
import WhyUs from "@/components/HomePage/WhyUs";
import Articles from "@/components/HomePage/Articles";
import CourseCategories from "@/components/HomePage/CourseCategories";
import CourseUpdates from "@/components/HomePage/CourseUpdates";
import PopularCourses from "@/components/HomePage/PopularCourses";
import Collaborators from "@/components/HomePage/Collaborators";
import Testimonials from "@/components/HomePage/Testimonials";
import Footer from "@/components/Footer";

export default function IndexPage() {
  return (
    <div className="">
      <ImageSlider />
      <WhyUs />
      <CourseCategories />
      <div className="flex items-start">
        <div className="bg-red-100 min-h-40 w-[78%]">
          <CourseUpdates />
          <PopularCourses />
        </div>
        <div className="bg-green-100 min-h-40 w-[22%]"></div>
      </div>
      <Articles />
      <Collaborators />
      <Testimonials />
      <Footer />
    </div>
  );
}

export const metadata: Metadata = {
  title: "MaxKing Institute",
};
