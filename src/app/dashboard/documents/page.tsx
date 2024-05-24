"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
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
  IconButton,
  Modal,
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

const schema = yup.object().shape({
  text: yup.string().required().min(10).max(1000),
});

type CreateDocumentInputs = {
  text: string;
};

const Documents = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const documentState = useSelector(selectDocuments);
  const { enqueueSnackbar } = useSnackbar();

  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [testimonialId, setDocumentId] = React.useState<string>("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const { isClient, userId } = React.useContext(LoginContext);

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateDocumentInputs>({
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
  const handleSaveDocument = (data: CreateDocumentInputs) => {
    console.log(data, "data");
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
        {documentState?.allDocuments.length > 0 && (
          <>
            {documentState?.allDocuments?.map((document) => {
              return (
                <div
                  key={document.id}
                  style={{ marginBottom: "20px" }}
                  className="flex flex-col items-center"
                >
                  <h2>{document.title}</h2>
                  {document.file && <PDFViewer fileUrl={document.file} />}
                </div>
              );
            })}
          </>
        )}
        <div
          key={documentState?.allDocuments[0]?.id}
          style={{ marginBottom: "20px" }}
        >
          <h2>{documentState?.allDocuments[0]?.title}</h2>
          {documentState?.allDocuments[0]?.file && (
            <PDFViewer fileUrl={documentState?.allDocuments[0]?.file} />
          )}
        </div>
        <div className="">
          {documentState.allDocuments && documentState?.allDocuments[0]?.title}
          <iframe
            src={documentState?.allDocuments[0]?.file}
            allow="autoplay"
            width="100%"
            height="500px"
            className="max-w-fit "
          />
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
              onSubmit={handleSubmit(handleSaveDocument)}
              className="mb-12"
            >
              <div className="flex  flex-col gap-6">
                <div className="w-full h-fit flex flex-col items-start"></div>
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
    </div>
  );
};

export default Documents;
