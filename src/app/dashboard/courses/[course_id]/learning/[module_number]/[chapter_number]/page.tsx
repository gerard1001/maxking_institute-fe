"use client";

import { LoginContext } from "@/lib/context/LoginContext";
import { IChapter } from "@/lib/interfaces/chapter.interface";
import { ICourse } from "@/lib/interfaces/course.interface";
import { IModule } from "@/lib/interfaces/module.interface";
import {
  createUserModule,
  deleteByUserAndModuleId,
  fetchOneCourse,
  fetchUserById,
  fetchUserByToken,
  findByUserAndCourseId,
  findByUserAndModuleId,
  selectCourses,
  selectUsers,
  updateCurrentChapter,
  updateUserCourse,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  LinearProgress,
  LinearProgressProps,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdCelebration } from "react-icons/md";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

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
  const userState = useSelector(selectUsers);
  const [currentModule, setCurrentModule] = React.useState<IModule>();
  const [currentChapter, setCurrentChapter] = React.useState<IChapter>();
  const [userActualModule, setUserActualModule] = React.useState<number>(1);
  const [userActualChapter, setUserActualChapter] = React.useState<number>(1);
  const [progress, setProgress] = React.useState<number>(0);
  const [openModuleDialog, setOpenModuleDialog] =
    React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [attemptedTest, setAttemptedTest] = React.useState<boolean>(false);
  const [result, setResult] = React.useState<{
    totalCount: number;
    itemsBeforeIndex: number;
  }>({ totalCount: 1, itemsBeforeIndex: 0 });

  const actualUserPosition = Number(
    userActualModule.toString() + userActualChapter.toString()
  );
  const { userId, loginData } = React.useContext(LoginContext);

  console.log(result, "result");

  const calculateValues = (
    moduleIndex: number,
    chapterIndex: number,
    modules: IModule[]
  ) => {
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
  };

  React.useEffect(() => {
    const modules =
      userState?.user?.courses?.find((course) => course.id === course_id)
        ?.modules ??
      userState?.loggedInUser?.courses?.find(
        (course) => course.id === course_id
      )?.modules ??
      [];
    setResult(
      calculateValues(userActualModule - 1, userActualChapter - 1, modules)
    );
  }, [userActualModule, userActualChapter, userState]);

  const handleOpenModuleDialog = () => {
    setOpenModuleDialog(true);
  };
  const handleCloseModuleDialog = () => {
    setOpenModuleDialog(false);
  };

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
                console.log(
                  nextRes?.data?.courses?.find(
                    (course: ICourse) => course.id === course_id
                  ),
                  course_id,
                  "::::::"
                );
                if (
                  nextRes?.data?.courses?.find(
                    (course: ICourse) => course.id === course_id
                  )?.user_course?.rank
                ) {
                  setAttemptedTest(true);
                }
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

    dispatch(fetchOneCourse(course_id))
      .unwrap()
      .catch((err) => {
        if (err.statusCode === 404) {
          router.push(`/dashboard/courses`);
        }
        enqueueSnackbar(err.message, { variant: "error" });
      });

    // if (
    //   userState?.user?.courses?.find((course) => course.id === course_id)
    //     ?.user_course?.rank !== null
    // ) {
    //   setAttemptedTest(true);
    // }
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
    if (
      userState?.user?.courses?.find((course) => course.id === course_id)
        ?.user_course?.completed
    ) {
      setProgress(100);
    } else {
      setProgress(() => {
        return (result.itemsBeforeIndex / result.totalCount) * 100;
      });
    }
  }, [result]);

  React.useEffect(() => {
    if (userState?.user?.courses) {
      setUserActualModule(
        userState?.user?.courses?.find((course) => course.id === course_id)
          ?.user_course?.currentModule ??
          userState?.loggedInUser?.courses?.find(
            (course) => course.id === course_id
          )?.user_course?.currentModule ??
          1
      );
      setUserActualChapter(
        userState?.user?.modules?.find(
          (module) => module.courseId === course_id
        )?.user_module?.currentChapter ??
          userState?.loggedInUser?.modules?.find(
            (module) => module.courseId === course_id
          )?.user_module?.currentChapter ??
          1
      );
    }
    if (
      userState?.user?.courses?.find((course) => course.id === course_id)
        ?.user_course?.completed
    ) {
      setProgress(100);
    }
    if (
      userState?.user?.courses?.find((course) => course.id === course_id)
        ?.user_course?.rank
    ) {
      setAttemptedTest(true);
    }

    // dispatch(fetchUserById(userId))
    //   .unwrap()
    //   .catch((err: any) => {
    //     enqueueSnackbar(err.message, {
    //       variant: "error",
    //       preventDuplicate: true,
    //     });
    //   });
  }, [userState]);

  React.useEffect(() => {
    if (userState?.loggedInUser?.id) {
      dispatch(fetchUserById(userState?.loggedInUser?.id))
        .unwrap()
        .catch((err: any) => {
          enqueueSnackbar(err.message, {
            variant: "error",
            preventDuplicate: true,
          });
        });
    }
  }, [userState?.loggedInUser]);

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
                    updateUserCourse({
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
                                userId: userId,
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
            enqueueSnackbar("You made it to this module", {
              variant: "info",
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
                          variant: "warning",
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
            enqueueSnackbar("You have made it to this chapter", {
              variant: "info",
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

  const handleCompleteUserCourse = () => {
    setLoading(true);
    dispatch(
      findByUserAndCourseId({
        userId: userId,
        courseId: course_id,
      })
    )
      .unwrap()
      .then((res: any) => {
        if (res.statusCode === 200) {
          dispatch(
            updateUserCourse({
              id: res?.data?.id,
              data: { completed: true },
            })
          )
            .unwrap()
            .then((res: any) => {
              if (res.statusCode === 200) {
                enqueueSnackbar(res.message, {
                  variant: "success",
                });
                setProgress(100);
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
              });
            });
        }
      })
      .catch((error: any) => {
        enqueueSnackbar(error.message, {
          variant: "error",
        });
      })
      .finally(() => {
        setLoading(false);
        setOpenModuleDialog(true);
        // router.push(`/dashboard/courses`);
      });
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
        <Box sx={{ width: "100%", px: "10px" }}>
          <LinearProgressWithLabel value={progress} />
        </Box>
        {userState?.user?.courses?.find((course) => course.id === course_id)
          ?.user_course?.rank &&
        courseState?.course?.modules?.length === Number(module_number) &&
        currentModule?.chapters?.length === Number(chapter_number) ? (
          <Button
            className="bg-secondary text-white w-[180px]"
            onClick={() => {
              router.push(`/dashboard/courses/${course_id}`);
            }}
          >
            Go Back
          </Button>
        ) : (
          <div className="">
            {courseState?.course?.modules?.length === Number(module_number) &&
            currentModule?.chapters?.length === Number(chapter_number) ? (
              <>
                {!attemptedTest && (
                  <>
                    {" "}
                    {userState?.user?.courses?.find(
                      (course) => course?.id === course_id
                    )?.user_course?.completed ? (
                      <Button
                        className="bg-secondary text-white w-[180px]"
                        onClick={() => {
                          handleOpenModuleDialog();
                        }}
                      >
                        Attempt test
                      </Button>
                    ) : (
                      <Button
                        className="bg-secondary text-white w-[180px]"
                        onClick={() => {
                          handleOpenModuleDialog();
                          handleCompleteUserCourse();
                        }}
                      >
                        Finish Course
                      </Button>
                    )}
                  </>
                )}
              </>
            ) : (
              <IconButton
                disabled={
                  courseState?.course?.modules?.length ===
                    Number(module_number) &&
                  currentModule?.chapters?.length === Number(chapter_number)
                }
                className="bg-slate-100"
                onClick={() => {
                  toNext();
                }}
              >
                <FaArrowRightLong />
              </IconButton>
            )}
          </div>
        )}
      </div>
      <Dialog
        open={openModuleDialog}
        onClose={handleCloseModuleDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box className="flex flex-col items-center justify-center gap-2 w-[440px] mx-auto p-4">
          <div className="w-fit p-4 rounded-full bg-sky-200">
            <MdCelebration className="text-sky-500 text-3xl font-semibold" />
          </div>
          <h1 className="text-xl font-semibold">Are you sure?</h1>
          <p className="text-center"></p>
          <Button
            fullWidth
            onClick={() => {
              router.push(`/dashboard/courses/${course_id}/assessment/take`);
              handleCloseModuleDialog();
            }}
            className="bg-secondary text-white hover:bg-aky-400 !h-9"
            disabled={loading}
          >
            Take Test
          </Button>
          <Button
            fullWidth
            onClick={handleCloseModuleDialog}
            autoFocus
            variant="contained"
            className="bg-slate-200 text-accent hover:bg-slate-100 !h-9"
          >
            Later
          </Button>
        </Box>
      </Dialog>
    </div>
  );
};

export default ModuleLearning;
