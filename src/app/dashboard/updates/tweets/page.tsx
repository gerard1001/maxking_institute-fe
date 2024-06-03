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
import { Controller, useForm } from "react-hook-form";
import { MdOutlineClose } from "react-icons/md";
import { Tweet } from "react-tweet";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LoadinProgress from "@/components/LoadingProgess";
import { useSnackbar } from "notistack";
import {
  createTweet,
  deleteTweet,
  fetchTweets,
  selectTweets,
  togglePinTweet,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { useRouter } from "next/navigation";
import { fetchTweet } from "react-tweet/api";
import { BsFillTrashFill, BsPin } from "react-icons/bs";
import { RiPushpin2Fill, RiPushpin2Line } from "react-icons/ri";

const schema = yup.object().shape({
  tweetId: yup
    .string()
    .required()
    .matches(/^[a-zA-Z0-9\s]+$/, "Symbols are not allowed"),
});

type InputTypes = {
  tweetId: string;
};

const Tweets = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const tweetState = useSelector(selectTweets);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
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
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
  }, []);

  const handleCreateTweet = (data: InputTypes) => {
    setLoading(true);
    dispatch(createTweet(data))
      .unwrap()
      .then((res) => {
        if (res.statusCode === 201) {
          enqueueSnackbar(res.message, { variant: "success" });
          setTimeout(() => {
            reset();
            handleCloseModal();
          }, 500);
          dispatch(fetchTweets())
            .unwrap()
            .catch((err) => {
              enqueueSnackbar(err.message, { variant: "error" });
            });
        }
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleTogglePinTweet = (id: string) => {
    dispatch(togglePinTweet(id))
      .unwrap()
      .then((res) => {
        if (res.statusCode === 200) {
          dispatch(fetchTweets())
            .unwrap()
            .catch((err) => {
              enqueueSnackbar(err.message, { variant: "error" });
            });
        }
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
  };

  const handleDeleteTweet = (id: string) => {
    dispatch(deleteTweet(id))
      .unwrap()
      .then((res) => {
        if (res.statusCode === 200) {
          dispatch(fetchTweets())
            .unwrap()
            .catch((err) => {
              enqueueSnackbar(err.message, { variant: "error" });
            });
        }
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
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
      <div className="flex items-start justify-center gap-2 flex-wrap pt-4 pb-10">
        {tweetState?.allTweets
          ?.slice()
          ?.sort((a: any, b: any) => b.isPinned - a.isPinned)
          ?.map((tweet) => (
            <div
              className={`w-fit 2xl:w-1/3 h-full text-xs xs:p-4 p-1 pt-2 rounded-md overflow-x-auto ${
                tweet.isPinned ? "bg-primary-foreground" : "bg-white"
              }`}
            >
              <div className="tweet-class">
                <div className="w-full flex items-center gap-2 p-2">
                  <IconButton
                    onClick={() => {
                      handleTogglePinTweet(tweet.id);
                    }}
                    className="bg-slate-200"
                  >
                    {tweet?.isPinned ? (
                      <RiPushpin2Fill className="text-accent text-base" />
                    ) : (
                      <RiPushpin2Line className="text-accent text-base" />
                    )}
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      handleDeleteTweet(tweet.id);
                    }}
                    className="bg-slate-200"
                  >
                    <BsFillTrashFill className="text-accent text-base" />
                  </IconButton>
                </div>
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

export default Tweets;
