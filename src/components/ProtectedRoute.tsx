import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { LoginContext } from "@/lib/context/LoginContext";
import { objectIsEmpty } from "@/lib/functions/object_check.function";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const { loginData } = useContext(LoginContext);
  const userLoggedIn = !objectIsEmpty(loginData);
  React.useEffect(() => {
    if (!userLoggedIn) {
      router.push("/");
    }
  }, [userLoggedIn, loginData]);

  return <>{children}</>;
};

export default ProtectedRoute;
