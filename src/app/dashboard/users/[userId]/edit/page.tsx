"use client";

import React, { useEffect } from "react";
import {
  fetchUserById,
  selectUsers,
  updateProfile,
  updateUser,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { useSnackbar } from "notistack";
import {
  IconButton,
  TextField,
  Box,
  InputAdornment,
  Button,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { Controller, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LoadinProgress from "@/components/LoadingProgess";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { subYears } from "date-fns";
import { FiUser } from "react-icons/fi";
import dayjs, { Dayjs } from "dayjs";
import ReactPhoneInput from "react-phone-input-material-ui";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import countries from "@/lib/data/countries.json";

const signUpSchema = yup.object().shape({
  firstName: yup.string().required().min(4).max(40).label("First name"),
  lastName: yup.string().required().min(4).max(40).label("Last name"),
  email: yup.string().email().required().label("Email"),
});

// yup.addMethod(yup.object, "dayjs", function method(message) {
//   return this.test("dayjs", message, function validate(value) {
//     if (!value) {
//       return true;
//     }
//     return dayjs.isDayjs(value);
//   });
// });

const dayjsDate = yup
  .mixed()
  .test("is-date", "${path} must be a valid date", (value: any) => {
    return dayjs(value).isValid();
  })
  .transform((value, originalValue) => {
    return dayjs(originalValue);
  });

const updateProfileSchema = yup.object().shape({
  phoneNumber: yup.string().required().min(4).max(16).label("Phone Number"),
  gender: yup
    .string()
    .required()
    .oneOf(["MALE", "FEMALE", "OTHER"], "Gender must be male or female"),
  country: yup.string().required().max(40).label("Country"),
  city: yup.string().required().label("City"),
  address1: yup.string().required().label("Adddress 1"),
  address2: yup.string().nullable().label("Adddress 2"),
  birthDate: dayjsDate.required().label("Birth date"),
});

interface SignUpInputs {
  firstName: string;
  lastName: string;
  email: string;
}

interface UpdateProfileInputs {
  phoneNumber: string;
  gender: string;
  country: string;
  city: string;
  address1: string;
  address2?: string | null;
  birthDate: Dayjs | null | any;
}

interface SingleUserProps {
  params: {
    userId: string;
  };
}

const EditUser = ({ params: { userId } }: SingleUserProps) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const userState = useSelector(selectUsers)?.user;
  const [isAccoutOwner, setIsAccountOwner] = React.useState<boolean>(false);
  const [canEdit, setCanEdit] = React.useState<boolean>(false);
  const [canEditProfile, setCanEditProfile] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [picture, setPicture] = React.useState<Blob | any>("");
  const [picUrl, setPicUrl] = React.useState<any>(null);

  // console.log(userState, "OPOP");
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<SignUpInputs>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  const {
    handleSubmit: handleSubmitProfile,
    control: profileControl,
    setValue: setProfileValue,
    formState: { errors: profileErrors },
  } = useForm<UpdateProfileInputs>({
    resolver: yupResolver(updateProfileSchema),
    defaultValues: {
      gender: "",
      phoneNumber: "",
      country: "",
      city: "",
      address1: "",
      address2: "",
      birthDate: null,
    },
  });

  const watchUserChange = useWatch({
    control,
  });

  const watchProfileChange = useWatch({
    control: profileControl,
  });

  useEffect(() => {
    if (userState.id === userId) {
      setIsAccountOwner(true);
    } else {
      setIsAccountOwner(false);
    }
    dispatch(fetchUserById(userId))
      .unwrap()
      .then((res) => {
        if (res.statusCode === 200) {
          enqueueSnackbar(res.message, {
            variant: "success",
            preventDuplicate: true,
          });
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
    if (
      watchProfileChange.phoneNumber !== userState.profile?.phoneNumber ||
      !dayjs(watchProfileChange.birthDate).isSame(
        dayjs(userState.profile?.birthDate)
      ) ||
      watchProfileChange.gender !== userState.profile?.gender ||
      watchProfileChange.country !== userState.profile?.country ||
      watchProfileChange.city !== userState.profile?.city ||
      watchProfileChange.address1 !== userState.profile?.address1 ||
      watchProfileChange.address2 !== userState.profile?.address2 ||
      picUrl !== null
    ) {
      setCanEditProfile(true);
    } else {
      setCanEditProfile(false);
    }
  }, [watchProfileChange, picUrl]);

  useEffect(() => {
    const { firstName, lastName, email, profile } = userState;
    firstName && setValue("firstName", firstName);
    lastName && setValue("lastName", lastName);
    email && setValue("email", email);

    profile?.birthDate &&
      setProfileValue("birthDate", dayjs(profile?.birthDate));
    profile?.gender && setProfileValue("gender", profile?.gender);
    profile?.phoneNumber &&
      setProfileValue("phoneNumber", profile?.phoneNumber);
    profile?.country && setProfileValue("country", profile?.country);
    profile?.city && setProfileValue("city", profile?.city);
    profile?.address1 && setProfileValue("address1", profile?.address1);
    profile?.address2 && setProfileValue("address2", profile?.address2);
  }, [userState]);

  useEffect(() => {
    if (picture) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setPicUrl(e.target.result);
      };
      reader.readAsDataURL(picture);
    }
  }, [picture]);

  const resetToDefaults = () => {
    userState?.firstName && setValue("firstName", userState?.firstName);
    userState?.lastName && setValue("lastName", userState?.lastName);
    userState?.email && setValue("email", userState?.email);
  };

  const resetToProfileDefaults = () => {
    userState?.profile?.birthDate &&
      setProfileValue("birthDate", dayjs(userState?.profile?.birthDate));
    userState?.profile?.gender &&
      setProfileValue("gender", userState?.profile?.gender);
    userState?.profile?.phoneNumber &&
      setProfileValue("phoneNumber", userState?.profile?.phoneNumber);
    userState?.profile?.country &&
      setProfileValue("country", userState?.profile?.country);
    userState?.profile?.city &&
      setProfileValue("city", userState?.profile?.city);
    userState?.profile?.address1 &&
      setProfileValue("address1", userState?.profile?.address1);
    userState?.profile?.address2 &&
      setProfileValue("address2", userState?.profile?.address2);
    picUrl && setPicUrl(userState?.profile?.picture);
  };

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

  const handleUpdateProfile = (data: any) => {
    setLoading(true);
    console.log(data);
    const formData = new FormData();
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("birthDate", data.birthDate.format("YYYY-MM-DD"));
    formData.append("gender", data.gender);
    formData.append("country", data.country);
    formData.append("city", data.city);
    formData.append("address1", data.address1);
    formData.append("address2", data.address2);
    if (picUrl) {
      formData.append("picture", picture);
    }

    dispatch(updateProfile({ id: userState?.profile?.id, data: formData }))
      .unwrap()
      .then((res) => {
        console.log(res, "4444");
        if (res.statusCode === 200) {
          enqueueSnackbar(res.message, {
            variant: "success",
            preventDuplicate: true,
          });
          setCanEditProfile(false);
        } else {
          enqueueSnackbar(res.message, { variant: "error" });
        }
      })
      .catch((error: any) => {
        enqueueSnackbar(error.message, { variant: "error" });
        console.log(error, "4444");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="flex flex-col gap-4 pb-20">
      <div className="w-full max-w-[720px] mx-auto min-h-40 shadow-md bg-white p-4 rounded-md transition-all duration-150">
        <h1 className="text-accent text-xl font-semibold">
          Personal identifications
        </h1>
        <div className="">
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
                    helperText={
                      errors.firstName ? errors.firstName.message : ""
                    }
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
                disabled={!canEdit}
              >
                {loading ? <LoadinProgress /> : "Save"}
              </Button>
              <Button
                variant="contained"
                className={`bg-secondary hover:bg-secondary/90 w-full mt-4 !h-[46px] transition-all`}
                size="large"
                disabled={!canEdit}
                onClick={resetToDefaults}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </div>
      </div>
      <div className="w-full max-w-[720px] mx-auto min-h-40 shadow-md bg-white p-4 rounded-md">
        <h1 className="text-accent text-xl font-semibold">Profile Info</h1>
        <div className="">
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmitProfile(handleUpdateProfile)}
            className=""
          >
            <Box className="p-10 w-fit bg-[#e8f0fe] relative overflow-hidden cursor-pointer">
              {/* <FiUser className="text-[60px] text-slate-500" /> */}
              {(picUrl || userState?.profile?.picture) && (
                <img
                  className="w-24 h-24 object-cover absolute top-0 left-0 z-10"
                  src={picUrl || userState?.profile?.picture}
                  alt=""
                />
              )}
              {/* {!loadingUpload && ( */}
              <input
                onChange={(e: any) => {
                  setPicture(e.target.files[0]);
                }}
                id="picture"
                type="file"
                accept="image/*"
                className="w-full h-full absolute top-0 left-0 opacity-0 z-20 cursor-pointer"
              />
              {/* )} */}
            </Box>
            <Box className="flex gap-4">
              <Controller
                name="birthDate"
                control={profileControl}
                rules={{ required: true }}
                render={({ field }) => (
                  <DatePicker
                    // {...field}
                    // label="Birth date"
                    // disableFuture
                    value={field.value}
                    inputRef={field.ref}
                    onChange={(date) => {
                      field.onChange(date);
                    }}
                    sx={{
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
                      "& .MuiInputBase-input": {
                        padding: "11.5px 14px",
                      },
                      "& .MuiFormLabel-root": {
                        p: "4px 0",
                      },
                    }}
                    slotProps={{
                      textField: {
                        size: "small",
                        variant: "outlined",
                        fullWidth: true,
                        error: !!profileErrors.birthDate,
                        // helperText:
                        //   profileErrors.birthDate &&
                        //   profileErrors.birthDate.message,
                        helperText: profileErrors.birthDate
                          ? String(profileErrors.birthDate.message)
                          : undefined,
                      },
                    }}
                  />
                )}
              />
              <Controller
                name="gender"
                control={profileControl}
                render={({ field }) => (
                  <FormControl
                    fullWidth
                    sx={{
                      "& .MuiInputLabel-root": {
                        top: "12px",
                      },
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
                        py: "11.5px",
                      },
                    }}
                  >
                    <InputLabel id="demo-simple-select-label">
                      Gender
                    </InputLabel>
                    <Select
                      {...field}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Gender"
                      sx={{
                        input: {
                          color: "#021527",
                        },
                        mt: 2,
                        // color: "#242E8F",
                        // "& label.Mui-focused": {
                        //   color: "#242E8F",
                        // },
                        // "& .MuiOutlinedInput-root": {
                        //   "&.Mui-focused fieldset": {
                        //     border: "1.5px solid #242E8F",
                        //   },
                        // },
                        // "& .MuiOutlinedInput-input": {
                        //   py: "11.5px",
                        // },
                        // "& .MuiFormLabel-root": {
                        //   mt: "3px",
                        // },
                      }}
                      inputProps={{ style: { height: 16 } }}
                      error={!!profileErrors.gender}
                    >
                      {/* <MenuItems /> */}
                      <MenuItem value={"MALE"}>Male</MenuItem>
                      <MenuItem value={"FEMALE"}>Female</MenuItem>
                      <MenuItem value={"OTHER"}>Other</MenuItem>
                    </Select>
                    <FormHelperText error>
                      {profileErrors.gender && profileErrors.gender?.message}
                    </FormHelperText>
                  </FormControl>
                )}
              />
            </Box>
            <Box className="flex gap-4">
              <Box className="block w-full">
                <Controller
                  name="phoneNumber"
                  control={profileControl}
                  render={({ field }) => (
                    <PhoneInput
                      {...field}
                      country={"rw"}
                      buttonStyle={{
                        height: "46px",
                      }}
                      inputStyle={{
                        height: "46px",
                      }}
                      containerStyle={{
                        marginTop: "16px",
                        width: "100%",
                      }}
                      defaultErrorMessage="Invalid phone number"
                      inputProps={{
                        required: true,
                        autoFocus: true,
                      }}
                    />
                  )}
                />
                {profileErrors.phoneNumber && (
                  <p className="text-[12px] text-[#d32f2f] ml-[14px] mt-[3px]">
                    {profileErrors.phoneNumber?.message}
                  </p>
                )}
              </Box>
              <Controller
                name="country"
                control={profileControl}
                render={({ field }) => (
                  <FormControl
                    fullWidth
                    sx={{
                      "& .MuiInputLabel-root": {
                        top: "12px",
                      },
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
                        py: "11.5px",
                      },
                    }}
                  >
                    <InputLabel id="demo-simple-select-label">
                      Country
                    </InputLabel>
                    <Select
                      {...field}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Age"
                      sx={{
                        input: {
                          color: "#021527",
                        },
                        mt: 2,
                      }}
                      inputProps={{ style: { height: 16 } }}
                      error={!!profileErrors.gender}
                    >
                      {countries?.map((country, index) => (
                        <MenuItem value={country.name} key={index}>
                          {country.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText error>
                      {profileErrors.gender && profileErrors.gender?.message}
                    </FormHelperText>
                  </FormControl>
                )}
              />
            </Box>
            <Box className="flex gap-4">
              <Controller
                name="city"
                control={profileControl}
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
                    label="City"
                    variant="outlined"
                    fullWidth
                    size="small"
                    className="text-xs"
                    error={!!profileErrors.city}
                    helperText={
                      profileErrors.city ? profileErrors.city.message : ""
                    }
                  />
                )}
              />
              <Controller
                name="address1"
                control={profileControl}
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
                    label="Address 1"
                    variant="outlined"
                    fullWidth
                    size="small"
                    className="text-xs"
                    error={!!profileErrors.address1}
                    helperText={
                      profileErrors.address1
                        ? profileErrors.address1.message
                        : ""
                    }
                  />
                )}
              />
            </Box>
            <Box className="flex gap-4">
              <Controller
                name="address2"
                control={profileControl}
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
                    label="Address 2 (Optional)"
                    variant="outlined"
                    fullWidth
                    size="small"
                    className="text-xs"
                    error={!!profileErrors.address2}
                    helperText={
                      profileErrors.address2
                        ? profileErrors.address2.message
                        : ""
                    }
                  />
                )}
              />
            </Box>

            <Box className={`gap-4 ${canEditProfile ? "flex" : "hidden"}`}>
              {" "}
              <Button
                type="submit"
                variant="contained"
                className="bg-primary hover:bg-primary/90 w-full mt-4 !h-[46px]"
                size="large"
                disabled={loading || !canEditProfile}
              >
                {loading ? <LoadinProgress /> : "Save"}
              </Button>
              <Button
                variant="contained"
                className={`bg-secondary hover:bg-secondary/90 w-full mt-4 !h-[46px] transition-all`}
                size="large"
                disabled={loading || !canEditProfile}
                onClick={resetToProfileDefaults}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
