import {
  Box,
  Button,
  Drawer,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { MdOutlineClose } from "react-icons/md";
import SignInForm from "./SignInForm";
import { FcGoogle } from "react-icons/fc";
import SignUpForm from "./SignUpForm";
import { CommentSliceState } from "@/lib/interfaces/comment.interface";
import LoadinProgress from "./LoadingProgess";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  createComment,
  fetchArticles,
  fetchCommentsByArticleId,
  likePost,
  useDispatch,
} from "@/lib/redux";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { formatDistanceToNow } from "date-fns";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoMdHeart } from "react-icons/io";
import { CiHeart } from "react-icons/ci";

type ModalType = {
  closeDrawer: () => void;
  open: boolean;
  loading: boolean;
  userLoggedIn: boolean;
  articleId: string;
  userId: string;
  userRole: string;
  commentState: CommentSliceState;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpenModal: () => void;
  setGoToPage: React.Dispatch<React.SetStateAction<string>>;
  setCommentId: React.Dispatch<React.SetStateAction<string>>;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const schema = yup.object().shape({
  text: yup.string().required().min(5).max(150),
});

interface CreateCommentInputs {
  text: string;
}

const ArticleDrawer = ({
  closeDrawer,
  open,
  loading,
  userLoggedIn,
  commentState,
  articleId,
  userId,
  userRole,
  setOpenModal,
  handleOpenModal,
  setGoToPage,
  setCommentId,
  handleClick,
}: ModalType) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<CreateCommentInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      text: "",
    },
  });

  const handleSubmitComment = (data: CreateCommentInputs) => {
    dispatch(createComment({ articleId: articleId, data }))
      .unwrap()
      .then((res) => {
        if (res.statusCode === 201) {
          enqueueSnackbar("Comment submitted", {
            variant: "success",
            preventDuplicate: true,
          });
          setValue("text", "");
          dispatch(fetchCommentsByArticleId(articleId));
          dispatch(fetchArticles());
        }
      })
      .catch((err) => {
        enqueueSnackbar(err.message, {
          variant: "error",
          preventDuplicate: true,
        });
      });
  };

  const likeOrUnlikePost = (postId: string) => {
    dispatch(likePost(postId))
      .unwrap()
      .then((res) => {
        if (res.statusCode === 200) {
          if (res.data?.split(" ")[1] === "article") {
            dispatch(fetchArticles());
          } else {
            dispatch(fetchCommentsByArticleId(articleId));
          }
        }
      })
      .catch((err) => {
        enqueueSnackbar(err.message, {
          variant: "error",
          preventDuplicate: true,
        });
      });
  };

  return (
    <Drawer open={open} onClose={closeDrawer} className="" anchor="right">
      <div className="max-w-[600px] w-[400px] relative">
        <IconButton onClick={closeDrawer} className="absolute top-4 right-4">
          <MdOutlineClose className="" />
        </IconButton>
        <div>
          <h1 className="text-accent text-2xl font-bold p-4">
            Comments ({loading ? "..." : commentState?.articleComments?.length})
          </h1>
          <div className="p-4">
            {loading ? (
              <LoadinProgress />
            ) : (
              <div>
                <div className="border-b pb-6">
                  {userLoggedIn ? (
                    <Box
                      component="form"
                      noValidate
                      onSubmit={handleSubmit(handleSubmitComment)}
                      className=""
                    >
                      {" "}
                      <Controller
                        name="text"
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
                            label="Enter your comment here"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={2}
                            size="small"
                            className="text-xs"
                            error={!!errors.text}
                            helperText={errors.text ? errors.text.message : ""}
                          />
                        )}
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        className="bg-primary hover:bg-primary/90 w-full mt-4 !h-[46px]"
                        size="large"
                      >
                        Submit
                      </Button>
                    </Box>
                  ) : (
                    <Button
                      variant="contained"
                      className="bg-white text-accent hover:shadow-md w-full mt-4 h-[46px]"
                      size="large"
                      onClick={() => {
                        setGoToPage(`/#articles`);
                        handleOpenModal();
                      }}
                    >
                      Comment on this post
                    </Button>
                  )}
                </div>

                <div className="">
                  {commentState?.articleComments
                    ?.slice()
                    ?.sort(
                      (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                    )
                    ?.map((comment) => (
                      <div key={comment.id} className="p-4 border-b">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img
                              src={comment.writer.profile.picture}
                              alt="author image"
                              className="w-7 aspect-square rounded-full object-cover cursor-pointer"
                            />
                            <div>
                              <h1 className="text-accent font-semibold text-sm">
                                {comment.writer.firstName}{" "}
                                {comment.writer.lastName}
                              </h1>
                              <p className="text-xs text-black/75">
                                {formatDistanceToNow(
                                  new Date(comment.createdAt),
                                  { addSuffix: true }
                                )}
                              </p>
                            </div>
                          </div>
                          {userLoggedIn &&
                            (userId === comment.writer.id ||
                              (userRole && userRole === "SUPER_ADMIN")) && (
                              <IconButton
                                onClick={(
                                  event: React.MouseEvent<HTMLButtonElement>
                                ) => {
                                  setCommentId(comment.id);
                                  handleClick(event);
                                }}
                              >
                                <HiDotsHorizontal className="text-accent text-base" />
                              </IconButton>
                            )}
                        </div>

                        <p className="mt-2">{comment.text}</p>
                        {comment.createdAt !== comment.updatedAt && (
                          <p className="mt-2 text-sm text-muted">
                            (Edited{" "}
                            {formatDistanceToNow(new Date(comment.updatedAt), {
                              addSuffix: true,
                            })}
                            )
                          </p>
                        )}
                        <div
                          className="flex items-center gap-[4px] text-black/75 hover:bg-slate-100 p-1 rounded-md cursor-pointer w-fit"
                          onClick={() => {
                            if (!userLoggedIn) {
                              setGoToPage(`/#articles`);
                              handleOpenModal();
                            } else {
                              likeOrUnlikePost(comment.id);
                            }
                          }}
                        >
                          {comment.likes.find(
                            (like) => like.liker.id === userId
                          ) ? (
                            <IoMdHeart className="text-primary" />
                          ) : (
                            <CiHeart />
                          )}

                          <span className="text-sm font-semibold">
                            {comment?.likes?.length}{" "}
                            {comment?.likes?.length === 1 ? "like" : "likes"}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default ArticleDrawer;
