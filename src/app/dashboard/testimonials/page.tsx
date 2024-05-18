"use client";

import LoadinProgress from "@/components/LoadingProgess";
import {
  createTestimonial,
  deleteTestimonial,
  fetchTestimonials,
  selectTestimonials,
  togglePinTestimonial,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { MdOutlineClose, MdOutlineMoreVert } from "react-icons/md";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaRegEdit } from "react-icons/fa";
import { BsFillTrashFill } from "react-icons/bs";
import { GiPin } from "react-icons/gi";
import { LuPin } from "react-icons/lu";
import { LoginContext } from "@/lib/context/LoginContext";

const schema = yup.object().shape({
  text: yup.string().required().min(10).max(1000),
});

type CreateTestimonialInputs = {
  text: string;
};

const Testimonials = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const testimonialState = useSelector(selectTestimonials);
  const { enqueueSnackbar } = useSnackbar();
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [testimonialId, setTestimonialId] = React.useState<string>("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const { isClient, userId } = React.useContext(LoginContext);

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateTestimonialInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      text: "",
    },
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  React.useEffect(() => {
    dispatch(fetchTestimonials())
      .unwrap()
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
  }, []);

  const handleSaveTestimonial = (data: CreateTestimonialInputs) => {
    dispatch(createTestimonial(data))
      .unwrap()
      .then((res) => {
        if (res.statusCode === 201) {
          enqueueSnackbar(res.message, {
            variant: "success",
          });
          reset();
          handleCloseModal();
          dispatch(fetchTestimonials());
        }
      })
      .catch((error: any) => {
        enqueueSnackbar(error.message, {
          variant: "error",
        });
      });
  };

  const handleDeleteTestimonial = () => {
    if (testimonialId) {
      dispatch(deleteTestimonial(testimonialId))
        .unwrap()
        .then((res) => {
          if (res.statusCode === 200) {
            enqueueSnackbar(res.message, {
              variant: "success",
            });
            dispatch(fetchTestimonials());
          }
        })
        .catch((error: any) => {
          enqueueSnackbar(error.message, {
            variant: "error",
          });
        });
    }
  };

  const handleTogglePinTestimonial = (id: string) => {
    dispatch(togglePinTestimonial(id))
      .unwrap()
      .then((res) => {
        if (res.statusCode === 200) {
          enqueueSnackbar(res.message, {
            variant: "success",
          });
          dispatch(fetchTestimonials());
        }
      })
      .catch((error: any) => {
        enqueueSnackbar(error.message, {
          variant: "error",
        });
      });
  };

  return (
    <div>
      <div className="py-4">
        <Button className={`bg-secondary text-white`} onClick={handleOpenModal}>
          Write something about us
        </Button>
      </div>
      {/* <div className="flex flex-wrap gap-2 h-auto pt-6"> */}
      <div className="columns-3xs gap-3 overflow-y-scroll">
        {testimonialState.allTestimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className={`shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md p-6 w-full max-w-[320px] mb-4 
            ${userId !== testimonial.user.id ? "bg-secondary/20" : "bg-white"}
            `}
          >
            <div className="flex items-center">
              <div className="flex items-center pb-4 w-full">
                <img
                  src={testimonial.user.profile.picture}
                  alt="author image"
                  className="w-7 aspect-square rounded-full object-cover cursor-pointer"
                />
                <div className="ml-2">
                  <h1 className="text-accent text-lg font-semibold">
                    {testimonial.user.firstName} {testimonial.user.lastName}
                  </h1>
                  <p className="text-muted text-xs">
                    {new Date(testimonial.createdAt).toDateString()}
                  </p>
                </div>
              </div>
              {!isClient && (
                <IconButton
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    setTestimonialId(testimonial.id);
                    handleClick(event);
                  }}
                >
                  <MdOutlineMoreVert className="text-accent text-lg" />
                </IconButton>
              )}
            </div>
            {testimonial.isPinned && (
              <GiPin className="text-2xl mb-2 text-primary" />
            )}
            {/* <h1>{testimonial.text}</h1> */}
            <p className="text-sm leading-tight">
              <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">
                "
              </span>
              {testimonial.text}
              <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">
                "
              </span>
            </p>
          </div>
        ))}
      </div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
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
              Add a testimonial
            </Typography>
            <IconButton onClick={handleCloseModal} size="medium">
              <MdOutlineClose />
            </IconButton>
          </Box>
          <Box>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(handleSaveTestimonial)}
              className="mb-12"
            >
              <div className="flex  flex-col gap-6">
                <div className="w-full h-fit flex flex-col items-start">
                  <Controller
                    name="text"
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
                        multiline
                        maxRows={4}
                        minRows={4}
                        size="small"
                        className="text-xs"
                        error={!!errors.text}
                        helperText={errors.text ? errors.text.message : ""}
                      />
                    )}
                  />
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
        </Box>
      </Modal>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {/* <MenuItem
          onClick={() => {
            handleClose();
          }}
        >
          <FaRegEdit className="text-base mr-2" />
          Edit
        </MenuItem> */}

        <MenuItem
          onClick={() => {
            handleTogglePinTestimonial(testimonialId);
            handleClose();
          }}
        >
          <LuPin className="text-base mr-2" />
          Pin/Unpin
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleDeleteTestimonial();
            handleClose();
          }}
        >
          <BsFillTrashFill className="text-base mr-2" />
          Remove
        </MenuItem>
      </Menu>{" "}
    </div>
  );
};

export default Testimonials;
