"use client";

import React, { useEffect } from "react";
import {
  fetchUserById,
  selectUsers,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { useSnackbar } from "notistack";
import "react-phone-input-2/lib/style.css";
import UpdateUserInfo from "@/components/UpdateUserInfo";
import UpdateUserProfile from "@/components/UpdateUserProfile";

interface SingleUserProps {
  params: {
    userId: string;
  };
}

const EditUser = ({ params: { userId } }: SingleUserProps) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const userState = useSelector(selectUsers)?.user;

  useEffect(() => {
    dispatch(fetchUserById(userId))
      .unwrap()
      .then((res) => {
        if (res.statusCode === 200) {
          enqueueSnackbar(res.message, {
            variant: "success",
            preventDuplicate: true,
          });
        } else {
          enqueueSnackbar(res.message, { variant: "error" });
        }
      })
      .catch((error) => {
        enqueueSnackbar("Failed to fetch user", { variant: "error" });
      });
  }, [userId]);

  return (
    <div className="flex flex-col gap-4 pb-20">
      <div className="w-full max-w-[720px] mx-auto min-h-40 shadow-md bg-white p-4 rounded-md transition-all duration-150">
        <h1 className="text-accent text-xl font-semibold">
          Personal identifications
        </h1>
        <div className="">
          {" "}
          <UpdateUserInfo
            isAccountUser={false}
            userState={userState}
            userId={userId}
          />
        </div>
      </div>
      <div className="w-full max-w-[720px] mx-auto min-h-40 shadow-md bg-white p-4 rounded-md">
        <h1 className="text-accent text-xl font-semibold">Profile Info</h1>
        <div className="">
          <UpdateUserProfile
            isAccountUser={false}
            userState={userState}
            userId={userId}
          />
        </div>
      </div>
    </div>
  );
};

export default EditUser;
