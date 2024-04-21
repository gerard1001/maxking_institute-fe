"use client";

import React, { useContext } from "react";
import { LoginContext } from "@/lib/context/LoginContext";
import MainNavbar from "./MainNavbar";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname();
  const { userLoggedIn } = useContext(LoginContext);

  const isDashboard = pathName.split("/")[1] === "dashboard";
  return <>{userLoggedIn && isDashboard ? null : <MainNavbar />}</>;
};

export default Navbar;
