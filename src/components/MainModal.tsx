"use client";

import { Box, Dialog, IconButton, Modal, Typography } from "@mui/material";
import React from "react";
import { MdOutlineClose } from "react-icons/md";

type DialogType = {
  title: string;
  content: React.PropsWithChildren;
};

const MainModal = ({ title, content }: DialogType) => {
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
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
            {title}
          </Typography>
        </Box>
        {content.children}
        {/* <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(handleSaveOrUpdateCategory)}
          className=""
        >
          <Controller
            name="name"
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
                label="Category Name"
                variant="outlined"
                fullWidth
                size="small"
                className="text-xs"
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ""}
              />
            )}
          />
          <div className="flex flex-col mt-4">
            <div className="flex flex-col items-start gap-2 w-fit">
              <img
                src={
                  picUrl
                    ? picUrl
                    : "https://res.cloudinary.com/rutagerard/image/upload/v1713800805/Important/manga_z8z1xs.png"
                }
                alt=""
                className="w-[100px] aspect-square object-cover rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
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
                  className="bg-secondary"
                >
                  Upload
                </Button>
              </label>
            </div>
          </div>
          <Button
            type="submit"
            variant="contained"
            className="bg-primary hover:bg-primary/90 w-full mt-4 !h-[46px]"
            size="large"
            disabled={loading}
          >
            {loading ? <LoadinProgress /> : "Save"}
          </Button>
        </Box> */}
      </Box>
    </Modal>
  );
};

export default MainModal;
