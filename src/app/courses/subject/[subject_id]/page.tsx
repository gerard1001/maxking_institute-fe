"use client";

import React from "react";
import BackIconButton from "@/components/BackIconButton";
import SignInModal from "@/components/SignInModal";
import { LoginContext } from "@/lib/context/LoginContext";
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
  Checkbox,
  Chip,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { ICourse } from "@/lib/interfaces/course.interface";
import { CgClose } from "react-icons/cg";

interface SubjectProps {
  params: {
    subject_id: string;
  };
}

const courseDurations = [
  "< 30 minutes",
  "30 - 60 minutes",
  "1 - 2 hours",
  "2 - 4 hours",
  "4 - 8 hours",
  "8 - 10 hours",
  "10+ hours",
];

const SubjectCourses = ({ params: { subject_id } }: SubjectProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const state = useSelector(selectSubjects);
  const courseState = useSelector(selectCourses);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [isFreeCoursesSet, setIsFreeCoursesSet] =
    React.useState<boolean>(false);
  const [isCertifiedCoursesSet, setIsCertifiedCoursesSet] =
    React.useState<boolean>(false);
  const [selectedDuration, setSelectedDuration] = React.useState<string>("");
  const { userId, userLoggedIn, setGoToPage } = React.useContext(LoginContext);
  const [filteredData, setFilteredData] = React.useState<ICourse[]>([]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

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
    <div className="p-10">
      <div className={`w-full flex items-center justify-between py-4`}>
        <BackIconButton />
      </div>
      <div className="w-full flex gap-4 mb-8">
        <div className="min-h-[30vh] bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-[320px] p-8">
          <div className="flex items-center gap-2 border-b">
            <h1 className="text-accent text-xl font-semibold">Filters</h1>
            <HiOutlineAdjustmentsHorizontal className="text-xl" />
          </div>
          <div className="flex gap-2 pt-2">
            <Chip
              label="Free courses"
              variant={`${isFreeCoursesSet ? "filled" : "outlined"}`}
              onClick={() => {
                setIsFreeCoursesSet((state) => !state);
              }}
              // onDelete={}
            />
            <Chip
              label="Certified courses"
              variant={`${isCertifiedCoursesSet ? "filled" : "outlined"}`}
              onClick={() => {
                setIsCertifiedCoursesSet((state) => !state);
              }}
              // onDelete={}
            />
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
          {courseState?.allCourses?.length === 0 ? (
            <div>
              <h1 className="text-center text-xl text-accent font-bold">
                No courses here yet
              </h1>
            </div>
          ) : (
            <div className="w-full">
              {filteredData?.length === 0 ? (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <h1 className="text-accent text-xl">No courses found</h1>
                </div>
              ) : (
                <>
                  {filteredData?.map((course) => (
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
                          {course?.users?.find((user) => user.id === userId)
                            ?.user_course ? (
                            <>
                              {course?.users?.find((user) => user.id === userId)
                                ?.user_course?.completed ? (
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
                        <div className="">
                          {" "}
                          <Button
                            className="bg-secondary text-white"
                            onClick={() => {
                              if (!userLoggedIn) {
                                setGoToPage(`/dashboard/courses/${course.id}`);
                                handleOpenModal();
                              } else {
                                router.push(`/dashboard/courses/${course.id}`);
                              }
                            }}
                          >
                            Go to Course
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <SignInModal openModal={openModal} handleCloseModal={handleCloseModal} />
    </div>
  );
};

export default SubjectCourses;
