"use client";

import React, { useContext } from "react";
import LoadinProgress from "./LoadingProgess";
import { LoginContext } from "@/lib/context/LoginContext";
import { FaRegBell } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { Menu, MenuItem } from "@mui/material";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";

const DashboardTopbar = ({ navBar }: any) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const {
    loginData,
    userLoggedIn,
    setLoginData,
    setUserLoggedIn,
    loginUserFetchLoading,
  } = useContext(LoginContext);
  return (
    <div
      className={`h-10 sticky z-10 top-0 left-0 bottom-0
       ${navBar ? "backdrop-blur-sm bg-white/30" : "bg-white"}
       flex items-center justify-between px-3`}
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
            className="w-8 aspect-square rounded-full cursor-pointer object-cover border border-sky-100"
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              handleClick(event);
            }}
          />
        )}
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            router.push("/dashboard/profile");
            setTimeout(() => {
              handleClose();
            }, 1000);
          }}
        >
          {" "}
          <CgProfile className="text-base mr-2" />
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            localStorage.removeItem("loginData");
            setLoginData({});
            setUserLoggedIn(false);
            router.push("/");
            handleClose();
          }}
        >
          {" "}
          <AiOutlineLogout className="text-base mr-2" />
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default DashboardTopbar;
