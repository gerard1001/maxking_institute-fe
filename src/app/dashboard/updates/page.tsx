"use client";

import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { MdOutlineClose } from "react-icons/md";
import { Tweet } from "react-tweet";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LoadinProgress from "@/components/LoadingProgess";
import { useSnackbar } from "notistack";
import {
  createTweet,
  fetchTweets,
  selectTweets,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { useRouter } from "next/navigation";
import { fetchTweet } from "react-tweet/api";

const schema = yup.object().shape({
  tweetId: yup
    .string()
    .required()
    .matches(/^[a-zA-Z0-9\s]+$/, "Symbols are not allowed"),
});

type InputTypes = {
  tweetId: string;
};

const UpdatesPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const tweetState = useSelector(selectTweets);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [tweetValue, setTweetValue] = React.useState<string>("");
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<InputTypes>({
    resolver: yupResolver(schema),
    defaultValues: {
      tweetId: "",
    },
  });
  const fieldValue = watch("tweetId");

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  React.useEffect(() => {
    dispatch(fetchTweets())
      .unwrap()
      .then((res) => {
        if (res.statusCode === 200) {
          setTweetValue(res.data[0].id);
        }
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
  }, []);

  const handleCreateTweet = (data: InputTypes) => {
    console.log(data);
    setLoading(true);
    dispatch(createTweet(data))
      .unwrap()
      .then((res) => {
        if (res.statusCode === 201) {
          enqueueSnackbar(res.message, { variant: "success" });
          setTimeout(() => {
            reset();
          }, 500);
        }
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div>
      <Button
        variant="contained"
        className="bg-primary hover:bg-primary/90 w-fit mt-4 !h-[46px]"
        size="large"
        onClick={handleOpenModal}
      >
        Add New Tweet
      </Button>
      <div className="flex items-start justify-center">
        {tweetState?.allTweets?.map((tweet) => (
          <div className="w-fit 2xl:block hidden h-fulllight text-xs p-12">
            <div className="tweet-class">
              <Tweet id={tweet.tweetId} />
            </div>
          </div>
        ))}
      </div>
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
          <Box className="flex items-center justify-end absolute top-0 right-0">
            <IconButton onClick={handleCloseModal} size="medium">
              <MdOutlineClose />
            </IconButton>
          </Box>
          <Typography className="text-2xl font-semibold text-accent">
            Add Tweet
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(handleCreateTweet)}
            className=""
          >
            <Controller
              name="tweetId"
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
                  label="Tweet ID"
                  variant="outlined"
                  fullWidth
                  size="small"
                  className="text-xs"
                  error={!!errors.tweetId}
                  helperText={errors.tweetId ? errors.tweetId.message : ""}
                />
              )}
            />

            <Button
              type="submit"
              variant="contained"
              className="bg-primary hover:bg-primary/90 w-full mt-4 !h-[46px]"
              size="large"
              disabled={loading}
            >
              {loading ? <LoadinProgress /> : "Save"}
            </Button>
          </Box>
          <Box className="w-full max-h-[60vh] overflow-y-auto mt-4">
            <div className="tweet-class">
              <Tweet id={fieldValue} />
            </div>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdatesPage;
