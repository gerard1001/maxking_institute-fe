"use client";

import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { LoginContext } from "@/lib/context/LoginContext";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const { loginData, userLoggedIn } = useContext(LoginContext);
  React.useEffect(() => {
    const loginToken = JSON.parse(
      (typeof window !== "undefined" && localStorage.getItem("loginData")) ||
        "{}"
    );

    if (!loginToken?.login_token) {
      router.push("/");
      // window.location.href = "/";
    }
  }, [userLoggedIn, loginData]);

  return <>{children}</>;
};

export default ProtectedRoute;
