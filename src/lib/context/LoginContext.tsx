"use client";

import React, { createContext, useEffect, useMemo, useState } from "react";
import {
  fetchUserByToken,
  selectUsers,
  useDispatch,
  useSelector,
} from "../redux";
import { objectIsEmpty } from "../functions/object_check.function";

type LoginContextType = {
  loginData: any;
  setLoginData: React.Dispatch<React.SetStateAction<any>>;
};
const LoginContextState = {
  loginData: {},
  setLoginData: () => {},
};

export const LoginContext = createContext<LoginContextType>(LoginContextState);

const LoginContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const state = useSelector(selectUsers);

  const [loginData, setLoginData] = useState(state.loggedInUser);
  // console.log(loginToken);
  console.log({ loginData });

  useEffect(() => {
    const loginToken = JSON.parse(
      (typeof window !== "undefined" && localStorage.getItem("loginData")) ||
        "{}"
    );
    console.log({ loginToken });
    const userLoggedIn = !objectIsEmpty(loginData);
    if (!userLoggedIn) {
      setLoginData({});
    }
    dispatch(fetchUserByToken(loginToken?.login_token)).then((res) => {
      if (res.payload.statusCode === 200) {
        setLoginData(res.payload.data);
      } else {
        setLoginData({});
      }
    });
  }, []);

  const value = useMemo(
    () => ({
      loginData,
      setLoginData,
    }),
    [loginData]
  );

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};

export default LoginContextProvider;
