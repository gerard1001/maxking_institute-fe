"use client";

import Certificate from "@/components/Certificate";
import { LoginContext } from "@/lib/context/LoginContext";
import { objectIsEmpty } from "@/lib/functions/object_check.function";
import {
  createUserCertificate,
  fetchOneCourse,
  fetchUserById,
  findByUserIdAndCertificateId,
  selectCertificates,
  selectCourses,
  selectUsers,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React from "react";
import { useReactToPrint } from "react-to-print";

export interface PageProps {
  params: {
    course_id: string;
  };
}

const GetCertificate = ({ params: { course_id } }: PageProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const certificateRef: any = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => certificateRef.current,
  });

  const courseState = useSelector(selectCourses);
  const userState = useSelector(selectUsers);
  const certificateState = useSelector(selectCertificates);

  const [loading, setLoading] = React.useState<boolean>(false);

  const { isClient, userId, loginData } = React.useContext(LoginContext);

  const loggedInUser = objectIsEmpty(userState.user)
    ? userState.loggedInUser
    : userState.user;

  React.useEffect(() => {
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
    // if (!isClient) {
    //   router.push("/dashboard/certificates");
    // }
  }, []);

  React.useEffect(() => {
    if (!objectIsEmpty(userState.user) && !objectIsEmpty(courseState.course)) {
      dispatch(
        findByUserIdAndCertificateId({
          userId: userState?.user?.id,
          certificateId: courseState?.course?.certificate?.id,
        })
      )
        .unwrap()
        .catch((err: any) => {
          enqueueSnackbar(err.message, {
            variant: "error",
            preventDuplicate: true,
          });
        });
    }
  }, [userState, courseState]);

  React.useEffect(() => {
    dispatch(fetchOneCourse(course_id))
      .unwrap()
      .then((res: any) => {})
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
  }, [course_id]);

  React.useEffect(() => {
    if (!courseState?.course && !courseState?.course?.certificate) {
      router.push("/dashboard/certificates");
    }
  }, [courseState]);

  React.useEffect(() => {
    if (!isClient) {
      router.push("/dashboard/certificates");
    }
  }, [isClient]);

  const certificate = courseState?.course?.certificate;
  console.log(
    certificate?.issuers && JSON.parse(certificate?.issuers),
    "&&&&&&"
  );

  const getCertificate = () => {
    dispatch(createUserCertificate(courseState?.course?.certificate?.id))
      .unwrap()
      .then((res: any) => {
        console.log(res, "res");
        if (res.statusCode === 200) {
          enqueueSnackbar(res.message, {
            variant: "success",
          });
          dispatch(fetchUserById(res.data.userId))
            .unwrap()
            .catch((err: any) => {
              enqueueSnackbar(err.message, {
                variant: "error",
                preventDuplicate: true,
              });
            });

          dispatch(fetchOneCourse(course_id))
            .unwrap()
            .then((res: any) => {});

          dispatch(
            findByUserIdAndCertificateId({
              userId: userState.user.id,
              certificateId: courseState.course.certificate.id,
            })
          )
            .unwrap()
            .catch((err: any) => {
              if (err.statusCode !== 404) {
                enqueueSnackbar(err.message, {
                  variant: "error",
                  preventDuplicate: true,
                });
              }
            });
        }
      })
      .catch((err: any) => {
        enqueueSnackbar(err.message, {
          variant: "error",
        });
      });
  };

  console.log(certificateState.userCertificate);

  return (
    <div>
      {!certificateState.userCertificate ||
        (objectIsEmpty(certificateState.userCertificate) && (
          <Button
            variant="contained"
            className="bg-secondary hover:bg-primary/90 w-fit my-4 !h-[46px]"
            onClick={getCertificate}
          >
            generate certificate
          </Button>
        ))}{" "}
      {certificateState.userCertificate &&
        !objectIsEmpty(certificateState.userCertificate) && (
          <div className="">
            <div className="w-full max-w-[100vw] overflow-x-auto">
              <Certificate
                ref={certificateRef}
                name={`${loggedInUser?.firstName} ${loggedInUser?.lastName}`}
                course={`${courseState?.course?.title}`}
                issuers={
                  certificate?.issuers ? JSON.parse(certificate?.issuers) : []
                }
                link={`http://localhost:3000/certificate/${certificateState?.userCertificate?.userCertificateId}`}
                date={certificateState?.userCertificate?.createdAt}
              />
            </div>
            <div className="w-full p-6">
              <Button
                variant="contained"
                className="bg-primary hover:bg-primary/90 w-full max-w-32 mt-4 !h-[46px]"
                onClick={handlePrint}
              >
                Print as PDF
              </Button>
            </div>
          </div>
        )}
    </div>
  );
};

export default GetCertificate;
