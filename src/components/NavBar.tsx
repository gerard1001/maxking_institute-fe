"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineMail } from "react-icons/hi";
import { FaXTwitter, FaFacebookF } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { IconButton } from "@mui/material";
import { IoSearch } from "react-icons/io5";

const navBarLinks = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "about us",
    path: "/about",
  },
  {
    name: "Training center",
    path: "/1",
  },
  {
    name: "MKI programs",
    path: "/2",
  },
  {
    name: "MKI community",
    path: "/3",
  },
  {
    name: "Contact us",
    path: "/4",
  },
];

const secondaryNavLinks = ["Sign in", "Sign up"];

const NavBar = () => {
  const pathName = usePathname();
  const [navBar, setNavBar] = useState<boolean>(false);

  useEffect(() => {
    const scrollAction = () => {
      if (window.scrollY >= 80) {
        setNavBar(true);
      } else {
        setNavBar(false);
      }
    };
    window.addEventListener("scroll", scrollAction);
  }, []);

  return (
    <div className={`px-10 flex flex-col items-center pb-2`}>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-start">
          <Link href="/" className="flex ml-2 md:mr-24">
            <Image src="/logo.png" alt="logo" width={50} height={50} />
          </Link>
        </div>
        <div className="flex items-center gap-10">
          <div className={`flex items-center`}>
            <div className={`flex items-center gap-2 pr-4`}>
              <IconButton
                size="small"
                sx={{
                  backgroundColor: "transparent",
                  border: "1px solid #D9D9D9",
                }}
              >
                <FiPhone className="text-accent" />
              </IconButton>
              <p className="text-accent-foreground">+250 788 668 657</p>
            </div>
            <div
              className={`flex items-center gap-2 border-l border-muted-foreground pl-4`}
            >
              <IconButton
                size="small"
                sx={{
                  backgroundColor: "transparent",
                  border: "1px solid #D9D9D9",
                }}
              >
                <HiOutlineMail className="text-accent" />
              </IconButton>
              <p className="text-accent-foreground">
                info@maxkinginstitute.org
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <IconButton
              size="small"
              sx={{
                backgroundColor: "transparent",
                border: "1px solid #D9D9D9",
              }}
            >
              <FaXTwitter className="text-secondary text-sm" />
            </IconButton>
            <IconButton
              size="small"
              sx={{
                backgroundColor: "transparent",
                border: "1px solid #D9D9D9",
              }}
            >
              <FaLinkedinIn className="text-secondary text-sm" />
            </IconButton>
            <IconButton
              size="small"
              sx={{
                backgroundColor: "transparent",
                border: "1px solid #D9D9D9",
              }}
            >
              <FaFacebookF className="text-secondary text-sm" />
            </IconButton>
          </div>
        </div>
      </div>
      <nav
        className={`bg-primary w-full py-4 px-6 flex items-center justify-between  ${
          navBar
            ? // "fixed top-0 z-50 rounded-none"
              "navbar-animate"
            : "rounded-[50px] relative"
        }  duration-150 ease-in-out`}
      >
        <ul className="flex items-center gap-5">
          {navBarLinks.map((navLink, index: number) => (
            <li
              key={index}
              className={`${
                pathName === `${navLink.path.toLowerCase()}`
                  ? "text-primary-foreground"
                  : "text-white"
              } uppercase`}
            >
              <Link href={`${navLink.path.toLowerCase()}`}>{navLink.name}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-5">
          <IconButton
            size="small"
            sx={{
              backgroundColor: "transparent",
              border: "1px solid #D9D9D9",
            }}
          >
            <IoSearch className="text-white" />
          </IconButton>
          <ul className="flex items-center gap-5">
            {secondaryNavLinks.map((link: string, index: number) => (
              <li
                key={index}
                className={`${
                  pathName === `/${link.toLowerCase()}`
                    ? "text-primary-foreground"
                    : "text-white"
                } uppercase`}
              >
                <Link href={`/${link.toLowerCase()}`}>{link}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
