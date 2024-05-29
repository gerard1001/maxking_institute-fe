"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  createColumnHelper,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  createUser,
  deleteUser,
  fetchAllUsers,
  fetchAllUserWithMembers,
  fetchRoles,
  selectRoles,
  selectUsers,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { useSnackbar } from "notistack";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Modal,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { ICreateUser, User } from "@/lib/interfaces/user.interface";
import { LoginContext } from "@/lib/context/LoginContext";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LoadinProgress from "@/components/LoadingProgess";
import {
  MdOutlineClose,
  MdOutlineDoubleArrow,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { FaEdit, FaRegEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { IoChevronDown, IoWarningOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import {
  fetchUserById,
  updatePublicDisplay,
} from "@/lib/redux/slices/userSlice/thunks";
import BackIconButton from "@/components/BackIconButton";

const options = [
  {
    key: "edit",
    content: (
      <div className="flex items-center gap-3">
        <FaEdit /> Edit
      </div>
    ),
  },
  {
    key: "delete",
    content: (
      <div className="flex items-center gap-3">
        <FaTrashCan /> Delete
      </div>
    ),
  },
];

const columnHelper = createColumnHelper<User>();
const createUserSchema = yup.object().shape({
  firstName: yup.string().required().min(4).max(40).label("First name"),
  lastName: yup.string().required().min(4).max(40).label("Last name"),
  email: yup.string().email().required().label("Email"),
  roleId: yup.string().required().label("Role"),
});
interface CreateUserInputs {
  firstName: string;
  lastName: string;
  email: string;
  roleId: string;
}

const MembersTable = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateUserInputs>({
    resolver: yupResolver(createUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      roleId: "",
    },
  });
  const userState = useSelector(selectUsers);
  const roleState = useSelector(selectRoles);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [age, setAge] = React.useState("");
  const [registerLoading, setRegisterLoading] = React.useState<boolean>(false);
  const [openMenuLoading, setOpenMenuLoading] = React.useState<boolean>(true);
  const [deleteLoading, setDeleteLoading] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [publicAnchorEl, setPublicAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [approvalAnchorEl, setApprovalAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const openPublicMenu = Boolean(publicAnchorEl);
  const openApprovalMenu = Boolean(approvalAnchorEl);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [userId, setUserId] = useState<string>("");
  const { loginUserFetchLoading } = useContext(LoginContext);
  const [value, setValue] = React.useState<"users" | "members">("users");

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: "users" | "members"
  ) => {
    setValue(newValue);
  };

  const handleShowMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenPublicMenu = (event: React.MouseEvent<HTMLElement>) => {
    setPublicAnchorEl(event.currentTarget);
  };
  const handleClosePublicMenu = () => {
    setPublicAnchorEl(null);
  };

  const handleOpenApprovalMenu = (event: React.MouseEvent<HTMLElement>) => {
    setApprovalAnchorEl(event.currentTarget);
  };
  const handleCloseApprovalMenu = () => {
    setApprovalAnchorEl(null);
  };

  const openPublicStatusMenu = (
    id: string,
    e: React.MouseEvent<HTMLElement>
  ) => {
    setOpenMenuLoading(true);
    dispatch(fetchUserById(id))
      .unwrap()
      .then((res: any) => {
        if (res.statusCode === 200) {
          // enqueueSnackbar(res.message, {
          //   variant: "success",
          //   preventDuplicate: true,
          // });
        } else {
          enqueueSnackbar(res.message, { variant: "error" });
        }
      })
      .catch((error: any) => {
        enqueueSnackbar(error.message || "Error on Public display", {
          variant: "error",
        });
      })
      .finally(() => {
        setOpenMenuLoading(false);
      });
  };

  const openApprovalStatusMenu = (
    id: string,
    e: React.MouseEvent<HTMLElement>
  ) => {
    setOpenMenuLoading(true);
    dispatch(fetchUserById(id))
      .unwrap()
      .then((res: any) => {
        if (res.statusCode === 200) {
        } else {
          enqueueSnackbar(res.message, { variant: "error" });
        }
      })
      .catch((error: any) => {
        enqueueSnackbar(error.message || "Error on Public display", {
          variant: "error",
        });
      })
      .finally(() => {
        setOpenMenuLoading(false);
      });
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("profile.picture", {
        maxSize: 10,
        header: () => "",
        cell: (info) => (
          <div className="pl-2 min-w-[32px]">
            <img
              src={`${info.getValue()}`}
              className="w-8 aspect-square rounded-md object-cover"
            />
          </div>
        ),
      }),
      columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
        id: "Full Name",
        header: () => (
          <p className="pl-2 py-1 font-semibold uppercase line-clamp-1  text-secondary-foreground">
            Full Name
          </p>
        ),
        cell: (info) => (
          <div className="pl-2 pr-2 min-w-30 max-w-44">
            <p className="line-clamp-1">{info.getValue()}</p>
          </div>
        ),
      }),
      columnHelper.accessor("email", {
        header: () => (
          <p className="pl-2 py-1 font-semibold uppercase line-clamp-1 text-secondary-foreground">
            Email
          </p>
        ),
        size: 20,
        cell: (info) => (
          <div className="pl-2 pr-2 min-w-20 max-w-44">
            <p className="line-clamp-1">{info.getValue()}</p>
          </div>
        ),
      }),
      columnHelper.accessor("profile.phoneNumber", {
        header: () => (
          <p className="pl-2 py-1 font-semibold uppercase line-clamp-1 text-secondary-foreground">
            Phone Number
          </p>
        ),
        size: 20,
        cell: (info) => (
          <div className="pl-2 pr-2">
            <p className="line-clamp-1">
              {info.getValue() ? info.getValue() : "--"}
            </p>
          </div>
        ),
      }),
      columnHelper.accessor("approvalStatus", {
        header: () => (
          <p className="pl-2 py-1 font-semibold uppercase line-clamp-1 text-secondary-foreground">
            status
          </p>
        ),
        size: 20,
        cell: (info) => {
          console.log(info.getValue(), "info");
          return (
            <div className="pl-2 pr-2">
              <p className="line-clamp-1">
                {info.getValue() === "pending" && (
                  <div
                    className={`border-[1px] flex items-center gap-1 justify-center rounded-md bg-yellow-400 text-sm px-2 text-white w-fit cursor-pointer`}
                    onClick={(e: React.MouseEvent<HTMLElement>) => {
                      setUserId(info.row.original.id);
                      openApprovalStatusMenu(info.row.original.id, e);
                      handleOpenApprovalMenu(e);
                    }}
                  >
                    pending{" "}
                    <IoChevronDown
                      className={`group-hover:text-primary-foreground`}
                    />
                  </div>
                )}
                {info.getValue() === "approved" && (
                  <div
                    className={`border-[1px] flex items-center gap-1 justify-center rounded-md bg-green-400 text-sm px-2 text-white w-fit cursor-pointer`}
                    onClick={(e: React.MouseEvent<HTMLElement>) => {
                      setUserId(info.row.original.id);
                      openApprovalStatusMenu(info.row.original.id, e);
                      handleOpenApprovalMenu(e);
                    }}
                  >
                    approved{" "}
                    <IoChevronDown
                      className={`group-hover:text-primary-foreground`}
                    />
                  </div>
                )}
                {info.getValue() === "rejected" && (
                  <div
                    className={`border-[1px] flex items-center gap-1 justify-center rounded-md bg-red-400 text-sm px-2 text-white w-fit cursor-pointer`}
                    onClick={(e: React.MouseEvent<HTMLElement>) => {
                      setUserId(info.row.original.id);
                      openApprovalStatusMenu(info.row.original.id, e);
                      handleOpenApprovalMenu(e);
                    }}
                  >
                    rejected{" "}
                    <IoChevronDown
                      className={`group-hover:text-primary-foreground`}
                    />
                  </div>
                )}
              </p>
            </div>
          );
        },
      }),
      columnHelper.accessor((row) => `${row.profile.country}`, {
        id: "Country",
        header: () => (
          <p className="pl-2 py-1 font-semibold uppercase line-clamp-1 text-secondary-foreground">
            Country
          </p>
        ),
        cell: (info) => (
          <div className="pl-2 pr-2 max-w-44">
            <p className="line-clamp-1">
              {info.row.original.profile.country ? info.getValue() : "--"}
            </p>
          </div>
        ),
      }),
      columnHelper.accessor("publicDisplay", {
        header: () => (
          <p className="pl-2 py-1 font-semibold uppercase line-clamp-1  text-secondary-foreground">
            view
          </p>
        ),
        size: 20,
        cell: (info) => (
          <div className="pl-2 pr-2">
            <div className="line-clamp-1">
              {info.getValue() ? (
                <div
                  className={`border-[1px] flex items-center gap-1 justify-center rounded-md border-sky-500 bg-sky-500/10 text-sm px-2 text-sky-500 w-fit cursor-pointer`}
                  onClick={(e: React.MouseEvent<HTMLElement>) => {
                    setUserId(info.row.original.id);
                    openPublicStatusMenu(info.row.original.id, e);
                    handleOpenPublicMenu(e);
                  }}
                >
                  public
                  <IoChevronDown
                    className={`group-hover:text-primary-foreground`}
                  />
                </div>
              ) : (
                <div
                  className={`border-[1px] flex items-center gap-1 justify-center rounded-md border-yellow-500 bg-yellow-500/10 text-sm px-2 text-yellow-500 w-fit cursor-pointer`}
                  onClick={(e: React.MouseEvent<HTMLElement>) => {
                    setUserId(info.row.original.id);
                    // handleOpenPublicMenu(e);
                    openPublicStatusMenu(info.row.original.id, e);
                    handleOpenPublicMenu(e);
                  }}
                >
                  hidden{" "}
                  <IoChevronDown
                    className={`group-hover:text-primary-foreground`}
                  />
                </div>
              )}
            </div>
          </div>
        ),
      }),
      columnHelper.display({
        id: "actions",
        cell: (info) => (
          <div className="text-black/75 pl-2 pr-4 rounded-md">
            <IconButton
              onClick={(e: React.MouseEvent<HTMLElement>) => {
                setUserId(info.row.original.id);
                handleShowMenu(e);
              }}
            >
              <HiOutlineDotsVertical />
            </IconButton>
          </div>
        ),
      }),
    ],
    []
  );

  //   const users = userState.allUsers?.filter(
  //     (user) => user.requestedMembership === true
  //   );

  const users = useMemo(
    () =>
      userState.allUsers?.filter((user) => user.requestedMembership === true),
    [userState]
  );
  const focusUser = userState.user;

  const table = useReactTable({
    data: users,
    columns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    dispatch(fetchAllUserWithMembers())
      .unwrap()
      .then((res: any) => {
        if (res.statusCode !== 200) {
          enqueueSnackbar("Failed to fetch users", { variant: "error" });
        }
      })
      .catch((error: any) => {});

    dispatch(fetchRoles())
      .unwrap()
      .then((res: any) => {})
      .catch((error: any) => {});
  }, []);

  // useEffect(() => {

  // }, [userId]);

  const handleSignUp = (data: ICreateUser) => {
    setRegisterLoading(true);
    dispatch(createUser(data))
      .unwrap()
      .then((res: any) => {
        if (res.statusCode === 201) {
          enqueueSnackbar(res.message, {
            variant: "success",
            preventDuplicate: true,
          });
          setTimeout(() => {
            reset();
          }, 500);
          setTimeout(() => {
            setOpenModal(false);
          }, 1000);
        } else {
          enqueueSnackbar(res.message, { variant: "error" });
        }
      })
      .catch((error: any) => {
        enqueueSnackbar(error.message, {
          variant: "error",
          preventDuplicate: true,
        });
      })
      .finally(() => {
        setRegisterLoading(false);
        dispatch(fetchAllUserWithMembers())
          .unwrap()
          .then((res: any) => {
            if (res.statusCode !== 200) {
              enqueueSnackbar("Failed to fetch users", { variant: "error" });
            }
          })
          .catch((error: any) => {});
      });
  };

  const handleDeleteUser = () => {
    setDeleteLoading(true);
    dispatch(deleteUser(userId))
      .unwrap()
      .then((res: any) => {
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
      .catch((error: any) => {
        enqueueSnackbar(error.message, {
          variant: "error",
          preventDuplicate: true,
        });
        setTimeout(() => {
          handleCloseDialog();
        }, 1000);
      })
      .finally(() => {
        setDeleteLoading(false);
        dispatch(fetchAllUserWithMembers())
          .unwrap()
          .then((res: any) => {
            if (res.statusCode !== 200) {
              enqueueSnackbar("Failed to fetch users", { variant: "error" });
            }
          })
          .catch((_) => {
            enqueueSnackbar("Failed to fetch users", { variant: "error" });
          });
      });
  };

  const handlePublicDisplay = (status: boolean) => {
    setPublicAnchorEl(null);
    dispatch(
      updatePublicDisplay({ id: userId, data: { publicDisplay: status } })
    )
      .unwrap()
      .then((res: any) => {
        if (res.statusCode === 200) {
          enqueueSnackbar(res.message, { variant: "success" });
          dispatch(fetchAllUserWithMembers())
            .unwrap()
            .then((res: any) => {
              if (res.statusCode !== 200) {
                enqueueSnackbar("Failed to fetch users", {
                  variant: "error",
                });
                setUserId("");
              }
            })
            .catch((error: any) => {});
        }
      })
      .catch((error: any) => {
        enqueueSnackbar("Failed to update public status", {
          variant: "success",
        });
      });
  };

  const handleApprovalDisplay = (data: any) => {
    setApprovalAnchorEl(null);
    dispatch(updatePublicDisplay({ id: userId, data: data }))
      .unwrap()
      .then((res: any) => {
        if (res.statusCode === 200) {
          enqueueSnackbar(res.message, { variant: "success" });
          dispatch(fetchAllUserWithMembers())
            .unwrap()
            .then((res: any) => {
              if (res.statusCode !== 200) {
                enqueueSnackbar("Failed to fetch users", {
                  variant: "error",
                });
                setUserId("");
              }
            })
            .catch((error: any) => {});
        }
      })
      .catch((error: any) => {
        enqueueSnackbar("Failed to update public status", {
          variant: "success",
        });
      });
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center justify-center">
        <div className="">
          {" "}
          {/* <Box className="">
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="primary"
              indicatorColor="primary"
              aria-label="primary tabs example"
            >
              <Tab
                value="users"
                label="Users"
                onClick={() => {
                  router.push("/dashboard/users");
                }}
              />
              <Tab
                value="members"
                label="Members"
                onClick={() => {
                  router.push("/dashboard/users/members");
                }}
              />
            </Tabs>
          </Box> */}
          <BackIconButton />
          <div className="flex justify-between w-full py-2">
            <div></div>
            <div className="">
              {/* <Button
                variant="contained"
                className="bg-secondary text-white hover:bg-secondary/80"
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                Add User
              </Button> */}
            </div>
          </div>
          <div className="boxshadow px-1 bg-white">
            <table className="users-table inset-0">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="users-table-cell">
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            // asc: " 🔼",
                            // desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="users-table-cell">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="py-2 flex justify-between">
              <div className="">
                <Button
                  onClick={() => table.firstPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <MdOutlineDoubleArrow className="text-2xl rotate-180" />
                </Button>
                <Button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <MdOutlineKeyboardArrowLeft className="text-2xl" />
                </Button>
                <Button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <MdOutlineKeyboardArrowRight className="text-2xl" />
                </Button>
                <Button
                  onClick={() => table.lastPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <MdOutlineDoubleArrow className="text-2xl" />
                </Button>{" "}
                <select
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => {
                    table.setPageSize(Number(e.target.value));
                  }}
                >
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-3 pr-6">
                <span className="flex items-center gap-1">
                  <div>Page</div>
                  <strong>
                    {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount().toLocaleString()}
                  </strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
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
          <Box className="flex items-center justify-between">
            <Typography className="text-2xl font-semibold text-accent">
              Add new User
            </Typography>
            <IconButton
              onClick={() => {
                setOpenModal(false);
              }}
              size="medium"
            >
              <MdOutlineClose />
            </IconButton>
          </Box>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(handleSignUp)}
            className=""
          >
            <Controller
              name="firstName"
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
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  size="small"
                  className="text-xs"
                  error={!!errors.firstName}
                  helperText={errors.firstName ? errors.firstName.message : ""}
                />
              )}
            />
            <Controller
              name="lastName"
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
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  size="small"
                  className="text-xs"
                  error={!!errors.lastName}
                  helperText={errors.lastName ? errors.lastName.message : ""}
                />
              )}
            />

            <Controller
              name="email"
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
                  label="Email"
                  variant="outlined"
                  fullWidth
                  size="small"
                  className="text-xs"
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ""}
                />
              )}
            />
            <Controller
              name="roleId"
              control={control}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  sx={{
                    "& .MuiInputLabel-root": {
                      top: "12px",
                      backgroundColor: "#fff",
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
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    {...field}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                    sx={{
                      input: {
                        color: "#021527",
                      },
                      mt: 2,
                      // color: "#242E8F",
                      // "& label.Mui-focused": {
                      //   color: "#242E8F",
                      // },
                      // "& .MuiOutlinedInput-root": {
                      //   "&.Mui-focused fieldset": {
                      //     border: "1.5px solid #242E8F",
                      //   },
                      // },
                      // "& .MuiOutlinedInput-input": {
                      //   py: "11.5px",
                      // },
                      // "& .MuiFormLabel-root": {
                      //   mt: "3px",
                      // },
                    }}
                    inputProps={{ style: { height: 16 } }}
                    error={!!errors.roleId}
                  >
                    {/* <MenuItems /> */}
                    {/* <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem> */}

                    {roleState?.roles?.map((role, index) => (
                      <MenuItem value={role.id} key={index}>
                        {role.type}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error>
                    {errors.roleId && errors.roleId?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />

            <Button
              type="submit"
              variant="contained"
              className="bg-secondary hover:bg-secondary/90 w-full mt-4 !h-[46px]"
              size="large"
              disabled={registerLoading}
            >
              {registerLoading ? <LoadinProgress /> : "Create User"}
            </Button>
          </Box>
        </Box>
      </Modal>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        PaperProps={{
          style: {
            width: "120px",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.key}
            onClick={() => {
              handleCloseMenu();
              option.key === "edit" &&
                router.push(`/dashboard/users/${userId}/edit`);
              option.key === "delete" && handleOpenDialog();
            }}
          >
            {option.content}
          </MenuItem>
        ))}
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
            This action will completely remove this user and cannot be undone.
            Still wish to proceed?
          </p>
          <Button
            fullWidth
            onClick={handleDeleteUser}
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
      <Menu
        id="basic-menu-1"
        anchorEl={approvalAnchorEl}
        open={openApprovalMenu && !openMenuLoading}
        onClose={handleCloseApprovalMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleApprovalDisplay({
              approvalStatus: "approved",
            });
          }}
          className={`${
            focusUser?.publicDisplay ? "bg-green-500/55" : "bg-none"
          }`}
        >
          approve
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleApprovalDisplay({
              approvalStatus: "rejected",
            });
          }}
          className={`${
            focusUser?.publicDisplay ? "bg-none" : "bg-red-500/55"
          }`}
        >
          reject
        </MenuItem>
      </Menu>
      <Menu
        id="basic-menu"
        anchorEl={publicAnchorEl}
        open={openPublicMenu && !openMenuLoading}
        onClose={handleClosePublicMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handlePublicDisplay(true);
          }}
          className={`${
            focusUser?.publicDisplay ? "bg-sky-500/55" : "bg-none"
          }`}
        >
          Public
        </MenuItem>
        <MenuItem
          onClick={() => {
            handlePublicDisplay(false);
          }}
          className={`${
            focusUser?.publicDisplay ? "bg-none" : "bg-yellow-500/55"
          }`}
        >
          Hidden
        </MenuItem>
      </Menu>
    </ProtectedRoute>
  );
};

export default MembersTable;
