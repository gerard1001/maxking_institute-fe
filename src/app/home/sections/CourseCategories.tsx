"use client";

import React from "react";
import SectionTitle from "../../../components/SectionTitle";
import {
  fetchAllCategories,
  selectCategories,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { FaArrowRightLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import LoadinProgress from "@/components/LoadingProgess";

const CourseCategories = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const categoryState = useSelector(selectCategories);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    dispatch(fetchAllCategories())
      .unwrap()
      .then((res) => {})
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-10" id="categories">
      <SectionTitle title="OUR COURSE CATEGORIES" image="/icons/category.svg" />
      {loading ? (
        <div className="flex flex-col justify-center items-center h-40">
          <LoadinProgress />
        </div>
      ) : (
        <>
          {categoryState.allCategories.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-40">
              <h1 className="text-accent text-xl">No categories added yet</h1>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-8">
              <div className="flex items-center flex-wrap gap-8 justify-center w-full pt-10">
                {categoryState.allCategories.map((category, index: number) => (
                  <div
                    key={category.id}
                    className="w-[200px] aspect-square hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] shadow-[0_2px_12px_rgb(0,0,0,0.12)] rounded-lg p-4 flex flex-col items-center justify-center gap-3 cursor-default"
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-[50px] aspect-square mx-auto object-cover rounded-lg"
                    />

                    <div className="flex flex-col items-center justify-center">
                      <h1 className="text-accent font-semibold text-lg">
                        {category.name}
                      </h1>
                      <p className="text-muted text-base">
                        {category.subjects?.reduce(
                          (acc, curr) =>
                            acc +
                            curr.courses.filter(
                              (course) => course.isPublished === true
                            ).length,
                          0
                        )}{" "}
                        Course(s)
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="flex items-center gap-2 mx-auto hover:bg-slate-100 rounded-lg p-1 px-2 cursor-pointer"
                onClick={() => {
                  router.push("/courses");
                }}
              >
                View All <FaArrowRightLong />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CourseCategories;
