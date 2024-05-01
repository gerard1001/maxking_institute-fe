"use client";

import {
  deleteModule,
  fetchOneModule,
  selectModules,
  updateModule,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";
import { MdEdit, MdOutlineClose } from "react-icons/md";
import { TbTrash } from "react-icons/tb";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoWarningOutline } from "react-icons/io5";
import LoadinProgress from "@/components/LoadingProgess";
import { CreateModuleInputs } from "../../create-module/page";

const createModuleSchema = yup.object().shape({
  title: yup.string().required().min(5).max(150),
  description: yup.string().required().min(5).max(500),
});

interface SubjectProps {
  params: {
    module_id: string;
    course_id: string;
  };
}

const ModulePage = ({ params: { module_id, course_id } }: SubjectProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const state = useSelector(selectModules);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [picture, setPicture] = React.useState<Blob | any>("");
  const [picUrl, setPicUrl] = React.useState<any>(null);
  const [imageError, setImageError] = React.useState<string | null>(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState<boolean>(false);

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateModuleInputs>({
    resolver: yupResolver(createModuleSchema),
    defaultValues: {
      title: "",
      description: "",
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

  React.useEffect(() => {
    dispatch(fetchOneModule(module_id))
      .unwrap()
      .then((res: any) => {})
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
  }, [module_id]);

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
    const { title, description } = state.module;

    title && setValue("title", title);
    description && setValue("description", description);
  }, [state]);

  const handleSaveArticle = (data: CreateModuleInputs) => {
    if (!picture && !picUrl) {
      return setImageError("Please select a cover image");
    } else {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);

      dispatch(
        updateModule({
          id: module_id,
          data: {
            title: data.title,
            description: data.description,
          },
        })
      )
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
            dispatch(fetchOneModule(module_id))
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

  const handleDeleteModule = () => {
    setDeleteLoading(true);
    dispatch(deleteModule(module_id))
      .unwrap()
      .then((res: any) => {
        if (res.statusCode === 200) {
          enqueueSnackbar(res.message, {
            variant: "success",
            preventDuplicate: true,
          });
          setTimeout(() => {
            handleCloseDialog();
            router.push(`/dashboard/courses/${course_id}`);
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
            onClick={() => {
              router.push(`/dashboard/courses/${module_id}/create-module`);
            }}
          >
            Add module
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
        {state.module && (
          <div className="p-6 max-w-[900px] mx-auto rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white">
            <div className="w-full">
              <div className="flex gap-3 pt-6">
                <div className="w-full">
                  <h1 className="text-accent text-xl leading-6 font-semibold mb-2">
                    {state.module.title}
                  </h1>
                  <p className="text-accent leading-6">
                    {state.module.description}
                  </p>
                </div>
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
              Edit Module
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
                <div className="w-full h-fit flex flex-col items-start">
                  <h1 className="text-xl font-semibold ml-1 text-accent">
                    Module Details
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
            This action will completely remove this module and its modules.
            Still wish to proceed?
          </p>
          <Button
            fullWidth
            onClick={handleDeleteModule}
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

export default ModulePage;
