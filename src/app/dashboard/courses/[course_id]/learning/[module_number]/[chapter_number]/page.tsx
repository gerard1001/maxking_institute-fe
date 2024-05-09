"use client";

import { LoginContext } from "@/lib/context/LoginContext";
import { objectIsEmpty } from "@/lib/functions/object_check.function";
import { IChapter } from "@/lib/interfaces/chapter.interface";
import { IModule } from "@/lib/interfaces/module.interface";
import {
  createUserModule,
  deleteByUserAndModuleId,
  fetchOneCourse,
  fetchOneModule,
  fetchUserById,
  findByUserAndCourseId,
  findByUserAndModuleId,
  selectChapters,
  selectCourses,
  selectModules,
  selectUsers,
  updateCurrentChapter,
  updateCurrentModule,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { IconButton } from "@mui/material";
import { create } from "domain";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

export interface ModuleLearningProps {
  params: {
    course_id: string;
    module_number: string;
    chapter_number: number;
  };
}

const ModuleLearning = ({
  params: { chapter_number, course_id, module_number },
}: ModuleLearningProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const divRef = React.useRef<HTMLDivElement>(null);
  const courseState = useSelector(selectCourses);
  const moduleState = useSelector(selectModules);
  const userState = useSelector(selectUsers);
  const [currentModule, setCurrentModule] = React.useState<IModule>();
  const [currentChapter, setCurrentChapter] = React.useState<IChapter>();
  const [nextChapter, setNextChapter] = React.useState<IChapter>();
  const [userActualModule, setUserActualModule] = React.useState<number>(1);
  const [userActualChapter, setUserActualChapter] = React.useState<number>(1);
  const actualUserPosition = Number(
    userActualModule.toString() + userActualChapter.toString()
  );

  const { isClient, userId, loginData } = React.useContext(LoginContext);

  // const userActualModule = userState?.user?.courses?.find(
  //   (course) => course.id === course_id
  // )?.user_course?.currentModule;

  // const userActualChapter = userState?.user?.modules?.find(
  //   (module) => module.courseId === course_id
  // )?.user_module?.currentChapter;

  console.log(actualUserPosition, "actualUserPosition");

  React.useEffect(() => {
    dispatch(fetchOneCourse(course_id))
      .unwrap()
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });

    if (loginData && !objectIsEmpty(loginData)) {
      dispatch(fetchUserById(loginData.id))
        .unwrap()
        .catch((err: any) => {
          enqueueSnackbar(err.message, {
            variant: "error",
            preventDuplicate: true,
          });
        });
    }
  }, []);

  React.useEffect(() => {
    if (courseState?.course?.modules) {
      setCurrentModule(
        courseState?.course?.modules?.find(
          (module) => module.moduleNumber === Number(module_number)
        )
      );
    }
  }, [courseState]);

  React.useEffect(() => {
    if (userState?.user?.courses) {
      setUserActualModule(
        userState?.user?.courses?.find((course) => course.id === course_id)
          ?.user_course?.currentModule ?? 1
      );
      setUserActualChapter(
        userState?.user?.modules?.find(
          (module) => module.courseId === course_id
        )?.user_module?.currentChapter ?? 1
      );
    }
  }, [userState]);

  React.useEffect(() => {
    if (currentModule) {
      setCurrentChapter(
        currentModule?.chapters?.find(
          (chapter) => chapter.chapterNumber === Number(chapter_number)
        )
      );
    }
  }, [currentModule]);

  const toPrevious = () => {
    if (currentChapter && currentModule) {
      const currentModuleIndex = courseState?.course?.modules?.findIndex(
        (module) => module.moduleNumber === Number(module_number)
      );
      const currentChapterIndex = currentModule?.chapters?.findIndex(
        (chapter) => chapter.chapterNumber === Number(chapter_number)
      );

      if (
        currentModuleIndex !== undefined &&
        currentChapterIndex !== undefined &&
        currentModuleIndex === 0 &&
        currentChapterIndex === 0
      ) {
        router.push(
          `/dashboard/courses/${course_id}/learning/${module_number}/${currentModule?.chapters?.length}`
        );
      } else if (
        currentChapterIndex !== undefined &&
        currentChapterIndex === 0
      ) {
        const previousModule =
          courseState?.course?.modules?.[currentModuleIndex - 1];
        if (previousModule) {
          const previousModuleLastChapter =
            previousModule?.chapters?.[previousModule?.chapters?.length - 1];
          if (previousModuleLastChapter) {
            router.push(
              `/dashboard/courses/${course_id}/learning/${previousModule.moduleNumber}/${previousModuleLastChapter.chapterNumber}`
            );
          }
        }
      } else {
        const previousChapter =
          currentModule?.chapters?.[currentChapterIndex - 1];
        if (previousChapter) {
          router.push(
            `/dashboard/courses/${course_id}/learning/${module_number}/${previousChapter.chapterNumber}`
          );
        }
      }
    }
  };

  const toNext = () => {
    if (currentChapter && currentModule) {
      const currentModuleIndex = courseState?.course?.modules?.findIndex(
        (module) => module.moduleNumber === Number(module_number)
      );
      const currentChapterIndex = currentModule?.chapters?.findIndex(
        (chapter) => chapter.chapterNumber === Number(chapter_number)
      );

      if (
        currentModuleIndex !== undefined &&
        currentChapterIndex !== undefined &&
        currentModuleIndex === courseState?.course?.modules?.length - 1 &&
        currentChapterIndex === currentModule?.chapters?.length - 1
      ) {
        router.push(
          `/dashboard/courses/${course_id}/learning/${module_number}/1`
        );
      } else if (
        currentChapterIndex !== undefined &&
        currentChapterIndex === currentModule?.chapters?.length - 1
      ) {
        const nextModule =
          courseState?.course?.modules?.[currentModuleIndex + 1];
        if (nextModule) {
          router.push(
            `/dashboard/courses/${course_id}/learning/${nextModule.moduleNumber}/1`
          );
          if (
            actualUserPosition <
            Number(nextModule?.moduleNumber.toString() + "1".toString())
          ) {
            dispatch(
              findByUserAndCourseId({
                userId: userState?.loggedInUser?.id,
                courseId: course_id,
              })
            )
              .unwrap()
              .then((res: any) => {
                if (res.statusCode === 200) {
                  dispatch(
                    updateCurrentModule({
                      id: res?.data?.id,
                      data: { currentModule: nextModule?.moduleNumber },
                    })
                  )
                    .unwrap()
                    .then((res: any) => {
                      if (res.statusCode === 200) {
                        enqueueSnackbar("Chapter updated successfully", {
                          variant: "success",
                        });
                      }

                      dispatch(
                        deleteByUserAndModuleId({
                          userId: userId,
                          moduleId: currentModule?.id,
                        })
                      )
                        .unwrap()
                        .then((res: any) => {
                          if (res.statusCode === 200) {
                            enqueueSnackbar(res.message, {
                              variant: "success",
                            });
                            dispatch(
                              createUserModule({
                                userId: userState?.user?.id,
                                moduleId: nextModule?.id,
                              })
                            )
                              .unwrap()
                              .then((res: any) => {
                                if (res.statusCode === 201) {
                                  enqueueSnackbar(res.message, {
                                    variant: "success",
                                  });
                                  dispatch(fetchUserById(userId))
                                    .unwrap()
                                    .catch((err: any) => {
                                      enqueueSnackbar(err.message, {
                                        variant: "error",
                                        preventDuplicate: true,
                                      });
                                    });
                                }
                              })
                              .catch((err) => {
                                enqueueSnackbar(err.message, {
                                  variant: "error",
                                });
                              });
                          }
                        })
                        .catch((err: any) => {
                          enqueueSnackbar(err.message, { variant: "error" });
                        });

                      dispatch(fetchOneCourse(course_id))
                        .unwrap()
                        .catch((err) => {
                          enqueueSnackbar(err.message, { variant: "error" });
                        });
                    })
                    .catch((err: any) => {
                      enqueueSnackbar(err.message, { variant: "error" });
                    });
                }
              })
              .catch((error: any) => {});
          } else {
            enqueueSnackbar("You have not completed the previous module", {
              variant: "error",
            });
          }
          if (
            actualUserPosition <
            Number(currentModule?.moduleNumber.toString() + "1".toString())
          ) {
            dispatch(
              findByUserAndModuleId({
                userId: userId,
                moduleId: currentModule?.id,
              })
            )
              .unwrap()
              .then((res: any) => {
                if (res.statusCode === 200) {
                  dispatch(
                    updateCurrentChapter({
                      id: res?.data?.id,
                      data: { currentChapter: 1 },
                    })
                  )
                    .unwrap()
                    .then((res: any) => {
                      if (res.statusCode === 200) {
                        enqueueSnackbar(res.message, {
                          variant: "success",
                        });
                        dispatch(fetchUserById(userId))
                          .unwrap()
                          .catch((err: any) => {
                            enqueueSnackbar(err.message, {
                              variant: "error",
                              preventDuplicate: true,
                            });
                          });
                      }
                    })
                    .catch((err: any) => {
                      enqueueSnackbar(err.message, { variant: "error" });
                    });
                }
              })
              .catch((error: any) => {});
          } else {
            enqueueSnackbar("You have not completed the previous chapter", {
              variant: "error",
            });
          }
        }
      } else {
        const nextChapter = currentModule?.chapters?.[currentChapterIndex + 1];
        if (nextChapter) {
          router.push(
            `/dashboard/courses/${course_id}/learning/${module_number}/${nextChapter.chapterNumber}`
          );
          if (
            actualUserPosition <
            Number(
              currentModule?.moduleNumber?.toString() +
                nextChapter.chapterNumber.toString()
            )
          ) {
            dispatch(
              findByUserAndModuleId({
                userId: userId,
                moduleId: currentModule?.id,
              })
            )
              .unwrap()
              .then((res: any) => {
                if (res.statusCode === 200) {
                  dispatch(
                    updateCurrentChapter({
                      id: res?.data?.id,
                      data: { currentChapter: nextChapter.chapterNumber },
                    })
                  )
                    .unwrap()
                    .then((res: any) => {
                      if (res.statusCode === 200) {
                        enqueueSnackbar(res.message, {
                          variant: "success",
                        });
                        dispatch(fetchUserById(userId))
                          .unwrap()
                          .catch((err: any) => {
                            enqueueSnackbar(err.message, {
                              variant: "error",
                              preventDuplicate: true,
                            });
                          });
                      }
                    })
                    .catch((err: any) => {
                      enqueueSnackbar(err.message, {
                        variant: "error",
                        preventDuplicate: true,
                      });
                    });
                } else {
                  enqueueSnackbar(res.message, {
                    variant: "error",
                    preventDuplicate: true,
                  });
                }
              })
              .catch((error: any) => {});
          } else {
            enqueueSnackbar("You have not completed the previous chapter", {
              variant: "error",
            });
          }
        }
      }
    }
  };

  return (
    <div className="pb-12">
      <div className="w-full bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-3 px-8 rounded-lg mb-6">
        <h1 className="text-accent font-semibold text-2xl mt-3">
          {currentChapter?.title}
        </h1>
        <p className="text-accent">{currentChapter?.description}</p>
      </div>
      <div className="w-full bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-3 px-8 rounded-lg">
        <h1 className="text-accent font-semibold text-xl">Course content</h1>
        <div
          ref={divRef}
          dangerouslySetInnerHTML={{
            __html: currentChapter?.content || "",
          }}
        />
      </div>
      <div className="w-full bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-3 px-8 rounded-lg mb-6 flex items-center justify-between mt-4">
        <IconButton
          disabled={
            currentChapter?.chapterNumber === 1 &&
            currentModule?.moduleNumber === 1
          }
          className="bg-slate-100"
          onClick={() => {
            toPrevious();
          }}
        >
          <FaArrowRightLong className="rotate-180" />
        </IconButton>
        <IconButton
          disabled={
            courseState?.course?.modules?.length === Number(module_number) &&
            currentModule?.chapters?.length === Number(chapter_number)
          }
          className="bg-slate-100"
          onClick={() => {
            toNext();
          }}
        >
          <FaArrowRightLong />
        </IconButton>
      </div>
    </div>
  );
};

export default ModuleLearning;
