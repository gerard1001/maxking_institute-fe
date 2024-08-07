"use client";

import AdminAnalyticsGraphs from "@/components/AdminAnaltyicsPage";
import { LoginContext } from "@/lib/context/LoginContext";
import { IModule } from "@/lib/interfaces/module.interface";
import {
  fetchAllCourses,
  fetchAllUsers,
  fetchArticles,
  fetchUserById,
  fetchUserByToken,
  selectArticles,
  selectCourses,
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
  const courseState = useSelector(selectCourses);
  const articleState = useSelector(selectArticles);

  const [userActualModule, setUserActualModule] = React.useState<{
    [key: string]: number;
  }>({});
  const [userActualChapter, setUserActualChapter] = React.useState<{
    [key: string]: number;
  }>({});
  const [progress, setProgress] = React.useState<{ [key: string]: number }>({});
  const [result, setResult] = React.useState<
    | {
        [x: string]: number;
      }
    | undefined
  >({});
  const { isClient } = React.useContext(LoginContext);

  const calculateValues = (
    moduleObject: any,
    chapterObject: any,
    modules:
      | {
          [x: string]: IModule[];
        }[]
      | undefined
  ) => {
    if (userState?.user?.courses && modules) {
      const totalCountAtCourse: { [x: string]: number } = {};
      for (let i = 0; i < modules?.length; i++) {
        totalCountAtCourse[Object.keys(modules[i])[0]] = modules[i][
          Object.keys(modules[i])[0]
        ]?.reduce((acc, curr) => acc + curr.chapters.length, 0);
      }

      const obj: { [x: string]: number } = {};

      for (let i = 0; i < userState?.user?.courses?.length; i++) {
        let itemsBeforeIndex = 0;
        for (let j = 0; j < moduleObject[userState?.user?.courses[i].id]; j++) {
          itemsBeforeIndex +=
            modules[i][userState?.user?.courses[i].id][j].chapters.length;
        }
        itemsBeforeIndex += chapterObject[userState?.user?.courses[i].id];

        obj[userState?.user?.courses[i].id] = itemsBeforeIndex;
      }

      const object = {
        totalCountAtCourse,
        obj,
      };

      const result: { [x: string]: number } = {};
      for (const key in object.obj) {
        if (object.obj.hasOwnProperty(key)) {
          const numerator = object.obj[key];
          const denominator = object.totalCountAtCourse[key];
          result[key] = denominator !== 0 ? numerator / denominator : 0;
        }
      }

      return result;
    }
  };

  React.useEffect(() => {
    const loginToken = JSON.parse(
      (typeof window !== "undefined" && localStorage.getItem("loginData")) ||
        "{}"
    );

    dispatch(fetchUserByToken(loginToken?.login_token))
      .unwrap()
      .then((res) => {
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

    dispatch(fetchAllCourses())
      .unwrap()
      .catch((err: any) => {
        enqueueSnackbar(err.message, {
          variant: "error",
          preventDuplicate: true,
        });
      });

    dispatch(fetchAllUsers())
      .unwrap()
      .catch((err: any) => {
        if (err.statusCode !== 401) {
          enqueueSnackbar(err.message, {
            variant: "error",
            preventDuplicate: true,
          });
        }
      });

    dispatch(fetchArticles()).catch((err: any) => {
      enqueueSnackbar(err.message, {
        variant: "error",
        preventDuplicate: true,
      });
    });
  }, []);

  React.useEffect(() => {
    if (userState?.user?.courses && userState?.user?.modules) {
      // setUserActualModule({
      //   ...userActualModule,
      //   [userState?.user?.courses[0]?.id]:
      //     userState?.user?.courses[0]?.user_course?.currentModule,
      // });
      const courseObject: { [x: string]: number } = {};
      const moduleObject: { [x: string]: number } = {};
      for (let i = 0; i < userState?.user?.courses?.length; i++) {
        courseObject[userState?.user?.courses[i]?.id] =
          userState?.user?.courses[i]?.user_course?.currentModule - 1;
      }
      setUserActualModule({
        ...userActualModule,
        ...courseObject,
      });
      for (let i = 0; i < userState?.user?.modules?.length; i++) {
        moduleObject[userState?.user?.courses[i]?.id] =
          userState?.user?.modules[i]?.user_module?.currentChapter - 1;
      }
      setUserActualChapter({
        ...userActualChapter,
        ...moduleObject,
      });
    }
  }, [userState]);

  React.useEffect(() => {
    // const modules =
    //   userState?.user?.courses?.find((course) => course.id === course_id)
    //     ?.modules ??
    //   userState?.loggedInUser?.courses?.find(
    //     (course) => course.id === course_id
    //   )?.modules ??
    //   {};

    const modules = userState?.user?.courses?.map((course) => {
      return {
        [course?.id]: course?.modules,
      };
    });

    setResult(calculateValues(userActualModule, userActualChapter, modules));
  }, [userActualModule, userActualChapter, userState]);
  return (
    <div className="">
      {!isClient ? (
        <>
          <AdminAnalyticsGraphs
            users={userState?.allUsers}
            courses={courseState?.allCourses}
            articles={articleState?.articles}
          />
        </>
      ) : (
        <>
          <h1 className="text-2xl text-accent font-semibold ml-10">
            Your Courses
          </h1>
          {userState?.user && (
            <>
              {userState?.user?.courses?.length === 0 ? (
                <div className="">
                  <h1 className="text-accent ml-10 mb-6">
                    You haven't started learning any courses yet
                  </h1>
                  <h1 className="text-2xl text-accent font-semibold ml-10">
                    Take a look at some courses here
                  </h1>
                  {courseState?.allCourses?.length === 0 ? (
                    <h1 className="text-accent ml-10 mb-6">
                      No added courses yet
                    </h1>
                  ) : (
                    <div className="flex flex-wrap lg:p-10 p-4 lg:pt-2 pt-2 gap-4 md:justify-normal justify-center">
                      {courseState?.allCourses
                        ?.filter(
                          (course) =>
                            course.isPublished && course.modules.length > 0
                        )
                        ?.map((course) => {
                          return (
                            <div
                              key={course.id}
                              className="max-w-[250px] bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg"
                            >
                              <div className="overflow-hidden bg-cover bg-no-repeat rounded-t-md w-full cursor-pointer relative">
                                <img
                                  src={course.coverImage}
                                  alt=""
                                  className="w-full aspect-video transition duration-300 ease-in-out hover:scale-105 object-cover"
                                  onClick={() => {
                                    router.push(
                                      `/dashboard/courses/${course.id}`
                                    );
                                  }}
                                />
                                <div
                                  className={`w-fit absolute top-0 left-0 bg-white px-1`}
                                >
                                  {course.price === 0 || !course.price ? (
                                    <h1 className="text-secondary font-semibold">
                                      Free
                                    </h1>
                                  ) : (
                                    <h1 className="text-primary font-semibold">
                                      $ {course.price}
                                    </h1>
                                  )}
                                </div>
                              </div>
                              {/* <img
                            src={course?.coverImage}
                            alt=""
                            className="w-full aspect-video"
                          /> */}
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
              ) : (
                <div className="flex flex-wrap lg:p-10 p-4 gap-4 md:justify-normal justify-center">
                  {userState?.user?.courses?.map((course) => {
                    return (
                      <div className="bg-white w-[250px]">
                        <img
                          src={course?.coverImage}
                          alt=""
                          className="w-full aspect-video"
                          onClick={() => {
                            router.push(`/dashboard/courses/${course.id}`);
                          }}
                        />
                        {course?.user_course?.completed ? (
                          <Chip
                            label={
                              <h1 className="flex">
                                <p className="mr-1 font-semibold">100%</p>{" "}
                                Complete
                              </h1>
                            }
                            className="mt-2 ml-2 bg-green-300"
                          />
                        ) : (
                          <>
                            {" "}
                            {result && (
                              <>
                                {Object.keys(result).includes(course.id) && (
                                  <Chip
                                    label={
                                      <h1 className="flex">
                                        <p className="mr-1 font-semibold">
                                          {Number.isNaN(
                                            Math.round(result[course.id] * 100)
                                          ) ? (
                                            "0 %"
                                          ) : (
                                            <>
                                              {Math.round(
                                                result[course.id] * 100
                                              )}
                                              %
                                            </>
                                          )}
                                        </p>{" "}
                                        Complete
                                      </h1>
                                    }
                                    className="mt-2 ml-2"
                                  />
                                )}
                              </>
                            )}
                          </>
                        )}

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
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
