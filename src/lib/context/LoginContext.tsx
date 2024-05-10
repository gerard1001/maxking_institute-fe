"use client";

import React, { createContext, useEffect, useMemo, useState } from "react";
import {
  fetchUserByToken,
  selectUsers,
  useDispatch,
  useSelector,
} from "../redux";
import { User } from "../interfaces/user.interface";

type LoginContextType = {
  loginData: any;
  setLoginData: React.Dispatch<React.SetStateAction<any>>;
  userLoggedIn: boolean;
  setUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  loginUserFetchLoading: boolean;
  setLoginUserFetchLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isClient: any;
  setIsClient: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
};
const LoginContextState = {
  loginData: {},
  setLoginData: () => {},
  userLoggedIn: false,
  setUserLoggedIn: () => {},
  loginUserFetchLoading: false,
  setLoginUserFetchLoading: () => {},
  isClient: true,
  setIsClient: () => {},
  userId: "",
  setUserId: () => {},
};

export const LoginContext = createContext<LoginContextType>(LoginContextState);

const LoginContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const state = useSelector(selectUsers);

  const [loginData, setLoginData] = useState<User | any>({});
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const [loginUserFetchLoading, setLoginUserFetchLoading] =
    useState<boolean>(false);
  // const [isClient, setIsClient] = useState(
  //   typeof window !== "undefined" &&
  //     localStorage.getItem("loginData") &&
  //     JSON.parse(
  //       (typeof window !== "undefined" && localStorage.getItem("loginData")) ||
  //         "{}"
  //     )?.role === "CLIENT"
  // );
  const [isClient, setIsClient] = useState<boolean>(true);
  const [userId, setUserId] = React.useState<string>("");

  console.log(isClient, "isClient");

  useEffect(() => {
    const loginToken = JSON.parse(
      (typeof window !== "undefined" && localStorage.getItem("loginData")) ||
        "{}"
    );

    if (
      typeof loginToken === "object" &&
      Object.keys(loginToken).length === 0
    ) {
      setUserLoggedIn(false);
    }

    if (!loginToken?.login_token || loginToken?.login_token === undefined) {
      setUserLoggedIn(false);
    } else {
      setUserLoggedIn(true);
      setUserId(loginToken?.id);
    }

    dispatch(fetchUserByToken(loginToken?.login_token))
      .unwrap()
      .then((res) => {
        setLoginUserFetchLoading(true);
        if (res.statusCode === 200) {
          setLoginData(res.data);
          setUserLoggedIn(true);
        } else {
          setUserLoggedIn(false);
          localStorage.removeItem("loginData");
          setLoginData({});
        }
      })
      .catch((err) => {
        if (err.statusCode === 404) {
          if (typeof window !== "undefined") {
            window.location.href = "/";
            localStorage.removeItem("loginData");
          }
        }
      })
      .finally(() => {
        setLoginUserFetchLoading(false);
      });

    if (loginToken && loginToken?.role === "CLIENT") {
      setIsClient(true);
    } else {
      setIsClient(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      loginData,
      setLoginData,
      userLoggedIn,
      setUserLoggedIn,
      loginUserFetchLoading,
      setLoginUserFetchLoading,
      isClient,
      setIsClient,
      userId,
      setUserId,
    }),
    [loginData]
  );

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};

export default LoginContextProvider;
