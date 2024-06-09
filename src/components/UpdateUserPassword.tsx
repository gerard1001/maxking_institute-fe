"use client";

import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { MdOutlineClose } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  changePassword,
  requestPasswordToken,
  resetPassword,
  useDispatch,
} from "@/lib/redux";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useSearchParams } from "next/navigation";
import { IoEye, IoEyeOff } from "react-icons/io5";
import LoadinProgress from "@/components/LoadingProgess";

const schema = yup.object().shape({
  oldPassword: yup.string().required("Password is required"),
  password: yup.string().required("Password is required"),
});

interface ResetPasswordInputs {
  oldPassword: string;
  password: string;
}
const UpdateUserPassword = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [showOldPassword, setShowOldPassword] = React.useState<boolean>(false);
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
      oldPassword: "",
      password: "",
    },
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowOldmPassword = () => setShowOldPassword((show) => !show);

  const onSubmit = (data: ResetPasswordInputs) => {
    setLoading(true);
    dispatch(changePassword(data))
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
        reset();
      });
  };
  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="py-6"
    >
      <h1 className="text-center md:text-2xl text-lg font-semibold text-secondary-foreground">
        Reset Password Form
      </h1>
      <Controller
        name="oldPassword"
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
            label="Old Password"
            variant="outlined"
            fullWidth
            size="small"
            className="text-xs"
            error={!!errors.oldPassword}
            helperText={errors.oldPassword ? errors.oldPassword.message : ""}
            type={showOldPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowOldmPassword}
                    edge="end"
                  >
                    {showOldPassword ? <IoEyeOff /> : <IoEye />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
  );
};

export default UpdateUserPassword;
