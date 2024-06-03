"use client";

import React, { useContext } from "react";
import LoadinProgress from "./LoadingProgess";
import { LoginContext } from "@/lib/context/LoginContext";
import { FaRegBell } from "react-icons/fa6";
import { IoArrowForward, IoMenu, IoSearch } from "react-icons/io5";
import { useRouter } from "next/navigation";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";
import DashboardSidebar from "./DashboardSidebar";
import Image from "next/image";
import MobileDashboardSidebar from "./MobileDahboardSidebar";

const DashboardTopbar = ({ navBar }: any) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const [open, setOpen] = React.useState<boolean>(false);
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

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <div
        className={`h-10 sticky z-10 top-0 left-0 bottom-0
       ${navBar ? "backdrop-blur-sm bg-white/30" : "bg-white"}
       flex items-center justify-between px-3 lg:flex-row-reverse`}
      >
        <div className={`lg:hidden block`}>
          <IconButton onClick={toggleDrawer(true)}>
            <IoMenu className="text-xl text-accent" />
          </IconButton>
        </div>
        <div className="flex items-center gap-6">
          {/* <IoSearch className="text-xl text-accent" />
          <FaRegBell className="text-xl text-accent" /> */}
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
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
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
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        className=""
        anchor="left"
      >
        <div className="w-[250px]">
          <MobileDashboardSidebar handleCloseDrawer={toggleDrawer(false)} />
        </div>
      </Drawer>
    </>
  );
};

export default DashboardTopbar;

{
  /* <List>
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
<Divider /> */
}
