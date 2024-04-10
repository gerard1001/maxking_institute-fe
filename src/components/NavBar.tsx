"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineMail } from "react-icons/hi";
import { FaXTwitter, FaFacebookF } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { MdOutlineClose } from "react-icons/md";
import { IoArrowForward } from "react-icons/io5";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Drawer,
  IconButton,
  Modal,
  TextField,
  Box,
  FormControl,
  InputLabel,
  FilledInput,
  InputAdornment,
  OutlinedInput,
  Button,
  Container,
  Grid,
  Card,
  Typography,
  CircularProgress,
} from "@mui/material";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FcGoogle } from "react-icons/fc";
import {
  fetchUserByToken,
  loginUser,
  registerUser,
  selectUsers,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { ICreateUser, ILoginUser } from "@/lib/interfaces/user.interface";
import { useSnackbar } from "notistack";
import { LoginContext } from "@/lib/context/LoginContext";
import { objectIsEmpty } from "@/lib/functions/object_check.function";

const navBarLinks = [
  {
    name: "HOME",
    path: "/",
  },
  {
    name: "ABOUT US",
    path: "/about",
  },
  {
    name: "TRAINING CENTER",
    path: "/training-center",
  },
  {
    name: "MKI PROGRAMS",
    path: "/programs",
  },
  {
    name: "MKI COMMUNITY",
    path: "/community",
  },
  {
    name: "CONTACT US",
    path: "/contact-us",
  },
];

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

interface SignInInputs {
  email: string;
  password: string;
}

interface SignInProps {
  closeModal: () => void;
}

export const LoadinProgress = () => {
  return (
    <React.Fragment>
      <CircularProgress sx={{ color: "#F8A51B" }} />
    </React.Fragment>
  );
};

const SignInForm = ({ closeModal }: SignInProps) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<SignInInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const [loginLoading, setLoginLoading] = React.useState<boolean>(false);
  const { loginData, setLoginData } = useContext(LoginContext);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleLogin = (data: ILoginUser) => {
    setLoginLoading(true);
    dispatch(loginUser(data))
      .then((res) => {
        if (res.payload.statusCode === 200) {
          localStorage.setItem(
            "loginData",
            JSON.stringify({ login_token: res.payload.data.token })
          );
          dispatch(fetchUserByToken(res.payload.data.token)).then((nextRes) => {
            if (nextRes.payload.statusCode === 200) {
              enqueueSnackbar(res.payload.message, {
                variant: "success",
                preventDuplicate: true,
              });
              setLoginData(nextRes.payload.data);
            } else {
              enqueueSnackbar(nextRes.payload.message, { variant: "error" });
              localStorage.removeItem("loginData");
            }
          });
          setTimeout(() => {
            reset();
          }, 500);
          setTimeout(() => {
            closeModal();
          }, 1000);
        } else {
          enqueueSnackbar(res.payload.message, { variant: "error" });
        }
      })
      .finally(() => {
        setLoginLoading(false);
      });
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(handleLogin)}
      className=""
    >
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
        name="password"
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
            label="Password"
            variant="outlined"
            fullWidth
            size="small"
            className="text-xs"
            error={!!errors.email}
            helperText={errors.password ? errors.password.message : ""}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <IoEyeOff /> : <IoEye />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />

      <Button
        type="submit"
        variant="contained"
        className="bg-primary hover:bg-primary/90 w-full mt-4 !h-[46px]"
        size="large"
        disabled={loginLoading}
      >
        {loginLoading ? <LoadinProgress /> : "Sign In"}
      </Button>
    </Box>
  );
};

const signUpSchema = yup.object().shape({
  firstName: yup.string().required().min(4).max(40).label("First name"),
  lastName: yup.string().required().min(4).max(40).label("Last name"),
  email: yup.string().email().required().label("Email"),
  password: yup.string().required().min(4).max(16).label("Password"),
});

interface SignUpInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface SignUpProps {
  closeModal: () => void;
}

const SignUpForm = ({ closeModal }: SignUpProps) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<SignUpInputs>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [registerLoading, setRegisterLoading] = React.useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSignUp = (data: ICreateUser) => {
    setRegisterLoading(true);
    dispatch(registerUser(data))
      .then((res) => {
        if (res.payload.statusCode === 201) {
          enqueueSnackbar(res.payload.message, {
            variant: "success",
            preventDuplicate: true,
          });
          setTimeout(() => {
            reset();
          }, 500);
          setTimeout(() => {
            closeModal();
          }, 1000);
        } else {
          enqueueSnackbar(res.payload.message, { variant: "error" });
        }
      })
      .finally(() => {
        setRegisterLoading(false);
      });
  };
  return (
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
        name="password"
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
            label="Password"
            variant="outlined"
            fullWidth
            size="small"
            className="text-xs"
            error={!!errors.email}
            helperText={errors.password ? errors.password.message : ""}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <IoEyeOff /> : <IoEye />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />

      <Button
        type="submit"
        variant="contained"
        className="bg-primary hover:bg-primary/90 w-full mt-4 !h-[46px]"
        size="large"
        disabled={registerLoading}
      >
        {registerLoading ? <LoadinProgress /> : "Sign Up"}
      </Button>
    </Box>
  );
};

