"use client";

import React, { createContext, useEffect, useMemo, useState } from "react";
import {
  fetchUserByToken,
  selectUsers,
  useDispatch,
  useSelector,
} from "../redux";

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

  const [loginData, setLoginData] = useState(state.loggedInUser);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(true);
  const [loginUserFetchLoading, setLoginUserFetchLoading] =
    useState<boolean>(false);

  useEffect(() => {
    const loginToken = JSON.parse(
      (typeof window !== "undefined" && localStorage.getItem("loginData")) ||
        "{}"
    );
    if (loginToken?.login_token) {
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
    }

    dispatch(fetchUserByToken(loginToken?.login_token))
      .then((res) => {
        setLoginUserFetchLoading(true);
        if (res.payload.statusCode === 200) {
          setLoginData(res.payload.data);
          setUserLoggedIn(true);
        } else {
          setUserLoggedIn(false);
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
