import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import React from "react";
import { MdOutlineClose } from "react-icons/md";
import SignInForm from "./SignInForm";
import { FcGoogle } from "react-icons/fc";
import SignUpForm from "./SignUpForm";

type ModalType = {
  handleCloseModal: () => void;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const SignInModal = ({
  handleCloseModal,
  openModal,
  setOpenModal,
}: ModalType) => {
  //   const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [signStep, setSignStep] = React.useState<string>("in");

  //   const handleOpenModal = () => setOpenModal(true);
  //   const handleCloseModal = () => setOpenModal(false);

  const handleGoogleLogin = ({}) => {
    window.open(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`, "_self");
  };
  return (
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
  );
};

export default SignInModal;
