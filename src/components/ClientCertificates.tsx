"use client";

import { LoginContext } from "@/lib/context/LoginContext";
import { objectIsEmpty } from "@/lib/functions/object_check.function";
import {
  fetchAllCourses,
  fetchUserById,
  selectCourses,
  selectUsers,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React from "react";

const ClientCertificates = React.memo(() => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const courseState = useSelector(selectCourses);
  const userState = useSelector(selectUsers);
  const router = useRouter();

  const { isClient, userId, loginData } = React.useContext(LoginContext);

  const loggedInUser = objectIsEmpty(userState.user)
    ? userState.loggedInUser
    : userState.user;

  const certificateCourseIds = loggedInUser?.certificates?.map(
    (certificate) => certificate.courseId
  );

  const certificateCourses = courseState.allCourses.filter((course) =>
    certificateCourseIds?.includes(course.id)
  );

  React.useEffect(() => {
    dispatch(fetchAllCourses())
      .unwrap()
      .then((res) => {})
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

    if (userId) {
      dispatch(fetchUserById(userId))
        .unwrap()
        .catch((err: any) => {
          enqueueSnackbar(err.message, {
            variant: "error",
            preventDuplicate: true,
          });
        });
    }
  }, []);

  return (
    <div>
      {certificateCourses?.length > 0 ? (
        <div>
          <h1 className="uppercase text-secondary text-xl font-semibold mb-5 lg:text-left text-center">
            Find your earned certificates
          </h1>
          <div className="flex flex-wrap md:justify-normal justify-center gap-4">
            {certificateCourses.map((course) => {
              return (
                <div
                  key={course.id}
                  className="xs:w-[350px] w-full aspect-video rounded-lg inset-0 relative"
                >
                  <img
                    src={course.coverImage}
                    alt=""
                    className="w-full h-full rounded-lg"
                  />
                  <div className="flex flex-col justify-center w-[80%] max-w-[550px] aspect-[16/7] absolute xxs:top-[50%] top-[60%] left-[50%] -translate-x-2/4 -translate-y-2/4 text-white p-2 z-10 bg-black/65">
                    <div className="flex flex-col items-center justify-center">
                      <h1 className="sm:text-lg text-base text-center max-w-[500px] pb-3 border-b line-clamp-2">
                        {course.title}
                      </h1>
                      <Button
                        variant="contained"
                        className="bg-secondary/30 hover:bg-secondary/50 w-fit mt-4 !h-[40px]"
                        onClick={() => {
                          router.push(
                            `/dashboard/certificates/student/${course.id}`
                          );
                        }}
                      >
                        See certificate
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          <h1 className="uppercase text-secondary text-xl font-semibold mb-5">
            No earned certificates yet
          </h1>
          <Button
            variant="contained"
            className="bg-primary hover:bg-primary/90 w-fit my-4 !h-[46px]"
            onClick={() => {
              router.push("/dashboard/courses");
            }}
          >
            generate certificate
          </Button>
        </div>
      )}{" "}
    </div>
  );
});

export default ClientCertificates;
