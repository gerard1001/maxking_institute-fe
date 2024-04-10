"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch, verifyUser } from "@/lib/redux";
import { useSnackbar } from "notistack";
import { Button } from "@mui/material";
import { LoadinProgress } from "@/components/NavBar";

const VerifyPage = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const searchParams = useSearchParams();

  const [verifyLoading, setVerifyLoading] = React.useState<boolean>(false);
  const [alreadyVerified, setAlreadyVerified] = React.useState<boolean>(false);

  const token = searchParams.get("token");

  React.useEffect(() => {
    if (token) {
      dispatch(verifyUser(token))
        .then((res) => {
          if (res.payload.statusCode === 200) {
            enqueueSnackbar(res.payload.message, {
              variant: "success",
              preventDuplicate: true,
            });
            window.location.href = "/";
          } else if (res.payload.statusCode === 409) {
            setAlreadyVerified(true);
          } else {
            enqueueSnackbar(res.payload.message, {
              variant: "error",
              preventDuplicate: true,
            });
          }
          setVerifyLoading(true);
        })
        .finally(() => {
          setVerifyLoading(false);
        });
    }
  }, [dispatch]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-4 text-accent font-semibold capitalize mx-auto">
        Email verification page
      </h1>
      <div className="xxs:w-[300px] w-[96%] h-64 bg-yellow-100 p-4 rounded">
        {verifyLoading ? (
          <>
            <LoadinProgress />
          </>
        ) : (
          <>
            {!token ? (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <p className="text-center">
                  Your verification token couldn't be found please return to
                  your email inbox and try again.
                </p>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center">
                {alreadyVerified && (
                  <div>
                    <h1>You email is already verified</h1>
                    <Button
                      type="submit"
                      variant="contained"
                      className="bg-primary hover:bg-primary/90 w-full mt-4 !h-[46px]"
                      size="large"
                      onClick={() => {
                        window.location.href = "/";
                      }}
                    >
                      go to main page
                    </Button>
                  </div>
                )}{" "}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyPage;
