"use client";

import {
  createArticle,
  createCourse,
  fetchAllSubjects,
  fetchAllTags,
  fetchAllUsers,
  selectSubjects,
  selectTags,
  selectUsers,
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
  FormHelperText,
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
import LoadinProgress from "@/components/LoadingProgess";
import { ITag } from "@/lib/interfaces/tag.interface";
import { LuPlus } from "react-icons/lu";
import CreateTagForm from "@/components/CreateTagForm";
import { IoChevronBackOutline, IoOptionsOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import BackIconButton from "@/components/BackIconButton";

const createCourseSchema = yup.object().shape({
  title: yup.string().required().min(5).max(150),
  description: yup.string().required().min(5),
  previewVideo: yup.string().nullable().max(16),
  previewText: yup.string().nullable(),
  estimatedDuration: yup.string().required(),
  subjectId: yup.string().uuid().required(),
  tutor: yup.string().uuid().required(),
});

export interface CreateCourseInputs {
  title: string;
  description: string;
  previewVideo?: string | null;
  previewText?: string | null;
  estimatedDuration: string;
  subjectId: string;
  tutor: string;
}

const CreateCourse = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const state = useSelector(selectTags);
  const userState = useSelector(selectUsers);
  const subjectState = useSelector(selectSubjects);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [picture, setPicture] = React.useState<Blob | any>("");
  const [picUrl, setPicUrl] = React.useState<any>(null);
  const [imageError, setImageError] = React.useState<string | null>(null);
  const [selectedNames, setSelectedNames] = React.useState<string[]>([]);
  const [selectedTags, setSelectedTags] = React.useState<ITag[]>([]);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const openServiceDrawer = () => {
    setOpenDrawer(true);
  };
  const closeServiceDrawer = () => {
    setOpenDrawer(false);
  };
  const tags = state.allTags;

  const handleChange = (event: SelectChangeEvent<typeof selectedNames>) => {
    const {
      target: { value },
    } = event;
    setSelectedNames(typeof value === "string" ? value.split(",") : value);
  };

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateCourseInputs>({
    resolver: yupResolver(createCourseSchema),
    defaultValues: {
      title: "",
      description: "",
      previewVideo: "",
      previewText: "",
      estimatedDuration: "",
      subjectId: "",
      tutor: "",
    },
  });

  React.useEffect(() => {
    dispatch(fetchAllTags())
      .unwrap()
      .catch((err: any) => {
        enqueueSnackbar(err.message, {
          variant: "error",
          preventDuplicate: true,
        });
      });

    dispatch(fetchAllUsers())
      .unwrap()
      .catch((err: any) => {
        enqueueSnackbar(err.message, {
          variant: "error",
          preventDuplicate: true,
        });
      });

    dispatch(fetchAllSubjects())
      .unwrap()
      .catch((err: any) => {
        enqueueSnackbar(err.message, {
          variant: "error",
          preventDuplicate: true,
        });
      });
  }, []);

  React.useEffect(() => {
    if (picture) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setPicUrl(e.target.result);
      };
      reader.readAsDataURL(picture);
    }
  }, [picture]);

  React.useEffect(() => {
    const selectedTagObjects = selectedNames.map(
      (name: string) => tags.find((tag: ITag) => tag.name === name)!
    );
    setSelectedTags(selectedTagObjects);
  }, [selectedNames]);

  const handleCreateCourse = (data: CreateCourseInputs) => {
    if (!picture) {
      return setImageError("Please select a cover image");
    } else {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("estimatedDuration", data.estimatedDuration);
      formData.append("previewText", data.previewText ?? "");
      formData.append("previewVideo", data.previewVideo ?? "");
      formData.append("coverImage", picture);
      formData.append("tutor", data.tutor);
      for (let i = 0; i < selectedTags.length; i++) {
        formData.append(`tags[${i}]`, selectedTags[i].id);
      }

      dispatch(createCourse({ id: data?.subjectId, data: formData }))
        .unwrap()
        .then((res: any) => {
          if (res.statusCode === 201) {
            enqueueSnackbar(res.message, {
              variant: "success",
              preventDuplicate: true,
            });

            setTimeout(() => {
              router.push("/dashboard/courses");
            }, 500);
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
          reset();
          setSelectedNames([]);
          setSelectedTags([]);
          setPicUrl(null);
          setPicture("");
        });
    }
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <div>
      {" "}
      <BackIconButton />
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(handleCreateCourse)}
        className="mb-12"
      >
        <div className="flex  flex-col gap-6">
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold ml-1 text-accent">
              Upload Cover Image
            </h1>
            <div className="flex flex-col items-center gap-2 w-fit">
              <img
                src={
                  picUrl
                    ? picUrl
                    : "https://res.cloudinary.com/rutagerard/image/upload/v1713800805/Important/manga_z8z1xs.png"
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
              Course Details
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
              <Controller
                name="previewVideo"
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
                    placeholder="Preview Video Youtube ID (eg: Sw4b2tMWwlY)"
                    label="Preview Video"
                    variant="outlined"
                    fullWidth
                    size="small"
                    className="text-xs"
                    error={!!errors.previewVideo}
                    helperText={
                      errors.previewVideo ? errors.previewVideo.message : ""
                    }
                  />
                )}
              />
              <Controller
                name="previewText"
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
                    label="Preview Text"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    size="small"
                    className="text-xs"
                    error={!!errors.previewText}
                    helperText={
                      errors.previewText ? errors.previewText.message : ""
                    }
                  />
                )}
              />
              <Controller
                name="estimatedDuration"
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
                    label="Estimated Coures Duration (eg: 2 hours)"
                    variant="outlined"
                    fullWidth
                    size="small"
                    className="text-xs"
                    error={!!errors.estimatedDuration}
                    helperText={
                      errors.estimatedDuration
                        ? errors.estimatedDuration.message
                        : ""
                    }
                  />
                )}
              />
            </div>
          </div>
        </div>
        <div className="w-full h-fit flex flex-col items-start mt-6">
          <h1 className="text-xl font-semibold ml-1 text-accent flex gap-2 items-center">
            Course Tags{" "}
            <IconButton
              className="bg-black/5 my-4 p-1"
              onClick={() => {
                openServiceDrawer();
              }}
            >
              <IoOptionsOutline className="text-accent font-bold text-[16px]" />
            </IconButton>{" "}
          </h1>
          <div className="w-full bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-3 px-8 rounded-lg">
            <div className="flex items-center gap-2">
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
                className={`${tags.length === 0 && "!hidden"} max-w-[640px]`}
              >
                <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={selectedNames}
                  onChange={handleChange}
                  input={<OutlinedInput label="Select Tags" />}
                  renderValue={(selected) => selected.join(", ")}
                  sx={{
                    input: {
                      color: "#021527",
                    },
                    my: 2,
                  }}
                  inputProps={{ style: { height: 16 } }}
                >
                  {tags.map((tag) => (
                    <MenuItem key={tag.id} value={tag.name}>
                      <Checkbox
                        checked={selectedNames.indexOf(tag.name) > -1}
                      />
                      <ListItemText primary={tag.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <IconButton
                className="bg-black/10 my-4"
                onClick={handleOpenModal}
              >
                <LuPlus className="text-accent font-bold" />
              </IconButton>
            </div>
          </div>
        </div>
        <div className="w-full h-fit flex flex-col items-start mt-6">
          <h1 className="text-xl font-semibold ml-1 text-accent flex gap-2 items-center">
            Select Course Subject{" "}
          </h1>
          <div className="w-full bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-3 px-8 rounded-lg">
            <div className="flex items-center gap-2">
              <Controller
                name="subjectId"
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
                    <InputLabel id="demo-simple-select-label">
                      Course Subject
                    </InputLabel>
                    <Select
                      {...field}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Subject"
                      sx={{
                        input: {
                          color: "#021527",
                        },
                        mt: 2,
                      }}
                      inputProps={{ style: { height: 16 } }}
                      error={!!errors.tutor}
                    >
                      {subjectState?.allCSubjects?.map((subject, index) => (
                        <MenuItem value={subject?.id} key={index}>
                          {subject?.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText error>
                      {errors.tutor && errors.tutor?.message}
                    </FormHelperText>
                  </FormControl>
                )}
              />
            </div>
          </div>
        </div>
        <div className="w-full h-fit flex flex-col items-start mt-6">
          <h1 className="text-xl font-semibold ml-1 text-accent flex gap-2 items-center">
            Select Course Tutor{" "}
          </h1>
          <div className="w-full bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-3 px-8 rounded-lg">
            <div className="flex items-center gap-2">
              <Controller
                name="tutor"
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
                    <InputLabel id="demo-simple-select-label">Tutor</InputLabel>
                    <Select
                      {...field}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Tutor"
                      sx={{
                        input: {
                          color: "#021527",
                        },
                        mt: 2,
                      }}
                      inputProps={{ style: { height: 16 } }}
                      error={!!errors.tutor}
                    >
                      {userState?.allUsers
                        ?.filter((user) => user.roles[0].type !== "CLIENT")
                        .map((user, index) => (
                          <MenuItem value={user?.id} key={index}>
                            {user?.firstName} {user?.lastName}
                          </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText error>
                      {errors.tutor && errors.tutor?.message}
                    </FormHelperText>
                  </FormControl>
                )}
              />
            </div>
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
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          borderRadius: "30px",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxHeight: "98vh",
            width: {
              sm: 500,
              xs: "95%",
            },
            maxWidth: 500,
            overflowY: "auto",
            bgcolor: "background.paper",
            border: "none",
            borderRadius: "10px",
            boxShadow: 24,
            p: {
              md: 4,
              sm: 2,
              xs: 1,
            },
          }}
        >
          <Box className="flex items-center justify-end absolute top-0 right-0">
            <IconButton onClick={handleCloseModal} size="medium">
              <MdOutlineClose />
            </IconButton>
          </Box>
          <Typography className="text-2xl font-semibold text-accent">
            Add Tag
          </Typography>
          <CreateTagForm closeModal={handleCloseModal} />
        </Box>
      </Modal>
      <Drawer
        open={openDrawer}
        onClose={closeServiceDrawer}
        className=""
        anchor="right"
      >
        <div className="max-w-[600px] min-w-[440px] w-full relative">
          <IconButton
            onClick={closeServiceDrawer}
            className="absolute top-4 right-4"
          >
            <MdOutlineClose className="" />
          </IconButton>
        </div>
      </Drawer>
    </div>
  );
};

export default CreateCourse;
