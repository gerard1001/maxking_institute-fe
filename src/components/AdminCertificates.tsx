"use client";

import { LoginContext } from "@/lib/context/LoginContext";
import { objectIsEmpty } from "@/lib/functions/object_check.function";
import {
  createCertificate,
  deleteCertificate,
  fetchAllCourses,
  fetchOneCourse,
  fetchUserById,
  selectCourses,
  selectUsers,
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
import { BsFillTrashFill } from "react-icons/bs";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { FaCamera } from "react-icons/fa6";
import { set } from "date-fns";

const schema = yup.object().shape({
  nameOne: yup.string().required().min(5).max(40),
  positionOne: yup.string().required().min(5).max(40),
  nameTwo: yup.string().optional().nullable().max(150),
  positionTwo: yup.string().optional().nullable().max(500),
});

interface CreateCertificateInputs {
  nameOne: string;
  positionOne: string;
  nameTwo?: string | null;
  positionTwo?: string | null;
}

const AdminCertificates = React.memo(() => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const courseState = useSelector(selectCourses);
  const router = useRouter();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [pictureOne, setPictureOne] = React.useState<Blob | any>("");
  const [picUrlOne, setPicUrlOne] = React.useState<any>(null);
  const [pictureTwo, setPictureTwo] = React.useState<Blob | any>("");
  const [picUrlTwo, setPicUrlTwo] = React.useState<any>(null);
  const [imageOneError, setImageOneError] = React.useState<string | null>(null);
  const [imageTwoError, setImageTwoError] = React.useState<string | null>(null);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [courseId, setCourseId] = React.useState<string>("");
  const [editing, setEditing] = React.useState<boolean>(false);
  const openMenu = Boolean(anchorEl);

  const { isClient, userId, loginData } = React.useContext(LoginContext);

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateCertificateInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      nameOne: "",
      positionOne: "",
      nameTwo: null,
      positionTwo: null,
    },
  });

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    dispatch(fetchAllCourses())
      .unwrap()
      .then((res) => {})
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });

    if (loginData && !objectIsEmpty(loginData)) {
      dispatch(fetchUserById(loginData.id))
        .unwrap()
        .catch((err: any) => {
          enqueueSnackbar(err.message, {
            variant: "error",
            preventDuplicate: true,
          });
        });
    }

    if (userId) {
      dispatch(fetchUserById(userId))
        .unwrap()
        .catch((err: any) => {
          enqueueSnackbar(err.message, {
            variant: "error",
            preventDuplicate: true,
          });
        });
    }
  }, []);

  React.useEffect(() => {
    if (courseId) {
      dispatch(fetchOneCourse(courseId))
        .unwrap()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          enqueueSnackbar(err.message, { variant: "error" });
        });
    }
  }, [courseId]);

  React.useEffect(() => {
    if (editing) {
      setValue(
        "nameOne",
        courseState?.course?.certificate?.issuers &&
          JSON.parse(courseState?.course?.certificate?.issuers)[0]?.name
      );
      setValue(
        "positionOne",
        courseState?.course?.certificate?.issuers &&
          JSON.parse(courseState?.course?.certificate?.issuers)[0]?.position
      );
      setValue(
        "nameTwo",
        courseState?.course?.certificate?.issuers &&
          JSON.parse(courseState?.course?.certificate?.issuers)[1]?.name
      );
      setValue(
        "positionTwo",
        courseState?.course?.certificate?.issuers &&
          JSON.parse(courseState?.course?.certificate?.issuers)[1]?.position
      );
      if (
        courseState?.course?.certificate?.issuers &&
        JSON.parse(courseState?.course?.certificate?.issuers)[0]?.signature
      ) {
        setPicUrlOne(
          JSON.parse(courseState?.course?.certificate?.issuers)[0]?.signature
        );
      }
      if (
        courseState?.course?.certificate?.issuers &&
        JSON.parse(courseState?.course?.certificate?.issuers)[1]?.signature
      ) {
        setPicUrlTwo(
          JSON.parse(courseState?.course?.certificate?.issuers)[1]?.signature
        );
      }

      console.log(
        "editing",
        courseState?.course?.certificate?.issuers,
        JSON.parse(courseState?.course?.certificate?.issuers)[1]?.signature
      );
      console.log(
        "editing",
        JSON.parse(courseState?.course?.certificate?.issuers)[1]?.signature
      );
    } else {
      reset();
      setPicUrlOne(null);
      setPicUrlTwo(null);
    }
  }, [editing]);

  React.useEffect(() => {
    if (pictureOne) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setPicUrlOne(e.target.result);
      };
      reader.readAsDataURL(pictureOne);
    }

    if (picUrlOne) {
      setImageOneError(null);
    }
  }, [pictureOne]);

  React.useEffect(() => {
    if (pictureTwo) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setPicUrlTwo(e.target.result);
      };
      reader.readAsDataURL(pictureTwo);
    }
  }, [pictureTwo]);

  React.useEffect(() => {
    if (!openModal) {
      setEditing(false);
    }
  }, [openModal]);

  const handleSubmitCertificate = (data: CreateCertificateInputs) => {
    if (!pictureOne && !picUrlOne) {
      return setImageOneError("Please upload a signature image");
    } else {
      const formData = new FormData();
      formData.append("issuers[name][0]", data.nameOne);
      formData.append("issuers[position][0]", data.positionOne);
      formData.append("signature[0]", pictureOne);
      if (data.nameTwo && data.positionTwo && pictureTwo && !editing) {
        formData.append("issuers[name][1]", data.nameTwo);
        formData.append("issuers[position][1]", data.positionTwo);
        formData.append("signature[1]", pictureTwo);
      } else if (editing && data.nameTwo && data.positionTwo) {
        data.nameTwo && formData.append("issuers[name][1]", data.nameTwo);
        data.positionTwo &&
          formData.append("issuers[position][1]", data.positionTwo);
        pictureTwo && formData.append("signature[1]", pictureTwo);
      }

      setLoading(true);
      dispatch(createCertificate({ courseId, data: formData }))
        .unwrap()
        .then((res) => {
          if (res.statusCode === 201) {
            enqueueSnackbar(res.message, { variant: "success" });
            setTimeout(() => {
              reset();
              setPictureOne("");
              setPictureTwo("");
              setPicUrlOne(null);
              setPicUrlTwo(null);
              handleCloseModal();

              dispatch(fetchAllCourses())
                .unwrap()
                .catch((err) => {
                  enqueueSnackbar(err.message, { variant: "error" });
                });
              dispatch(fetchOneCourse(courseId))
                .unwrap()
                .catch((err) => {
                  enqueueSnackbar(err.message, { variant: "error" });
                });
            }, 500);
          }
        })
        .catch((err) => {
          enqueueSnackbar(err.message, { variant: "error" });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleDeleteCertificate = () => {
    setLoading(true);
    dispatch(deleteCertificate(courseState?.course?.certificate?.id))
      .unwrap()
      .then((res) => {
        if (res.statusCode === 200) {
          setEditing(false);
          enqueueSnackbar(res.message, { variant: "success" });
          dispatch(fetchAllCourses())
            .unwrap()
            .catch((err) => {
              enqueueSnackbar(err.message, { variant: "error" });
            });
          dispatch(fetchOneCourse(courseId))
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
      {courseState.allCourses?.length > 0 ? (
        <div>
          <h1 className="uppercase text-secondary text-xl font-semibold mb-5 lg:text-left text-center">
            Actions for course certificates
          </h1>
          <div className="flex flex-wrap md:justify-normal justify-center gap-4">
            {courseState?.allCourses?.map((course) => {
              return (
                <div
                  key={course.id}
                  className="xs:w-[350px] w-full aspect-video rounded-lg inset-0 relative"
                >
                  <img
                    src={course.coverImage}
                    alt=""
                    className="w-full h-full rounded-lg"
                  />
                  <IconButton
                    className="bg-slate-200/50 hover:bg-slate-300/30 absolute top-2 right-2 z-20"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                      setCourseId(course.id);
                      handleClick(event);
                    }}
                  >
                    <HiDotsHorizontal className="text-white text-lg" />
                  </IconButton>
                  <div className="flex flex-col justify-center w-[80%] max-w-[550px] aspect-[16/7] absolute xxs:top-[50%] top-[60%] left-[50%] -translate-x-2/4 -translate-y-2/4 text-white p-2 z-10 bg-black/65">
                    <div className="flex flex-col items-center justify-center">
                      <h1 className="sm:text-lg text-base text-center max-w-[500px] pb-3 line-clamp-2">
                        {course.title}
                      </h1>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          <h1 className="uppercase text-secondary text-xl font-semibold mb-5">
            No courses added yet
          </h1>
          <Button
            variant="contained"
            className="bg-primary hover:bg-primary/90 w-fit my-4 !h-[46px]"
            onClick={() => {
              router.push(`/dashboard/courses`);
            }}
          >
            Add courses
          </Button>
        </div>
      )}{" "}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-name"
        aria-describedby="modal-modal-position"
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
          <Box className="flex items-center justify-between border-b mb-4">
            <Typography className="text-2xl font-semibold text-accent">
              Add certificate issuers to course
            </Typography>
            <IconButton onClick={handleCloseModal} size="medium">
              <MdOutlineClose />
            </IconButton>
          </Box>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(handleSubmitCertificate)}
            className=""
          >
            <Box>
              <h1 className="my-3 text-lg text-secondary-foreground font-semibold">
                First Certificate Issuer Info (Required)
              </h1>
              <div
                className="p-4 w-fit bg-[#e8f0fe] relative overflow-hidden cursor-pointer aspect-square rounded-full"
                id="profile-pictureOne"
              >
                {picUrlOne ? (
                  <img
                    className="w-24 h-24 object-cover"
                    src={picUrlOne}
                    alt=""
                  />
                ) : (
                  <FaCamera className="lg:text-4xl text-xl text-secondary-foreground/30" />
                )}
                <input
                  onChange={(e: any) => {
                    setPictureOne(e.target.files[0]);
                  }}
                  id="pictureOne"
                  type="file"
                  accept="image/*"
                  className="w-full h-full absolute top-0 left-0 opacity-0 z-20 cursor-pointer"
                />
              </div>
              {imageOneError ? (
                <div className="text-[#d32f2f] text-xs">{imageOneError}</div>
              ) : (
                <h1 className="text-accent text-sm">Upload signature image</h1>
              )}
              <Controller
                name="nameOne"
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
                    label="Names"
                    variant="outlined"
                    fullWidth
                    size="small"
                    className="text-xs"
                    error={!!errors.nameOne}
                    helperText={errors.nameOne ? errors.nameOne.message : ""}
                  />
                )}
              />
              <Controller
                name="positionOne"
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
                    label="Names"
                    variant="outlined"
                    fullWidth
                    size="small"
                    className="text-xs"
                    error={!!errors.positionOne}
                    helperText={
                      errors.positionOne ? errors.positionOne.message : ""
                    }
                  />
                )}
              />
            </Box>
            <Box>
              <h1 className="my-3 text-lg text-secondary-foreground font-semibold">
                Second Certificate Issuer Info (optional)
              </h1>
              <div
                className="p-4 w-fit bg-[#e8f0fe] relative overflow-hidden cursor-pointer aspect-square rounded-full"
                id="profile-pictureTwo"
              >
                {picUrlTwo ? (
                  <img
                    className="w-24 h-24 object-cover"
                    src={picUrlTwo}
                    alt=""
                  />
                ) : (
                  <FaCamera className="lg:text-4xl text-xl text-secondary-foreground/30" />
                )}
                <input
                  onChange={(e: any) => {
                    setPictureTwo(e.target.files[0]);
                  }}
                  id="pictureTwo"
                  type="file"
                  accept="image/*"
                  className="w-full h-full absolute top-0 left-0 opacity-0 z-20 cursor-pointer"
                />
              </div>
              {imageTwoError ? (
                <div className="text-[#d32f2f] text-xs">{imageTwoError}</div>
              ) : (
                <h1 className="text-accent text-sm">Upload signature image</h1>
              )}
              <Controller
                name="nameTwo"
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
                    label="Names"
                    variant="outlined"
                    fullWidth
                    size="small"
                    className="text-xs"
                    error={!!errors.nameTwo}
                    helperText={errors.nameTwo ? errors.nameTwo.message : ""}
                  />
                )}
              />
              <Controller
                name="positionTwo"
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
                    label="Names"
                    variant="outlined"
                    fullWidth
                    size="small"
                    className="text-xs"
                    error={!!errors.positionTwo}
                    helperText={
                      errors.positionTwo ? errors.positionTwo.message : ""
                    }
                  />
                )}
              />
            </Box>
            <Box>
              <Box className="flex items-center justify-between mt-4">
                <Button
                  variant="contained"
                  className="bg-primary hover:bg-primary/90 md:min-w-[150px] w-fit"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Save"}
                </Button>
                <Button
                  variant="contained"
                  className="bg-secondary hover:bg-secondary/90 w-fit"
                  onClick={handleCloseModal}
                >
                  Cancel
                </Button>
              </Box>
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
        {!courseState?.course?.certificate ? (
          <MenuItem
            onClick={() => {
              handleClose();
              handleOpenModal();
            }}
          >
            <FaPlus className="text-base mr-2" />
            Add certificate
          </MenuItem>
        ) : (
          <>
            <MenuItem
              onClick={() => {
                handleClose();
                handleOpenModal();
                setEditing(true);
              }}
            >
              <FaRegEdit className="text-base mr-2" />
              Edit certificate
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                handleDeleteCertificate();
              }}
            >
              <BsFillTrashFill className="text-base mr-2" />
              Remove certificate
            </MenuItem>
          </>
        )}
      </Menu>
    </div>
  );
});

export default AdminCertificates;
