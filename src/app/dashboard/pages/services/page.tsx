"use client";

import LoadinProgress from "@/components/LoadingProgess";
import {
  deleteService,
  fetchServices,
  fetchSingleService,
  selectServices,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import {
  Box,
  Button,
  Chip,
  Dialog,
  Drawer,
  IconButton,
  Stack,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { IoWarningOutline } from "react-icons/io5";
import { MdOutlineClose } from "react-icons/md";

const ServicesPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { services, singleService, loading } = useSelector(selectServices);

  const [open, setOpen] = React.useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);

  const divRef = React.useRef<HTMLDivElement>(null);

  const openServiceDrawer = () => {
    setOpen(true);
  };
  const closeServiceDrawer = () => {
    setOpen(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleFetchService = async (id: string) => {
    dispatch(fetchSingleService(id))
      .unwrap()
      .then((res) => {
        if (res.statusCode === 200) {
          openServiceDrawer();
        }
      })
      .catch((err: any) => {
        enqueueSnackbar(err.message, {
          variant: "error",
          preventDuplicate: true,
        });
      });
  };

  React.useEffect(() => {
    dispatch(fetchServices())
      .unwrap()
      .catch((err: any) => {
        enqueueSnackbar(err.message, {
          variant: "error",
          preventDuplicate: true,
        });
      });
  }, []);

  const handleDeleteService = async () => {
    setDeleteLoading(true);
    dispatch(deleteService(singleService.id))
      .unwrap()
      .then((res) => {
        if (res.statusCode === 200) {
          enqueueSnackbar(res.message, {
            variant: "success",
            preventDuplicate: true,
          });
          setOpenDialog(false);
          dispatch(fetchServices())
            .unwrap()
            .catch((err: any) => {
              enqueueSnackbar(err.message, {
                variant: "error",
                preventDuplicate: true,
              });
            });
          closeServiceDrawer();
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
    <div>
      <Stack direction="row" spacing={1}>
        <Chip label="Services" className={`cursor-default`} variant="filled" />
        <Chip
          label="Programs"
          className={`cursor-pointer`}
          variant="outlined"
          onClick={() => {
            router.push("/dashboard/pages/programs");
          }}
        />
      </Stack>
      <div className="my-5">
        <Button
          className="bg-primary text-white"
          onClick={() => {
            router.push(`/dashboard/pages/services/new`);
          }}
        >
          Add Service
        </Button>
      </div>
      <div className="flex items-center flex-wrap gap-8 xl:justify-start justify-center w-full lg:pt-10 pt-2">
        {services?.map((service, index: number) => {
          return (
            <div
              key={service.id}
              className="w-[250px] aspect-square hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg xs:p-6 p-2 cursor-pointer transition-all duration-200  hover:scale-105"
              onClick={() => {
                handleFetchService(service.id);
              }}
            >
              <img
                src={service.coverImage}
                alt={service.title}
                className="mx-auto w-[50px] aspect-square"
              />
              <h1 className="w-full text-center my-3 sm:h-9 h-auto text-accent font-bold">
                {service.title}
              </h1>
              <p className="line-clamp-4 text-center">{service.description}</p>
            </div>
          );
        })}
      </div>
      <Drawer
        open={open}
        onClose={closeServiceDrawer}
        className=""
        anchor="right"
      >
        <div className="max-w-[600px] w-full relative">
          <IconButton
            onClick={closeServiceDrawer}
            className="absolute top-4 right-4"
          >
            <MdOutlineClose className="" />
          </IconButton>
          <>
            {loading ? (
              <LoadinProgress />
            ) : (
              <>
                {((): any => {
                  return (
                    <div className="py-14 px-4">
                      <div className="bg-slate-100 p-3 my-2 rounded-lg flex items-center gap-5">
                        <IconButton
                          className="bg-muted-foreground/20 hover:bg-muted-foreground/50"
                          onClick={handleOpenDialog}
                        >
                          <BsFillTrashFill className="text-red-600" />
                        </IconButton>
                      </div>
                      <img
                        src={singleService.coverImage}
                        alt={singleService.title}
                        className="mx-auto w-[100px] aspect-square"
                      />
                      <h1 className="w-full mt-3 text-accent text-2xl font-bold">
                        {singleService.title}
                      </h1>
                      <p className="mb-2">{singleService.description}</p>
                      <div className="py-3">
                        <div
                          ref={divRef}
                          dangerouslySetInnerHTML={{
                            __html: singleService.body,
                          }}
                        />
                      </div>
                    </div>
                  );
                })()}
              </>
            )}
          </>
        </div>
      </Drawer>
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
            This action will completely remove this service. Still wish to
            proceed?
          </p>
          <Button
            fullWidth
            onClick={() => {
              handleDeleteService();
            }}
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

export default ServicesPage;
