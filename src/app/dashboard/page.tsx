"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { LoginContext } from "@/lib/context/LoginContext";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

const Dashboard = () => {
  const router = useRouter();
  const { loginData, userLoggedIn, setLoginData, setUserLoggedIn } =
    useContext(LoginContext);
  return (
    <ProtectedRoute>
      <div className="pt-20">
        Dashboard
        <Button
          onClick={() => {
            localStorage.removeItem("loginData");
            setLoginData({});
            setUserLoggedIn(false);
          }}
          className="!bg-primary !text-white !rounded-md !p-2 !mt-2 !cursor-pointer"
        >
          Logout
        </Button>
        <Button
          onClick={() => {
            router.push("/dashboard/users");
          }}
          className="!bg-primary !text-white !rounded-md !p-2 !mt-2 !cursor-pointer"
        >
          To Users
        </Button>
        {userLoggedIn && (
          <div>
            <img
              // src="https://lh3.googleusercontent.com/a/ACg8ocK-0w6lCKz2169NXW4wB549G-1uXWG4Bk6Eiao6WbTejYm-XA=s96-c"
              src={loginData.profile.picture}
              alt="profile"
              className="w-20 h-20 rounded-full"
            />
            <p>{loginData.firstName}</p>
            <p>{loginData.lastName}</p>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
