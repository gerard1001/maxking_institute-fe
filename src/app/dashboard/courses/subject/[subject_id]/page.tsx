"use client";

import BackIconButton from "@/components/BackIconButton";
import { LoginContext } from "@/lib/context/LoginContext";
import { ICourse } from "@/lib/interfaces/course.interface";
import {
  fetchCoursesBySubjectId,
  fetchOneSubject,
  selectCourses,
  selectSubjects,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import {
  Box,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React from "react";
import { CgClose } from "react-icons/cg";
import { FaPlus } from "react-icons/fa6";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import courseDurations from "@/lib/data/courseDurations.json";

interface SubjectProps {
  params: {
    subject_id: string;
  };
}

const SubjectCourses = ({ params: { subject_id } }: SubjectProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const state = useSelector(selectSubjects);
  const courseState = useSelector(selectCourses);
  const [isFreeCoursesSet, setIsFreeCoursesSet] =
    React.useState<boolean>(false);
  const [isCertifiedCoursesSet, setIsCertifiedCoursesSet] =
    React.useState<boolean>(false);
  const [selectedDuration, setSelectedDuration] = React.useState<string>("");
  const { userId, userLoggedIn, setGoToPage, isClient } =
    React.useContext(LoginContext);
  const [filteredData, setFilteredData] = React.useState<ICourse[]>([]);

  React.useEffect(() => {
    dispatch(fetchOneSubject(subject_id))
      .unwrap()
      .then((res) => {})
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
  }, []);

  React.useEffect(() => {
    dispatch(fetchCoursesBySubjectId(state.subject.id))
      .unwrap()
      .then((res) => {})
      .catch((err) => {
        // enqueueSnackbar(err.message, { variant: "error" });
      });
  }, [state.subject, courseState.course]);

  React.useEffect(() => {
    if (selectedDuration === "") {
      setFilteredData(courseState?.allCourses);
    } else {
      const results = courseState?.allCourses.filter(
        (item) => item.estimatedDuration === selectedDuration
      );
      setFilteredData(results);
    }
    if (isFreeCoursesSet && selectedDuration !== "") {
      const results = courseState?.allCourses.filter(
        (item) =>
          item.price === 0 && item.estimatedDuration === selectedDuration
      );
      setFilteredData(results);
    } else if (isFreeCoursesSet) {
      const results = courseState?.allCourses.filter(
        (item) => item.price === 0
      );
      setFilteredData(results);
    }
  }, [
    selectedDuration,
    courseState?.allCourses,
    isFreeCoursesSet,
    isCertifiedCoursesSet,
  ]);

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDuration(event.target.value);
  };

  return (
    <div>
      {/* <div
        className={`w-full py-4 bg-gradient-to-r from-sky-900 to-blue-700 p-4`}
      >
        <h1 className="text-2xl text-white font-bold">
          Learn {state?.subject?.name}
        </h1>
        <ul className="text-white pt-2 pl-2">
          <li className="text-base mt-2 text-white flex items-center gap-2">
            {" "}
            <div className="w-2 h-2 rounded-full bg-white" />0 Total Courses
          </li>
          <li className="text-base mt-2 text-white flex items-center gap-2">
            {" "}
            <div className="w-2 h-2 rounded-full bg-white" />0 Total Learners
          </li>
          <li className="text-base mt-2 text-white flex items-center gap-2">
            {" "}
            <div className="w-2 h-2 rounded-full bg-white" />0 Certified Courses
          </li>
        </ul>
      </div> */}
      <div className={`w-full flex items-center justify-between py-4`}>
        <BackIconButton />
        {!isClient && (
          <Button
            className="bg-secondary text-white"
            startIcon={<FaPlus />}
            onClick={() => {
              router.push(
                `/dashboard/courses/subject/${subject_id}/create-course`
              );
            }}
          >
            Create New Course
          </Button>
        )}
      </div>
      <div className="w-full flex gap-4 pb-8">
        <div className="min-h-[30vh] sm:inline hidden bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-[320px] md:p-8 p-2">
          <div className="flex items-center gap-2 border-b">
            <h1 className="text-accent text-xl font-semibold">Filters</h1>
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
          {filteredData?.length === 0 ? (
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
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <div className="">
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
                      {course?.isPublished ? (
                        <Button
                          className="bg-secondary text-white"
                          onClick={() => {
                            router.push(`/dashboard/courses/${course.id}`);
                          }}
                        >
                          Go to Course
                        </Button>
                      ) : !isClient ? (
                        <Button
                          className="bg-secondary text-white"
                          onClick={() => {
                            router.push(`/dashboard/courses/${course.id}`);
                          }}
                        >
                          Go to Course
                        </Button>
                      ) : (
                        <p className="text-accent-foreground">
                          ⚠️ This course is still in preparation process
                        </p>
                      )}
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

export default SubjectCourses;
