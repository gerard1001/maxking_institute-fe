"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineMail } from "react-icons/hi";
import { FaXTwitter, FaFacebookF } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { MdOutlineClose } from "react-icons/md";
import { IoArrowForward } from "react-icons/io5";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Drawer,
  IconButton,
} from "@mui/material";

const navBarLinks = [
  {
    name: "HOME",
    path: "/",
  },
  {
    name: "ABOUT US",
    path: "/about",
  },
  {
    name: "TRAINING CENTER",
    path: "/training-center",
  },
  {
    name: "MKI PROGRAMS",
    path: "/programs",
  },
  {
    name: "MKI COMMUNITY",
    path: "/community",
  },
  {
    name: "CONTACT US",
    path: "/contact-us",
  },
];

const secondaryNavLinks = ["SIGN IN", "SIGN UP"];

const NavBar = () => {
  const pathName = usePathname();
  const [navBar, setNavBar] = useState<boolean>(false);
  const [open, setOpen] = React.useState(false);

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

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <div className={`lg:px-10 px-0 flex flex-col items-center lg:pb-10 pb-0`}>
      <div className="lg:flex hidden items-center justify-between w-full">
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
        className={`bg-primary w-full py-4 px-6 lg:flex hidden items-center justify-between ${
          navBar ? "navbar-animate" : "lg:rounded-[50px] rounded-none relative"
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
      <nav
        className={`lg:hidden flex items-center justify-between bg-primary w-full px-4 py-1 fixed top-0 left-0 right-0 z-50`}
      >
        <div>
          <Image src="/pagelogo.png" alt="logo" width={40} height={40} />
        </div>
        <div className="flex items-center gap-2">
          {" "}
          <IconButton
            size="small"
            sx={{
              backgroundColor: "transparent",
            }}
          >
            <IoSearch className="text-white text-xl" />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              backgroundColor: "transparent",
            }}
            onClick={toggleDrawer(true)}
          >
            <IoMenu className="text-white text-xl" />
          </IconButton>
        </div>
      </nav>
      <Drawer open={open} onClose={toggleDrawer(false)} className="">
        <div className="w-[250px] bg-white text-white">
          <List>
            <ListItem
              disablePadding
              className={``}
              onClick={toggleDrawer(false)}
            >
              <ListItemButton>
                <div className="w-full flex items-center justify-between">
                  <Image
                    src="/pagelogo.png"
                    alt="logo"
                    width={40}
                    height={40}
                  />
                  <IconButton className="">
                    <IoArrowForward className="" />
                  </IconButton>
                </div>
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </div>
        <nav>
          <List>
            {navBarLinks?.map((navLink, index: number) => {
              return (
                <Link
                  onClick={() => {
                    setOpen(false);
                  }}
                  href={`${navLink.path.toLowerCase()}`}
                >
                  <ListItem
                    disablePadding
                    key={index}
                    className={`${
                      pathName === navLink.path.toLowerCase()
                        ? "bg-primary text-primary-foreground"
                        : ""
                    }`}
                  >
                    <ListItemButton>
                      <ListItemText primary={navLink.name} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              );
            })}
          </List>
        </nav>
        <Divider />
        <nav>
          <List>
            {secondaryNavLinks?.map((navLink, index: number) => {
              return (
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary={navLink} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </nav>
      </Drawer>
    </div>
  );
};

export default NavBar;
