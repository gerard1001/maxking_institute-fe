"use client";

import React, { useEffect } from "react";
import {
  createComment,
  deleteComment,
  editComment,
  fetchArticles,
  fetchCommentsByArticleId,
  fetchSingleComment,
  fetchUserSavedArticles,
  likePost,
  saveUserArticle,
  selectArticles,
  selectComments,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { format, formatDistanceToNow } from "date-fns";
import { CiHeart } from "react-icons/ci";
import { GoComment } from "react-icons/go";
import { FaBlog, FaRegEdit } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle";
import { ViewAll } from "./PopularCourses";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import {
  MdOutlineClose,
  MdOutlinePlaylistAdd,
  MdOutlinePlaylistRemove,
} from "react-icons/md";
import { useRouter } from "next/navigation";
import Drawer from "@mui/material/Drawer";
import { useSnackbar } from "notistack";
import LoadinProgress from "@/components/LoadingProgess";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LoginContext } from "@/lib/context/LoginContext";
import SignInModal from "@/components/SignInModal";
import { HiDotsHorizontal } from "react-icons/hi";
import { BsFillTrashFill } from "react-icons/bs";
import { IoMdHeart } from "react-icons/io";
import ArticleDrawer from "@/components/ArticleDrawer";

const schema = yup.object().shape({
  text: yup.string().required().min(5).max(150),
});

interface CreateCommentInputs {
  text: string;
}

