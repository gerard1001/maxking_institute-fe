"use client";

import { SuspenseLoading } from "@/components/SuspenseLoading";
import {
  deleteComment,
  editComment,
  fetchArticles,
  fetchCommentsByArticleId,
  fetchRelatedArticles,
  fetchSingleArticle,
  fetchSingleComment,
  likePost,
  selectArticles,
  selectComments,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { format } from "date-fns/format";
import React, { useEffect, useRef } from "react";
import { CiHeart } from "react-icons/ci";
import { GoComment } from "react-icons/go";
import Drawer from "@mui/material/Drawer";
import { MdOutlineClose, MdOutlinePlaylistAdd } from "react-icons/md";
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
import { useRouter } from "next/navigation";
import ArticleDrawer from "@/components/ArticleDrawer";
import { LoginContext } from "@/lib/context/LoginContext";
import { useSnackbar } from "notistack";
import { FaRegEdit } from "react-icons/fa";
import { BsFillTrashFill } from "react-icons/bs";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoMdHeart } from "react-icons/io";

interface SingleArticleProps {
  params: {
    article_id: string;
  };
}

const schema = yup.object().shape({
  text: yup.string().required().min(5).max(150),
});

interface CreateCommentInputs {
  text: string;
}

const SingleArticle = ({ params: { article_id } }: SingleArticleProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const state = useSelector(selectArticles);
  const divRef = useRef<HTMLDivElement>(null);
  const commentState = useSelector(selectComments);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [commentId, setCommentId] = React.useState<string>("");
  const [editing, setEditing] = React.useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = React.useState<boolean>(false);
  const { setGoToPage, userId, userLoggedIn, userRole } =
    React.useContext(LoginContext);
  const openMenu = Boolean(anchorEl);

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

  const openDrawer = () => {
    setOpen(true);
  };
  const closeDrawer = () => {
    setOpen(false);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleOpenEditModal = () => setOpenEditModal(true);
  const handleCloseEditModal = () => setOpenEditModal(false);

  const article = state.singleArticle;
  const relatedArticles = state.relatedArticles;

  useEffect(() => {
    if (article_id) {
      dispatch(fetchSingleArticle(article_id));
      dispatch(fetchRelatedArticles(article_id));
    }
  }, [dispatch]);

  React.useEffect(() => {
    if (article_id !== "") {
      setLoading(true);
      dispatch(fetchCommentsByArticleId(article_id))
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
  }, [article_id]);

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
    if (editing && openEditModal) {
      setValueUpdate("text", commentState?.comment?.text);
    }
  }, [editing, openEditModal]);

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
            dispatch(fetchCommentsByArticleId(article_id));
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
          dispatch(fetchCommentsByArticleId(article_id));
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

  const likeOrUnlikePost = (postId: string) => {
    dispatch(likePost(postId))
      .unwrap()
      .then((res) => {
        if (res.statusCode === 200) {
          console.log(res.data?.split(" "), "555555");
          if (res.data?.split(" ")[1] === "article") {
            dispatch(fetchSingleArticle(postId));
          } else {
            dispatch(fetchCommentsByArticleId(article_id));
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
    <div className="pt-2 lg:px-10 xs:px-2 px-0 pb-12">
      {state.loading ? (
        <SuspenseLoading />
      ) : (
        <div className={``}>
          <div>
            <img
              src={article.coverImage}
              alt={article.id}
              className="w-full md:aspect-[22/9] object-cover hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
            />
          </div>
          <div className="flex items-start">
            {" "}
            <div className="w-[100%] min-h-screen px-4 xs:mt-2 mt-0 bg-yellow-50">
              <div className="flex items-center gap-2 justify-between">
                <div className="flex xs:items-center items-start xs:flex-row flex-col gap-2 py-4">
                  <h1 className="text-accent font-semibold">Author:</h1>
                  <div className="flex items-center gap-2">
                    <img
                      src={article?.author?.profile?.picture}
                      alt="author image"
                      className="w-7 aspect-square rounded-full object-cover cursor-pointer"
                    />
                    <p className="text-sm">
                      {article?.author?.firstName} {article?.author?.lastName}
                    </p>
                  </div>
                </div>
                <div className="flex xs:items-center items-start xs:flex-row flex-col gap-2 py-4">
                  <h1 className="text-accent font-semibold">Publishe on:</h1>

                  <p className="text-sm">
                    {article?.createdAt && format(article?.createdAt, "PP")}
                  </p>
                </div>
              </div>
              <div className="border-y border-accent-foreground/50 py-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* <div className="flex items-center gap-[4px] text-black/75 hover:bg-slate-100 p-1 rounded-md cursor-pointer">
                    <CiHeart className="text-2xl" />
                    <span className="">{article?.likes?.length}</span>
                  </div> */}
                  <div
                    className="flex items-center gap-[4px] text-black/75 hover:bg-slate-100 p-1 rounded-md cursor-pointer"
                    onClick={() => {
                      if (!userLoggedIn) {
                        setGoToPage(`/#articles`);
                        handleOpenModal();
                      } else {
                        likeOrUnlikePost(article_id);
                      }
                    }}
                  >
                    {article?.likes?.find(
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
                      openDrawer();
                    }}
                  >
                    <GoComment className="text-xl" />
                    <span className="">{article?.comments?.length}</span>
                  </div>
                </div>
                <div className="text-black/75">
                  <MdOutlinePlaylistAdd className="text-xl" />
                </div>
              </div>
              <div className="border-y border-accent-foreground/50 py-3">
                <h1 className="text-xl font-bold my-3">{article.title}</h1>
                <p className="">{article.description}</p>
              </div>
              <div className="py-3">
                <div
                  ref={divRef}
                  dangerouslySetInnerHTML={{
                    __html: article.body,
                  }}
                />
              </div>
            </div>
            <div
              className={`${
                relatedArticles?.length === 0
                  ? "hidden"
                  : "md:w-[320px] w-[250px] min-h-screen md:block hidden xs:mt-2 mt-0 lg:pl-4 md:pl-2 h-full max-h-[200vh] overflow-y-auto pr-[4px]"
              }`}
            >
              <h1 className="text-accent text-xl mt-4 font-bold uppercase mb-4">
                Related articles
              </h1>
              <div className="grid grid-cols-1 gap-4">
                {relatedArticles.map((article) => {
                  return (
                    <div
                      key={article.id}
                      className="max-w-[320px] pb-3 border-b"
                    >
                      <div className="overflow-hidden bg-cover bg-no-repeat rounded-md w-full cursor-pointer">
                        <img
                          src={article.coverImage}
                          alt=""
                          className="w-full aspect-video transition duration-300 ease-in-out hover:scale-105"
                          onClick={() => {
                            // window.location.href = `/articles/${article.id}`;
                            router.push(`/articles/${article.id}`);
                          }}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 py-2 text-slate-900 text-sm font-semibold">
                          <img
                            src={article?.author?.profile?.picture}
                            alt="author image"
                            className="w-7 aspect-square rounded-full object-cover cursor-pointer"
                          />
                          <h1>
                            {article?.author?.firstName}{" "}
                            {article?.author?.lastName}
                          </h1>
                        </div>
                        <p className="my-2 text-xs font-semibold text-black/75">
                          {format(article?.createdAt, "PP")}
                        </p>
                      </div>
                      <h1 className="text-slate-900 font-bold text-sm">
                        {article?.title}
                      </h1>
                      {/* <p className="line-clamp-3 my-2">{article.description}</p> */}
                      <div className="flex items-center gap-3 justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-[2px] text-black/75">
                            <CiHeart className="text-2xl" />
                            <span className="">{article?.likes?.length}</span>
                          </div>
                          <div className="flex items-center gap-[2px] text-black/75">
                            <GoComment className="text-xl" />
                            <span className="">
                              {article?.comments?.length}
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
          </div>
        </div>
      )}
      <ArticleDrawer
        articleId={article_id}
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
        key={article_id}
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
      {/* <Drawer open={open} onClose={closeDrawer} className="" anchor="right">
        <div className="max-w-[600px] w-full">
          <div
            className={`w-full flex items-center justify-between px-3 sticky top-0 right-0 left-0 shadow-md z-50 bg-white`}
          >
            <h1 className="text-xl font-bold">5 Comments</h1>

            <IconButton onClick={closeDrawer} className="">
              <MdOutlineClose className="" />
              <div className="py-3"></div>
            </IconButton>
          </div>
          <div className="mt-10 lg:px-4 px-2">
          </div>
        </div>
      </Drawer> */}
    </div>
  );
};

export default SingleArticle;
