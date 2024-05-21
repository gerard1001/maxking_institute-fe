"use client";

import {
  createArticle,
  createChapter,
  fetchAllTags,
  fetchOneChapter,
  selectTags,
  updateChapter,
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
// import ReactQuill from "@/components/ReactQuill";
import LoadinProgress from "@/components/LoadingProgess";
import { ITag } from "@/lib/interfaces/tag.interface";
import { LuPlus } from "react-icons/lu";
import CreateTagForm from "@/components/CreateTagForm";
import { IoOptionsOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import BackIconButton from "@/components/BackIconButton";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("@/components/ReactQuill"), {
  ssr: false,
});

const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
});

type CreateModuleInputs = {
  title: string;
  description: string;
};

interface ModuleProps {
  params: {
    module_id: string;
    course_id: string;
    chapter_id: string;
  };
}

const EditChapter = ({
  params: { module_id, course_id, chapter_id },
}: ModuleProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [body, setBody] = React.useState("");
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateModuleInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  React.useEffect(() => {
    dispatch(fetchOneChapter(chapter_id))
      .unwrap()
      .then((res) => {
        if (res.statusCode === 200) {
          setValue("title", res.data.title);
          setValue("description", res.data.description);
          setBody(res.data.content);
        }
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
  }, []);

  const handleUpdateChapter = (data: CreateModuleInputs) => {
    setLoading(true);
    dispatch(
      updateChapter({
        id: chapter_id,
        data: {
          title: data.title,
          description: data.description,
          content: body,
        },
      })
    )
      .unwrap()
      .then((res) => {
        if (res.statusCode === 200) {
          enqueueSnackbar(res.message, { variant: "success" });
          setBody("");
          reset();
          //   router.push(`/dashboard/courses/${course_id}`);
          router.back();
        }
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
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
        onSubmit={handleSubmit(handleUpdateChapter)}
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
            Chapter Content
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
          {loading ? <LoadinProgress /> : "Save"}
        </Button>
      </Box>
    </div>
  );
};

export default EditChapter;
