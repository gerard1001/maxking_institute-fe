"use client";

import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardTopbar from "@/components/DashboardTopbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { LoginContext } from "@/lib/context/LoginContext";
import React, { useContext, useState } from "react";

const Dashboard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {} = useContext(LoginContext);
  const [navBar, setNavBar] = useState<boolean>(false);

  const scrollDiv = (e: any) => {
    if (e.target.scrollTop >= 40) {
      setNavBar(true);
    } else {
      setNavBar(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen overflow-hidden">
        <div className="">
          <DashboardSidebar />
        </div>
        <div className="w-full h-full overflow-y-auto" onScroll={scrollDiv}>
          <DashboardTopbar navBar={navBar} />

          <div className="px-4 bg-zinc-100 min-h-screen pt-6">{children}</div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
