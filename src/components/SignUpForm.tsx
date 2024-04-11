"use client";

import React from "react";
import {
  IconButton,
  TextField,
  Box,
  InputAdornment,
  Button,
  CircularProgress,
} from "@mui/material";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { registerUser, useDispatch } from "@/lib/redux";
import { ICreateUser } from "@/lib/interfaces/user.interface";
import { useSnackbar } from "notistack";
import LoadinProgress from "./LoadingProgess";

const signUpSchema = yup.object().shape({
  firstName: yup.string().required().min(4).max(40).label("First name"),
  lastName: yup.string().required().min(4).max(40).label("Last name"),
  email: yup.string().email().required().label("Email"),
  password: yup.string().required().min(4).max(16).label("Password"),
});

interface SignUpInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface SignUpProps {
  closeModal: () => void;
}

const SignUpForm = ({ closeModal }: SignUpProps) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<SignUpInputs>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [registerLoading, setRegisterLoading] = React.useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSignUp = (data: ICreateUser) => {
    setRegisterLoading(true);
    dispatch(registerUser(data))
      .then((res) => {
        if (res.payload.statusCode === 201) {
          enqueueSnackbar(res.payload.message, {
            variant: "success",
            preventDuplicate: true,
          });
          setTimeout(() => {
            reset();
          }, 500);
          setTimeout(() => {
            closeModal();
          }, 1000);
        } else {
          enqueueSnackbar(res.payload.message, { variant: "error" });
        }
      })
      .finally(() => {
        setRegisterLoading(false);
      });
  };
  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(handleSignUp)}
      className=""
    >
      <Controller
        name="firstName"
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
            label="First Name"
            variant="outlined"
            fullWidth
            size="small"
            className="text-xs"
            error={!!errors.firstName}
            helperText={errors.firstName ? errors.firstName.message : ""}
          />
        )}
      />
      <Controller
        name="lastName"
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
            label="Last Name"
            variant="outlined"
            fullWidth
            size="small"
            className="text-xs"
            error={!!errors.lastName}
            helperText={errors.lastName ? errors.lastName.message : ""}
          />
        )}
      />

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
      <Controller
        name="password"
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
            label="Password"
            variant="outlined"
            fullWidth
            size="small"
            className="text-xs"
            error={!!errors.email}
            helperText={errors.password ? errors.password.message : ""}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <IoEyeOff /> : <IoEye />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />

      <Button
        type="submit"
        variant="contained"
        className="bg-primary hover:bg-primary/90 w-full mt-4 !h-[46px]"
        size="large"
        disabled={registerLoading}
      >
        {registerLoading ? <LoadinProgress /> : "Sign Up"}
      </Button>
    </Box>
  );
};

export default SignUpForm;
