import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { LoginContext } from "@/lib/context/LoginContext";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const { loginData, userLoggedIn } = useContext(LoginContext);
  React.useEffect(() => {
    if (!userLoggedIn) {
      router.push("/");
    }
  }, [userLoggedIn, loginData]);

  return <>{children}</>;
};

export default ProtectedRoute;
