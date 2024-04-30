"use client";

import {
  deleteCourse,
  fetchAllTags,
  fetchAllUsers,
  fetchOneCourse,
  fetchOneSubject,
  selectCourses,
  selectTags,
  selectUsers,
  updateCourse,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
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
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";
import { MdCloudUpload, MdEdit, MdOutlineClose } from "react-icons/md";
import { TbTrash } from "react-icons/tb";
import { CreateCourseInputs } from "../subject/[subjectId]/create-course/page";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ITag } from "@/lib/interfaces/tag.interface";
import { IoOptionsOutline, IoWarningOutline } from "react-icons/io5";
import { LuPlus } from "react-icons/lu";
import LoadinProgress from "@/components/LoadingProgess";

const createCourseSchema = yup.object().shape({
  title: yup.string().required().min(5).max(150),
  description: yup.string().required().min(5).max(500),
  previewVideo: yup.string().nullable().max(16),
  previewText: yup.string().nullable().max(500),
  estimatedDuration: yup.string().required(),
  tutor: yup.string().required(),
});

interface SubjectProps {
  params: {
    courseId: string;
  };
}

const CoursePage = ({ params: { courseId } }: SubjectProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const state = useSelector(selectCourses);
  const tagState = useSelector(selectTags);
  const userState = useSelector(selectUsers);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [picture, setPicture] = React.useState<Blob | any>("");
  const [picUrl, setPicUrl] = React.useState<any>(null);
  const [imageError, setImageError] = React.useState<string | null>(null);
  const [selectedNames, setSelectedNames] = React.useState<string[]>([]);
  const [selectedTags, setSelectedTags] = React.useState<ITag[]>([]);
  const [selectedTutorName, setSelectedTutorName] = React.useState<string[]>(
    []
  );
  const [selectedTutor, setSelectedTutor] = React.useState<any>("");
  const [openDialog, setOpenDialog] = React.useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState<boolean>(false);

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateCourseInputs>({
    resolver: yupResolver(createCourseSchema),
    defaultValues: {
      title: "",
      description: "",
      previewVideo: "",
      previewText: "",
      estimatedDuration: "",
      tutor: "",
    },
  });

  const tags = tagState.allTags;

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChange = (event: SelectChangeEvent<typeof selectedNames>) => {
    const {
      target: { value },
    } = event;
    setSelectedNames(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeTutor = (
    event: SelectChangeEvent<typeof selectedTutor>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedTutor(value);
  };

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
  }, []);

  React.useEffect(() => {
    dispatch(fetchOneCourse(courseId))
      .unwrap()
      .then((res: any) => {})
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
  }, [courseId]);

  React.useEffect(() => {
    const selectedTagObjects = selectedNames.map(
      (name: string) => tags.find((tag: ITag) => tag.name === name)!
    );
    setSelectedTags(selectedTagObjects);
  }, [selectedNames]);

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
    const {
      title,
      description,
      previewVideo,
      previewText,
      estimatedDuration,
      users = [],
    } = state.course;

    title && setValue("title", title);
    description && setValue("description", description);
    previewVideo && setValue("previewVideo", previewVideo);
    previewText && setValue("previewText", previewText);
    estimatedDuration && setValue("estimatedDuration", estimatedDuration);
    users[0]?.id && setValue("tutor", users[0].id);
    setPicUrl(state.course.coverImage);
    if (state.course.tags && state.course.tags.length > 0) {
      setSelectedNames(state.course.tags.map((tag) => tag.name));
    }
    if (state.course.users && state.course.users.length > 0) {
      setSelectedTutor(state.course.users[0].id);
    }
  }, [state.course]);

  const handleSaveArticle = (data: CreateCourseInputs) => {
    if (!picture && !picUrl) {
      return setImageError("Please select a cover image");
    } else {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("estimatedDuration", data.estimatedDuration);
      formData.append("previewText", data.previewText ?? "");
      formData.append("previewVideo", data.previewVideo ?? "");
      formData.append("tutor", selectedTutor);
      if (picture && picture !== "") {
        formData.append("coverImage", picture);
      }
      for (let i = 0; i < selectedTags.length; i++) {
        formData.append(`tags[${i}]`, selectedTags[i].id);
      }

      dispatch(updateCourse({ id: courseId, data: formData }))
        .unwrap()
        .then((res: any) => {
          if (res.statusCode === 200) {
            enqueueSnackbar(res.message, {
              variant: "success",
              preventDuplicate: true,
            });
            setTimeout(() => {
              handleCloseModal();
            }, 1000);
            dispatch(fetchOneCourse(courseId))
              .unwrap()
              .catch((err: any) => {
                enqueueSnackbar(err.message, {
                  variant: "error",
                  preventDuplicate: true,
                });
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
        });
    }
  };

  const handleDeleteCourse = () => {
    setDeleteLoading(true);
    dispatch(deleteCourse(courseId))
      .unwrap()
      .then((res: any) => {
        if (res.statusCode === 200) {
          enqueueSnackbar(res.message, {
            variant: "success",
            preventDuplicate: true,
          });
          setTimeout(() => {
            handleCloseDialog();
            router.push("/dashboard/courses");
          }, 1000);
        }
      })
      .catch((err: any) => {
        enqueueSnackbar(err.message, {
          variant: "error",
          preventDuplicate: true,
        });
      })
      .finally(() => {
        setDeleteLoading(false);
      });
  };
  return (
    <>
      <div className="pb-10">
        <div className="p-6 max-w-[900px] mx-auto rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white mb-4 flex items-center justify-between">
          <Button
            className="bg-secondary text-white"
            startIcon={<FaPlus />}
            onClick={() => {}}
          >
            Create New category
          </Button>
          <div className="flex gap-2">
            <IconButton
              className="bg-muted-foreground/20 hover:bg-muted-foreground/50"
              onClick={handleOpenModal}
            >
              <MdEdit className="text-blue-700" />
            </IconButton>
            <IconButton
              className="bg-muted-foreground/20 hover:bg-muted-foreground/50"
              onClick={handleOpenDialog}
            >
              <TbTrash className="text-red-600" />
            </IconButton>
          </div>
        </div>
        {state.course && (
          <div className="p-6 max-w-[900px] mx-auto rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white">
            <div className="w-full">
              <div className="flex gap-3 pt-6">
                <div className="w-full">
                  <h1 className="text-accent text-xl leading-6 font-semibold mb-2">
                    {state.course.title}
                  </h1>
                  <p className="text-accent leading-6">
                    {state.course.description}
                  </p>
                  <h1 className="text-accent text-xl leading-6 font-semibold mb-4 mt-8 border-b border-b-slate-400">
                    Estimated duration:{" "}
                    <span className="text-base font-medium leading-3">
                      {state.course.estimatedDuration}
                    </span>
                  </h1>
                </div>
                <div className="">
                  <img
                    src={state.course.coverImage}
                    alt=""
                    className="w-[440px] aspect-video"
                  />
                </div>
              </div>
              {state.course && (
                <div className="py-4 border-b border-b-slate-400 flex  items-center justify-between">
                  <h1> {state?.course?.modules?.length} modules</h1>
                  <Button
                    className="bg-secondary text-white"
                    startIcon={<FaPlus />}
                    onClick={() => {
                      router.push(
                        `/dashboard/courses/${courseId}/create-module`
                      );
                    }}
                  >
                    Add module
                  </Button>
                </div>
              )}
              <div className="">
                <h1 className="text-accent text-2xl font-semibold mb-4 border-b border-b-slate-400">
                  Preview
                </h1>
                <iframe
                  width="853"
                  height="480"
                  src={`https://www.youtube.com/embed/${state?.course?.previewVideo}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                />
              </div>
            </div>
          </div>
        )}
      </div>
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
              sm: 1400,
              xs: "95%",
            },
            maxWidth: 900,
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
          <Box className="flex items-center justify-between border-b mb-4">
            <Typography className="text-2xl font-semibold text-accent">
              Edit Course
            </Typography>
            <IconButton onClick={handleCloseModal} size="medium">
              <MdOutlineClose />
            </IconButton>
          </Box>
          <Box>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(handleSaveArticle)}
              className="mb-12"
            >
              <div className="flex  flex-col gap-6">
                <div className="flex flex-col">
                  <h1 className="text-xl font-semibold ml-1 text-accent">
                    Upload Cover Image
                  </h1>
                  <div className="w-full bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-3 px-8 rounded-lg flex flex-col items-center gap-2">
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
                            errors.previewVideo
                              ? errors.previewVideo.message
                              : ""
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
                          error={!!errors.title}
                          helperText={errors.title ? errors.title.message : ""}
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
                      //   openServiceDrawer();
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
                      className={`${
                        tags.length === 0 && "!hidden"
                      } max-w-[640px]`}
                    >
                      <InputLabel id="demo-multiple-checkbox-label">
                        Tag
                      </InputLabel>
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
                          <InputLabel id="demo-simple-select-label">
                            Tutor
                          </InputLabel>
                          <Select
                            {...field}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Age"
                            value={selectedTutor}
                            onChange={handleChangeTutor}
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
                              ?.filter(
                                (user) => user.roles[0].type !== "CLIENT"
                              )
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
                // size="large"
                disabled={loading}
              >
                {loading ? <LoadinProgress /> : "Save"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box className="flex flex-col items-center justify-center gap-2 w-[440px] mx-auto p-4">
          <div className="w-fit p-4 rounded-full bg-red-200">
            <IoWarningOutline className="text-red-500 text-3xl font-semibold" />
          </div>
          <h1 className="text-xl font-semibold">Are you sure?</h1>
          <p className="text-center">
            This action will completely remove this course and its modules.
            Still wish to proceed?
          </p>
          <Button
            fullWidth
            onClick={handleDeleteCourse}
            className="bg-red-500 text-white hover:bg-red-400 !h-9"
            disabled={deleteLoading}
          >
            {deleteLoading ? (
              <LoadinProgress className="!h-8 !w-8" />
            ) : (
              "Delete"
            )}
          </Button>
          <Button
            fullWidth
            onClick={handleCloseDialog}
            autoFocus
            variant="contained"
            className="bg-slate-200 text-accent hover:bg-slate-100 !h-9"
          >
            Cancel
          </Button>
        </Box>
      </Dialog>
    </>
  );
};

export default CoursePage;
