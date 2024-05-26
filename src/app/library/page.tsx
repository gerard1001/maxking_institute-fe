"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  deleteDocument,
  fetchDocuments,
  selectDocuments,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { useSnackbar } from "notistack";
import { Box, Button, Dialog, IconButton } from "@mui/material";
import LoadinProgress from "@/components/LoadingProgess";
import { LoginContext } from "@/lib/context/LoginContext";
import PDFViewer from "@/lib/utils/pdfToImage";
import { FaEye, FaTrashCan } from "react-icons/fa6";
import { IoWarningOutline } from "react-icons/io5";
import Footer from "@/components/Footer";
import SignInModal from "@/components/SignInModal";

const Documents = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const documentState = useSelector(selectDocuments);
  const { enqueueSnackbar } = useSnackbar();

  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [docId, setDocId] = React.useState<string>("");
  const { isClient, userLoggedIn, setGoToPage } =
    React.useContext(LoginContext);

  const [openDialog, setOpenDialog] = React.useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState<boolean>(false);

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
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: "error" });
      });
  }, []);

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

  return (
    <div>
      <div className="p-10">
        <div className="" id="books">
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
                          {!isClient && userLoggedIn && (
                            <IconButton
                              onClick={() => {
                                handleOpenDialog();
                                setDocId(document.id);
                              }}
                            >
                              <FaTrashCan className="text-primary-foreground text-lg" />
                            </IconButton>
                          )}
                          <IconButton
                            onClick={() => {
                              if (!userLoggedIn) {
                                setGoToPage(
                                  `/dashboard/documents/${document.id}`
                                );
                                handleOpenModal();
                              } else {
                                router.push(
                                  `/dashboard/documents/${document.id}`
                                );
                              }
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
        <div className="" id="publications">
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
                          {!isClient && userLoggedIn && (
                            <IconButton
                              onClick={() => {
                                handleOpenDialog();
                                setDocId(document.id);
                              }}
                            >
                              <FaTrashCan className="text-primary-foreground text-lg" />
                            </IconButton>
                          )}
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
      <Footer />
      <SignInModal openModal={openModal} handleCloseModal={handleCloseModal} />
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
