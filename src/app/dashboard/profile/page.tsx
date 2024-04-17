"use client";

import { SuspenseLoading } from "@/components/SuspenseLoading";
import UpdateUserInfo from "@/components/UpdateUserInfo";
import UpdateUserProfile from "@/components/UpdateUserProfile";
import { LoginContext } from "@/lib/context/LoginContext";
import {
  fetchUserById,
  fetchUserByToken,
  selectUsers,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { Button } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect } from "react";

const Profile = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const userState = useSelector(selectUsers)?.loggedInUser;
  const {
    loginData,
    loginUserFetchLoading,
    setLoginUserFetchLoading,
    setLoginData,
  } = useContext(LoginContext);

  console.log(loginData, "9999");

  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  // const [userId, setUserId] = React.useState<string>(loginData?.id || "");

  useEffect(() => {
    // dispatch(fetchUserById(loginData?.id || ""))
    //   .unwrap()
    //   .then((res) => {
    //     if (res.statusCode === 200) {
    //     } else {
    //       enqueueSnackbar(res.message, { variant: "error" });
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    const loginToken = JSON.parse(
      (typeof window !== "undefined" && localStorage.getItem("loginData")) ||
        "{}"
    );

    dispatch(fetchUserByToken(loginToken?.login_token))
      .unwrap()
      .then((res) => {
        setLoginUserFetchLoading(true);
        if (res.statusCode === 200) {
          setLoginData(res.data);
        } else {
          localStorage.removeItem("loginData");
          setLoginData({});
        }
      })
      .finally(() => {
        setLoginUserFetchLoading(false);
      });
  }, []);

  return (
    <div>
      {loginUserFetchLoading ? (
        <SuspenseLoading />
      ) : (
        <div className="w-fit mx-auto">
          <div className="w-full flex items-center gap-8 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-3 px-8 rounded-lg">
            <Button
              className={`${activeIndex === 0 ? "bg-secondary/10" : "bg-none"}`}
              onClick={() => setActiveIndex(0)}
            >
              Personal Info
            </Button>
            <Button
              className={`${activeIndex === 1 ? "bg-secondary/10" : "bg-none"}`}
              onClick={() => setActiveIndex(1)}
            >
              Profile Info
            </Button>
            {/* <Button
              className={`${activeIndex === 2 ? "bg-secondary/10" : "bg-none"}`}
              onClick={() => setActiveIndex(2)}
            >
              Password
            </Button> */}
          </div>
          <div className="bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-3 px-8 rounded-lg mt-6 md: min-w-[720px]">
            {activeIndex === 0 && (
              <UpdateUserInfo
                isAccountUser={true}
                userState={userState}
                userId={userState.id}
              />
            )}
            {activeIndex === 1 && (
              <UpdateUserProfile
                isAccountUser={true}
                userState={userState}
                userId={userState.id}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
