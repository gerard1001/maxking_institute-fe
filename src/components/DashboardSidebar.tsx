"use client";

import { createContext, useState, useEffect, useContext } from "react";
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
import { LoginContext } from "@/lib/context/LoginContext";
import { GrUpdate } from "react-icons/gr";
import { RxUpdate } from "react-icons/rx";

export const SidebarContext = createContext({
  expanded: false,
  // showDropdown: { 0: false },
  // setShowDropdown: (val: any) => {},
});

const sidebarItems = (activePage: string[]) => [
  {
    listkey: "Overview",
    icon: <FaRegChartBar className="text-xl" />,
    text: "Overview",
    active: false,
    to: "/dashboard",
  },
  {
    listkey: "Courses",
    icon: <FiBookOpen className="text-xl" />,
    text: "Courses",
    active: true,
    hasDropdown: false,
    dropDownItems: [
      {
        to: "/dashboard/courses",
        text: "All Courses",
        isFocused: activePage[2] === "courses" && activePage[3] === undefined,
      },
      {
        to: "/dashboard/courses",
        text: "Course categories",
        isFocused: activePage[2] === "courses" && activePage[3] === "saved",
      },
      { to: "/dashboard/courses", text: "Course subjects" },
    ],
    to: "/dashboard/courses",
  },
  {
    listkey: "Certifications",
    icon: <TbCertificate className="text-xl" />,
    text: "Certifications",
    active: false,
    to: "/dashboard/certificates",
  },
  {
    listkey: "Users",
    icon: <HiOutlineUsers className="text-xl" />,
    text: "Users",
    active: false,
    to: "/dashboard/users",
  },
  {
    listkey: "Articles",
    icon: <MdOutlineArticle className="text-xl" />,
    text: "Articles",
    active: true,
    hasDropdown: true,
    dropDownItems: [
      {
        to: "/dashboard/articles",
        text: "All Articles",
        isFocused: activePage[2] === "articles" && activePage[3] === undefined,
      },
      {
        to: "/dashboard/articles/saved",
        text: "saved Articles",
        isFocused: activePage[2] === "articles" && activePage[3] === "saved",
      },
    ],
    to: "/dashboard/articles",
  },
  {
    listkey: "Updates",
    icon: <RxUpdate className="text-xl" />,
    text: "Updates",
    active: false,
    to: "/dashboard",
  },
  {
    listkey: "Profile",
    icon: <CgProfile className="text-xl" />,
    text: "Profile",
    active: false,
    to: "/dashboard/profile",
  },
  // {
  //   listkey: "Sign out",
  //   icon: <AiOutlineLogout className="text-xl" />,
  //   text: "Sign out",
  //   active: false,
  //   to: "/",
  // },
];

const DashboardSidebar: React.FC = ({}) => {
  const router = useRouter();
  const pathName = usePathname();
  const [expanded, setExpanded] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [showDropdown, setShowDropdown] = useState<any>({
    0: false,
  });
  const [activePage, setActivePage] = useState<string[]>(pathName.split("/"));
  const { isClient, setLoginData, setUserLoggedIn, loginUserFetchLoading } =
    useContext(LoginContext);

  const handleSetActiveIndex = (index: number) => {
    setActiveIndex(index);
  };

  console.log(activeIndex, "activeIndex");
  console.log(activePage, "activeIndex");

  useEffect(() => {
    if (activePage[2] === "courses") {
      setActiveIndex(1);
      setShowDropdown({ 1: true });
    } else if (activePage[2] === "articles") {
      setActiveIndex(4);
      setShowDropdown({ 4: true });
    } else if (activePage[2] === "users") {
      setActiveIndex(3);
    } else if (activePage[2] === "certificates") {
      setActiveIndex(2);
    } else if (activePage[2] === "profile") {
      setActiveIndex(6);
    } else if (activePage[1] === "dashboard" && activePage[2] === undefined) {
      setActiveIndex(0);
    }
  }, [activePage]);

  useEffect(() => {
    setActivePage(pathName.split("/"));
  }, [pathName]);

  return (
    <ProtectedRoute>
      <aside
        className={`h-screen bg-emerald-300 max-w-[250px] transition-all ${
          expanded ? "w-full" : "w-fit"
        }`}
      >
        <nav className="h-full flex flex-col bg-white border-r shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <img
              src="/logo.png"
              className={`overflow-hidden transition-all ${
                expanded ? "w-12" : "w-0"
              }`}
              alt=""
            />
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              {expanded ? <LuChevronFirst /> : <LuChevronLast />}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3 overflow-y-auto overflow-x-hidden">
              {sidebarItems(activePage).map((item, index) => (
                <div
                  className={`${
                    isClient &&
                    (item.text === "Users" || item.text === "Updates")
                      ? "hidden"
                      : "block"
                  }`}
                  key={index}
                  onClick={() => {
                    handleSetActiveIndex(index);
                    // router.push(`${item.to}`);
                    // setShowDropdown({ [index]: !showDropdown[index] });
                  }}
                >
                  <SidebarItem
                    icon={item.icon}
                    text={item.text}
                    to={item.to}
                    active={index === activeIndex}
                    hasDropdown={item.hasDropdown}
                    dropDownItems={item.dropDownItems}
                    showDropdown={showDropdown}
                    setShowDropdown={setShowDropdown}
                    index={index}
                  />
                </div>
              ))}
              <li className={`bg-white text-white" rounded-md w-full`}>
                <div
                  className={`max-h-10 flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer justify-between
        group hover:bg-red-400 text-accent hover:text-white`}
                  onClick={() => {
                    localStorage.removeItem("loginData");
                    setLoginData({});
                    setUserLoggedIn(false);
                    router.push("/");
                  }}
                >
                  <div className="flex items-center">
                    {" "}
                    <AiOutlineLogout className="text-xl" />
                    <span
                      className={`overflow-hidden transition-all ${
                        expanded ? "w-28 ml-3" : "w-0"
                      }`}
                    >
                      Sign out
                    </span>
                  </div>
                </div>

                {/* <div
                  className={`flex flex-col gap-1 transition-all bg-white ease-in-out duration-150 h-0 pl-3`}
                >
                  {active &&
                    hasDropdown &&
                    showDropdown[index] &&
                    expanded &&
                    dropDownItems.map((item: any, index: number) => (
                      <div
                        key={index}
                        className={`left-full rounded-md px-2 py-1 ml-6 text-accent cursor-pointer flex items-center gap-2
               ${item.isFocused && "font-bold"}`}
                        onClick={() => {
                          router.push(`${item.to}`);
                          // alert(item.to);
                        }}
                      >
                        <span>{item.text}</span>
                      </div>
                    ))}
                </div> */}
                {/* )} */}
              </li>
            </ul>
          </SidebarContext.Provider>
        </nav>
      </aside>
    </ProtectedRoute>
  );
};

export default DashboardSidebar;

/* 
<SidebarItem
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
            />
*/
