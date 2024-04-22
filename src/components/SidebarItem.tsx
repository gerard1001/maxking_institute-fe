"use client";

import { useContext, useState } from "react";
import { SidebarContext } from "./DashboardSidebar";
import { IoChevronDown } from "react-icons/io5";
import { useRouter } from "next/navigation";

const SidebarItem = ({
  icon,
  text,
  to,
  active,
  hasDropdown,
  dropDownItems,
  showDropdown,
  setShowDropdown,
  index,
}: any) => {
  const { expanded } = useContext(SidebarContext);
  const router = useRouter();

  return (
    <li
      className={`
    transition-all ${
      active && hasDropdown ? "bg-white text-white" : ""
    } rounded-md w-full
    `}
    >
      <div
        className={`max-h-10 flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer justify-between
        group  ${
          active
            ? "bg-secondary text-white"
            : "hover:bg-secondary/80 text-accent hover:text-primary-foreground"
        }`}
        onClick={() => {
          setShowDropdown({ [index]: !showDropdown[index] });
          router.push(`${to}`);
        }}
      >
        <div className="flex items-center">
          {" "}
          {icon}
          <span
            className={`overflow-hidden transition-all ${
              expanded ? "w-28 ml-3" : "w-0"
            }`}
          >
            {text}
          </span>
        </div>
        <div className="flex items-center">
          {" "}
          {expanded && hasDropdown && (
            <>
              <IoChevronDown
                className={`${
                  active ? "text-white" : "text-accent"
                } group-hover:text-primary-foreground`}
              />
            </>
          )}
        </div>
      </div>

      <div
        className={`flex flex-col gap-1 transition-all bg-white ease-in-out duration-150 h-0 ${
          active && hasDropdown && showDropdown[index] && expanded
            ? "h-fit py-2"
            : "py-0 h-0"
        } pl-3`}
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
      </div>
      {/* )} */}
    </li>
  );
};

export default SidebarItem;
