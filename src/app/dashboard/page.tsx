"use client";

import { IModule } from "@/lib/interfaces/module.interface";
import {
  fetchUserById,
  fetchUserByToken,
  selectUsers,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { Chip } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React from "react";

const Dashboard = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const userState = useSelector(selectUsers);

  const [userActualModule, setUserActualModule] = React.useState<{
    [key: string]: number;
  }>({});
  const [userActualChapter, setUserActualChapter] = React.useState<{
    [key: string]: number;
  }>({});
  const [progress, setProgress] = React.useState<{ [key: string]: number }>({
    0: 0,
  });

  console.log(userActualModule, "^^^");
  console.log(userActualChapter, "^^^");

  function calculateValues(
    moduleIndex: number,
    chapterIndex: number,
    modules: IModule[]
  ) {
    const totalCount = modules?.reduce(
      (acc, curr) => acc + curr.chapters.length,
      0
    );

    let itemsBeforeIndex = 0;
    for (let i = 0; i < moduleIndex; i++) {
      itemsBeforeIndex += modules[i].chapters.length;
    }
    itemsBeforeIndex += chapterIndex;

    return {
      totalCount,
      itemsBeforeIndex,
    };
  }

  React.useEffect(() => {
    const loginToken = JSON.parse(
      (typeof window !== "undefined" && localStorage.getItem("loginData")) ||
        "{}"
    );

    dispatch(fetchUserByToken(loginToken?.login_token))
      .unwrap()
      .then((res) => {
        console.log(res, "rest");
        if (res.statusCode === 200) {
          dispatch(fetchUserById(res.data.id))
            .unwrap()
            .then((nextRes: any) => {
              if (nextRes.statusCode === 200) {
              }
            })
            .catch((err: any) => {
              enqueueSnackbar(err.message, {
                variant: "error",
                preventDuplicate: true,
              });
            });
        }
      })
      .catch((err) => {});
  }, []);

  React.useEffect(() => {
    if (userState?.user?.courses && userState?.user?.modules) {
      setUserActualModule({
        ...userActualModule,
        [userState?.user?.courses[0]?.id]:
          userState?.user?.courses[0]?.user_course?.currentModule,
      });
      setUserActualChapter({
        ...userActualChapter,
        [userState?.user?.modules[0]?.id]:
          userState?.user?.modules[0]?.user_module?.currentChapter,
      });
    }
  }, [userState]);
  return (
    <div className="">
      {userState?.user && (
        <div className="grid md:grid-cols-3 xs:grid-cols-2 grid-cols-1 lg:p-10 p-4 gap-4">
          {userState?.user?.courses?.map((course) => {
            return (
              <div className="bg-white w-[250px]">
                <img
                  src={course?.coverImage}
                  alt=""
                  className="w-full aspect-video"
                />
                <Chip
                  label={`${course?.user_course?.completed && "100%"}`}
                  className="mt-2 ml-2"
                />
                <div className="p-2">
                  <h1 className="text-base font-semibold text-accent line-clamp-2">
                    {course?.title}
                  </h1>
                  <p className="line-clamp-3 mt-2 text-[15px]">
                    {course?.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
