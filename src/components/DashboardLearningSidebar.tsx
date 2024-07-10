"use client";

import React, { createContext, useState, useEffect } from "react";
import { LuCalendarClock, LuChevronFirst, LuChevronLast } from "react-icons/lu";
import { TfiArrowsVertical } from "react-icons/tfi";
import SidebarItem from "./SidebarItem";
import { FaRegChartBar, FaRegDotCircle } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";
import { TbCertificate } from "react-icons/tb";
import { HiOutlineUsers } from "react-icons/hi";
import { MdOutlineArticle } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";
import ProtectedRoute from "./ProtectedRoute";
import { usePathname, useRouter } from "next/navigation";
import {
  fetchOneCourse,
  fetchOneModule,
  fetchUserById,
  selectCourses,
  selectModules,
  selectUsers,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { ModuleLearningProps } from "@/app/dashboard/courses/[course_id]/module/[module_id]/chapter/learning/[chapter_number]/page";
import { useSnackbar } from "notistack";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { FaRegCirclePlay } from "react-icons/fa6";
import { LoginContext } from "@/lib/context/LoginContext";
import { objectIsEmpty } from "@/lib/functions/object_check.function";

const DashboardLearningSidebar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathName = usePathname();
  const { enqueueSnackbar } = useSnackbar();
  const courseState = useSelector(selectCourses);
  const userState = useSelector(selectUsers);
  const moduleNumber = pathName.split("/")[5];
  const chapterNumber = pathName.split("/")[6];
  const courseId = pathName.split("/")[3];
  const moduleId = pathName.split("/")[5];
  const [open, setOpen] = React.useState(true);
  const [userActualModule, setUserActualModule] = React.useState<number>(1);
  const [userActualChapter, setUserActualChapter] = React.useState<number>(1);
  const { userId, loginData } = React.useContext(LoginContext);

  const actualUserPosition = Number(
    userActualModule.toString() + userActualChapter.toString()
  );

  const handleClick = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    const moduleId = pathName.split("/")[5];
    dispatch(fetchOneCourse(courseId))
      .unwrap()
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });

    if (loginData && !objectIsEmpty(loginData)) {
      dispatch(fetchUserById(loginData.id))
        .unwrap()
        .catch((err: any) => {
          enqueueSnackbar(err.message, {
            variant: "error",
            preventDuplicate: true,
          });
        });
    }
  }, []);

  React.useEffect(() => {
    if (userState?.loggedInUser?.courses) {
      setUserActualModule(
        userState?.loggedInUser?.courses?.find(
          (course) => course.id === courseId
        )?.user_course?.currentModule ?? 1
      );
      setUserActualChapter(
        userState?.loggedInUser?.modules?.find(
          (module) => module.courseId === courseId
        )?.user_module?.currentChapter ?? 1
      );
    }
  }, [userState]);

  return (
    <ProtectedRoute>
      <aside
        className={`bg-white w-fit max-w-[440px] transition-all h-screen overflow-auto lg:inline-block hidden`}
      >
        {/* <nav className="h-full flex flex-col bg-white border-r shadow-sm overflow-auto"> */}
        <div className="pt-4 pb-2 flex items-start gap-4 w-full border-b sticky top-0 z-50 bg-white">
          <img
            src="/logo.png"
            className={`overflow-hidden transition-all ${
              true ? "w-14" : "w-0"
            }`}
            alt=""
          />
          <p className="line-clamp-2 text-base font-semibold">
            {courseState?.course?.title}
          </p>
        </div>
        {/*  <div className="bg-green-600 h-2"></div> */}
        <div className="pb-2 pr-0 flex items-center gap-4 w-full">
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              overflowY: "auto",
              // mt: "72px",
            }}
            // component="nav"
            aria-labelledby="nested-list-subheader"
          >
            {courseState?.course?.modules
              ?.slice()
              ?.sort((a, b) => a.moduleNumber - b.moduleNumber)
              ?.map((module) => (
                <div key={module?.id}>
                  <ListItemButton className="bg-[#f4f4f5]">
                    <ListItemIcon
                      sx={{
                        minWidth: "35px",
                      }}
                    >
                      <FaRegDotCircle
                        className={`${
                          moduleNumber === module.moduleNumber.toString()
                            ? "text-primary"
                            : "text-accent"
                        }`}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <p
                          className={`line-clamp-1 ${
                            moduleNumber === module.moduleNumber.toString()
                              ? "text-primary font-bold"
                              : "text-accent font-semibold"
                          } text-xl`}
                        >
                          {module.title}
                        </p>
                      }
                    />
                    {/* {open ? <BsChevronBarDown /> : <BsChevronDown />} */}
                  </ListItemButton>
                  {module?.chapters
                    ?.slice()
                    ?.sort((a, b) => a.chapterNumber - b.chapterNumber)
                    ?.map((chapter) => (
                      <Collapse
                        in={open}
                        timeout="auto"
                        unmountOnExit
                        onClick={() => {
                          if (
                            Number(moduleNumber + chapterNumber) >=
                            Number(
                              module.moduleNumber.toString() +
                                chapter.chapterNumber.toString()
                            )
                          ) {
                            router.push(
                              `/dashboard/courses/${courseId}/learning/${module.moduleNumber}/${chapter.chapterNumber}`
                            );
                          } else if (
                            Number(
                              module.moduleNumber.toString() +
                                chapter.chapterNumber.toString()
                            ) <= actualUserPosition
                          ) {
                            router.push(
                              `/dashboard/courses/${courseId}/learning/${module.moduleNumber}/${chapter.chapterNumber}`
                            );
                          }
                        }}
                      >
                        <List component="div" disablePadding>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon
                              sx={{
                                minWidth: "35px",
                              }}
                            >
                              <FaRegCirclePlay
                                className={`${
                                  moduleNumber ===
                                    module.moduleNumber.toString() &&
                                  chapterNumber ===
                                    chapter.chapterNumber.toString()
                                    ? "text-primary"
                                    : "text-accent"
                                }
                                ${
                                  Number(
                                    module.moduleNumber.toString() +
                                      chapter.chapterNumber.toString()
                                  ) <= actualUserPosition && "text-primary"
                                }    
                                `}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <p
                                  className={`line-clamp-1 ${
                                    moduleNumber ===
                                      module.moduleNumber.toString() &&
                                    chapterNumber ===
                                      chapter.chapterNumber.toString()
                                      ? "text-primary font-bold"
                                      : "text-accent font-normal"
                                  }`}
                                >
                                  {chapter.title}
                                </p>
                              }
                            />
                          </ListItemButton>
                        </List>
                      </Collapse>
                    ))}
                </div>
              ))}
          </List>
        </div>
      </aside>
    </ProtectedRoute>
  );
};

export default DashboardLearningSidebar;
