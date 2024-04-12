"use client";

import DashboardSidebar from "@/components/DashboardSidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import SidebarItem from "@/components/SidebarItem";
import { LoginContext } from "@/lib/context/LoginContext";
import { Button } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaRegChartBar } from "react-icons/fa";
import { FaHouseChimney } from "react-icons/fa6";
import { FiBookOpen } from "react-icons/fi";
import { HiOutlineUsers } from "react-icons/hi";
import { LuCalendarClock } from "react-icons/lu";
import { MdOutlineArticle } from "react-icons/md";
import { PiListDashesFill } from "react-icons/pi";
import { TbCertificate } from "react-icons/tb";

const Dashboard = () => {
  const router = useRouter();
  const pathName = usePathname();
  const { loginData, userLoggedIn, setLoginData, setUserLoggedIn } =
    useContext(LoginContext);
  const [navBar, setNavBar] = useState<boolean>(false);

  const scrollDiv = (e: any) => {
    console.log(e.target.scrollTop);
    if (e.target.scrollTop >= 40) {
      setNavBar(true);
    } else {
      setNavBar(false);
    }
  };

  console.log(pathName.split("/"));

  const activePage = pathName.split("/");

  return (
    <ProtectedRoute>
      <div className="flex h-screen overflow-hidden">
        <div className="">
          <DashboardSidebar />
          {/* <SidebarItem
              icon={<FaRegChartBar className="text-xl" />}
              size={20}
              text="Overview"
              active
            />
            <SidebarItem
              icon={<FiBookOpen className="text-xl" />}
              size={20}
              text="Courses"
            />
            <SidebarItem
              icon={<TbCertificate className="text-xl" />}
              size={24}
              text="Certifications"
            />
            <SidebarItem
              icon={<HiOutlineUsers className="text-xl" />}
              size={24}
              text="Users"
            />
            <SidebarItem
              icon={<MdOutlineArticle className="text-xl" />}
              size={24}
              text="Articles"
            />
            <SidebarItem
              icon={<LuCalendarClock className="text-xl" />}
              size={24}
              text="Schedule"
            />
            <hr className="my-3" />
            <SidebarItem
              icon={<CgProfile className="text-xl" />}
              size={24}
              text="Profile"
            />
            <SidebarItem
              icon={<AiOutlineLogout className="text-xl" />}
              size={24}
              text="Sign out"
            /> */}
          {/* </DashboardSidebar> */}
        </div>
        <div className="w-full h-full overflow-y-auto" onScroll={scrollDiv}>
          <div
            className={`h-10 sticky top-0 left-0 bottom-0 ${
              navBar ? "backdrop-blur-sm bg-white/30" : "bg-white"
            } flex items-center justify-between px-3`}
          >
            <div className=""></div>
            <div className="flex items-center gap-3">
              {userLoggedIn && (
                <img
                  src={loginData.profile.picture}
                  alt="profile"
                  className="w-8 aspect-square rounded-full"
                />
              )}
            </div>
          </div>
          <div className="px-4">
            <h1 className="">Toxic</h1>
            <h1 className="text-md text-accent">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              veniam eveniet voluptatum necessitatibus eum nihil incidunt aut
              nesciunt itaque saepe eos, minima, provident aspernatur modi vel
              consequatur. Adipisci, mollitia deserunt!
            </h1>
            <h1 className="text-md text-accent">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              veniam eveniet voluptatum necessitatibus eum nihil incidunt aut
              nesciunt itaque saepe eos, minima, provident aspernatur modi vel
              consequatur. Adipisci, mollitia deserunt!
            </h1>
            <h1 className="text-md text-accent">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              veniam eveniet voluptatum necessitatibus eum nihil incidunt aut
              nesciunt itaque saepe eos, minima, provident aspernatur modi vel
              consequatur. Adipisci, mollitia deserunt!
            </h1>
            <h1 className="text-md text-accent">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              veniam eveniet voluptatum necessitatibus eum nihil incidunt aut
              nesciunt itaque saepe eos, minima, provident aspernatur modi vel
              consequatur. Adipisci, mollitia deserunt!
            </h1>
            <h1 className="text-md text-accent">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              veniam eveniet voluptatum necessitatibus eum nihil incidunt aut
              nesciunt itaque saepe eos, minima, provident aspernatur modi vel
              consequatur. Adipisci, mollitia deserunt!
            </h1>
            <h1 className="text-md text-accent">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              veniam eveniet voluptatum necessitatibus eum nihil incidunt aut
              nesciunt itaque saepe eos, minima, provident aspernatur modi vel
              consequatur. Adipisci, mollitia deserunt!
            </h1>
            <h1 className="text-md text-accent">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              veniam eveniet voluptatum necessitatibus eum nihil incidunt aut
              nesciunt itaque saepe eos, minima, provident aspernatur modi vel
              consequatur. Adipisci, mollitia deserunt!
            </h1>
            <h1 className="text-md text-accent">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              veniam eveniet voluptatum necessitatibus eum nihil incidunt aut
              nesciunt itaque saepe eos, minima, provident aspernatur modi vel
              consequatur. Adipisci, mollitia deserunt!
            </h1>
            <h1 className="text-md text-accent">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              veniam eveniet voluptatum necessitatibus eum nihil incidunt aut
              nesciunt itaque saepe eos, minima, provident aspernatur modi vel
              consequatur. Adipisci, mollitia deserunt!
            </h1>
            <h1 className="text-md text-accent">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              veniam eveniet voluptatum necessitatibus eum nihil incidunt aut
              nesciunt itaque saepe eos, minima, provident aspernatur modi vel
              consequatur. Adipisci, mollitia deserunt!
            </h1>
            <h1 className="text-md text-accent">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              veniam eveniet voluptatum necessitatibus eum nihil incidunt aut
              nesciunt itaque saepe eos, minima, provident aspernatur modi vel
              consequatur. Adipisci, mollitia deserunt!
            </h1>
            <h1 className="text-md text-accent">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              veniam eveniet voluptatum necessitatibus eum nihil incidunt aut
              nesciunt itaque saepe eos, minima, provident aspernatur modi vel
              consequatur. Adipisci, mollitia deserunt!
            </h1>
            <h1 className="text-md text-accent">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              veniam eveniet voluptatum necessitatibus eum nihil incidunt aut
              nesciunt itaque saepe eos, minima, provident aspernatur modi vel
              consequatur. Adipisci, mollitia deserunt!
            </h1>
            <h1 className="text-md text-accent">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              veniam eveniet voluptatum necessitatibus eum nihil incidunt aut
              nesciunt itaque saepe eos, minima, provident aspernatur modi vel
              consequatur. Adipisci, mollitia deserunt!
            </h1>
            <h1 className="text-md text-accent">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              veniam eveniet voluptatum necessitatibus eum nihil incidunt aut
              nesciunt itaque saepe eos, minima, provident aspernatur modi vel
              consequatur. Adipisci, mollitia deserunt!
            </h1>
            <h1 className="text-md text-accent">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              veniam eveniet voluptatum necessitatibus eum nihil incidunt aut
              nesciunt itaque saepe eos, minima, provident aspernatur modi vel
              consequatur. Adipisci, mollitia deserunt!
            </h1>
            <h1 className="text-md text-accent">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              veniam eveniet voluptatum necessitatibus eum nihil incidunt aut
              nesciunt itaque saepe eos, minima, provident aspernatur modi vel
              consequatur. Adipisci, mollitia deserunt!
            </h1>
            <h1 className="text-md text-accent">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              veniam eveniet voluptatum necessitatibus eum nihil incidunt aut
              nesciunt itaque saepe eos, minima, provident aspernatur modi vel
              consequatur. Adipisci, mollitia deserunt!
            </h1>
            <h1 className="text-md text-accent">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              veniam eveniet voluptatum necessitatibus eum nihil incidunt aut
              nesciunt itaque saepe eos, minima, provident aspernatur modi vel
              consequatur. Adipisci, mollitia deserunt!
            </h1>
            <h1 className="text-md text-accent">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              veniam eveniet voluptatum necessitatibus eum nihil incidunt aut
              nesciunt itaque saepe eos, minima, provident aspernatur modi vel
              consequatur. Adipisci, mollitia deserunt!
            </h1>
            <h1 className="text-md text-accent">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              veniam eveniet voluptatum necessitatibus eum nihil incidunt aut
              nesciunt itaque saepe eos, minima, provident aspernatur modi vel
              consequatur. Adipisci, mollitia deserunt!
            </h1>
            <h1 className="text-md text-accent">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              veniam eveniet voluptatum necessitatibus eum nihil incidunt aut
              nesciunt itaque saepe eos, minima, provident aspernatur modi vel
              consequatur. Adipisci, mollitia deserunt!
            </h1>
            <h1 className="text-md text-accent">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              veniam eveniet voluptatum necessitatibus eum nihil incidunt aut
              nesciunt itaque saepe eos, minima, provident aspernatur modi vel
              consequatur. Adipisci, mollitia deserunt!
            </h1>
            <h1 className="text-md text-accent">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              veniam eveniet voluptatum necessitatibus eum nihil incidunt aut
              nesciunt itaque saepe eos, minima, provident aspernatur modi vel
              consequatur. Adipisci, mollitia deserunt!
            </h1>
            <h1 className="text-md text-accent">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              veniam eveniet voluptatum necessitatibus eum nihil incidunt aut
              nesciunt itaque saepe eos, minima, provident aspernatur modi vel
              consequatur. Adipisci, mollitia deserunt!
            </h1>
          </div>
        </div>

        {/* <Button
          onClick={() => {
            localStorage.removeItem("loginData");
            setLoginData({});
            setUserLoggedIn(false);
          }}
          className="!bg-primary !text-white !rounded-md !p-2 !mt-2 !cursor-pointer"
        >
          Logout
        </Button>
        <Button
          onClick={() => {
            router.push("/dashboard/users");
          }}
          className="!bg-primary !text-white !rounded-md !p-2 !mt-2 !cursor-pointer"
        >
          To Users
        </Button>
        {userLoggedIn && (
          <div>
            <img
              src={loginData.profile.picture}
              alt="profile"
              className="w-20 h-20 rounded-full"
            />
            <p>{loginData.firstName}</p>
            <p>{loginData.lastName}</p>
          </div>
        )} */}
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
