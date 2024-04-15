"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import React, { useContext, useEffect, useMemo } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFacetedRowModel,
  Column,
  createColumnHelper,
  CellContext,
} from "@tanstack/react-table";
import { columnDef } from "../../../lib/utils/columns";
import dataJSON from "../../../lib/data/dummyData.json";
import {
  createUser,
  fetchAllUsers,
  fetchRoles,
  selectRoles,
  selectUsers,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { useSnackbar } from "notistack";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { format } from "date-fns";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ICreateUser, User } from "@/lib/interfaces/user.interface";
import { LoginContext } from "@/lib/context/LoginContext";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LoadinProgress from "@/components/LoadingProgess";
import { MdOutlineClose } from "react-icons/md";

const options = [
  "None",
  "Atria",
  "Callisto",
  "Dione",
  "Ganymede",
  "Hangouts Call",
  "Luna",
  "Oberon",
  "Phobos",
  "Pyxis",
  "Sedna",
  "Titania",
  "Triton",
  "Umbriel",
];

const ITEM_HEIGHT = 48;

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

const Users = () => {
  const dispatch = useDispatch();
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
  const state = useSelector(selectUsers);
  const roleState = useSelector(selectRoles);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [age, setAge] = React.useState("");
  const [registerLoading, setRegisterLoading] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { loginUserFetchLoading } = useContext(LoginContext);

  // const loggedInUserRole =
  //   state?.loggedInUser?.roles && state?.loggedInUser?.roles[0].type;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
          <p className="pl-2 py-1 font-semibold uppercase line-clamp-1">
            Full Name
          </p>
        ),
        cell: (info) => (
          <div className="pl-2 pr-2 min-w-30 max-w-44 bg-green-200">
            <p className="line-clamp-1">{info.getValue()}</p>
          </div>
        ),
      }),
      columnHelper.accessor("email", {
        header: () => (
          <p className="pl-2 py-1 font-semibold uppercase line-clamp-1">
            Email
          </p>
        ),
        size: 20,
        cell: (info) => (
          <div className="pl-2 pr-2 min-w-20 max-w-44 bg-sky-200">
            <p className="line-clamp-1">{info.getValue()}</p>
          </div>
        ),
      }),
      columnHelper.accessor("roles", {
        header: () => (
          <p className="pl-2 py-1 font-semibold uppercase line-clamp-1">
            Roles
          </p>
        ),
        size: 20,
        cell: (info) => (
          <div className="pl-2 pr-2 flex items-center gap-1">
            {info.getValue().map((role) => (
              <p key={role.id} className="line-clamp-1">
                {role.type}
              </p>
            ))}
          </div>
        ),
      }),
      columnHelper.accessor("profile.phoneNumber", {
        header: () => (
          <p className="pl-2 py-1 font-semibold uppercase line-clamp-1">
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
      columnHelper.accessor(
        (row) => `${row.profile.country} ${row.profile.city}`,
        {
          id: "Country/City",
          header: () => (
            <p className="pl-2 py-1 font-semibold uppercase line-clamp-1">
              Country/City
            </p>
          ),
          cell: (info) => (
            <div className="pl-2 pr-2 min-w-40 max-w-44 bg-yellow-200">
              <p className="line-clamp-1">
                {info.getValue() ? info.getValue() : "--"}
              </p>
            </div>
          ),
        }
      ),
      // columnHelper.accessor("profile.country", {
      //   header: () => (
      //     <p className="pl-2 py-1 font-semibold uppercase">Country</p>
      //   ),
      //   size: 20,
      //   cell: (info) => (
      //     <div className="pl-2 pr-2">
      //       <p className="line-clamp-1">
      //         {info.getValue() ? info.getValue() : "--"}
      //       </p>
      //     </div>
      //   ),
      // }),
      // columnHelper.accessor("profile.city", {
      //   header: () => <p className="pl-2 py-1 font-semibold uppercase">City</p>,
      //   size: 20,
      //   cell: (info) => (
      //     <div className="pl-2 pr-2">
      //       <p className="line-clamp-1">
      //         {info.getValue() ? info.getValue() : "--"}
      //       </p>
      //     </div>
      //   ),
      // }),
      columnHelper.accessor("profile.birthDate", {
        header: () => (
          <p className="pl-2 py-1 font-semibold uppercase line-clamp-1">
            Birth date
          </p>
        ),
        size: 20,
        cell: (info) => (
          <div className="pl-2 pr-2">
            <p className="line-clamp-1">
              {info.getValue() ? format(info.getValue(), "PPP") : "--"}
            </p>
          </div>
        ),
      }),
      columnHelper.display({
        id: "actions",
        cell: (props) => (
          <div className="text-black/75 pl-2 pr-4 rounded-md">
            <IconButton onClick={handleClick}>
              <HiOutlineDotsVertical />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                },
              }}
            >
              {options.map((option) => (
                <MenuItem
                  key={option}
                  selected={option === "Pyxis"}
                  onClick={handleClose}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>
        ),
      }),
    ],
    []
  );

  const MenuItems = () =>
    roleState.roles.map((role) => (
      <MenuItem value={role.id}>{role.type}</MenuItem>
    ));

  const users = state.allUsers;
  const table = useReactTable({
    data: users,
    columns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    // state: {
    //   sorting,
    // },
    // onSortingChange: setSorting,
  });

  useEffect(() => {
    dispatch(fetchAllUsers())
      .unwrap()
      .then((res) => {
        if (res.statusCode !== 200) {
          enqueueSnackbar("Failed to fetch users", { variant: "error" });
        }
      })
      .catch((error) => {});

    dispatch(fetchRoles())
      .unwrap()
      .then((res) => {})
      .catch((error: any) => {});
  }, []);

  const handleSignUp = (data: ICreateUser) => {
    setRegisterLoading(true);
    dispatch(createUser(data))
      .unwrap()
      .then((res) => {
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
      .catch((error) => {
        enqueueSnackbar(error.message, {
          variant: "error",
          preventDuplicate: true,
        });
      })
      .finally(() => {
        setRegisterLoading(false);
        dispatch(fetchAllUsers())
          .unwrap()
          .then((res) => {
            if (res.statusCode !== 200) {
              enqueueSnackbar("Failed to fetch users", { variant: "error" });
            }
          })
          .catch((error) => {});
      });
  };

  return (
    <ProtectedRoute>
      <div className="pt-10 flex flex-col items-center justify-center">
        <div className="">
          {" "}
          <div className="flex justify-between w-full py-2">
            <div></div>
            <div className="">
              <Button
                variant="contained"
                className="bg-secondary text-white hover:bg-secondary/80"
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                Add User
              </Button>
            </div>
          </div>
          <div className="boxshadow px-1">
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

                    {roleState?.roles?.map((role) => (
                      <MenuItem value={role.id}>{role.type}</MenuItem>
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
              // disabled={registerLoading}
            >
              {registerLoading ? <LoadinProgress /> : "Create User"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </ProtectedRoute>
  );
};

export default Users;
