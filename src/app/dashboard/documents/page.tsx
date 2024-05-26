"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  createDocument,
  deleteDocument,
  fetchDocuments,
  selectArticles,
  selectDocuments,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { useSnackbar } from "notistack";
import {
  Box,
  Button,
  Dialog,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { MdOutlineClose } from "react-icons/md";
import { Controller, useForm } from "react-hook-form";
import LoadinProgress from "@/components/LoadingProgess";
import { LoginContext } from "@/lib/context/LoginContext";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import { Document, Page, pdfjs } from "react-pdf";
import PDFViewer from "@/lib/utils/pdfToImage";
import { FaEye, FaTrashCan } from "react-icons/fa6";
import { IoWarningOutline } from "react-icons/io5";

const schema = yup.object().shape({
  authorName: yup.string().required().min(3).max(100),
  title: yup.string().required().min(3).max(100),
  summary: yup.string().required().min(3).max(1000),
  price: yup.number().required(),
  type: yup.string().required().oneOf(["book", "publication"]),
});

type CreateDocumentInputs = {
  authorName: string;
  title: string;
  summary: string;
  price: number;
  type: string;
};

const Documents = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const documentState = useSelector(selectDocuments);
  const { enqueueSnackbar } = useSnackbar();

  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [docId, setDocId] = React.useState<string>("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const { isClient, userId } = React.useContext(LoginContext);

  const [openDialog, setOpenDialog] = React.useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState<boolean>(false);
  const [file, setFile] = React.useState(null);

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateDocumentInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      authorName: "",
      title: "",
      summary: "",
      price: 0,
      type: "book",
    },
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  React.useEffect(() => {
    dispatch(fetchDocuments())
      .unwrap()
      .then((data) => {
        console.log(data, "documents");
      })
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: "error" });
      });
  }, []);
  console.log(documentState, "documentState");

  const handleDeleteDocument = () => {
    if (!docId) return;
    setDeleteLoading(true);
    dispatch(deleteDocument(docId))
      .unwrap()
      .then((res) => {
        if (res.statusCode === 200) {
          enqueueSnackbar(res.message, { variant: "success" });
          handleCloseDialog();
          dispatch(fetchDocuments());
        }
      })
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: "error" });
      })
      .finally(() => {
        setDeleteLoading(false);
      });
  };

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleSaveDocument = (data: CreateDocumentInputs) => {
    if (!file) {
      alert("Please select a PDF file first.");
      return;
    }
    console.log(data, "data");
    console.log(file, "file");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", data.title);
    formData.append("authorName", data.authorName);
    formData.append("summary", data.summary);
    formData.append("price", data.price.toString());
    formData.append("type", data.type);

    setLoading(true);

    dispatch(createDocument(formData))
      .unwrap()
      .then((res) => {
        console.log(res, "res");
        if (res.statusCode === 201) {
          enqueueSnackbar(res.message, { variant: "success" });
          reset();
          handleCloseModal();
          dispatch(fetchDocuments());
        }
      })
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div>
      <div>
        {!isClient && (
          <Button
            className={`bg-secondary text-white`}
            onClick={handleOpenModal}
          >
            Add Document
          </Button>
        )}{" "}
        <div className="">
          <h1 className="text-accent text-2xl font-bold text-center">Books</h1>
          {documentState?.allDocuments?.filter((doc) => doc.type === "book")
            ?.length > 0 && (
            <div className="flex gap-4 justify-center flex-wrap px-6 py-10">
              {documentState?.allDocuments
                ?.filter((doc) => doc.type === "book")
                ?.map((document) => {
                  return (
                    <div
                      key={document.id}
                      style={{ marginBottom: "20px" }}
                      className="flex flex-col items-center max-w-[200px]"
                    >
                      {document.file && <PDFViewer fileUrl={document.file} />}
                      <h1 className="text-accent font-bold line-clamp-1">
                        {document.title}
                      </h1>
                      <h2 className="text-secondary-foreground  line-clamp-1 max-w-[180px]">
                        {document.authorName || "Anonymous"}
                      </h2>
                      <div className="w-full min-h-8 bg-secondary flex items-center justify-between gap-1 py-1 px-2">
                        <div className="w-full min-h-8 bg-secondary flex items-center gap-1 py-1 px-2">
                          <IconButton
                            onClick={() => {
                              handleOpenDialog();
                              setDocId(document.id);
                            }}
                          >
                            <FaTrashCan className="text-primary-foreground text-lg" />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              router.push(
                                `/dashboard/documents/${document.id}`
                              );
                            }}
                          >
                            <FaEye className="text-white text-lg" />
                          </IconButton>
                        </div>
                        <p className="font-bold text-accent">
                          {document.price ? `$${document.price}` : "Free"}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
        <div className="">
          <h1 className="text-accent text-2xl font-bold text-center">
            Publications
          </h1>
          {documentState?.allDocuments?.filter(
            (doc) => doc.type === "publication"
          )?.length > 0 && (
            <div className="flex gap-4 justify-center flex-wrap px-6 py-10">
              {documentState?.allDocuments
                ?.filter((doc) => doc.type === "publication")
                ?.map((document) => {
                  return (
                    <div
                      key={document.id}
                      style={{ marginBottom: "20px" }}
                      className="flex flex-col items-center max-w-[200px]"
                    >
                      {document.file && <PDFViewer fileUrl={document.file} />}
                      <h1 className="text-accent font-bold line-clamp-1">
                        {document.title}
                      </h1>
                      <h2 className="text-secondary-foreground  line-clamp-1 max-w-[180px]">
                        {document.authorName || "Anonymous"}
                      </h2>
                      <div className="w-full min-h-8 bg-secondary flex items-center justify-between gap-1 py-1 px-2">
                        <div className="w-full min-h-8 bg-secondary flex items-center gap-1 py-1 px-2">
                          <IconButton
                            onClick={() => {
                              handleOpenDialog();
                              setDocId(document.id);
                            }}
                          >
                            <FaTrashCan className="text-primary-foreground text-lg" />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              router.push(
                                `/dashboard/documents/${document.id}`
                              );
                            }}
                          >
                            <FaEye className="text-white text-lg" />
                          </IconButton>
                        </div>
                        <p className="font-bold text-accent">
                          {document.price ? `$${document.price}` : "Free"}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
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
              Add A Document
            </Typography>
            <IconButton onClick={handleCloseModal} size="medium">
              <MdOutlineClose />
            </IconButton>
          </Box>
          <Box>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(handleSaveDocument)}
              className="mb-12"
            >
              <div className="flex  flex-col gap-6">
                <div className="w-full h-fit flex flex-col items-start">
                  <div className="mb-5">
                    <Input
                      type="file"
                      onChange={handleFileChange}
                      inputProps={{ accept: "application/pdf" }}
                    />
                    <p className="text-slate-400 font-semibold">Upload file</p>
                  </div>
                  <Controller
                    name="authorName"
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
                        label="Author Name"
                        variant="outlined"
                        fullWidth
                        size="small"
                        className="text-xs"
                        error={!!errors.authorName}
                        helperText={
                          errors.authorName ? errors.authorName.message : ""
                        }
                      />
                    )}
                  />
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
                    name="summary"
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
                        label="Summary"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        size="small"
                        className="text-xs"
                        error={!!errors.summary}
                        helperText={
                          errors.summary ? errors.summary.message : ""
                        }
                      />
                    )}
                  />
                  <Controller
                    name="price"
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
                        label="Price (eg: 1000) in $"
                        variant="outlined"
                        fullWidth
                        size="small"
                        className="text-xs"
                        type="number"
                        error={!!errors.price}
                        helperText={errors.price ? errors.price.message : ""}
                      />
                    )}
                  />
                  <Controller
                    name="type"
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
                          Document Type
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
                          error={!!errors.type}
                        >
                          <MenuItem value={"book"}>Book</MenuItem>
                          <MenuItem value={"publication"}>Publication</MenuItem>
                        </Select>
                        <FormHelperText error>
                          {errors.type && errors.type?.message}
                        </FormHelperText>
                      </FormControl>
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
            This action will completely remove this document and cannot be
            undone. Still wish to proceed?
          </p>
          <Button
            fullWidth
            onClick={handleDeleteDocument}
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

export default Documents;
