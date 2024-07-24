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
import {
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { FaPlus } from "react-icons/fa6";
import { BsBookmarkPlus } from "react-icons/bs";
import { LoginContext } from "@/lib/context/LoginContext";
import { ICourse } from "@/lib/interfaces/course.interface";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { CgClose } from "react-icons/cg";
import courseDurations from "@/lib/data/courseDurations.json";

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
  const [typedCourses, setTypedCourses] = React.useState<ICourse[]>([]);
  const [isFreeCoursesSet, setIsFreeCoursesSet] =
    React.useState<boolean>(false);
  const [isCertifiedCoursesSet, setIsCertifiedCoursesSet] =
    React.useState<boolean>(false);
  const [selectedDuration, setSelectedDuration] = React.useState<string>("");
  const { userId, setGoToPage, isClient } = React.useContext(LoginContext);
  const [filteredData, setFilteredData] = React.useState<ICourse[]>([]);

  React.useEffect(() => {
    dispatch(fetchAllCourses())
      .unwrap()
      .then((res) => {})
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });

    if (!isClient) {
      setTypedCourses(courseState?.allCourses);
    } else {
      setTypedCourses(courseState?.allCourses);
      // setTypedCourses(
      //   courseState?.allCourses?.filter((course) => course?.isPublished)
      // );
    }
  }, []);

  React.useEffect(() => {
    if (isClient) {
      setTypedCourses(courseState?.allCourses);
    } else {
      setTypedCourses(courseState?.allCourses);
      // setTypedCourses(
      //   courseState?.allCourses?.filter((course) => course?.isPublished)
      // );
    }
  }, [isClient]);

  React.useEffect(() => {
    if (courseType === "all") {
      if (!isClient) {
        setTypedCourses(courseState?.allCourses);
      } else {
        setTypedCourses(
          courseState?.allCourses?.filter((course) => course?.isPublished)
        );
      }
    } else if (courseType === "completed") {
      // const completedCourses = courseState?.allCourses?.filter((course) =>
      //   course?.users?.filter((user) => user?.user_course?.completed)
      // );

      const completedCourses = courseState?.allCourses?.filter(
        (course) =>
          course?.users?.find((user) => user.id === userId)?.user_course
            ?.completed && course?.isPublished
      );

      setTypedCourses(completedCourses);
    } else if (courseType === "ongoing") {
      // const ongoingCourses = courseState?.allCourses?.filter((course) =>
      //   course?.users?.filter((user) => user?.user_course?.completed === false)
      // );

      const ongoingCourses = courseState?.allCourses?.filter(
        (course) =>
          course?.users?.find((user) => user.id === userId)?.user_course
            ?.completed === false && course?.isPublished
      );
      setTypedCourses(ongoingCourses);
    }
  }, [courseType, courseState?.allCourses]);

  React.useEffect(() => {
    if (selectedDuration === "") {
      setFilteredData(typedCourses);
    } else {
      const results = typedCourses.filter(
        (item) => item.estimatedDuration === selectedDuration
      );
      setFilteredData(results);
    }
    if (isFreeCoursesSet && selectedDuration !== "") {
      const results = typedCourses.filter(
        (item) =>
          item.price === 0 && item.estimatedDuration === selectedDuration
      );
      setFilteredData(results);
    } else if (isFreeCoursesSet) {
      const results = typedCourses.filter((item) => item.price === 0);
      setFilteredData(results);
    }
  }, [selectedDuration, typedCourses, isFreeCoursesSet, isCertifiedCoursesSet]);

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDuration(event.target.value);
  };

  return (
    <div className="">
      <Box className="flex items-center flex-wrap gap-3 justify-between">
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
      {isClient && courseState?.allCourses?.length > 0 && (
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
              {!isClient && (
                <p
                  className="text-center text-accent/50 hover:underline  hover:text-accent/80 cursor-pointer"
                  onClick={() => {
                    router.push("/dashboard/courses/create-course");
                  }}
                >
                  Add New
                </p>
              )}
            </div>
          ) : (
            <>
              <div className="w-full flex gap-4 pb-8">
                <div className="min-h-[30vh] sm:inline hidden bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-[320px] md:p-8 p-2">
                  <div className="flex items-center gap-2 border-b">
                    <h1 className="text-accent text-xl font-semibold">
                      Filters
                    </h1>
                    <HiOutlineAdjustmentsHorizontal className="text-xl" />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Chip
                      label="Free courses"
                      variant={`${isFreeCoursesSet ? "filled" : "outlined"}`}
                      color="warning"
                      onClick={() => {
                        setIsFreeCoursesSet((state) => !state);
                      }}
                    />
                    {/* <Chip
              label="Certified courses"
              variant={`${isCertifiedCoursesSet ? "filled" : "outlined"}`}
              onClick={() => {
                setIsCertifiedCoursesSet((state) => !state);
              }}
              // onDelete={}
            /> */}
                  </div>
                  <div className="">
                    <FormControl component="fieldset">
                      <FormLabel
                        component="legend"
                        className="text-accent text-base font-semibold flex items-center gap-2 justify-between"
                      >
                        Filter by Duration{" "}
                        <IconButton
                          onClick={() => {
                            setSelectedDuration("");
                          }}
                        >
                          <CgClose />
                        </IconButton>
                      </FormLabel>
                      <RadioGroup
                        value={selectedDuration}
                        onChange={handleDurationChange}
                      >
                        {courseDurations.map((duration) => (
                          <FormControlLabel
                            key={duration}
                            value={duration}
                            control={<Radio />}
                            label={duration}
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
                <div className="min-h-[30vh] bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-full p-4">
                  <div>
                    {filteredData?.map((course) => (
                      <div
                        key={course.id}
                        className="w-full bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-3 md:px-8 sm:px-4 px-2 rounded-lg mb-4 overflow-x-hidden"
                      >
                        <div className="flex gap-2 border-b border-muted-foreground pb-4 lg:flex-row flex-col">
                          <img
                            src={course.coverImage}
                            alt=""
                            className="w-[320px] aspect-video rounded-lg object-cover"
                          />
                          <div className="w-full">
                            <h1 className="text-xl text-secondary font-bold line-clamp-1">
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
                            <p className="md:line-clamp-4 line-clamp-2">
                              {course.description}
                            </p>
                            <div className={`w-fit bg-white px-1`}>
                              {course.price === 0 || !course.price ? (
                                <h1 className="text-secondary font-semibold">
                                  Free
                                </h1>
                              ) : (
                                <h1 className="text-primary font-semibold">
                                  $ {course.price}
                                </h1>
                              )}
                            </div>
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
                                {course?.users?.find(
                                  (user) => user.id === userId
                                )?.user_course?.completed ? (
                                  <Chip
                                    label={
                                      <h1 className="flex">Completed course</h1>
                                    }
                                    className="mt-2 ml-2 bg-green-300"
                                  />
                                ) : (
                                  <Chip
                                    label={
                                      <h1 className="flex">Ongoing course</h1>
                                    }
                                    className="mt-2 ml-2 bg-zinc-300"
                                  />
                                )}
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                          {!isClient && !course?.isPublished && (
                            <p className="text-accent/50 text-sm">
                              ⚠️ Course not published
                            </p>
                          )}
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
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
