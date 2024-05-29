"use client";

import {
  Box,
  Button,
  Dialog,
  Drawer,
  IconButton,
  Input,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { MdCloudUpload, MdEdit, MdOutlineClose } from "react-icons/md";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LoadinProgress from "@/components/LoadingProgess";
import { useSnackbar } from "notistack";
import {
  createEvent,
  deleteEvent,
  fetchEvents,
  fetchSingleEvent,
  selectEvents,
  updateEvent,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { useRouter } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { FaPlus, FaTrashCan } from "react-icons/fa6";
import { TbTrash } from "react-icons/tb";
import { objectIsEmpty } from "@/lib/functions/object_check.function";
import { IoWarningOutline } from "react-icons/io5";
import { set } from "date-fns";

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
  const [requirements, setRequirements] = React.useState<string[]>([]);
  const [requirement, setRequirement] = React.useState("");
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [eventId, setEventId] = React.useState<string>("");
  const [openDialog, setOpenDialog] = React.useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState<boolean>(false);

  const openServiceDrawer = () => {
    setOpenDrawer(true);
  };
  const closeServiceDrawer = () => {
    setOpenDrawer(false);
  };

  const {
    handleSubmit,
    control,
    reset,
    setValue,
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

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

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

  React.useEffect(() => {
    if (eventId) {
      dispatch(fetchSingleEvent(eventId))
        .unwrap()
        .then((res) => {
          if (res.statusCode === 200) {
            setValue("title", res.data.title);
            setValue("about", res.data.about);
            setValue("venue", res.data.venue);
            setValue("startDate", dayjs(res.data.startDate));
            setValue("startTime", dayjs(res.data.startTime));
            setValue("endDate", dayjs(res.data.endDate));
            setValue("endTime", dayjs(res.data.endTime));
            setPicUrl(res.data.coverImage);
            setRequirements(
              res.data.requirements && JSON.parse(res.data.requirements)
            );
          }
        })
        .catch((err) => {
          enqueueSnackbar(err.message, { variant: "error" });
        });

      // setValue("title", eventState?.event?.title);
      // setValue("about", eventState?.event?.about);
      // setValue("venue", eventState?.event?.venue);
      // setValue("startDate", dayjs(eventState?.event?.startDate));
      // setValue("startTime", dayjs(eventState?.event?.startTime));
      // setValue("endDate", dayjs(eventState?.event?.endDate));
      // setValue("endTime", dayjs(eventState?.event?.endTime));
      // setPicUrl(eventState?.event?.coverImage);
      // setRequirements(
      //   JSON.parse(eventState?.event?.requirements)?.map((req) => req)
      // );
    }
  }, [eventId]);

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

  const handleDeleteEvent = () => {
    if (eventId) {
      setDeleteLoading(true);
      dispatch(deleteEvent(eventId))
        .unwrap()
        .then((res) => {
          if (res.statusCode === 200) {
            handleCloseDialog();
            closeServiceDrawer();
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
          setDeleteLoading(false);
        });
    }
  };

  const handleUpdateEvent = (data: InputTypes) => {
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
    dispatch(updateEvent({ id: eventId, data: formData }))
      .unwrap()
      .then((res) => {
        if (res.statusCode === 200) {
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
  return (
    <div>
      <Button
        variant="contained"
        className="bg-primary hover:bg-primary/90 w-fit mt-4 !h-[46px]"
        size="large"
        onClick={() => {
          setEventId("");
          handleOpenModal();
        }}
      >
        Add New Event
      </Button>

      <div className="flex gap-4 justify-center py-10">
        {eventState?.allEvents
          ?.filter((event) => event.type === "event")
          .map((event) => (
            <div className="flex flex-col gap-2 max-w-[250px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg">
              <img
                src={event.coverImage}
                alt=""
                className="w-full aspect-video object-cover rounded-t-lg shadow-sm cursor-pointer"
                onClick={() => {
                  setEventId(event.id);
                  openServiceDrawer();
                }}
              />
              <div className="px-2 pb-2">
                <Typography className="text-xl font-semibold text-accent line-clamp-1">
                  {event.title}
                </Typography>
                <Typography className="text-sm text-secondary-foreground mb-2 line-clamp-2">
                  {event.about}
                </Typography>
                <div className="flex gap-1">
                  <Typography className="text-sm font-bold text-secondary-foreground w-11">
                    Venue:
                  </Typography>

                  <Typography className="text-sm text-secondary-foreground">
                    {event.venue}
                  </Typography>
                </div>
                <div className="flex gap-1">
                  <Typography className="text-sm font-bold text-secondary-foreground w-11">
                    Starts:
                  </Typography>

                  <div className="">
                    <Typography className="text-sm text-secondary-foreground">
                      {dayjs(event.startDate).format("dddd, MMMM D, YYYY")}
                    </Typography>
                    <Typography className="text-sm text-secondary-foreground">
                      {dayjs(event.startTime).format("hh:mm A")}
                    </Typography>
                  </div>
                </div>

                <div className="flex gap-1">
                  <Typography className="text-sm font-bold text-secondary-foreground w-11">
                    Ends:
                  </Typography>

                  <div className="">
                    <Typography className="text-sm text-secondary-foreground">
                      {dayjs(event.endDate).format("dddd, MMMM D, YYYY")}
                    </Typography>
                    <Typography className="text-sm text-secondary-foreground">
                      {dayjs(event.endTime).format("hh:mm A")}
                    </Typography>
                  </div>
                </div>

                <div className="flex gap-4">
                  {/* <Button
                  variant="contained"
                  className="bg-primary hover:bg-primary/90 w-fit mt-4 !h-[46px]"
                  size="large"
                  onClick={() => handleDeleteEvent(event.id)}
                >
                  Delete
                </Button> */}
                </div>
              </div>{" "}
            </div>
          ))}
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
            {eventId ? "Update" : "Add"} Event
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
            onSubmit={handleSubmit(
              eventId ? handleUpdateEvent : handleCreateEvent
            )}
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
                    label="Add Requirement"
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
                  {requirements?.map((requirement, index) => (
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
              {loading ? <LoadinProgress /> : eventId ? "Update" : "Save"}
            </Button>
          </Box>
        </Box>
      </Modal>
      <Drawer
        open={openDrawer}
        onClose={closeServiceDrawer}
        className=""
        anchor="right"
      >
        <div className="max-w-[600px] min-w-[440px] w-full relative">
          <div className="sticky top-0 left-0 right-0 flex justify-between items-center px-6 backdrop-blur-sm bg-white/30 border-b z-50">
            <h1 className="text-xl font-bold text-secondary-foreground">
              Event details
            </h1>
            <IconButton onClick={closeServiceDrawer} className="">
              <MdOutlineClose className="" />
            </IconButton>
          </div>
          {eventState?.event && !objectIsEmpty(eventState?.event) && (
            <div className="p-10 pt-4">
              <div className="flex gap-3 items-center pb-4">
                <IconButton className="bg-black/20" onClick={handleOpenModal}>
                  <MdEdit className="text-blue-600 text-lg" />
                </IconButton>
                <IconButton className="bg-black/20" onClick={handleOpenDialog}>
                  <FaTrashCan className="text-red-600 text-lg" />
                </IconButton>
              </div>
              <h1 className="text-xl text-center font-bold text-secondary-foreground">
                {eventState?.event?.title}
              </h1>
              <img
                src={eventState?.event?.coverImage}
                alt=""
                className="w-[90%] max-w-[440px] mx-auto my-4"
              />
              <Typography className="mb-4">
                {eventState?.event?.about}
              </Typography>
              <div className="flex gap-1">
                <Typography className="font-bold text-secondary-foreground w-11">
                  Venue:
                </Typography>

                <Typography className="text-secondary-foreground">
                  {eventState?.event?.venue}
                </Typography>
              </div>
              <div className="flex gap-1">
                <Typography className="font-bold text-secondary-foreground w-11">
                  Starts:
                </Typography>

                <div className="">
                  <Typography className="text-secondary-foreground">
                    {dayjs(eventState?.event?.startDate).format(
                      "dddd, MMMM D, YYYY"
                    )}
                  </Typography>
                  <Typography className="text-secondary-foreground">
                    {dayjs(eventState?.event?.startTime).format("hh:mm A")}
                  </Typography>
                </div>
              </div>

              <div className="flex gap-1">
                <Typography className="font-bold text-secondary-foreground w-11">
                  Ends:
                </Typography>

                <div className="">
                  <Typography className="text-secondary-foreground">
                    {dayjs(eventState?.event?.endDate).format(
                      "dddd, MMMM D, YYYY"
                    )}
                  </Typography>
                  <Typography className="text-secondary-foreground">
                    {dayjs(eventState?.event?.endTime).format("hh:mm A")}
                  </Typography>
                </div>
              </div>
              <h1 className="text-xl font-bold text-secondary-foreground mt-4">
                Requirements
              </h1>
              <ul className="list-disc">
                {JSON.parse(eventState?.event?.requirements)?.map(
                  (requ: string) => (
                    <li>{requ}</li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>
      </Drawer>

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
            This action will completely remove this Event and cannot be undone.
            Still wish to proceed?
          </p>
          <Button
            fullWidth
            onClick={handleDeleteEvent}
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
    </div>
  );
};

export default Events;
