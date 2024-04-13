"use client";

import { useContext, useState } from "react";
import { SidebarContext } from "./DashboardSidebar";
import { IoChevronDown } from "react-icons/io5";

const SidebarItem = ({
  icon,
  text,
  active,
  hasDropdown,
  dropDownItems,
  showDropdown,
  setShowDropdown,
  index,
}: any) => {
  const { expanded } = useContext(SidebarContext);

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
        onClick={() => setShowDropdown({ [index]: !showDropdown[index] })}
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
          dropDownItems.map((item: string, index: number) => (
            <div
              key={index}
              className={`left-full rounded-md px-2 py-1 ml-6 text-accent cursor-pointer flex items-center gap-2
               `}
            >
              {/* <div
                className={`w-2 aspect-square rounded-full bg-accent-foreground`}
              /> */}
              <span>{item}</span>
            </div>
          ))}
      </div>
      {/* )} */}
    </li>
  );
};

export default SidebarItem;
