"use client";

import React, { useEffect } from "react";
import {
  createComment,
  deleteComment,
  editComment,
  fetchArticles,
  fetchCommentsByArticleId,
  fetchFeaturedArticles,
  fetchSingleComment,
  likePost,
  selectArticles,
  selectComments,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { format } from "date-fns";
import { CiHeart } from "react-icons/ci";
import { GoComment } from "react-icons/go";
import { FaChevronRight, FaChevronLeft, FaRegEdit } from "react-icons/fa";
import Slider from "react-slick";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { IoArrowForward } from "react-icons/io5";
import { SuspenseLoading } from "@/components/SuspenseLoading";
import { useRouter } from "next/navigation";
import { MdOutlineClose, MdOutlinePlaylistAdd } from "react-icons/md";
import { IoMdHeart } from "react-icons/io";
import ArticleDrawer from "@/components/ArticleDrawer";
import { useSnackbar } from "notistack";
import { LoginContext } from "@/lib/context/LoginContext";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { BsFillTrashFill } from "react-icons/bs";

const schema = yup.object().shape({
  text: yup.string().required().min(5).max(150),
});

interface CreateCommentInputs {
  text: string;
}

const ArticlesPage = () => {
  // const dispatch = useDispatch();
  // const router = useRouter();
  // const state = useSelector(selectArticles);

  // const articles = state.articles;
  // const featuredArticles = state.featuredArticles;

  // useEffect(() => {
  //   dispatch(fetchArticles());
  //   dispatch(fetchFeaturedArticles());
  // }, [dispatch]);

  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const state = useSelector(selectArticles);
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
  }, [dispatch]);

  useEffect(() => {
    if (commentId && commentId !== "") {
      dispatch(fetchSingleComment(commentId))
        .unwrap()
        .then((res) => {
          if (res.statusCode === 200) {
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    cssEase: "linear",
  };

  const PreviousBtn = (props: any) => {
    return (
      <IconButton
        className={props.className}
        onClick={props.onClick}
        sx={{
          border: "2px solid #A65309",
          backgroundColor: "#fff",
          borderRadius: "50%",
        }}
      >
        <FaChevronLeft className="text-primary text-sm" />
      </IconButton>
    );
  };

  const NextBtn = (props: any) => {
    return (
      <IconButton
        className={props.className}
        onClick={props.onClick}
        sx={{
          border: "2px solid #A65309",
          backgroundColor: "#fff",
          borderRadius: "50%",
        }}
      >
        <FaChevronRight className="text-primary text-sm" />
      </IconButton>
    );
  };

  return (
    <>
      {state.loading ? (
        <SuspenseLoading />
      ) : (
        <div className="lg:pt-2 pt-12">
          {state.featuredArticles.length > 0 && (
            <div className="w-[100%] mx-auto pb-7 pt-0 relative linear-gradient-featured">
              <div className="absolute left-0 top-0 lg:p-2 p-1 lg:pr-6 pr-4 bg-secondary z-50 clip-featured">
                <h1 className="text-primary-foreground text-sm text-center font-semibold uppercase">
                  Featured articles
                </h1>
              </div>
              <div className="wrapper2">
                <Slider
                  prevArrow={<PreviousBtn />}
                  nextArrow={<NextBtn />}
                  {...settings}
                >
                  {state.featuredArticles.map((article, idx) => {
                    return (
                      <div
                        key={idx}
                        className="wrapper flex items-start relative"
                      >
                        <div className="sm:hidden flex flex-col justify-center w-[80%] max-w-[550px] aspect-[16/7] absolute xxs:top-[50%] top-[60%] left-[50%] -translate-x-2/4 -translate-y-2/4 text-white p-2 z-10">
                          <div className="flex flex-col items-center justify-center">
                            <h1 className="xs:text-md text-xs font-bold uppercase text-center max-w-[500px] pb-3 border-b line-clamp-3">
                              {article.title}
                            </h1>{" "}
                            <Button
                              variant="contained"
                              size="small"
                              endIcon={<IoArrowForward />}
                              className="xs:mt-5 mt-1 bg-primary"
                              onClick={() => {
                                // window.location.href = `/articles/${article.id}`;
                                router.push(`/articles/${article.id}`);
                              }}
                            >
                              Read more
                            </Button>
                          </div>
                        </div>
                        <div className="fill relative mx-auto flex items-center justify-between">
                          <div className="sm:flex hidden flex-col justify-center aspect-video text-accent p-2">
                            <div className="flex flex-col items-center justify-center">
                              <h1 className="2xl:text-2xl font-bold text-md uppercase text-center max-w-[550px] pb-3 border-b">
                                {article.title}
                              </h1>
                              <p className="lg:block hidden text-center text-accent line-clamp-3 mt-2">
                                {article.description}
                              </p>
                              <Button
                                variant="contained"
                                endIcon={<IoArrowForward />}
                                className="mt-5 bg-primary"
                                onClick={() => {
                                  // window.location.href = `/articles/${article.id}`;
                                  router.push(`/articles/${article.id}`);
                                }}
                              >
                                Read more
                              </Button>
                            </div>
                          </div>{" "}
                          <img
                            src={article.coverImage}
                            alt=""
                            className="object-cover object-center border border-[#afafaf33] w-full xl:max-w-[766px] sm:max-w-[440px] aspect-video"
                          />
                          <div className="absolute inset-0 bg-black/25 top-overlay-linear-gradient sm:hidden block"></div>
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </div>
          )}
          <h1 className="text-primary-foreground text-xl text-center mt-14 mx-auto font-bold uppercase">
            Our stories
          </h1>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 grid-cols-1 lg:p-10 p-4 gap-4">
            {state?.articles
              ?.slice(0, 8)
              ?.sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((article) => {
                return (
                  <div
                    key={article.id}
                    className="max-w-[320px] pb-3 sm:border-b-0 border-b"
                  >
                    <div className="overflow-hidden bg-cover bg-no-repeat rounded-md w-full cursor-pointer">
                      <img
                        src={article.coverImage}
                        alt=""
                        className="w-full aspect-video transition duration-300 ease-in-out hover:scale-105 object-cover"
                        onClick={() => {
                          // window.location.href = `/articles/${article.id}`;
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
                    <h1 className="text-slate-900 font-bold text-sm">
                      {article.title}
                    </h1>
                    {/* <p className="line-clamp-3 my-2">{article.description}</p> */}
                    {/* <div className="flex items-center gap-3 justify-between mt-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-[2px] text-black/75">
                          <CiHeart className="text-2xl" />
                          <span className="">12</span>
                        </div>
                        <div className="flex items-center gap-[4px] text-black/75">
                          <GoComment className="text-xl" />
                          <span className=""> 5</span>
                        </div>
                      </div>
                      <div className="text-black/75">
                        <MdOutlinePlaylistAdd className="text-xl" />
                      </div>
                    </div> */}
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
                      <div className="text-black/75">
                        <MdOutlinePlaylistAdd className="text-xl" />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
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

export default ArticlesPage;
