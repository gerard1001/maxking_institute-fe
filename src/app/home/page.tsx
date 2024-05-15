import ImageSlider from "./sections/ImageSlider";
import WhyUs from "./sections/WhyUs";
import CourseCategories from "./sections/CourseCategories";
import PopularCourses from "./sections/PopularCourses";
import Articles from "./sections/Articles";
import Collaborators from "./sections/Collaborators";
import Testimonials from "./sections/Testimonials";
import Footer from "@/components/Footer";

const HomePage = () => {
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
      {/* <Testimonials /> */}
      <Footer />
    </div>
  );
};

export default HomePage;
