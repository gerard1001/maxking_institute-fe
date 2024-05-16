"use client";

import React from "react";
import SectionTitle from "../../../components/SectionTitle";
import { IoIosArrowRoundForward } from "react-icons/io";
import Link from "next/link";
import {
  fetchAllCourses,
  selectCourses,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { useSnackbar } from "notistack";
import { ICourse } from "@/lib/interfaces/course.interface";
import { format } from "date-fns";
import { LoginContext } from "@/lib/context/LoginContext";
import { useRouter } from "next/navigation";
import SignInModal from "@/components/SignInModal";

export const ViewAll = (page: string) => {
  return (
    <Link
      href={page}
      className="flex items-center gap-[2px] text-sm font-semibold  cursor-pointer group"
    >
      View All{" "}
      <IoIosArrowRoundForward className="text-lg duration-100 group-hover:transform group-hover:translate-x-1" />
    </Link>
  );
};

const PopularCourses = () => {
  const dispatch = useDispatch();
  const courseState = useSelector(selectCourses);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const { isClient, userId, userLoggedIn, goToPage, setGoToPage } =
    React.useContext(LoginContext);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  React.useEffect(() => {
    dispatch(fetchAllCourses())
      .unwrap()
      .then((res) => {})
      .catch((err) => {
        enqueueSnackbar(err.message, {
          variant: "error",
          preventDuplicate: true,
        });
      });
  }, []);

  const orderCoursesByStudents = (courses: ICourse[]) => {
    return courses?.slice()?.sort((a, b) => {
      const studentsA = a.users.filter(
        (user) => user.user_course.userType === "STUDENT"
      ).length;
      const studentsB = b.users.filter(
        (user) => user.user_course.userType === "STUDENT"
      ).length;
      return studentsB - studentsA;
    });
  };

  const popularCourses =
    courseState?.allCourses && courseState?.allCourses?.length > 0
      ? orderCoursesByStudents(courseState.allCourses).slice(0, 10)
      : [];

  return (
    <div className="lg:p-10 p-2" id="popular-courses">
      <SectionTitle
        title="POPULAR COURSES"
        image="/icons/popular-dark.svg"
        rightSideActions={ViewAll("/courses")}
      />
      <div className="lg:pt-10 pt-2 flex flex-wrap items-center gap-5 w-full justify-center min-h-80">
        {popularCourses?.map((course) => (
          <div
            key={course.id}
            className="max-w-[250px] bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg"
          >
            <div className="overflow-hidden bg-cover bg-no-repeat rounded-t-md w-full cursor-pointer">
              <img
                src={course.coverImage}
                alt=""
                className="w-full aspect-video transition duration-300 ease-in-out hover:scale-105 object-cover"
                onClick={() => {
                  if (!userLoggedIn) {
                    setGoToPage(`/dashboard/courses/${course.id}`);
                    handleOpenModal();
                  } else {
                    router.push(`/dashboard/courses/${course.id}`);
                  }
                }}
              />
            </div>

            <div className="p-2 pt-0 pb-1">
              <h1 className="text-accent font-bold text-base line-clamp-3 min-h-[72px]">
                {course.title}
              </h1>
              {/* <p className="line-clamp-3 my-2 text-sm">{course.description}</p> */}
            </div>
            <div className="flex items-center justify-between px-2 pt-1 py-0">
              <div className="flex items-center gap-3 py-2 pt-0 text-accent text-sm font-semibold">
                <img
                  src={
                    course.users.find(
                      (user) => user.user_course.userType === "TUTOR"
                    )?.profile?.picture
                  }
                  alt="author image"
                  className="w-7 aspect-square rounded-full object-cover cursor-pointer"
                />
                <h1>
                  {
                    course.users.find(
                      (user) => user.user_course.userType === "TUTOR"
                    )?.firstName
                  }{" "}
                  {
                    course.users.find(
                      (user) => user.user_course.userType === "TUTOR"
                    )?.lastName
                  }
                </h1>
                <p className="my-2 text-xs font-semibold text-black/75">
                  {format(course.createdAt, "PP")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <SignInModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        setOpenModal={setOpenModal}
      />
    </div>
  );
};

export default PopularCourses;
