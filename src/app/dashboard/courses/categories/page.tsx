"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import {
  Button,
  Dialog,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { FaPlus } from "react-icons/fa6";
import {
  createCategory,
  deleteCategory,
  fetchAOneCategory,
  fetchAllCategories,
  selectCategories,
  updateCategory,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { useSnackbar } from "notistack";
import { MdCloudUpload, MdOutlineClose } from "react-icons/md";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import LoadinProgress from "@/components/LoadingProgess";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoWarningOutline } from "react-icons/io5";
import { objectIsEmpty } from "@/lib/functions/object_check.function";

const schema = yup.object().shape({
  name: yup.string().required().min(3).max(20),
});

interface CreateCategoryInputs {
  name: string;
}

const Categories = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const state = useSelector(selectCategories);
  const [value, setValue] = React.useState("categories");
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [picture, setPicture] = React.useState<Blob | any>("");
  const [picUrl, setPicUrl] = React.useState<any>(null);
  const [imageError, setImageError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [categoryId, setCategoryId] = React.useState<string>("");
  const [onEdit, setOnEdit] = React.useState<boolean>(false);
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const category = state?.category;

  console.log(typeof category, "****");

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const {
    handleSubmit,
    control,
    setValue: setCategoryValue,
    reset,
    formState: { errors },
  } = useForm<CreateCategoryInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  React.useEffect(() => {
    dispatch(fetchAllCategories())
      .unwrap()
      .catch((err) => {
        enqueueSnackbar(err.message, {
          variant: "error",
          preventDuplicate: true,
        });
      });
  }, []);

  React.useEffect(() => {
    if (categoryId && categoryId !== "") {
      dispatch(fetchAOneCategory(categoryId))
        .unwrap()
        .catch((err) => {
          enqueueSnackbar(err.message, {
            variant: "error",
            preventDuplicate: true,
          });
        });
    }
  }, [categoryId]);

  React.useEffect(() => {
    if (typeof category === "object" && !objectIsEmpty(category) && onEdit) {
      const { name, image } = category;
      name && setCategoryValue("name", name);
      setPicUrl(image);
    }
  }, [state, onEdit]);

  React.useEffect(() => {
    if (picture) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setPicUrl(e.target.result);
      };
      reader.readAsDataURL(picture);
    }
  }, [picture]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  1;

  const handleSaveOrUpdateCategory = (data: any) => {
    setLoading(true);
    const formData = new FormData();
    if (onEdit) {
      if (picture && picture !== "") {
        formData.append("image", picture);
      }
      formData.append("name", data?.name);
      dispatch(updateCategory({ id: categoryId, data: formData }))
        .unwrap()
        .then((res) => {
          if (res.statusCode === 200) {
            enqueueSnackbar(res.message, {
              variant: "success",
              preventDuplicate: true,
            });
            setTimeout(() => {
              handleCloseModal();
            }, 1000);
            dispatch(fetchAllCategories())
              .unwrap()
              .catch((err) => {
                enqueueSnackbar(err.message, {
                  variant: "error",
                  preventDuplicate: true,
                });
              });
            dispatch(fetchAOneCategory(categoryId))
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
      }
      formData.append("name", data?.name);
      formData.append("image", picture);
      dispatch(createCategory(formData))
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
          dispatch(fetchAllCategories())
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

  const handleDeleteCategory = () => {
    setLoading(true);
    dispatch(deleteCategory(categoryId))
      .unwrap()
      .then((res) => {
        if (res.statusCode === 200) {
          enqueueSnackbar(res.message, {
            variant: "success",
            preventDuplicate: true,
          });
          setTimeout(() => {
            handleCloseDialog();
          }, 1000);
        } else {
          enqueueSnackbar(res.message, { variant: "error" });
        }
      })
      .catch((error) => {
        enqueueSnackbar(error.message, {
          variant: "error",
          preventDuplicate: true,
        });
        setTimeout(() => {
          handleCloseDialog();
        }, 1000);
      })
      .finally(() => {
        setLoading(false);
        dispatch(fetchAllCategories())
          .unwrap()
          .catch((err) => {
            enqueueSnackbar(err.message, { variant: "error" });
          });
      });
  };

  return (
    <div className="">
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab
            value="course"
            label="Courses"
            onClick={() => {
              router.push("/dashboard/courses");
            }}
          />
          <Tab
            value="categories"
            label="Categories"
            onClick={() => {
              router.push("/dashboard/courses/categories");
            }}
          />
          <Tab
            value="subjects"
            label="Subjects"
            onClick={() => {
              router.push("/dashboard/courses/subjects");
            }}
          />
        </Tabs>
      </Box>
      <Box className={`w-full flex flex-row-reverse py-4`}>
        <Button
          className="bg-secondary text-white"
          startIcon={<FaPlus />}
          onClick={handleOpenModal}
        >
          Create New category
        </Button>
      </Box>
      <Box className="w-full flex gap-4">
        <div className="min-h-[30vh] bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-[320px]">
          {state?.allCategories?.length === 0 ? (
            <div className="p-4">
              <h1 className="text-center text-xl text-accent font-bold">
                No categories yet
              </h1>
              <p
                className="text-center text-accent/50 hover:underline  hover:text-accent/80 cursor-pointer"
                onClick={handleOpenModal}
              >
                Add New
              </p>
            </div>
          ) : (
            <div>
              {state?.allCategories?.map((category, index) => {
                return (
                  <div key={category.id} className={`py-1`}>
                    <div
                      className={`p-1 pl-3 ${
                        activeIndex === index ? "bg-slate-300" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div
                          className="flex items-center gap-2 w-full cursor-pointer"
                          onClick={() => {
                            setActiveIndex(index);
                          }}
                        >
                          <img
                            src={category.image}
                            alt=""
                            className="w-[40px] p-1 aspect-square object-cover rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] fill-lime-700 bg-whhite bg-blend-multiply"
                          />
                          <p className="text-accent line-clamp-2 leading-4">
                            {category.name}
                          </p>
                        </div>
                        <IconButton
                          onClick={(
                            event: React.MouseEvent<HTMLButtonElement>
                          ) => {
                            handleClick(event);
                            setCategoryId(category.id);
                          }}
                        >
                          <HiDotsHorizontal />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="min-h-[30vh] bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-full p-4"></div>
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
            <Typography className="text-2xl font-semibold text-accent">
              Create Category
            </Typography>
          </Box>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(handleSaveOrUpdateCategory)}
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
                  label="Category Name"
                  variant="outlined"
                  fullWidth
                  size="small"
                  className="text-xs"
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : ""}
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
                  className="w-[100px] aspect-square object-cover rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
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
            handleOpenDialog();
            handleClose();
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
        <Box className="flex flex-col items-center justify-center gap-2 w-[440px] mx-auto p-4">
          <div className="w-fit p-4 rounded-full bg-red-200">
            <IoWarningOutline className="text-red-500 text-3xl font-semibold" />
          </div>
          <h1 className="text-xl font-semibold">Are you sure?</h1>
          <p className="text-center">
            This action will completely remove this category and cannot be
            undone. Still wish to proceed?
          </p>
          <Button
            fullWidth
            onClick={handleDeleteCategory}
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

export default Categories;
