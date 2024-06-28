"use client";

import LoadinProgress from "@/components/LoadingProgess";
import {
  deleteProgram,
  fetchPrograms,
  fetchSingleProgram,
  selectPrograms,
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

const ProgramsPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { programs, singleProgram, loading } = useSelector(selectPrograms);

  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const divRef = React.useRef<HTMLDivElement>(null);

  const openProgramDrawer = () => {
    setOpen(true);
  };
  const closeProgramDrawer = () => {
    setOpen(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleFetchProgram = async (id: string) => {
    dispatch(fetchSingleProgram(id))
      .unwrap()
      .then((res) => {
        if (res.statusCode === 200) {
          openProgramDrawer();
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
    dispatch(fetchPrograms())
      .unwrap()
      .catch((err: any) => {
        enqueueSnackbar(err.message, {
          variant: "error",
          preventDuplicate: true,
        });
      });
  }, []);

  const handleDeleteProgram = async () => {
    setDeleteLoading(true);
    dispatch(deleteProgram(singleProgram.id))
      .unwrap()
      .then((res) => {
        if (res.statusCode === 200) {
          enqueueSnackbar(res.message, {
            variant: "success",
            preventDuplicate: true,
          });
          setOpenDialog(false);
          dispatch(fetchPrograms())
            .unwrap()
            .catch((err: any) => {
              enqueueSnackbar(err.message, {
                variant: "error",
                preventDuplicate: true,
              });
            });
          closeProgramDrawer();
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
        <Chip
          label="Services"
          className={`cursor-pointer`}
          variant="outlined"
          onClick={() => {
            router.push("/dashboard/pages/services");
          }}
        />
        <Chip label="Programs" className={`cursor-default`} variant="filled" />
      </Stack>
      <div className="my-5">
        <Button
          className="bg-primary text-white"
          onClick={() => {
            router.push(`/dashboard/pages/programs/new`);
          }}
        >
          Add Program
        </Button>
      </div>
      <div className="grid md:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-4 mt-10">
        {programs?.map((program) => {
          return (
            <div
              key={program.id}
              className="overflow-hidden bg-cover bg-no-repeat rounded relative group w-full xlg:max-w-[440px] max-w-[440px] aspect-square"
            >
              <div className="absolute w-full m-auto left-0 right-0 top-0 bottom-0 flex flex-col items-center justify-center bg-black/30 group-hover:bg-black/0">
                <h1 className="text-center text-primary-foreground font-bold group-hover:hidden transition-all delay-300 text-4xl bg-secondary/40 shadow-2xl uppercase">
                  {" "}
                  {program.short}
                </h1>
              </div>
              <img
                src={program.coverImage}
                alt=""
                className="object-cover rounded-md transition-all duration-300 ease-in-out hover:scale-110 h-full w-full"
              />
              <div className="w-full h-full absolute bg-gradient-to-b from-[#a55109b9] to-[#666666c9] -bottom-[75%] opacity-0 group-hover:bottom-0 group-hover:opacity-100 transition-all duration-300 ease-in-out flex flex-col items-center justify-center p-2 gap-3">
                <h1 className="uppercase text-white text-2xl font-bold text-center">
                  {program.title}
                </h1>
                <Button
                  content="Explore"
                  className={`text-white font-normal opacity-100 bg-secondary`}
                  onClick={() => {
                    handleFetchProgram(program.id);
                  }}
                >
                  Read more
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      <Drawer
        open={open}
        onClose={closeProgramDrawer}
        className=""
        anchor="right"
      >
        <div className="max-w-[600px] w-full relative">
          <IconButton
            onClick={closeProgramDrawer}
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
                        src={singleProgram.coverImage}
                        alt={singleProgram.title}
                        className="mx-auto w-full aspect-square object-cover"
                      />
                      <h1 className="w-full mt-3 text-accent text-2xl font-bold">
                        {singleProgram.title}
                      </h1>
                      <div className="py-3">
                        <div
                          ref={divRef}
                          dangerouslySetInnerHTML={{
                            __html: singleProgram.description,
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
            This action will completely remove this program. Still wish to
            proceed?
          </p>
          <Button
            fullWidth
            onClick={() => {
              handleDeleteProgram();
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

export default ProgramsPage;
