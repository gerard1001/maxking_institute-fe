"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { navBarLinks } from "@/lib/utils/navBarLinks";

const NavBar = () => {
  const [navBar, setNavBar] = useState(false);

  const scrollAction = () => {
    if (window.scrollY >= 40) {
      setNavBar(true);
    } else {
      setNavBar(false);
    }
  };
  window.addEventListener("scroll", scrollAction);

  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full py-1 px-8 flex items-center justify-between ${
        navBar ? "bg-slate-600" : "bg-white"
      }`}
    >
      <div className="flex items-center justify-start">
        <Link href="/home" className="flex ml-2 md:mr-24">
          <Image src="/logo.png" alt="logo" width={50} height={50} />
        </Link>
      </div>
      <div className="w-[90%] flex items-center justify-center space-x-8">
        {navBarLinks.map((link: any) => (
          <div
            className={`text-gray-600 hover:text-[#D6882D] hover:font-bold ${
              navBar ? "text-zinc-100" : "text-slate-600"
            }`}
          >
            <div className="text-left group">
              <h1
                className="flex justify-between items-center cursor-pointer"
                onClick={() => {
                  heading !== link.name
                    ? setHeading(link.name)
                    : setHeading("");
                  setSubHeading("");
                }}
              >
                {link.name}
                {link.submenu && (
                  <span className="text-xl ml-2 md:block hidden group-hover:rotate-180 group-hover:-mt-0 duration-150 ">
                    <IoIosArrowDown className="w-3 text-slate-500" />
                  </span>
                )}
              </h1>
              {link.submenu && (
                <div className="absolute top-6 hidden group-hover:md:block hover:md:block z-50">
                  <div className="py-3">
                    <div
                      className="w-4 h-4 left-3 absolute 
                    mt-1 rotate-45 bg-zinc-50 border-t border-l"
                    ></div>
                  </div>
                  <div
                    className={`bg-zinc-50 border border-l p-5 flex flex-wrap  max-w-80 max-h-[80%] overflow-y-auto ${
                      link.arrange === "row"
                        ? "flex-row gap-10"
                        : "gap-4 flex-col"
                    }`}
                  >
                    {link.sublinks?.map((mysublinks: any) => (
                      <div>
                        <h1 className="font-semibold text-slate-600 cursor-pointer hover:text-[#D6882D] flex items-center">
                          <IoIosArrowForward /> {mysublinks.Head}
                        </h1>
                        {mysublinks?.submenu &&
                          mysublinks.sublinks.map((slink: any) => (
                            <li className="text-sm text-gray-500 hover:text-[#D6882D] font-light cursor-pointer">
                              <Link
                                href={slink.link}
                                className="hover:text-primary"
                              >
                                {slink.name}
                              </Link>
                            </li>
                          ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div
              className={`
            ${heading === link.name ? "md:hidden" : "hidden"}
          `}
            >
              {link.sublinks?.map((slinks: any) => (
                <div>
                  <h1
                    onClick={() =>
                      subHeading !== slinks.Head
                        ? setSubHeading(slinks.Head)
                        : setSubHeading("")
                    }
                    className="font-semibold flex justify-between items-center group"
                  >
                    {slinks.Head}
                    <span className="text-xl inline">
                      <IoIosArrowDown className="w-3 text-slate-500" />
                    </span>
                  </h1>
                  <div
                    className={`pl-10 bg-sky-400 ${
                      subHeading === slinks.Head ? "md:hidden" : "hidden"
                    }`}
                  >
                    {slinks?.submenu &&
                      slinks.sublinks.map((slink: any) => (
                        <li className="pl-0 cursor-pointer hover:text-[#D6882D]">
                          <Link href={slink.link}>{slink.name}</Link>
                        </li>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
