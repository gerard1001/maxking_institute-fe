"use client";

import {
  createArticle,
  editArticle,
  fetchAllTags,
  fetchSingleArticle,
  selectArticles,
  selectTags,
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
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { MdCloudUpload, MdOutlineClose } from "react-icons/md";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "@/components/ReactQuill";
import LoadinProgress from "@/components/LoadingProgess";
import { ITag } from "@/lib/interfaces/tag.interface";
import { LuPlus } from "react-icons/lu";
import CreateTagForm from "@/components/CreateTagForm";
import { IoOptionsOutline } from "react-icons/io5";

const createArticleSchema = yup.object().shape({
  title: yup.string().required().min(5).max(40),
  description: yup.string().required().min(5).max(150),
  // body: yup.string().required(),
});

interface CreateArticleInputs {
  title: string;
  description: string;
  // body: string;
}

interface SingleArticleProps {
  params: {
    articleId: string;
  };
}

const AddNewArticle = ({ params: { articleId } }: SingleArticleProps) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const state = useSelector(selectTags);
  const articleState = useSelector(selectArticles);
  console.log(articleState.singleArticle, "articleState.singleArticle");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [picture, setPicture] = React.useState<Blob | any>("");
  const [picUrl, setPicUrl] = React.useState<any>(null);
  const [body, setBody] = React.useState("");
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
  const article = articleState.singleArticle;

  console.log(selectedNames, "selectedNames");
  const handleChange = (event: SelectChangeEvent<typeof selectedNames>) => {
    const {
      target: { value },
    } = event;
    setSelectedNames(typeof value === "string" ? value.split(",") : value);
  };

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<CreateArticleInputs>({
    resolver: yupResolver(createArticleSchema),
    defaultValues: {
      title: "",
      description: "",
      // body: "",
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
  }, []);

  React.useEffect(() => {
    dispatch(fetchSingleArticle(articleId))
      .unwrap()
      .catch((err: any) => {
        enqueueSnackbar(err.message, {
          variant: "error",
          preventDuplicate: true,
        });
      });
  }, [articleId]);

  React.useEffect(() => {
    const { title, description } = articleState.singleArticle;
    if (
      articleState.singleArticle.tags &&
      articleState.singleArticle.tags.length > 0
    ) {
      setSelectedNames(articleState.singleArticle.tags.map((tag) => tag.name));
    }
    title && setValue("title", title);
    description && setValue("description", description);
    setPicUrl(articleState.singleArticle.coverImage);
    setBody(articleState.singleArticle.body);
  }, [articleState]);

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

  const handleEditArticle = (data: any) => {
    if (!picture && !picUrl) {
      return setImageError("Please select a cover image");
    } else {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("body", body);
      if (picture) {
        formData.append("coverImage", picture);
      }
      for (let i = 0; i < selectedTags.length; i++) {
        formData.append(`tags[${i}]`, selectedTags[i].id);
      }

      dispatch(editArticle({ id: articleId, data: formData }))
        .unwrap()
        .then((res: any) => {
          console.log(res);
          if (res.statusCode === 200) {
            enqueueSnackbar(res.message, {
              variant: "success",
              preventDuplicate: true,
            });
          }
        })
        .catch((err: any) => {
          console.log(err);
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

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <div>
      {" "}
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(handleEditArticle)}
        className="mb-12"
      >
        <div className="flex gap-6">
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold ml-1 text-accent">
              Upload Cover Image
            </h1>
            <div className="flex flex-col items-center gap-2 w-fit">
              <img
                src={
                  picUrl
                    ? picUrl
                    : "https://www.pngkit.com/png/detail/2-23698_splash-png-image-color-splash-png-blue.png"
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
          <h1 className="text-xl font-semibold ml-1 text-accent flex gap-2 items-center">
            Article Tags{" "}
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
          <h1 className="text-xl font-semibold ml-1 text-accent">
            Article Content
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

export default AddNewArticle;
