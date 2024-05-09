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
  selectCourses,
  selectModules,
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

const DashboardLearningSidebar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathName = usePathname();
  const { enqueueSnackbar } = useSnackbar();
  const courseState = useSelector(selectCourses);
  const moduleNumber = pathName.split("/")[5];
  const chapterNumber = pathName.split("/")[6];
  const courseId = pathName.split("/")[3];
  const moduleId = pathName.split("/")[5];
  const [open, setOpen] = React.useState(true);

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
  }, []);

  console.log(Number(moduleNumber + chapterNumber), "&&&&&&&&");

  return (
    <ProtectedRoute>
      <aside
        className={`h-screen bg-emerald-300 w-fit max-w-[440px] transition-all`}
      >
        <nav className="h-full flex flex-col bg-white border-r shadow-sm">
          <div className="p-4 pb-2 flex items-start gap-4 w-full border-b">
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
          <div className="p-4 pb-2 flex items-center gap-4 w-full border-b  overflow-y-auto">
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              // subheader={
              //   <ListSubheader component="div" id="nested-list-subheader">
              //     Nested List Items
              //   </ListSubheader>
              // }
            >
              {courseState?.course?.modules?.map((module) => (
                <div>
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
                  {module?.chapters?.map((chapter) => (
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
                              }`}
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
          {/* <div className="">
            <List>
              {moduleState?.module?.chapters
                ?.slice()
                ?.sort((a, b) => a.chapterNumber - b.chapterNumber)
                ?.map((chapter) => (
                  <ListItem
                    disablePadding
                    onClick={() => {
                      if (chapterNumber === chapter.chapterNumber.toString())
                        return;
                      router.push(
                        `/dashboard/courses/${courseId}/module/${moduleState.module.id}/chapter/learning/${chapter.chapterNumber}`
                      );
                    }}
                  >
                    <ListItemButton>
                      <ListItemIcon
                        sx={{
                          minWidth: "35px",
                        }}
                      >
                        <FaRegCirclePlay
                          className={`text-xl ${
                            chapterNumber === chapter.chapterNumber.toString()
                              ? "text-primary"
                              : "text-accent"
                          }`}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={`${chapter.title}`}
                        className={`line-clamp-1 ${
                          chapterNumber === chapter.chapterNumber.toString()
                            ? "text-primary text-3xl font-bold"
                            : "text-accent font-normal"
                        }`}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
            </List>
          </div> */}
        </nav>
      </aside>
    </ProtectedRoute>
  );
};

export default DashboardLearningSidebar;
