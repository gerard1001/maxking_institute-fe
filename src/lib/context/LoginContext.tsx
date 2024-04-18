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
};
const LoginContextState = {
  loginData: {},
  setLoginData: () => {},
  userLoggedIn: false,
  setUserLoggedIn: () => {},
  loginUserFetchLoading: false,
  setLoginUserFetchLoading: () => {},
};

export const LoginContext = createContext<LoginContextType>(LoginContextState);

const LoginContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const state = useSelector(selectUsers);

  const [loginData, setLoginData] = useState<User | any>(state.loggedInUser);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const [loginUserFetchLoading, setLoginUserFetchLoading] =
    useState<boolean>(false);

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
      .finally(() => {
        setLoginUserFetchLoading(false);
      });
  }, []);

  const value = useMemo(
    () => ({
      loginData,
      setLoginData,
      userLoggedIn,
      setUserLoggedIn,
      loginUserFetchLoading,
      setLoginUserFetchLoading,
    }),
    [loginData]
  );

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};

export default LoginContextProvider;
