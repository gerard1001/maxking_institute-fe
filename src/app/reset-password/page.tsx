"use client";

import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { resetPassword, useDispatch } from "@/lib/redux";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useSearchParams } from "next/navigation";
import { IoEye, IoEyeOff } from "react-icons/io5";
import LoadinProgress from "@/components/LoadingProgess";
import Footer from "@/components/Footer";

const schema = yup.object().shape({
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

interface ResetPasswordInputs {
  password: string;
  confirmPassword: string;
}

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const token = searchParams.get("passwordToken");

  const onSubmit = (data: ResetPasswordInputs) => {
    if (token) {
      setLoading(true);
      dispatch(
        resetPassword({
          token,
          data: {
            password: data.password,
          },
        })
      )
        .unwrap()
        .then((res) => {
          if (res.statusCode === 200) {
            enqueueSnackbar(res.message, { variant: "success" });
            router.replace("/");
          }
        })
        .catch((err) => {
          enqueueSnackbar(err.message, { variant: "error" });
        })
        .finally(() => {
          setLoading(false);
          reset();
        });
    }
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="w-[90%] max-w-[640px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] lg:p-10 sm:p-4 p-2"
        >
          <h1 className="text-center md:text-2xl text-lg font-semibold text-secondary-foreground">
            Reset Password Form
          </h1>
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
                error={!!errors.password}
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
          <Controller
            name="confirmPassword"
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
                label="Confirm Password"
                variant="outlined"
                fullWidth
                size="small"
                className="text-xs"
                error={!!errors.confirmPassword}
                helperText={
                  errors.confirmPassword ? errors.confirmPassword.message : ""
                }
                type={showConfirmPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? <IoEyeOff /> : <IoEye />}
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
            disabled={loading}
          >
            {loading ? <LoadinProgress /> : "Reset"}
          </Button>{" "}
        </Box>
      </div>
      <Footer />
    </>
  );
};

export default ResetPasswordPage;
