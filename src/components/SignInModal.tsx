"use client";

import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { MdOutlineClose } from "react-icons/md";
import SignInForm from "./SignInForm";
import { FcGoogle } from "react-icons/fc";
import SignUpForm from "./SignUpForm";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { requestPasswordToken, useDispatch } from "@/lib/redux";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import LoadinProgress from "./LoadingProgess";

type ModalType = {
  handleCloseModal: () => void;
  openModal: boolean;
};

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

interface RequestTokenInputs {
  email: string;
}

const SignInModal = ({ handleCloseModal, openModal }: ModalType) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<RequestTokenInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const [openForgotModal, setOpenForgotModal] = React.useState<boolean>(false);
  const [signStep, setSignStep] = React.useState<string>("in");
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleOpenForgotModal = () => setOpenForgotModal(true);
  const handleCloseForgotModal = () => setOpenForgotModal(false);

  const handleGoogleLogin = ({}) => {
    window.open(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`, "_self");
  };

  React.useEffect(() => {
    if (openForgotModal) {
      handleCloseModal();
    }
  }, [openForgotModal]);

  const onSubmit = (data: RequestTokenInputs) => {
    setLoading(true);
    dispatch(requestPasswordToken(data))
      .unwrap()
      .then((res) => {
        if (res.statusCode === 200) {
          enqueueSnackbar(res.message, { variant: "success" });
        }
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
        handleCloseForgotModal();
      });
  };
  return (
    <>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          borderRadius: "30px",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxHeight: "98vh",
            width: {
              sm: 500,
              xs: "95%",
            },
            maxWidth: 500,
            overflowY: "auto",
            bgcolor: "background.paper",
            border: "none",
            borderRadius: "10px",
            boxShadow: 24,
            p: {
              md: 4,
              sm: 2,
              xs: 1,
            },
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "20px",
              position: "relative",
              pb: 2,
            }}
          >
            <Box className="flex items-center justify-end absolute top-0 right-0">
              <IconButton onClick={handleCloseModal} size="medium">
                <MdOutlineClose />
              </IconButton>
            </Box>
            <Typography className="text-2xl font-semibold text-accent">
              {signStep === "in" ? "Sign In" : "Sign Up"}
            </Typography>
            {signStep === "in" ? (
              <SignInForm closeModal={handleCloseModal} />
            ) : (
              <SignUpForm closeModal={handleCloseModal} />
            )}
            {signStep === "in" && (
              <Typography
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={handleOpenForgotModal}
              >
                Forgot Password?{" "}
              </Typography>
            )}

            <Typography>
              {signStep === "in"
                ? "Don’t have an account? "
                : "Already have an account? "}
              <span
                className="text-secondary font-semibold cursor-pointer"
                onClick={() => {
                  setSignStep(signStep === "in" ? "up" : "in");
                }}
              >
                Sign {signStep === "in" ? "Up" : "In"}
              </span>
            </Typography>

            <div className="flex items-center justify-center w-full">
              {" "}
              <hr className="w-full border border-accent-foreground" />
              <p className="mx-2 text-accent font-semibold">OR</p>
              <hr className="w-full border border-accent-foreground" />
            </div>
            <Button
              variant="contained"
              className="bg-secondary hover:bg-secondary/90 w-full"
              size="large"
              startIcon={<FcGoogle />}
              onClick={handleGoogleLogin}
            >
              Continue with Google
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={openForgotModal}
        onClose={handleCloseForgotModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          borderRadius: "30px",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxHeight: "98vh",
            width: {
              sm: 500,
              xs: "95%",
            },
            maxWidth: 500,
            overflowY: "auto",
            bgcolor: "background.paper",
            border: "none",
            borderRadius: "10px",
            boxShadow: 24,
            p: {
              md: 4,
              sm: 2,
              xs: 1,
            },
          }}
        >
          <Box className="flex items-center justify-end absolute top-0 right-0">
            <IconButton onClick={handleCloseForgotModal} size="medium">
              <MdOutlineClose />
            </IconButton>
          </Box>
          <Typography className="md:text-2xl text-lg font-semibold text-accent">
            Request Forgot password link
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className=""
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{
                    input: {
                      color: "#021527",
                    },
                    mt: 2,
                    color: "#242E8F",
                    "& label.Mui-focused": {
                      color: "#242E8F",
                    },
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        border: "1.5px solid #242E8F",
                      },
                    },
                    "& .MuiOutlinedInput-input": {
                      py: "14px",
                    },
                    "& .MuiFormLabel-root": {
                      mt: "3px",
                    },
                  }}
                  inputProps={{ style: { height: 18 } }}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  size="small"
                  className="text-xs"
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ""}
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              className="bg-primary hover:bg-primary/90 w-full mt-4 !h-[46px]"
              size="large"
              disabled={loading}
            >
              {loading ? <LoadinProgress /> : "Sign In"}
            </Button>{" "}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default SignInModal;
