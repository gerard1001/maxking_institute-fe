"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { LoginContext } from "@/lib/context/LoginContext";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

const Dashboard = () => {
  const router = useRouter();
  const { loginData, setLoginData } = useContext(LoginContext);
  return (
    <ProtectedRoute>
      <div className="pt-20">
        Dashboard
        <Button
          onClick={() => {
            localStorage.removeItem("loginData");
            setLoginData({});
          }}
          className="!bg-primary !text-white !rounded-md !p-2 !mt-2 !cursor-pointer"
        >
          Logout
        </Button>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
