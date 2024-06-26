"use client";

import { createProgram, useDispatch } from "@/lib/redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { MdCloudUpload } from "react-icons/md";
import "react-quill/dist/quill.snow.css";
import LoadinProgress from "@/components/LoadingProgess";
import dynamic from "next/dynamic";
import BackIconButton from "@/components/BackIconButton";

const ReactQuill = dynamic(() => import("@/components/ReactQuill"), {
  ssr: false,
});

const createProgramSchema = yup.object().shape({
  title: yup.string().required().min(5).max(150),
  short: yup
    .string()
    .required()
    .min(2)
    .max(10)
    .matches(/^[a-zA-Z0-9\s]+$/, "Only letters and numbers are allowed"),
});

interface CreateProgramInputs {
  title: string;
  short: string;
}

const AddNewProgram = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [picture, setPicture] = React.useState<Blob | any>("");
  const [picUrl, setPicUrl] = React.useState<any>(null);
  const [body, setBody] = React.useState("");
  const [imageError, setImageError] = React.useState<string | null>(null);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateProgramInputs>({
    resolver: yupResolver(createProgramSchema),
    defaultValues: {
      title: "",
      short: "",
      // body: "",
    },
  });

  React.useEffect(() => {
    if (picture) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setPicUrl(e.target.result);
      };
      reader.readAsDataURL(picture);
    }
  }, [picture]);

  const handleCreateProgram = (data: any) => {
    if (!picture) {
      return setImageError("Please select a cover image");
    } else {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("short", data.short);
      formData.append("description", body);
      formData.append("coverImage", picture);

      dispatch(createProgram(formData))
        .unwrap()
        .then((res: any) => {
          if (res.statusCode === 201) {
            enqueueSnackbar(res.message, {
              variant: "success",
              preventDuplicate: true,
            });
          }
        })
        .catch((err: any) => {
          enqueueSnackbar(err.message, {
            variant: "error",
            preventDuplicate: true,
          });
        })
        .finally(() => {
          setLoading(false);
          setBody("");
          reset();
          setPicUrl(null);
          setPicture("");
        });
    }
  };

  return (
    <div>
      <BackIconButton />{" "}
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(handleCreateProgram)}
        className="mb-12"
      >
        <div className="flex md:flex-row flex-col gap-6">
          <div className="w-full h-fit flex flex-col items-start">
            <div className="flex flex-col items-center gap-2 w-fit mb-5">
              <img
                src={
                  picUrl
                    ? picUrl
                    : "https://res.cloudinary.com/rutagerard/image/upload/v1713800805/Important/manga_z8z1xs.png"
                }
                alt=""
                className="w-[440px] aspect-square object-cover rounded-lg shadow-sm"
              />
              {imageError && (
                <div className="text-[#d32f2f] text-xs">{imageError}</div>
              )}
              <input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                className="hidden"
                onChange={(e: any) => {
                  setPicture(e.target.files[0]);
                }}
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  startIcon={<MdCloudUpload />}
                  className="bg-primary"
                >
                  Upload
                </Button>
              </label>
            </div>
            <h1 className="text-xl font-semibold ml-1 text-accent">
              Title & Description
            </h1>
            <div className="w-full bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-3 md:px-8 px-4 rounded-lg">
              <Controller
                name="title"
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
                    label="Title"
                    variant="outlined"
                    fullWidth
                    size="small"
                    className="text-xs"
                    error={!!errors.title}
                    helperText={errors.title ? errors.title.message : ""}
                  />
                )}
              />
              <Controller
                name="short"
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
                    label="Short label"
                    variant="outlined"
                    fullWidth
                    size="small"
                    className="text-xs"
                    error={!!errors.short}
                    helperText={errors.short ? errors.short.message : ""}
                  />
                )}
              />
            </div>
          </div>
        </div>
        <div className="w-full h-fit flex flex-col items-start mt-6">
          <h1 className="text-xl font-semibold ml-1 text-accent">
            Program Description
          </h1>
          <div className="w-full bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-7 px-8 rounded-lg">
            <ReactQuill setBody={setBody} body={body} />
          </div>
        </div>

        <Button
          type="submit"
          variant="contained"
          className="bg-primary hover:bg-primary/90 w-full max-w-32 mt-4 !h-[46px]"
          size="large"
          disabled={loading}
        >
          {loading ? <LoadinProgress /> : "Submit"}
        </Button>
      </Box>
    </div>
  );
};

export default AddNewProgram;