const Articles = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const state = useSelector(selectArticles);
  const savedArticles = state.savedArticles;
  const commentState = useSelector(selectComments);
  const [open, setOpen] = React.useState(false);
  const [articleId, setArticleId] = React.useState<string>("");
  const [commentId, setCommentId] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [editing, setEditing] = React.useState<boolean>(false);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = React.useState<boolean>(false);
  const { setGoToPage, userId, userLoggedIn, userRole } =
    React.useContext(LoginContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const [loadingFetchComment, setLoadingFetchComment] =
    React.useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const {
    handleSubmit: handleSubmitUpdate,
    control: controlUpdate,
    setValue: setValueUpdate,
    formState: { errors: errorsUpdate },
  } = useForm<CreateCommentInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      text: "",
    },
  });

  const savedArticlesIds = savedArticles.map((article) => article.id);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleOpenEditModal = () => setOpenEditModal(true);
  const handleCloseEditModal = () => setOpenEditModal(false);

  const openDrawer = () => {
    setOpen(true);
  };
  const closeDrawer = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(fetchArticles())
      .unwrap()
      .then((res) => {})
      .catch((err) => {
        enqueueSnackbar(err.message, {
          variant: "error",
          preventDuplicate: true,
        });
      });

    dispatch(fetchUserSavedArticles());
  }, [dispatch]);

  useEffect(() => {
    if (commentId && commentId !== "") {
      dispatch(fetchSingleComment(commentId))
        .unwrap()
        .then((res) => {
          if (res.statusCode === 200) {
            console.log(res, "99999");

            if (editing && openEditModal) {
              setValueUpdate("text", res.data.text);
            }
          }
        })
        .catch((err) => {
          enqueueSnackbar(err.message, {
            variant: "error",
            preventDuplicate: true,
          });
        });
    }
  }, [commentId]);

  React.useEffect(() => {
    if (articleId !== "") {
      setLoading(true);
      dispatch(fetchCommentsByArticleId(articleId))
        .unwrap()
        .then((res) => {
          if (res.statusCode === 200) {
            dispatch(fetchArticles());
          }
        })
        .catch((err) => {
          enqueueSnackbar(err.message, {
            variant: "error",
            preventDuplicate: true,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [articleId]);

  React.useEffect(() => {
    if (editing && openEditModal) {
      setValueUpdate("text", commentState?.comment?.text);
    }
  }, [editing, openEditModal]);

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

  const handleEditComment = (data: CreateCommentInputs) => {
    dispatch(editComment({ id: commentId, data }))
      .unwrap()
      .then((res: any) => {
        if (res.statusCode === 200) {
          enqueueSnackbar(res.message, {
            variant: "success",
            preventDuplicate: true,
          });
          setValueUpdate("text", "");
          dispatch(fetchCommentsByArticleId(articleId));
          dispatch(fetchArticles());
          handleCloseEditModal();
        }
      })
      .catch((err) => {
        enqueueSnackbar(err.message, {
          variant: "error",
          preventDuplicate: true,
        });
      });
  };

  const handleDeleteComment = () => {
    if (commentId) {
      dispatch(deleteComment(commentId))
        .unwrap()
        .then((res) => {
          if (res.statusCode === 200) {
            enqueueSnackbar(res.message, {
              variant: "success",
              preventDuplicate: true,
            });
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
    }
  };

  const likeOrUnlikePost = (postId: string) => {
    dispatch(likePost(postId))
      .unwrap()
      .then((res) => {
        if (res.statusCode === 200) {
          console.log(res.data?.split(" ")[1], "555555");
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

  const saveArticle = (id: string) => {
    dispatch(saveUserArticle(id))
      .unwrap()
      .then((res) => {
        if (res.statusCode === 200) {
          enqueueSnackbar(res.message, {
            variant: "success",
            preventDuplicate: true,
          });
          dispatch(fetchUserSavedArticles());
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
    <>
      <div className="lg:p-10 p-2" id="articles">
        <SectionTitle
          title="recent ARTICLES"
          icon={FaBlog}
          rightSideActions={ViewAll("/articles")}
        />
        <div className="grid lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 grid-cols-1 lg:p-10 p-4 gap-4">
          {state?.articles &&
            state?.articles
              ?.slice(0, 8)
              ?.sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((article) => {
                return (
                  <div key={article.id} className="max-w-[300px] sm:pb-6 pb-2">
                    <div className="overflow-hidden bg-cover bg-no-repeat rounded-md w-full cursor-pointer">
                      <img
                        src={article.coverImage}
                        alt=""
                        className="w-full aspect-video transition duration-300 ease-in-out hover:scale-105 object-cover"
                        onClick={() => {
                          router.push(`/articles/${article.id}`);
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 py-2 text-slate-900 text-sm font-semibold">
                        <img
                          src={article.author.profile.picture}
                          alt="author image"
                          className="w-7 aspect-square rounded-full object-cover cursor-pointer"
                        />
                        <h1>
                          {article.author.firstName} {article.author.lastName}
                        </h1>
                      </div>
                      <p className="my-2 text-xs font-semibold text-primary">
                        {format(article.createdAt, "PP")}
                      </p>
                    </div>
                    <h1 className="text-accent font-bold text-md line-clamp-2 min-h-12">
                      {article.title}
                    </h1>
                    <p className="line-clamp-3 my-2 text-sm">
                      {article.description}
                    </p>
                    <div className="flex items-center gap-3 justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex items-center gap-[4px] text-black/75 hover:bg-slate-100 p-1 rounded-md cursor-pointer"
                          onClick={() => {
                            if (!userLoggedIn) {
                              setGoToPage(`/#articles`);
                              handleOpenModal();
                            } else {
                              likeOrUnlikePost(article.id);
                            }
                          }}
                        >
                          {article.likes.find(
                            (like) => like.liker.id === userId
                          ) ? (
                            <IoMdHeart className="text-primary text-2xl" />
                          ) : (
                            <CiHeart className="text-2xl" />
                          )}

                          <span className="text-sm font-semibold">
                            {article?.likes?.length}{" "}
                            {article?.likes?.length === 1 ? "like" : "likes"}
                          </span>
                        </div>
                        <div
                          className="flex items-center gap-[4px] text-black/75 hover:bg-slate-100 p-1 rounded-md cursor-pointer"
                          onClick={() => {
                            setArticleId(article.id);
                            openDrawer();
                          }}
                        >
                          <GoComment className="text-xl" />
                          <span className="text-sm font-semibold">
                            {" "}
                            {article?.comments?.length}{" "}
                            {article?.comments?.length === 1
                              ? "comment"
                              : "comments"}
                          </span>
                        </div>
                      </div>
                      {userLoggedIn && (
                        <div className="text-black/75">
                          <IconButton
                            onClick={() => {
                              saveArticle(article.id);
                            }}
                            className=""
                          >
                            {!savedArticlesIds.includes(article.id) ? (
                              <MdOutlinePlaylistAdd className={`text-xl`} />
                            ) : (
                              <MdOutlinePlaylistRemove className="text-xl text-red-500" />
                            )}
                          </IconButton>
                        </div>
                      )}
                    </div>
                    <Divider className="sm:hidden block mt-4" />
                  </div>
                );
              })}
        </div>
      </div>
      {/* <Drawer open={open} onClose={closeDrawer} className="" anchor="right">
        <div className="max-w-[600px] w-[400px] relative">
          <IconButton onClick={closeDrawer} className="absolute top-4 right-4">
            <MdOutlineClose className="" />
          </IconButton>
          <div>
            <h1 className="text-accent text-2xl font-bold p-4">
              Comments (
              {loading ? "..." : commentState?.articleComments?.length})
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
                              helperText={
                                errors.text ? errors.text.message : ""
                              }
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
                              {formatDistanceToNow(
                                new Date(comment.updatedAt),
                                {
                                  addSuffix: true,
                                }
                              )}
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
      </Drawer> */}
      <ArticleDrawer
        articleId={articleId}
        open={open}
        closeDrawer={closeDrawer}
        commentState={commentState}
        handleClick={handleClick}
        handleOpenModal={handleOpenModal}
        loading={loading}
        setCommentId={setCommentId}
        setGoToPage={setGoToPage}
        setOpenModal={setOpenModal}
        userId={userId}
        userLoggedIn={userLoggedIn}
        userRole={userRole}
        key={articleId}
      />
      <SignInModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        setOpenModal={setOpenModal}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            setEditing(true);
            handleOpenEditModal();
            handleClose();
          }}
        >
          <FaRegEdit className="text-base mr-2" />
          Edit comment
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleDeleteComment();
            handleClose();
          }}
        >
          <BsFillTrashFill className="text-base mr-2" />
          Remove comment
        </MenuItem>
      </Menu>
      <Modal
        open={openEditModal}
        onClose={handleCloseEditModal}
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
              sm: 1400,
              xs: "95%",
            },
            maxWidth: 640,
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
          <Box className="flex items-center justify-between border-b mb-4">
            <Typography className="text-2xl font-semibold text-accent">
              Edit Comment
            </Typography>
            <IconButton onClick={handleCloseEditModal} size="medium">
              <MdOutlineClose />
            </IconButton>
          </Box>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmitUpdate(handleEditComment)}
            className=""
          >
            {" "}
            <Controller
              name="text"
              control={controlUpdate}
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
                  rows={4}
                  size="small"
                  className="text-xs"
                  error={!!errorsUpdate.text}
                  helperText={
                    errorsUpdate.text ? errorsUpdate.text.message : ""
                  }
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
        </Box>
      </Modal>
    </>
  );
};

export default Articles;
