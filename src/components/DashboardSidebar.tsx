"use client";

import { createContext, useState, useEffect } from "react";
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

export const SidebarContext = createContext({ expanded: false });

const sidebarItems = [
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
    hasDropdown: true,
    dropDownItems: ["All Courses", "Course categories", "Course subjects"],
    to: "/dashboard/courses",
  },
  {
    listkey: "Certifications",
    icon: <TbCertificate className="text-xl" />,
    text: "Certifications",
    active: false,
    to: "/dashboard",
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
    dropDownItems: ["All Articles", "Article categories", "Saved Articles"],
    to: "/dashboard",
  },
  {
    listkey: "Schedule",
    icon: <LuCalendarClock className="text-xl" />,
    text: "Schedule",
    active: false,
    to: "/dashboard",
  },
  {
    listkey: "Profile",
    icon: <CgProfile className="text-xl" />,
    text: "Profile",
    active: false,
    to: "/dashboard",
  },
  {
    listkey: "Sign out",
    icon: <AiOutlineLogout className="text-xl" />,
    text: "Sign out",
    active: false,
    to: "/dashboard",
  },
];

const DashboardSidebar: React.FC = (
  {
    //   children,
  }
) => {
  const router = useRouter();
  const pathName = usePathname();
  const [expanded, setExpanded] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleSetActiveIndex = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const activePage = pathName.split("/");

    switch (activePage[2]) {
      case "courses":
        setActiveIndex(1);
        break;
      case "articles":
        setActiveIndex(4);
        break;
      case "users":
        setActiveIndex(3);
        break;
      default:
        setActiveIndex(0);
        break;
    }
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
              {sidebarItems.map((item, index) => (
                <div
                  className=""
                  key={index}
                  onClick={() => {
                    handleSetActiveIndex(index);
                    router.push(`${item.to}`);
                  }}
                >
                  <SidebarItem
                    icon={item.icon}
                    text={item.text}
                    active={index === activeIndex}
                    hasDropdown={item.hasDropdown}
                    dropDownItems={item.dropDownItems}
                  />
                </div>
              ))}
            </ul>
          </SidebarContext.Provider>

          <div className="border-t flex p-3">
            <img
              src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
              alt=""
              className="w-10 h-10 rounded-md"
            />
            <div
              className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
            >
              <div className="leading-4">
                <h4 className="font-semibold">John Doe</h4>
                <span className="text-xs text-gray-600">johndoe@gmail.com</span>
              </div>
              <TfiArrowsVertical size={20} />
            </div>
          </div>
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
