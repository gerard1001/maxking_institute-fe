"use client";

import React, { useContext, useEffect } from "react";
import { fetchUserById, updateProfile, useDispatch } from "@/lib/redux";
import { useSnackbar } from "notistack";
import {
  TextField,
  Box,
  Button,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { Controller, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LoadinProgress from "@/components/LoadingProgess";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import countries from "@/lib/data/countries.json";
import { IUpdateProfileProps } from "./UpdateUserInfo";
import { LoginContext } from "@/lib/context/LoginContext";

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
  specialty: yup.string().required().max(20).label("Country"),
  country: yup.string().required().max(40).label("Country"),
  city: yup.string().required().label("City"),
  addressLine: yup.string().required().label("Adddress 1"),
  bio: yup.string().nullable().label("Bio"),
  birthDate: dayjsDate.required().label("Birth date"),
});

interface UpdateProfileInputs {
  phoneNumber: string;
  gender: string;
  specialty: string;
  country: string;
  city: string;
  addressLine: string;
  bio?: string | null;
  birthDate: Dayjs | null | any;
}

const UpdateUserProfile = ({
  userState,
  isAccountUser,
  userId,
}: IUpdateProfileProps) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [canEditProfile, setCanEditProfile] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [picture, setPicture] = React.useState<Blob | any>("");
  const [picUrl, setPicUrl] = React.useState<any>(null);
  const { setLoginData } = useContext(LoginContext);

  const {
    handleSubmit: handleSubmitProfile,
    control: profileControl,
    setValue: setProfileValue,
    formState: { errors: profileErrors },
  } = useForm<UpdateProfileInputs>({
    resolver: yupResolver(updateProfileSchema),
    defaultValues: {
      gender: "",
      specialty: "",
      phoneNumber: "",
      country: "",
      city: "",
      addressLine: "",
      bio: "",
      birthDate: null,
    },
  });

  const watchProfileChange = useWatch({
    control: profileControl,
  });

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
        enqueueSnackbar("Failed to fetch user", { variant: "error" });
      });
  }, [userId]);

  useEffect(() => {
    if (
      watchProfileChange.phoneNumber !== userState.profile?.phoneNumber ||
      !dayjs(watchProfileChange.birthDate).isSame(
        dayjs(userState.profile?.birthDate)
      ) ||
      watchProfileChange.gender !== userState.profile?.gender ||
      watchProfileChange.country !== userState.profile?.country ||
      watchProfileChange.city !== userState.profile?.city ||
      watchProfileChange.addressLine !== userState.profile?.addressLine ||
      watchProfileChange.bio !== userState.profile?.bio ||
      picUrl !== null
    ) {
      setCanEditProfile(true);
    } else {
      setCanEditProfile(false);
    }
  }, [watchProfileChange, picUrl]);

  useEffect(() => {
    const { profile } = userState;

    profile?.birthDate &&
      setProfileValue("birthDate", dayjs(profile?.birthDate));
    profile?.gender && setProfileValue("gender", profile?.gender);
    profile?.specialty && setProfileValue("specialty", profile?.specialty);
    profile?.phoneNumber &&
      setProfileValue("phoneNumber", profile?.phoneNumber);
    profile?.country && setProfileValue("country", profile?.country);
    profile?.city && setProfileValue("city", profile?.city);
    profile?.addressLine &&
      setProfileValue("addressLine", profile?.addressLine);
    profile?.bio && setProfileValue("bio", profile?.bio);
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

  const resetToProfileDefaults = () => {
    userState?.profile?.birthDate &&
      setProfileValue("birthDate", dayjs(userState?.profile?.birthDate));
    userState?.profile?.gender &&
      setProfileValue("gender", userState?.profile?.gender);
    userState?.profile?.specialty &&
      setProfileValue("specialty", userState?.profile?.specialty);
    userState?.profile?.phoneNumber &&
      setProfileValue("phoneNumber", userState?.profile?.phoneNumber);
    userState?.profile?.country &&
      setProfileValue("country", userState?.profile?.country);
    userState?.profile?.city &&
      setProfileValue("city", userState?.profile?.city);
    userState?.profile?.addressLine &&
      setProfileValue("addressLine", userState?.profile?.addressLine);
    userState?.profile?.bio && setProfileValue("bio", userState?.profile?.bio);
    picUrl && setPicUrl(userState?.profile?.picture);
  };

  const handleUpdateProfile = (data: any) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("birthDate", data.birthDate.format("YYYY-MM-DD"));
    formData.append("gender", data.gender);
    formData.append("specialty", data.specialty);
    formData.append("country", data.country);
    formData.append("city", data.city);
    formData.append("addressLine", data.addressLine);
    formData.append("bio", data.bio);
    if (picUrl) {
      formData.append("picture", picture);
    }

    dispatch(updateProfile({ id: userState?.profile?.id, data: formData }))
      .unwrap()
      .then((res) => {
        if (res.statusCode === 200) {
          enqueueSnackbar(res.message, {
            variant: "success",
            preventDuplicate: true,
          });
          setCanEditProfile(false);
          if (isAccountUser) {
            dispatch(fetchUserById(userId))
              .unwrap()
              .then((nextRes) => {
                if (nextRes.statusCode === 200) {
                  setLoginData(nextRes.data);
                }
              })
              .catch((_) => {
                enqueueSnackbar("Failed to refetch", {
                  variant: "error",
                  preventDuplicate: true,
                });
              });
          }
        } else {
          enqueueSnackbar(res.message, { variant: "error" });
        }
      })
      .catch((error: any) => {
        enqueueSnackbar(error.message, { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmitProfile(handleUpdateProfile)}
      className=""
    >
      <Box className="p-10 w-fit bg-[#e8f0fe] relative overflow-hidden cursor-pointer">
        {(picUrl || userState?.profile?.picture) && (
          <img
            className="w-24 h-24 object-cover absolute top-0 left-0 z-10"
            src={picUrl || userState?.profile?.picture}
            alt=""
          />
        )}
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
      <Box className="flex sm:flex-row flex-col sm:gap-4">
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
                  backgroundColor: "#fff",
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
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
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
                }}
                inputProps={{ style: { height: 16 } }}
                error={!!profileErrors.gender}
              >
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
      <Box className="flex sm:flex-row flex-col sm:gap-4">
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
                  backgroundColor: "#fff",
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
              <InputLabel id="demo-simple-select-label">Country</InputLabel>
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
                error={!!profileErrors.country}
              >
                {countries?.map((country, index) => (
                  <MenuItem value={country.name} key={index}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error>
                {profileErrors.country && profileErrors.country?.message}
              </FormHelperText>
            </FormControl>
          )}
        />
      </Box>
      <Box className="flex sm:flex-row flex-col sm:gap-4">
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
              helperText={profileErrors.city ? profileErrors.city.message : ""}
            />
          )}
        />
        <Controller
          name="addressLine"
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
              label="Address Line"
              variant="outlined"
              fullWidth
              size="small"
              className="text-xs"
              error={!!profileErrors.addressLine}
              helperText={
                profileErrors.addressLine
                  ? profileErrors.addressLine.message
                  : ""
              }
            />
          )}
        />
      </Box>
      <Box className=" gap-4">
        <Controller
          name="specialty"
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
              label="Specialty"
              placeholder="What is your profession?"
              variant="outlined"
              fullWidth
              size="small"
              className="text-xs"
              error={!!profileErrors.specialty}
              helperText={
                profileErrors.specialty ? profileErrors.specialty.message : ""
              }
            />
          )}
        />
        <Controller
          name="bio"
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
              label="Bio"
              placeholder="Tell us about yourself"
              variant="outlined"
              fullWidth
              multiline
              maxRows={4}
              minRows={4}
              size="small"
              className="text-xs"
              error={!!profileErrors.bio}
              helperText={profileErrors.bio ? profileErrors.bio.message : ""}
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
  );
};

export default UpdateUserProfile;
