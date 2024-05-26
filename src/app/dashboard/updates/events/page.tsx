"use client";

import {
  Box,
  Button,
  IconButton,
  Input,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { MdCloudUpload, MdOutlineClose } from "react-icons/md";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LoadinProgress from "@/components/LoadingProgess";
import { useSnackbar } from "notistack";
import {
  createEvent,
  deleteEvent,
  fetchEvents,
  selectEvents,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { useRouter } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { FaPlus } from "react-icons/fa6";
import { TbTrash } from "react-icons/tb";

const dayjsDate = yup
  .mixed()
  .test("is-date", "${path} must be a valid date", (value: any) => {
    return dayjs(value).isValid();
  })
  .transform((value, originalValue) => {
    return dayjs(originalValue);
  });

const schema = yup.object().shape({
  title: yup.string().required(),
  about: yup.string().required(),
  venue: yup.string().required(),
  startDate: dayjsDate.required().label("Event start date"),
  endDate: dayjsDate.required().label("Event end date"),
  startTime: dayjsDate.required().label("Event start time"),
  endTime: dayjsDate.required().label("Event end time"),
});

type InputTypes = {
  title: string;
  about: string;
  venue: string;
  startDate: Dayjs | null | any;
  startTime: any | null;
  endDate: Dayjs | null | any;
  endTime: any | null;
};

const Events = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const eventState = useSelector(selectEvents);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [picture, setPicture] = React.useState<Blob | any>("");
  const [picUrl, setPicUrl] = React.useState<any>(null);
  const [imageError, setImageError] = React.useState<string | null>(null);
  const [requirements, setRequirements] = React.useState<string[]>([]);
  const [requirement, setRequirement] = React.useState("");
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<InputTypes>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      about: "",
      venue: "",
      startDate: null,
      startTime: dayjs("2010-11-11T00:00"),
      endDate: null,
      endTime: dayjs("2010-11-11T00:00"),
    },
  });

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleDeleteChoice = (index: number) => {
    const updatedChoices = [...requirements];
    updatedChoices.splice(index, 1);
    setRequirements(updatedChoices);
  };

  React.useEffect(() => {
    dispatch(fetchEvents())
      .unwrap()
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
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

  const handleCreateEvent = (data: InputTypes) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("about", data.about);
    formData.append("venue", data.venue);
    formData.append("type", "event");
    formData.append("startDate", data.startDate.toISOString());
    formData.append("startTime", data.startTime.toISOString());
    formData.append("endDate", data.endDate.toISOString());
    formData.append("endTime", data.endTime.toISOString());
    formData.append("coverImage", picture);
    for (let i = 0; i < requirements.length; i++) {
      formData.append(`requirements[${i}]`, requirements[i]);
    }
    setLoading(true);
    dispatch(createEvent(formData))
      .unwrap()
      .then((res) => {
        if (res.statusCode === 201) {
          enqueueSnackbar(res.message, { variant: "success" });
          setTimeout(() => {
            reset();
            handleCloseModal();
            setPicUrl(null);
            setPicture("");
            setRequirements([]);
          }, 500);
          dispatch(fetchEvents())
            .unwrap()
            .catch((err) => {
              enqueueSnackbar(err.message, { variant: "error" });
            });
        }
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeleteEvent = (id: string) => {
    dispatch(deleteEvent(id))
      .unwrap()
      .then((res) => {
        if (res.statusCode === 200) {
          dispatch(fetchEvents())
            .unwrap()
            .catch((err) => {
              enqueueSnackbar(err.message, { variant: "error" });
            });
        }
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
  };
  return (
    <div>
      <Button
        variant="contained"
        className="bg-primary hover:bg-primary/90 w-fit mt-4 !h-[46px]"
        size="large"
        onClick={handleOpenModal}
      >
        Add New Event
      </Button>
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
              sm: 900,
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
            Add Event
          </Typography>
          {/* <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(handleCreateEvent)}
            className=""
          >
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
                  label="Event ID"
                  variant="outlined"
                  fullWidth
                  size="small"
                  className="text-xs"
                  error={!!errors.title}
                  helperText={errors.title ? errors.title.message : ""}
                />
              )}
            />

            <Button
              type="submit"
              variant="contained"
              className="bg-primary hover:bg-primary/90 w-full mt-4 !h-[46px]"
              size="large"
              disabled={loading}
            >
              {loading ? <LoadinProgress /> : "Save"}
            </Button>
          </Box> */}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(handleCreateEvent)}
            className="mb-12"
          >
            <div className="flex  flex-col gap-6">
              <div className="w-full h-fit flex flex-col items-start">
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
                  name="about"
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
                      label="About the event"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                      size="small"
                      className="text-xs"
                      error={!!errors.about}
                      helperText={errors.about ? errors.about.message : ""}
                    />
                  )}
                />

                <Controller
                  name="venue"
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
                      label="Event venue"
                      variant="outlined"
                      fullWidth
                      size="small"
                      className="text-xs"
                      error={!!errors.venue}
                      helperText={errors.venue ? errors.venue.message : ""}
                    />
                  )}
                />
                <h1 className="text-secondary-foreground mt-4">Start date</h1>
                <Box className="flex items-center gap-2">
                  <Controller
                    name="startDate"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <DatePicker
                        value={field.value}
                        inputRef={field.ref}
                        onChange={(startDate) => {
                          field.onChange(startDate);
                        }}
                        sx={{
                          //   mt: 2,
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
                            error: !!errors.startDate,
                            helperText: errors.startDate
                              ? String(errors.startDate.message)
                              : undefined,
                          },
                        }}
                      />
                    )}
                  />
                  <Controller
                    name="startTime"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TimePicker
                        value={field.value}
                        inputRef={field.ref}
                        onChange={(startTime) => {
                          field.onChange(startTime);
                        }}
                        sx={{
                          //   mt: 2,
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
                            error: !!errors.startTime,
                            helperText: errors.startTime
                              ? String(errors.startTime.message)
                              : undefined,
                          },
                        }}
                      />
                    )}
                  />
                </Box>
                <h1 className="text-secondary-foreground mt-4">End date</h1>
                <Box className="flex items-center gap-2">
                  <Controller
                    name="endDate"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <DatePicker
                        value={field.value}
                        inputRef={field.ref}
                        onChange={(endDate) => {
                          field.onChange(endDate);
                        }}
                        sx={{
                          //   mt: 2,
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
                            error: !!errors.endDate,
                            helperText: errors.endDate
                              ? String(errors.endDate.message)
                              : undefined,
                          },
                        }}
                      />
                    )}
                  />
                  <Controller
                    name="endTime"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TimePicker
                        value={field.value}
                        inputRef={field.ref}
                        onChange={(endTime) => {
                          field.onChange(endTime);
                        }}
                        sx={{
                          //   mt: 2,
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
                            error: !!errors.endTime,
                            helperText: errors.endTime
                              ? String(errors.endTime.message)
                              : undefined,
                          },
                        }}
                      />
                    )}
                  />
                </Box>
                <div className="w-full flex items-center justify-between mt-4 gap-4">
                  <TextField
                    sx={{
                      input: {
                        color: "#021527",
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
                        py: "14px",
                      },
                      "& .MuiFormLabel-root": {
                        mt: "3px",
                      },
                    }}
                    inputProps={{ style: { height: 18 } }}
                    label="Add Choice"
                    variant="outlined"
                    fullWidth
                    size="small"
                    className="text-xs"
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    //   error={!!errors.requirements}
                    //   helperText={errors.requirements ? errors.requirements : ""}
                  />
                  {requirement && (
                    <IconButton
                      onClick={() => {
                        setRequirements([...requirements, requirement]);
                        setRequirement("");
                      }}
                    >
                      <FaPlus />
                    </IconButton>
                  )}
                </div>
                <div className="w-full flex flex-col items-start">
                  {requirements.map((requirement, index) => (
                    <div className="w-full flex items-center gap-1">
                      <p className="text-md font-medium">{index + 1}.</p>
                      <p className="text-secondary-foreground text-sm line-clamp-1">
                        {requirement}
                      </p>
                      <div className="flex items-center space-x-2">
                        <IconButton
                          onClick={() => {
                            handleDeleteChoice(index);
                          }}
                        >
                          <TbTrash />
                        </IconButton>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Button
              type="submit"
              variant="contained"
              className="bg-primary hover:bg-primary/90 w-full max-w-32 mt-4 !h-[46px]"
              disabled={loading}
            >
              {loading ? <LoadinProgress /> : "Save"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Events;
