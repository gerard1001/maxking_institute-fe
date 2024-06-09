"use client";

import { SuspenseLoading } from "@/components/SuspenseLoading";
import {
  createCollaborator,
  deleteCollaborator,
  fetchAOneCollaborator,
  fetchAllCollaborators,
  selectCollaborators,
  updateCollaborator,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdCloudUpload, MdOutlineClose } from "react-icons/md";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import LoadinProgress from "@/components/LoadingProgess";
import { objectIsEmpty } from "@/lib/functions/object_check.function";
import { IoWarningOutline } from "react-icons/io5";

const schema = yup.object().shape({
  name: yup.string().required().min(3).max(40),
  url: yup.string().required().min(3),
});

interface CreateCollabInputs {
  name: string;
  url: string;
}

const CollaboratorsPage = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const collabState = useSelector(selectCollaborators);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [onEdit, setOnEdit] = React.useState<boolean>(false);
  const [picture, setPicture] = React.useState<Blob | any>("");
  const [picUrl, setPicUrl] = React.useState<any>(null);
  const [imageError, setImageError] = React.useState<string | null>(null);
  const [collaboratorId, setCollaboratorId] = React.useState<string>("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  const {
    handleSubmit,
    control,
    setValue: setCollaboratorValue,
    reset,
    formState: { errors },
  } = useForm<CreateCollabInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    setLoading(true);
    dispatch(fetchAllCollaborators())
      .unwrap()
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  React.useEffect(() => {
    if (
      typeof collabState?.collaborator === "object" &&
      !objectIsEmpty(collabState?.collaborator) &&
      onEdit
    ) {
      const { name, image, url } = collabState?.collaborator;
      name && setCollaboratorValue("name", name);
      url && setCollaboratorValue("url", url);
      setPicUrl(image);
    }
  }, [collabState, onEdit]);

  React.useEffect(() => {
    if (!openModal) {
      setOnEdit(false);
      setCollaboratorValue("name", "");
      setCollaboratorValue("url", "");
      setPicUrl(null);
    }
  }, [openModal]);

  React.useEffect(() => {
    if (collaboratorId && collaboratorId !== "") {
      dispatch(fetchAOneCollaborator(collaboratorId))
        .unwrap()
        .catch((err) => {
          enqueueSnackbar(err.message, {
            variant: "error",
            preventDuplicate: true,
          });
        });
    }
  }, [collaboratorId]);

  React.useEffect(() => {
    if (picture) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setPicUrl(e.target.result);
      };
      reader.readAsDataURL(picture);
    }
  }, [picture]);

  const onSubmit = (data: CreateCollabInputs) => {
    const formData = new FormData();
    if (onEdit) {
      if (picture || picture !== "") {
        formData.append("image", picture);
        setLoading(true);
      }
      formData.append("name", data?.name);
      dispatch(updateCollaborator({ id: collaboratorId, data: formData }))
        .unwrap()
        .then((res) => {
          if (res.statusCode === 200) {
            enqueueSnackbar(res.message, {
              variant: "success",
              preventDuplicate: true,
            });
            reset();
            setCollaboratorValue("name", "");
            setPicUrl(null);
            setPicture("");
            setTimeout(() => {
              handleCloseModal();
            }, 500);
            dispatch(fetchAllCollaborators())
              .unwrap()
              .catch((err) => {
                enqueueSnackbar(err.message, {
                  variant: "error",
                  preventDuplicate: true,
                });
              });
            dispatch(fetchAOneCollaborator(collaboratorId))
              .unwrap()
              .catch((err) => {
                enqueueSnackbar(err.message, {
                  variant: "error",
                  preventDuplicate: true,
                });
              });
          }
        })
        .catch((err) => {
          enqueueSnackbar(err.message, {
            variant: "error",
            preventDuplicate: true,
          });
        })
        .finally(() => {
          setLoading(false);
          setOnEdit(false);
        });
    } else {
      if (!picture && !picUrl) {
        return setImageError("Please select a cover image");
      } else {
        setImageError(null);
        setLoading(true);
      }
      formData.append("name", data?.name);
      formData.append("url", data?.url);
      formData.append("image", picture);
      dispatch(createCollaborator(formData))
        .unwrap()
        .then((res) => {
          if (res.statusCode === 201) {
            enqueueSnackbar(res.message, {
              variant: "success",
              preventDuplicate: true,
            });
            setTimeout(() => {
              reset();
              setPicUrl(null);
              setPicture("");
            }, 500);
            setTimeout(() => {
              handleCloseModal();
            }, 1000);
          }
        })
        .catch((err) => {
          enqueueSnackbar(err.message, {
            variant: "error",
            preventDuplicate: true,
          });
        })
        .finally(() => {
          setLoading(false);
          dispatch(fetchAllCollaborators())
            .unwrap()
            .catch((err) => {
              enqueueSnackbar(err.message, {
                variant: "error",
                preventDuplicate: true,
              });
            });
        });
    }
  };

  const handleDeleteCollaborator = () => {
    if (collaboratorId) {
      setLoading(true);
      dispatch(deleteCollaborator(collaboratorId))
        .unwrap()
        .then((res) => {
          if (res.statusCode === 200) {
            enqueueSnackbar(res.message, { variant: "success" });
            dispatch(fetchAllCollaborators())
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
          handleCloseDialog();
        });
    }
  };
  return (
    <div>
      {loading ? (
        <div className="w-full h-screen flex flex-col items-center justify-center">
          <SuspenseLoading />
        </div>
      ) : (
        <>
          <h1 className="lg:text-3xl text-xl font-semibold text-secondary-foreground">
            Our collaborators
          </h1>
          <Button
            variant="contained"
            className="bg-primary hover:bg-primary/90 w-fit mt-4 !h-[46px]"
            size="large"
            onClick={handleOpenModal}
          >
            Add new Collaborator
          </Button>
          <div className="lg:p-10 p-2 flex items-start flex-wrap lg:gap-8 gap-2">
            {collabState?.allCollaborators?.map((collab) => {
              return (
                <div className="flex flex-col justify-center items-center p-3 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] relative hover:scale-105 ease-in transition-all duration-200 ">
                  <IconButton
                    className="absolute top-1 right-1 bg-zinc-300 hover:bg-zinc-400 z-50"
                    onClick={(
                      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
                    ) => {
                      setCollaboratorId(collab.id);
                      handleClick(event);
                    }}
                  >
                    <HiDotsHorizontal className="text-secondary-foreground text-base" />
                  </IconButton>
                  <a target="_blank" href={`${collab.url}`}>
                    <img
                      src={collab.image}
                      className="max-w-[180px] cursor-pointer"
                    />{" "}
                  </a>
                </div>
              );
            })}
          </div>
        </>
      )}{" "}
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
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "20px",
              position: "relative",
              pb: 2,
            }}
          >
            <Box className="flex items-center justify-end absolute top-0 right-0">
              <IconButton onClick={handleCloseModal} size="medium">
                <MdOutlineClose />
              </IconButton>
            </Box>
            <Typography className="md:text-2xl text-lg font-semibold text-accent">
              Add/Update Collaborator
            </Typography>
          </Box>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className=""
          >
            <Controller
              name="name"
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
                  label="Collaborator Name"
                  variant="outlined"
                  fullWidth
                  size="small"
                  className="text-xs"
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : ""}
                />
              )}
            />
            <Controller
              name="url"
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
                  label="Collaborator Url"
                  variant="outlined"
                  fullWidth
                  size="small"
                  className="text-xs"
                  error={!!errors.url}
                  helperText={errors.url ? errors.url.message : ""}
                />
              )}
            />
            <div className="flex flex-col mt-4">
              <div className="flex flex-col items-start gap-2 w-fit">
                <img
                  src={
                    picUrl
                      ? picUrl
                      : "https://res.cloudinary.com/rutagerard/image/upload/v1713800805/Important/manga_z8z1xs.png"
                  }
                  alt=""
                  className="w-auto h-[100px] object-cover rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
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
                    className="bg-secondary"
                  >
                    Upload
                  </Button>
                </label>
              </div>
            </div>
            <Button
              type="submit"
              variant="contained"
              className="bg-primary hover:bg-primary/90 w-full mt-4 !h-[46px]"
              size="large"
              disabled={loading}
            >
              {loading ? <LoadinProgress /> : "Save"}
            </Button>
          </Box>
        </Box>
      </Modal>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            handleOpenModal();
            setOnEdit(true);
          }}
        >
          Update
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            handleOpenDialog();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box className="flex flex-col items-center justify-center gap-2 md:w-[440px] w-[90%] mx-auto md:p-4 p-2">
          <div className="w-fit p-4 rounded-full bg-red-200">
            <IoWarningOutline className="text-red-500 text-3xl font-semibold" />
          </div>
          <h1 className="text-xl font-semibold">Are you sure?</h1>
          <p className="text-center">
            This action will completely remove this collaborator and cannot be
            undone. Still wish to proceed?
          </p>
          <Button
            fullWidth
            onClick={handleDeleteCollaborator}
            className="bg-red-500 text-white hover:bg-red-400 !h-9"
            disabled={loading}
          >
            {loading ? <LoadinProgress className="!h-8 !w-8" /> : "Delete"}
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

export default CollaboratorsPage;