const NavBar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const [navBar, setNavBar] = useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [signStep, setSignStep] = React.useState<string>("in");
  const { loginData, setLoginData } = useContext(LoginContext);

  const userLoggedIn = !objectIsEmpty(loginData);
  const secondaryNavLinks = userLoggedIn
    ? ["DASHBOARD"]
    : ["SIGN IN", "SIGN UP"];

  const state = useSelector(selectUsers);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    const scrollAction = () => {
      if (window.scrollY >= 80) {
        setNavBar(true);
      } else {
        setNavBar(false);
      }
    };
    window.addEventListener("scroll", scrollAction);
  }, []);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleGoogleLogin = ({}) => {
    window.open("http://localhost:5050/api/v1/auth/google", "_self");
  };

  const googleLoginError = searchParams.get("error");
  const googleLoginToken = searchParams.get("token");

  useEffect(() => {
    if (googleLoginError === "manual_user_google_signin_conflict") {
      enqueueSnackbar(
        "This email was registered manually, please proceed with email and password",
        { variant: "warning" }
      );
    }
    if (googleLoginToken) {
      localStorage.setItem(
        "loginData",
        JSON.stringify({ login_token: googleLoginToken })
      );
      const loginToken = JSON.parse(
        (typeof window !== "undefined" && localStorage.getItem("loginData")) ||
          "{}"
      );

      dispatch(fetchUserByToken(loginToken?.login_token)).then((res) => {
        if (res.payload.statusCode === 200) {
          enqueueSnackbar(res.payload.message, {
            variant: "success",
            preventDuplicate: true,
          });
          localStorage.setItem(
            "loginData",
            JSON.stringify({ login_token: loginToken?.login_token })
          );
          setLoginData(res.payload.data);
          setTimeout(() => {
            window.location.href = "/";
          }, 500);
        } else {
          enqueueSnackbar(res.payload.message, { variant: "error" });
          localStorage.removeItem("loginData");
        }
      });
    }
  }, [googleLoginError, googleLoginToken]);

  return (
    <div
      className={`lg:px-10 px-0 flex-col items-center ${
        pathName === "/verify" ? "hidden" : "flex"
      }`}
    >
      <div className="lg:flex hidden items-center justify-between w-full">
        <div className="flex items-center justify-start">
          <Link href="/" className="flex ml-2 md:mr-24">
            <Image src="/logo.png" alt="logo" width={50} height={50} />
          </Link>
        </div>
        <div className="flex items-center gap-10">
          <div className={`flex items-center`}>
            <div className={`flex items-center gap-2 pr-4`}>
              <IconButton
                size="small"
                sx={{
                  backgroundColor: "transparent",
                  border: "1px solid #D9D9D9",
                }}
              >
                <FiPhone className="text-accent" />
              </IconButton>
              <p className="text-accent-foreground">+250 788 668 657</p>
            </div>
            <div
              className={`flex items-center gap-2 border-l border-muted-foreground pl-4`}
            >
              <IconButton
                size="small"
                sx={{
                  backgroundColor: "transparent",
                  border: "1px solid #D9D9D9",
                }}
              >
                <HiOutlineMail className="text-accent" />
              </IconButton>
              <p className="text-accent-foreground">
                info@maxkinginstitute.org
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <IconButton
              size="small"
              sx={{
                backgroundColor: "transparent",
                border: "1px solid #D9D9D9",
              }}
            >
              <FaXTwitter className="text-secondary text-sm" />
            </IconButton>
            <IconButton
              size="small"
              sx={{
                backgroundColor: "transparent",
                border: "1px solid #D9D9D9",
              }}
            >
              <FaLinkedinIn className="text-secondary text-sm" />
            </IconButton>
            <IconButton
              size="small"
              sx={{
                backgroundColor: "transparent",
                border: "1px solid #D9D9D9",
              }}
            >
              <FaFacebookF className="text-secondary text-sm" />
            </IconButton>
          </div>
        </div>
      </div>
      {}
      <nav
        className={`bg-primary w-full py-4 px-6 lg:flex hidden items-center justify-between ${
          navBar ? "navbar-animate" : "lg:rounded-[50px] rounded-none relative"
        }  duration-150 ease-in-out`}
      >
        <ul className="flex items-center gap-5">
          {navBarLinks.map((navLink, index: number) => (
            <li
              key={index}
              className={`${
                pathName === `${navLink.path.toLowerCase()}`
                  ? "text-primary-foreground"
                  : "text-white"
              } uppercase`}
            >
              <Link href={`${navLink.path.toLowerCase()}`}>{navLink.name}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-5">
          <IconButton
            size="small"
            sx={{
              backgroundColor: "transparent",
              border: "1px solid #D9D9D9",
            }}
          >
            <IoSearch className="text-white" />
          </IconButton>
          <ul className="flex items-center gap-5">
            {secondaryNavLinks.map((link: string, index: number) => (
              <li
                key={index}
                className={`text-white uppercase cursor-pointer`}
                onClick={() => {
                  !userLoggedIn && handleOpenModal();
                  !userLoggedIn && index === 0
                    ? setSignStep("in")
                    : setSignStep("up");
                  userLoggedIn && router.push("/dashboard");
                }}
              >
                {link}
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <nav
        className={`lg:hidden flex items-center justify-between bg-primary w-full px-4 py-1 fixed top-0 left-0 right-0 z-50`}
      >
        <div>
          <Image src="/pagelogo.png" alt="logo" width={40} height={40} />
        </div>
        <div className="flex items-center gap-2">
          {" "}
          <IconButton
            size="small"
            sx={{
              backgroundColor: "transparent",
            }}
          >
            <IoSearch className="text-white text-xl" />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              backgroundColor: "transparent",
            }}
            onClick={toggleDrawer(true)}
          >
            <IoMenu className="text-white text-xl" />
          </IconButton>
        </div>
      </nav>
      <Drawer open={open} onClose={toggleDrawer(false)} className="">
        <div className="w-[250px] bg-white text-white">
          <List>
            <ListItem
              disablePadding
              className={``}
              onClick={toggleDrawer(false)}
            >
              <ListItemButton>
                <div className="w-full flex items-center justify-between">
                  <Image
                    src="/pagelogo.png"
                    alt="logo"
                    width={40}
                    height={40}
                  />
                  <IconButton className="">
                    <IoArrowForward className="" />
                  </IconButton>
                </div>
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </div>
        <nav>
          <List>
            {navBarLinks?.map((navLink, index: number) => {
              return (
                <Link
                  onClick={() => {
                    setOpen(false);
                  }}
                  href={`${navLink.path.toLowerCase()}`}
                  key={index}
                >
                  <ListItem
                    disablePadding
                    key={index}
                    className={`${
                      pathName === navLink.path.toLowerCase()
                        ? "bg-primary text-primary-foreground"
                        : ""
                    }`}
                  >
                    <ListItemButton>
                      <ListItemText primary={navLink.name} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              );
            })}
          </List>
        </nav>
        <Divider />
        <nav>
          <List>
            {secondaryNavLinks?.map((navLink, index: number) => {
              return (
                <ListItem
                  disablePadding
                  key={index}
                  onClick={() => {
                    !userLoggedIn && index === 0
                      ? setSignStep("in")
                      : setSignStep("up");
                    !userLoggedIn && handleOpenModal();
                    setOpen(false);
                    userLoggedIn && router.push("/dashboard");
                  }}
                >
                  <ListItemButton>
                    <ListItemText primary={navLink} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </nav>
      </Drawer>
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
              {signStep === "in" ? "Sign In" : "Sign Up"}
            </Typography>
            {signStep === "in" ? (
              <SignInForm closeModal={handleCloseModal} />
            ) : (
              <SignUpForm closeModal={handleCloseModal} />
            )}

            <Typography>
              {signStep === "in"
                ? "Don’t have an account? "
                : "Already have an account? "}
              <span
                className="text-secondary font-semibold cursor-pointer"
                onClick={() => {
                  setSignStep(signStep === "in" ? "up" : "in");
                }}
              >
                Sign {signStep === "in" ? "Up" : "In"}
              </span>
            </Typography>

            <div className="flex items-center justify-center w-full">
              {" "}
              <hr className="w-full border border-accent-foreground" />
              <p className="mx-2 text-accent font-semibold">OR</p>
              <hr className="w-full border border-accent-foreground" />
            </div>
            <Button
              variant="contained"
              className="bg-secondary hover:bg-secondary/90 w-full"
              size="large"
              startIcon={<FcGoogle />}
              onClick={handleGoogleLogin}
            >
              Continue with Google
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default NavBar;
