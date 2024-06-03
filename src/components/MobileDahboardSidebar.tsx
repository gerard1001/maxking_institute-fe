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
import { CgClose, CgProfile } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";
import ProtectedRoute from "./ProtectedRoute";
import { usePathname, useRouter } from "next/navigation";
import { LoginContext } from "@/lib/context/LoginContext";
import { GrUpdate } from "react-icons/gr";
import { RxUpdate } from "react-icons/rx";
import { BsChatSquareQuote } from "react-icons/bs";
import { IoDocumentTextOutline } from "react-icons/io5";
import MobileSidebarItem from "./MobileSidebarItem";
import { IconButton } from "@mui/material";

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
    listkey: "Documents",
    icon: <IoDocumentTextOutline className="text-xl" />,
    text: "Documents",
    active: false,
    to: "/dashboard/documents",
  },
  {
    listkey: "Updates",
    icon: <RxUpdate className="text-xl" />,
    text: "Updates",
    active: false,
    to: "/dashboard/updates",
  },
  {
    listkey: "Testimonials",
    icon: <BsChatSquareQuote className="text-xl" />,
    text: "testimonials",
    active: false,
    to: "/dashboard/testimonials",
  },
  {
    listkey: "Profile",
    icon: <CgProfile className="text-xl" />,
    text: "Profile",
    active: false,
    to: "/dashboard/profile",
  },
];

const MobileDashboardSidebar = ({ handleCloseDrawer }: any) => {
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

  useEffect(() => {
    if (activePage[2] === "courses") {
      setActiveIndex(1);
      setShowDropdown({ 1: true });
    } else if (activePage[2] === "articles") {
      setActiveIndex(4);
      setShowDropdown({ 4: true });
    } else if (activePage[2] === "documents") {
      setActiveIndex(5);
    } else if (activePage[2] === "updates") {
      setActiveIndex(6);
    } else if (activePage[2] === "users") {
      setActiveIndex(3);
    } else if (activePage[2] === "certificates") {
      setActiveIndex(2);
    } else if (activePage[2] === "testimonials") {
      setActiveIndex(7);
    } else if (activePage[2] === "profile") {
      setActiveIndex(8);
    } else if (activePage[1] === "dashboard" && activePage[2] === undefined) {
      setActiveIndex(0);
    }
  }, [activePage]);

  useEffect(() => {
    setActivePage(pathName.split("/"));
  }, [pathName]);

  return (
    <div
      className={`h-screen bg-emerald-300 max-w-[250px] transition-all lg:hidden inline text-accent`}
    >
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="/logo.png"
            className={`overflow-hidden transition-all cursor-pointer ${
              expanded ? "w-12" : "w-0"
            }`}
            alt=""
            onClick={() => router.push("/")}
          />
          <IconButton onClick={handleCloseDrawer}>
            <CgClose />
          </IconButton>
        </div>

        <ul className="flex-1 px-3 overflow-y-auto overflow-x-hidden">
          {sidebarItems(activePage).map((item, index) => (
            <div
              className={`${
                isClient && (item.text === "Users" || item.text === "Updates")
                  ? "hidden"
                  : "block"
              }`}
              key={index}
              onClick={() => {
                handleSetActiveIndex(index);
                handleCloseDrawer();
              }}
            >
              <MobileSidebarItem
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
          <li className={`rounded-md w-full`}>
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
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MobileDashboardSidebar;
