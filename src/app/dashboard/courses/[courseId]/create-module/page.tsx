"use client";

import {
  createArticle,
  createModule,
  fetchAllTags,
  selectTags,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { MdCloudUpload, MdOutlineClose } from "react-icons/md";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "@/components/ReactQuill";
import LoadinProgress from "@/components/LoadingProgess";
import { ITag } from "@/lib/interfaces/tag.interface";
import { LuPlus } from "react-icons/lu";
import CreateTagForm from "@/components/CreateTagForm";
import { IoOptionsOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import BackIconButton from "@/components/BackIconButton";

const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  // content: yup.string().required(),
});

type CreateModuleInputs = {
  title: string;
  description: string;
  // content: string;
};

interface CourseProps {
  params: {
    courseId: string;
  };
}

const CreateModule = ({ params: { courseId } }: CourseProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [body, setBody] = React.useState("");
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateModuleInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      // body: "",
    },
  });

  const handleCreateModule = (data: CreateModuleInputs) => {
    console.log(data);
    setLoading(true);
    dispatch(
      createModule({
        id: courseId,
        data: {
          title: data.title,
          description: data.description,
          content: body,
        },
      })
    )
      .unwrap()
      .then((res) => {
        console.log(res, "*****************8");
        if (res.statusCode === 201) {
          enqueueSnackbar(res.message, { variant: "success" });
        }
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
        setBody("");
        reset();
        router.push(`/dashboard/courses/${courseId}`);
      });
  };
  return (
    <div>
      <div className="">
        <BackIconButton />
      </div>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(handleCreateModule)}
        className="mb-12"
      >
        <div className="flex gap-6">
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
            Course Content
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

export default CreateModule;
