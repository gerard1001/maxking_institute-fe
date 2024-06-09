"use client";

import Certificate from "@/components/Certificate";
import Footer from "@/components/Footer";
import { SuspenseLoading } from "@/components/SuspenseLoading";
import { objectIsEmpty } from "@/lib/functions/object_check.function";
import {
  fetchOneCertificate,
  fetchUserById,
  findByUserCertificateId,
  selectCertificates,
  selectCourses,
  selectUsers,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { useSnackbar } from "notistack";
import React from "react";

interface PageProps {
  params: {
    user_certificate_id: string;
  };
}

const CertificatePage = ({ params: { user_certificate_id } }: PageProps) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const certificateState = useSelector(selectCertificates);
  const userState = useSelector(selectUsers);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [notFound, setNotFound] = React.useState<boolean>(false);

  React.useEffect(() => {
    setLoading(true);
    dispatch(findByUserCertificateId(user_certificate_id))
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res.statusCode === 200) {
          dispatch(fetchUserById(res.data.userId))
            .unwrap()
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              enqueueSnackbar(err.message, {
                variant: "error",
                preventDuplicate: true,
              });
            });

          dispatch(fetchOneCertificate(res.data.certificateId))
            .unwrap()
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              enqueueSnackbar(err.message, {
                variant: "error",
                preventDuplicate: true,
              });
            });
        }
      })
      .catch((err) => {
        if (err.statusCode === 404) {
          setNotFound(true);
        }
        enqueueSnackbar(err.message, {
          variant: "error",
          preventDuplicate: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <div>
      {notFound ? (
        <div className="w-full h-screen flex flex-col items-center justify-center">
          <h1 className="md:text-3xl text-xl font-semibold mb-4 text-center text-secondary-foreground">
            Sorry, we couldn't find the certificate you're looking for
          </h1>
        </div>
      ) : (
        <div>
          {loading ||
          !userState?.user ||
          objectIsEmpty(userState?.user) ||
          !certificateState?.certificate ||
          objectIsEmpty(certificateState?.certificate) ? (
            <div className="w-full h-screen flex flex-col items-center justify-center">
              <SuspenseLoading />
            </div>
          ) : (
            <>
              <h1 className="md:text-3xl text-xl font-semibold mb-4 text-center text-secondary-foreground xl:mt-10 mt-20">
                This certificate was awarded to {userState?.user?.firstName}{" "}
                {userState?.user?.lastName} via this platform
              </h1>
              <div className="w-full max-w-[100vw] px-2 overflow-x-auto mb-10">
                <Certificate
                  // ref={certificateRef}
                  name={`${userState?.user?.firstName} ${userState?.user?.lastName}`}
                  course={`${certificateState?.certificate?.course?.title}`}
                  issuers={
                    certificateState?.certificate?.issuers
                      ? JSON.parse(certificateState?.certificate?.issuers)
                      : []
                  }
                  link={`http://localhost:3000/certificate/${certificateState?.userCertificate?.userCertificateId}`}
                  date={certificateState?.userCertificate?.createdAt}
                />
              </div>
            </>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CertificatePage;
