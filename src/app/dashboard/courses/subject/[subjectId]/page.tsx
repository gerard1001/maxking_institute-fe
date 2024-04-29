"use client";

import {
  fetchCoursesBySubjectId,
  fetchOneSubject,
  selectCourses,
  selectSubjects,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React from "react";
import { FaPlus } from "react-icons/fa6";

interface SubjectProps {
  params: {
    subjectId: string;
  };
}

const SubjectCourses = ({ params: { subjectId } }: SubjectProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const state = useSelector(selectSubjects);
  const courseState = useSelector(selectCourses);

  console.log(state.subject);
  console.log(courseState.allCourses, "&&");

  React.useEffect(() => {
    dispatch(fetchOneSubject(subjectId))
      .unwrap()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
  }, []);
  React.useEffect(() => {
    dispatch(fetchCoursesBySubjectId(state.subject.id))
      .unwrap()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        // enqueueSnackbar(err.message, { variant: "error" });
      });
  }, [state.subject, courseState.course]);
  return (
    <div>
      <div
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
      </div>
      <div className={`w-full flex flex-row-reverse py-4`}>
        <Button
          className="bg-secondary text-white"
          startIcon={<FaPlus />}
          onClick={() => {
            router.push(
              `/dashboard/courses/subject/${subjectId}/create-course`
            );
          }}
        >
          Create New Course
        </Button>
      </div>
      <div className="w-full flex gap-4">
        <div className="min-h-[30vh] bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-[320px]"></div>
        <div className="min-h-[30vh] bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-full p-4">
          {courseState.allCourses.map((course) => (
            <div
              key={course.id}
              className="w-full bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-4 rounded-lg"
            >
              <div className="w-full flex gap-2 border-b pb-2">
                <img
                  src={course.coverImage}
                  alt=""
                  className="w-[320px] aspect-video rounded-lg"
                />
                <div className="w-full">
                  <h1 className="text-2xl font-bold">{course.title}</h1>
                  <p className="text-base line-clamp-3">{course.description}</p>
                  <Button
                    className="bg-secondary text-white"
                    onClick={() => {
                      router.push(
                        `/dashboard/courses/subject/${subjectId}/course/${course.id}`
                      );
                    }}
                  >
                    View Course
                  </Button>
                </div>
              </div>
              <div className="w-full min-h-8"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectCourses;
