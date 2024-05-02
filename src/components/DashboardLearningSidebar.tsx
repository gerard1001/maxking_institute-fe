"use client";

import React, { createContext, useState, useEffect } from "react";
import { LuCalendarClock, LuChevronFirst, LuChevronLast } from "react-icons/lu";
import { TfiArrowsVertical } from "react-icons/tfi";
import SidebarItem from "./SidebarItem";
import { FaRegChartBar } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";
import { TbCertificate } from "react-icons/tb";
import { HiOutlineUsers } from "react-icons/hi";
import { MdOutlineArticle } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";
import ProtectedRoute from "./ProtectedRoute";
import { usePathname, useRouter } from "next/navigation";
import {
  fetchOneModule,
  selectModules,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { ModuleLearningProps } from "@/app/dashboard/courses/[course_id]/module/[module_id]/chapter/learning/[chapter_number]/page";
import { useSnackbar } from "notistack";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { FaRegCirclePlay } from "react-icons/fa6";

const DashboardLearningSidebar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathName = usePathname();
  const { enqueueSnackbar } = useSnackbar();
  const moduleState = useSelector(selectModules);
  const chapterNumber = pathName.split("/")[8];
  const courseId = pathName.split("/")[3];
  const moduleId = pathName.split("/")[5];

  React.useEffect(() => {
    const moduleId = pathName.split("/")[5];
    dispatch(fetchOneModule(moduleId))
      .unwrap()
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
  }, []);
  return (
    <ProtectedRoute>
      <aside className={`h-screen bg-emerald-300 w-[200px] transition-all`}>
        <nav className="h-full flex flex-col bg-white border-r shadow-sm">
          <div className="p-4 pb-2 flex items-center gap-4 w-full border-b">
            <img
              src="/logo.png"
              className={`overflow-hidden transition-all ${
                true ? "w-10" : "w-0"
              }`}
              alt=""
            />
            <p className="line-clamp-1">{moduleState?.module?.title}</p>
          </div>
          <div className="">
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
          </div>
        </nav>
      </aside>
    </ProtectedRoute>
  );
};

export default DashboardLearningSidebar;
