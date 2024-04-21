"use client";

import { createArticle, useDispatch } from "@/lib/redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, TextField, TextareaAutosize } from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { MdCloudUpload } from "react-icons/md";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "@/components/ReactQuill";
import LoadinProgress from "@/components/LoadingProgess";

const createArticleSchema = yup.object().shape({
  title: yup.string().required().min(5).max(40),
  description: yup.string().required().min(5).max(150),
  // body: yup.string().required(),
});

interface CreateArticleInputs {
  title: string;
  description: string;
  // body: string;
}

const AddNewArticle = () => {
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
    setValue,
    formState: { errors },
  } = useForm<CreateArticleInputs>({
    resolver: yupResolver(createArticleSchema),
    defaultValues: {
      title: "",
      description: "",
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

  const handleCreateArticle = (data: any) => {
    if (!picture) {
      return setImageError("Please select a cover image");
    } else {
      console.log(data);
      console.log({ body });
      setLoading(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("body", body);
      formData.append("coverImage", picture);
      formData.append("newTags[0]", "DevOps");

      dispatch(createArticle(formData))
        .unwrap()
        .then((res: any) => {
          console.log(res);
          if (res.statusCode === 201) {
            enqueueSnackbar(res.message, {
              variant: "success",
              preventDuplicate: true,
            });
          }
        })
        .catch((err: any) => {
          console.log(err);
          enqueueSnackbar(err.message, {
            variant: "error",
            preventDuplicate: true,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  return (
    <div>
      {" "}
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(handleCreateArticle)}
        className="mb-12"
      >
        <div className="flex gap-6">
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold ml-1 text-accent">
              Upload Cover Image
            </h1>
            <div className="flex flex-col items-center gap-2 w-fit">
              <img
                src={
                  picUrl
                    ? picUrl
                    : "https://www.pngkit.com/png/detail/2-23698_splash-png-image-color-splash-png-blue.png"
                }
                alt=""
                className="w-[640px] aspect-video object-cover rounded-lg shadow-sm"
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
          </div>
          <div className="w-full h-fit flex flex-col items-start">
            <h1 className="text-xl font-semibold ml-1 text-accent">
              Title & Description
            </h1>
            <div className="w-full bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-3 px-8 rounded-lg">
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
                name="description"
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
                    label="Description"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    size="small"
                    className="text-xs"
                    error={!!errors.description}
                    helperText={
                      errors.description ? errors.description.message : ""
                    }
                  />
                )}
              />
            </div>
          </div>
        </div>
        <div className="w-full h-fit flex flex-col items-start mt-6">
          <h1 className="text-xl font-semibold ml-1 text-accent">
            Article Content
          </h1>
          <div className="w-full bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-3 px-8 rounded-lg">
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

export default AddNewArticle;
