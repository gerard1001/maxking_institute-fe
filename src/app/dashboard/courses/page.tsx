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
import { Button, Chip, IconButton, Stack } from "@mui/material";
import { FaPlus } from "react-icons/fa6";
import { BsBookmarkPlus } from "react-icons/bs";
import { LoginContext } from "@/lib/context/LoginContext";
import { ICourse } from "@/lib/interfaces/course.interface";

const Courses = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const courseState = useSelector(selectCourses);
  const [value, setValue] = React.useState("course");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const [courseType, setCourseType] = React.useState<
    "all" | "completed" | "ongoing"
  >("all");
  const [typedCourses, setTypedCourses] = React.useState<ICourse[]>(
    courseState?.allCourses
  );

  console.log(typedCourses, "typedCourses");
  console.log(courseType, "typedCourses");

  const { isClient, userId } = React.useContext(LoginContext);

  React.useEffect(() => {
    dispatch(fetchAllCourses())
      .unwrap()
      .then((res) => {})
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
  }, []);

  React.useEffect(() => {
    if (courseType === "all") {
      setTypedCourses(courseState?.allCourses);
    } else if (courseType === "completed") {
      // const completedCourses = courseState?.allCourses?.filter((course) =>
      //   course?.users?.filter((user) => user?.user_course?.completed)
      // );

      const completedCourses = courseState?.allCourses?.filter(
        (course) =>
          course?.users?.find((user) => user.id === userId)?.user_course
            ?.completed
      );

      setTypedCourses(completedCourses);
    } else if (courseType === "ongoing") {
      // const ongoingCourses = courseState?.allCourses?.filter((course) =>
      //   course?.users?.filter((user) => user?.user_course?.completed === false)
      // );

      const ongoingCourses = courseState?.allCourses?.filter(
        (course) =>
          course?.users?.find((user) => user.id === userId)?.user_course
            ?.completed === false
      );
      setTypedCourses(ongoingCourses);
    }
  }, [courseType, courseState?.allCourses]);

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
        {!isClient && (
          <Button
            className="bg-secondary text-white"
            startIcon={<FaPlus />}
            onClick={() => {
              router.push("/dashboard/courses/create-course");
            }}
          >
            Add New Course
          </Button>
        )}
      </Box>
      {isClient && (
        <div className="mt-6">
          <Stack direction="row" spacing={1}>
            <Chip
              label="All"
              className={`cursor-pointer ${
                courseType === "all" && " bg-muted text-white"
              }`}
              onClick={() => {
                setCourseType("all");
              }}
            />
            <Chip
              label="Completed"
              className={`cursor-pointer ${
                courseType === "completed" && " bg-muted text-white"
              }`}
              onClick={() => {
                setCourseType("completed");
              }}
            />
            <Chip
              label="Ongoing"
              className={`cursor-pointer ${
                courseType === "ongoing" && " bg-muted text-white"
              }`}
              onClick={() => {
                setCourseType("ongoing");
              }}
            />
          </Stack>
        </div>
      )}
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
              {typedCourses?.map((course) => (
                <div
                  key={course.id}
                  className="w-full bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-3 px-8 rounded-lg mb-4"
                >
                  <div className="flex gap-2 border-b border-muted-foreground pb-4">
                    <img
                      src={course.coverImage}
                      alt=""
                      className="w-[320px] aspect-video rounded-lg object-cover"
                    />
                    <div className="w-full">
                      <h1 className="text-xl text-secondary font-bold">
                        {course.title}
                      </h1>
                      <div className="flex items-center gap-2 py-1">
                        <p className="border-r border-muted-foreground leading-4 text-muted pr-2">
                          {course?.modules?.length} modules
                        </p>
                        <p className="leading-4 text-muted pr-2">
                          {course?.estimatedDuration}
                        </p>
                      </div>
                      <p className="line-clamp-4">{course.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <div className="">
                      {/* <IconButton>
                        <BsBookmarkPlus className="text-muted" />
                      </IconButton> */}
                      {course?.users?.find((user) => user.id === userId)
                        ?.user_course ? (
                        <>
                          {course?.users?.find((user) => user.id === userId)
                            ?.user_course?.completed ? (
                            <Chip
                              label={<h1 className="flex">Completed course</h1>}
                              className="mt-2 ml-2 bg-green-300"
                            />
                          ) : (
                            <Chip
                              label={<h1 className="flex">Ongoing course</h1>}
                              className="mt-2 ml-2 bg-zinc-300"
                            />
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="">
                      {" "}
                      <Button
                        className="bg-secondary text-white"
                        onClick={() => {
                          router.push(`/dashboard/courses/${course.id}`);
                        }}
                      >
                        Go to Course
                      </Button>
                    </div>
                  </div>
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
