"use client";

import React, { createContext, useEffect, useMemo, useState } from "react";
import {
  fetchUserByToken,
  selectUsers,
  useDispatch,
  useSelector,
} from "../redux";
import { objectIsEmpty } from "../functions/object_check.function";
import { set } from "date-fns";

type LoginContextType = {
  loginData: any;
  setLoginData: React.Dispatch<React.SetStateAction<any>>;
  userLoggedIn: boolean;
  setUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};
const LoginContextState = {
  loginData: {},
  setLoginData: () => {},
  userLoggedIn: false,
  setUserLoggedIn: () => {},
};

export const LoginContext = createContext<LoginContextType>(LoginContextState);

const LoginContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const state = useSelector(selectUsers);

  const [loginData, setLoginData] = useState(state.loggedInUser);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const loginToken = JSON.parse(
      (typeof window !== "undefined" && localStorage.getItem("loginData")) ||
        "{}"
    );

    dispatch(fetchUserByToken(loginToken?.login_token)).then((res) => {
      if (res.payload.statusCode === 200) {
        setLoginData(res.payload.data);
        setUserLoggedIn(true);
      } else {
        setUserLoggedIn(false);
        setLoginData({});
      }
    });
  }, []);

  const value = useMemo(
    () => ({
      loginData,
      setLoginData,
      userLoggedIn,
      setUserLoggedIn,
    }),
    [loginData]
  );

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};

export default LoginContextProvider;
