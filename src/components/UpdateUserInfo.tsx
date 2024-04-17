"use client";

import React, { useEffect } from "react";
import { fetchUserById, updateUser, useDispatch } from "@/lib/redux";
import { useSnackbar } from "notistack";
import { TextField, Box, Button } from "@mui/material";
import { Controller, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LoadinProgress from "@/components/LoadingProgess";
import { User } from "@/lib/interfaces/user.interface";

const editInfoSchema = yup.object().shape({
  firstName: yup.string().required().min(4).max(40).label("First name"),
  lastName: yup.string().required().min(4).max(40).label("Last name"),
  email: yup.string().email().required().label("Email"),
});

interface EditInfoInputs {
  firstName: string;
  lastName: string;
  email: string;
}

export interface IUpdateProfileProps {
  userState: User;
  isAccountUser: boolean;
  userId: string;
}

const UpdateUserInfo = ({
  userState,
  isAccountUser,
  userId,
}: IUpdateProfileProps) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  //   const userState = useSelector(selectUsers)?.loggedInUser;
  const [canEdit, setCanEdit] = React.useState<boolean>(false);
  const [canEditProfile, setCanEditProfile] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [picture, setPicture] = React.useState<Blob | any>("");
  const [picUrl, setPicUrl] = React.useState<any>(null);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<EditInfoInputs>({
    resolver: yupResolver(editInfoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  const watchUserChange = useWatch({
    control,
  });

  const resetToDefaults = () => {
    userState?.firstName && setValue("firstName", userState?.firstName);
    userState?.lastName && setValue("lastName", userState?.lastName);
    userState?.email && setValue("email", userState?.email);
  };

  useEffect(() => {
    dispatch(fetchUserById(userId))
      .unwrap()
      .then((res) => {
        if (res.statusCode === 200) {
          // enqueueSnackbar(res.message, {
          //   variant: "success",
          //   preventDuplicate: true,
          // });
        } else {
          enqueueSnackbar(res.message, { variant: "error" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  useEffect(() => {
    if (
      watchUserChange.firstName !== userState.firstName ||
      watchUserChange.lastName !== userState.lastName ||
      watchUserChange.email !== userState.email
    ) {
      setCanEdit(true);
    } else {
      setCanEdit(false);
    }
  }, [watchUserChange]);

  useEffect(() => {
    const { firstName, lastName, email, profile } = userState;
    firstName && setValue("firstName", firstName);
    lastName && setValue("lastName", lastName);
    email && setValue("email", email);
  }, [userState]);

  const handleUpdateUser = (data: any) => {
    setLoading(true);
    dispatch(updateUser({ id: userId, data }))
      .unwrap()
      .then((res) => {
        console.log(res, "4444");
        if (res.statusCode === 200) {
          enqueueSnackbar(res.message, {
            variant: "success",
            preventDuplicate: true,
          });
          // resetToDefaults();
          setCanEdit(false);
        } else {
          enqueueSnackbar(res.message, { variant: "error" });
        }
      })
      .catch((error: any) => {
        console.log(error, "4444");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(handleUpdateUser)}
      className=""
    >
      <Box className="flex gap-4">
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
      </Box>
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
            inputProps={{
              style: { height: 18 },
              // readOnly: !isAccoutOwner,
              readOnly: true,
            }}
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

      <Box className={`gap-4 ${canEdit ? "flex" : "hidden"}`}>
        {" "}
        <Button
          type="submit"
          variant="contained"
          className="bg-primary hover:bg-primary/90 w-full mt-4 !h-[46px]"
          size="large"
          disabled={!canEdit || loading}
        >
          {loading ? <LoadinProgress /> : "Save"}
        </Button>
        <Button
          variant="contained"
          className={`bg-secondary hover:bg-secondary/90 w-full mt-4 !h-[46px] transition-all`}
          size="large"
          disabled={!canEdit || loading}
          onClick={resetToDefaults}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateUserInfo;
