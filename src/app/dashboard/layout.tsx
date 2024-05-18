"use client";

import DashboardFooter from "@/components/DashboardFooter";
import DashboardLearningSidebar from "@/components/DashboardLearningSidebar";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardTopbar from "@/components/DashboardTopbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { SuspenseLoading } from "@/components/SuspenseLoading";
import { LoginContext } from "@/lib/context/LoginContext";
import { usePathname } from "next/navigation";
import React, { useContext, useState } from "react";

const Dashboard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathName = usePathname();
  const {
    loginData,
    loginUserFetchLoading,
    setLoginUserFetchLoading,
    setLoginData,
  } = useContext(LoginContext);
  const [navBar, setNavBar] = useState<boolean>(false);
  const [onLearning, setOnLearning] = useState<boolean>(false);

  console.log(onLearning);

  const scrollDiv = (e: any) => {
    if (e.target.scrollTop >= 40) {
      setNavBar(true);
    } else {
      setNavBar(false);
    }
  };

  const splits = pathName.split("/");
  console.log(splits);
  React.useEffect(() => {
    if (splits[2] === "courses" && splits[4] === "learning") {
      setOnLearning(true);
    } else {
      setOnLearning(false);
    }
  }, [pathName]);
  return (
    <ProtectedRoute>
      <div className="flex h-screen overflow-hidden">
        <div className="">
          {onLearning ? <DashboardLearningSidebar /> : <DashboardSidebar />}
          {/* <DashboardSidebar /> */}
        </div>
        <div className="w-full overflow-y-auto" onScroll={scrollDiv}>
          <DashboardTopbar navBar={navBar} />
          {loginUserFetchLoading ? (
            <SuspenseLoading />
          ) : (
            <>
              {" "}
              <div className="px-4 bg-zinc-100 min-h-screen pt-6">
                {children}
              </div>
              <DashboardFooter />
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
