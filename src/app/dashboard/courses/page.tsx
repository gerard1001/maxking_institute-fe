"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import {
  fetchAllCourses,
  selectCourses,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { useSnackbar } from "notistack";
import { Button } from "@mui/material";
import { FaPlus } from "react-icons/fa6";

const Courses = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const courseState = useSelector(selectCourses);
  const [value, setValue] = React.useState("course");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  console.log({ courseState });

  React.useEffect(() => {
    dispatch(fetchAllCourses())
      .unwrap()
      .then((res) => {})
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
  }, []);
  return (
    <div className="">
      <Box className="flex items-center justify-between">
        <Box className="">
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            aria-label="primary tabs example"
          >
            <Tab
              value="course"
              label="Courses"
              onClick={() => {
                router.push("/dashboard/courses");
              }}
            />
            <Tab
              value="categories"
              label="Categories"
              onClick={() => {
                router.push("/dashboard/courses/categories");
              }}
            />
          </Tabs>
        </Box>
        <Button
          className="bg-secondary text-white"
          startIcon={<FaPlus />}
          onClick={() => {
            router.push("/dashboard/courses/create-course");
          }}
        >
          Add New Course
        </Button>
      </Box>
      <div className="py-8">
        <div className="">
          {courseState?.allCourses?.length === 0 ? (
            <div>
              <h1 className="text-center text-xl text-accent font-bold">
                No courses here yet
              </h1>
              <p
                className="text-center text-accent/50 hover:underline  hover:text-accent/80 cursor-pointer"
                onClick={() => {
                  router.push("/dashboard/courses/create-course");
                }}
              >
                Add New
              </p>
            </div>
          ) : (
            <div>
              {courseState?.allCourses?.map((course) => (
                <div
                  key={course.id}
                  className="w-full bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-3 px-8 rounded-lg mb-4"
                >
                  <div className="flex gap-2">
                    <img
                      src={course.coverImage}
                      alt=""
                      className="w-[320px] aspect-video rounded-lg object-cover"
                    />
                    <div className="w-full">
                      <h1 className="text-xl text-accent font-bold">
                        {course.title}
                      </h1>
                      <p className="line-clamp-4">{course.description}</p>
                    </div>
                  </div>
                  <div className=""></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
