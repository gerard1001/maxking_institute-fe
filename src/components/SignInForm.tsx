"use client";

import React, { useContext } from "react";
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
import { fetchUserByToken, loginUser, useDispatch } from "@/lib/redux";
import { ILoginUser } from "@/lib/interfaces/user.interface";
import { useSnackbar } from "notistack";
import { LoginContext } from "@/lib/context/LoginContext";
import LoadinProgress from "./LoadingProgess";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

interface SignInInputs {
  email: string;
  password: string;
}

interface SignInProps {
  closeModal: () => void;
}

const SignInForm = ({ closeModal }: SignInProps) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<SignInInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const [loginLoading, setLoginLoading] = React.useState<boolean>(false);
  const { setLoginData, setLoginUserFetchLoading } = useContext(LoginContext);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleLogin = (data: ILoginUser) => {
    setLoginLoading(true);
    dispatch(loginUser(data))
      .then((res) => {
        if (res.payload.statusCode === 200) {
          localStorage.setItem(
            "loginData",
            JSON.stringify({ login_token: res.payload.data.token })
          );
          dispatch(fetchUserByToken(res.payload.data.token)).then((nextRes) => {
            setLoginUserFetchLoading(true);
            if (nextRes.payload.statusCode === 200) {
              enqueueSnackbar(res.payload.message, {
                variant: "success",
                preventDuplicate: true,
              });
              setLoginData(nextRes.payload.data);
            } else {
              enqueueSnackbar(nextRes.payload.message, { variant: "error" });
              localStorage.removeItem("loginData");
            }
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
        setLoginLoading(false);
        setLoginUserFetchLoading(false);
      });
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(handleLogin)}
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
        disabled={loginLoading}
      >
        {loginLoading ? <LoadinProgress /> : "Sign In"}
      </Button>
    </Box>
  );
};

export default SignInForm;
