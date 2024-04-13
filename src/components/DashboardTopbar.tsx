"use client";

import React, { useContext } from "react";
import LoadinProgress from "./LoadingProgess";
import { LoginContext } from "@/lib/context/LoginContext";
import { FaRegBell } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";

const DashboardTopbar = ({ navBar }: any) => {
  const {
    loginData,
    userLoggedIn,
    setLoginData,
    setUserLoggedIn,
    loginUserFetchLoading,
  } = useContext(LoginContext);
  return (
    <div
      className={`h-10 sticky top-0 left-0 bottom-0 ${
        navBar ? "backdrop-blur-sm bg-white/30" : "bg-white"
      } flex items-center justify-between px-3`}
    >
      <div className=""></div>
      <div className="flex items-center gap-6">
        <IoSearch className="text-xl text-accent" />
        <FaRegBell className="text-xl text-accent" />
        {loginUserFetchLoading ? (
          <LoadinProgress />
        ) : (
          <img
            src={loginData?.profile?.picture}
            alt="profile"
            className="w-8 aspect-square rounded-full cursor-pointer"
            onClick={() => {
              localStorage.removeItem("loginData");
              setLoginData({});
              setUserLoggedIn(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardTopbar;
