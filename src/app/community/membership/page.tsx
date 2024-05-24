"use client";

import {
  Box,
  Breadcrumbs,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import membershipData from "@/lib/data/membership.json";
import Footer from "@/components/Footer";
import { Controller, useForm } from "react-hook-form";
import LoadinProgress from "@/components/LoadingProgess";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PhoneInput from "react-phone-input-2";
import countries from "@/lib/data/countries.json";
import { Dayjs } from "dayjs";

const schema = yup.object().shape({
  firstName: yup.string().required().min(4).max(40).label("First name"),
  lastName: yup.string().required().min(4).max(40).label("Last name"),
  email: yup.string().email().required().label("Email"),
  country: yup.string().required().max(40).label("Country"),
  phoneNumber: yup.string().required().min(4).max(16).label("Phone Number"),
  specialty: yup.string().required().max(20).label("Country"),
  bio: yup.string().required().label("Bio"),
});

interface IFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  specialty: string;
  country: string;
  bio: string;
}

const MembershipPage = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [picture, setPicture] = React.useState<Blob | any>("");
  const [picUrl, setPicUrl] = React.useState<any>(null);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      specialty: "",
      phoneNumber: "",
      country: "",
      bio: "",
    },
  });

  const breadcrumbs = [
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/community"
      onClick={() => {
        router.back();
      }}
    >
      Community
    </Link>,
    <Typography key="3" color="text.primary">
      Forum
    </Typography>,
  ];

  const onSubmit = (data: IFormInputs) => {};
  return (
    <>
      <div className="container mx-auto p-6">
        <Stack spacing={2} sx={{ my: 2 }}>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
        <section className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-secondary-foreground text-center">
            {membershipData.membership.title}
          </h1>
          <ul className="bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] mx-auto p-10 w-[80%] rounded-xl list-disc">
            {membershipData.membership.benefits.map((benefit) => {
              return (
                <li className="max-w mb-4">
                  <h1 className="text-accent font-bold inline mr-2">
                    {benefit.title}:
                  </h1>
                  {benefit.description}
                </li>
              );
            })}
          </ul>
        </section>

        <section className="my-8">
          <h1 className="text-4xl font-bold mb-4 text-secondary-foreground text-center">
            {membershipData.applicationRequirements.title}
          </h1>
          <ul className="bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] mx-auto p-10 w-[80%] rounded-xl list-decimal">
            {membershipData.applicationRequirements.requirements.map(
              (benefit) => {
                return (
                  <li className="max-w mb-4">
                    <h1 className="text-accent font-bold inline mr-2">
                      {benefit.title}:
                    </h1>
                    {benefit.description}
                  </li>
                );
              }
            )}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4 text-secondary-foreground">
            Fill in the Form to Request for Membership
          </h2>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-[640px] p-6 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-xl"
          >
            <h1 className="text-accent text-lg font-semibold">
              Membership form
            </h1>
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
              name="phoneNumber"
              control={control}
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
            {errors.phoneNumber && (
              <p className="text-[12px] text-[#d32f2f] ml-[14px] mt-[3px]">
                {errors.phoneNumber?.message}
              </p>
            )}
            <Controller
              name="country"
              control={control}
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
                    error={!!errors.country}
                  >
                    {countries?.map((country, index) => (
                      <MenuItem value={country.name} key={index}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error>
                    {errors.country && errors.country?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />
            <Controller
              name="specialty"
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
                  label="Specialty"
                  placeholder="What is your profession?"
                  variant="outlined"
                  fullWidth
                  size="small"
                  className="text-xs"
                  error={!!errors.specialty}
                  helperText={errors.specialty ? errors.specialty.message : ""}
                />
              )}
            />
            <Controller
              name="bio"
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
                  label="Bio"
                  placeholder="Tell us about yourself"
                  variant="outlined"
                  fullWidth
                  multiline
                  maxRows={4}
                  minRows={4}
                  size="small"
                  className="text-xs"
                  error={!!errors.bio}
                  helperText={errors.bio ? errors.bio.message : ""}
                />
              )}
            />
            <div>
              {/* <label className="block text-gray-700 font-bold mb-2">
                Accept Terms and Conditions:
              </label> */}
              <input type="checkbox" className="mr-2" />
              <span>I agree to the terms and conditions</span>
            </div>
            <Button
              type="submit"
              variant="contained"
              className="bg-primary hover:bg-primary/90 w-full mt-4 !h-[46px]"
              size="large"
              disabled={loading}
            >
              {loading ? <LoadinProgress /> : "Submit"}
            </Button>
          </Box>
        </section>
      </div>{" "}
      <Footer />{" "}
    </>
  );
};

export default MembershipPage;
