"use client";

import React, { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Box, Button, Chip, Dialog, IconButton } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import {
  deleteArticle,
  featureArticle,
  fetchArticles,
  fetchFeaturedArticles,
  fetchUserSavedArticles,
  saveUserArticle,
  selectArticles,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { CiHeart } from "react-icons/ci";
import { GoComment } from "react-icons/go";
import { format } from "date-fns";
import {
  FaChevronLeft,
  FaChevronRight,
  FaRegEdit,
  FaTrashAlt,
} from "react-icons/fa";
import { IoArrowForward, IoWarningOutline } from "react-icons/io5";
import { FaRegStar, FaStar } from "react-icons/fa6";
import LoadinProgress from "@/components/LoadingProgess";
import { useSnackbar } from "notistack";
import Slider from "react-slick";
import { MdOutlinePlaylistAdd, MdOutlinePlaylistRemove } from "react-icons/md";
import { LoginContext } from "@/lib/context/LoginContext";

const Articles = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const state = useSelector(selectArticles);
  const { enqueueSnackbar } = useSnackbar();
  const pathName = usePathname();

  const articles = state.articles;
  const featuredArticles = state.featuredArticles;
  const savedArticles = state.savedArticles;
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [articleId, setArticleId] = useState<string>("");
  const { isClient } = React.useContext(LoginContext);
  const [page, setPage] = useState<"main" | "saved">("main");

  useEffect(() => {
    dispatch(fetchArticles());
    dispatch(fetchFeaturedArticles());
  }, []);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDeleteArticle = () => {
    if (articleId && articleId !== "") {
      setDeleteLoading(true);
      dispatch(deleteArticle(articleId))
        .unwrap()
        .then((res: any) => {
          if (res.statusCode === 200) {
            enqueueSnackbar(res.message, {
              variant: "success",
              preventDuplicate: true,
            });
            dispatch(fetchArticles())
              .unwrap()
              .catch((err) => {
                enqueueSnackbar(err.message, {
                  variant: "error",
                  preventDuplicate: true,
                });
              });
          }
        })
        .catch((err) => {
          enqueueSnackbar(err.message, {
            variant: "error",
            preventDuplicate: true,
          });
        })
        .finally(() => {
          setDeleteLoading(false);
          handleCloseDialog();
        });
    }
  };

  const handleFeatureArticle = (articleId: string) => {
    const article = articles.find((article) => article.id === articleId);
    if (!article) return;
    const isFeatured = !article.isFeatured;
    dispatch(featureArticle({ id: articleId, data: { isFeatured } }))
      .unwrap()
      .then((res: any) => {
        if (res.statusCode === 200) {
          enqueueSnackbar(res.message, {
            variant: "success",
            preventDuplicate: true,
          });
          dispatch(fetchArticles())
            .unwrap()
            .catch((err) => {
              enqueueSnackbar(err.message, {
                variant: "error",
                preventDuplicate: true,
              });
            });
          dispatch(fetchFeaturedArticles())
            .unwrap()
            .catch((err) => {
              enqueueSnackbar(err.message, {
                variant: "error",
                preventDuplicate: true,
              });
            });
        }
      })
      .catch((err: any) => {
        enqueueSnackbar(err.message, {
          variant: "error",
          preventDuplicate: true,
        });
      })
      .finally(() => {
        handleCloseDialog();
      });
  };

  const splits = pathName.split("/");
  React.useEffect(() => {
    if (splits[2] === "articles" && splits[3] === "saved") {
      setPage("saved");
    } else {
      setPage("main");
    }
  }, [pathName]);

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

  useEffect(() => {
    dispatch(fetchUserSavedArticles());
  }, []);

  const savedArticlesIds = savedArticles.map((article) => article.id);
  return (
    <ProtectedRoute>
      <section className="w-full flex flex-col gap-6 pb-10">
        {!isClient && (
          <div className="">
            {" "}
            <Button
              className={`bg-secondary text-white`}
              onClick={() => {
                router.push("/dashboard/articles/new");
              }}
            >
              Add New
            </Button>
          </div>
        )}

        <div className="w-full h-fit flex flex-col items-start">
          <h1 className="text-xl font-semibold ml-1 text-accent">
            Featured Articles
          </h1>

          {featuredArticles?.length === 0 ? (
            <div className="w-full h-full flex items-center justify-center py-8 rounded-lg bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
              <h1 className="text-lg font-semibold text-black/75">
                No featured articles
              </h1>
            </div>
          ) : (
            <>
              {featuredArticles?.length === 1 ? (
                <>
                  <div className="w-[100%] mx-auto pb-7 pt-0 relative linear-gradient-featured">
                    <div className="wrapper2">
                      {/* <Slider
                        prevArrow={<PreviousBtn />}
                        nextArrow={<NextBtn />}
                        {...settings}
                      > */}
                      {featuredArticles.map((article, idx) => {
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
                                    router.push(
                                      `/dashboard/articles/${article.id}`
                                    );
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
                                  <p className="2xl:block hidden text-center text-accent line-clamp-1 mt-2">
                                    {article.description}
                                  </p>
                                  <Button
                                    variant="contained"
                                    endIcon={<IoArrowForward />}
                                    className="mt-5 bg-primary"
                                    onClick={() => {
                                      // window.location.href = `/articles/${article.id}`;
                                      router.push(
                                        `/dashboard/articles/${article.id}`
                                      );
                                    }}
                                  >
                                    Read more
                                  </Button>
                                </div>
                              </div>{" "}
                              <img
                                src={article.coverImage}
                                alt=""
                                className="object-cover object-center border border-[#afafaf33] w-full 2xl:max-w-[766px] xl:max-w-[550px] sm:max-w-[440px] aspect-video lg:mt-4 lg:mr-4"
                              />
                              <div className="absolute inset-0 bg-black/25 top-overlay-linear-gradient sm:hidden block"></div>
                            </div>
                          </div>
                        );
                      })}
                      {/* </Slider> */}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <div className="w-[100%] mx-auto pb-7 pt-0 relative linear-gradient-featured">
                    <div className="wrapper2">
                      <Slider
                        prevArrow={<PreviousBtn />}
                        nextArrow={<NextBtn />}
                        {...settings}
                      >
                        {featuredArticles.map((article, idx) => {
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
                                      router.push(
                                        `/dashboard/articles/${article.id}`
                                      );
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
                                        router.push(
                                          `/dashboard/articles/${article.id}`
                                        );
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
                </>
              )}
            </>
          )}
        </div>
        <div className="w-full h-fit flex flex-col items-start">
          <h1 className="text-xl font-semibold ml-1 text-accent">
            All Articles
          </h1>
          <div className="flex items-center gap-2 pb-2">
            <Chip
              label="All"
              className={`cursor-pointer ${
                page === "main" && " bg-muted text-white"
              }`}
              onClick={() => {
                setPage("main");
              }}
            />
            <Chip
              label="Saved"
              className={`cursor-pointer ${
                page === "saved" && " bg-muted text-white"
              }`}
              onClick={() => {
                setPage("saved");
                router.push("/dashboard/articles/saved");
              }}
            />
          </div>

          {articles?.length === 0 ? (
            <div className="w-full h-full flex items-center justify-center py-8 rounded-lg bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
              <h1 className="text-lg font-semibold text-black/75">
                No featured articles
              </h1>
            </div>
          ) : (
            <div className="grid lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 grid-cols-1 lg:p-10 p-4 gap-4 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg">
              {articles.map((article) => {
                return (
                  <div
                    key={article.id}
                    className="max-w-[320px] pb-3 sm:border-b-0 border-b"
                  >
                    <div className="overflow-hidden bg-cover bg-no-repeat w-full cursor-pointer">
                      <img
                        src={article.coverImage}
                        alt=""
                        className="w-full aspect-video transition duration-300 ease-in-out hover:scale-105 object-cover"
                        onClick={() => {
                          router.push(`/dashboard/articles/${article.id}`);
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
                    <h1 className="text-slate-900 font-bold text-sm min-h-10 line-clamp-2">
                      {article.title}
                    </h1>
                    {/* <p className="line-clamp-3 my-2">{article.description}</p> */}
                    <div className="flex items-center gap-3 justify-between mt-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-[2px] text-black/75">
                          <CiHeart className="text-2xl" />
                          <span className="">{article?.likes?.length}</span>
                        </div>
                        <div className="flex items-center gap-[4px] text-black/75">
                          <GoComment className="text-xl" />
                          <span className="">{article?.comments?.length}</span>
                        </div>
                      </div>
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
                    </div>
                    {!isClient && (
                      <div className="flex items-center gap-3 justify-between mt-1 bg-secondary px-2 py-1">
                        <div className="flex items-center gap-2 shadow-sm">
                          <IconButton
                            onClick={() => {
                              router.push(
                                `/dashboard/articles/${article.id}/edit`
                              );
                            }}
                            className="hover:bg-white/20"
                          >
                            <FaRegEdit className="text-lg text-white" />
                          </IconButton>
                          <IconButton
                            className="hover:bg-white/20"
                            onClick={() => {
                              setArticleId(article.id);
                              handleOpenDialog();
                            }}
                          >
                            <FaTrashAlt className="text-lg text-white" />
                          </IconButton>
                        </div>
                        <IconButton
                          className="hover:bg-white/20"
                          onClick={() => {
                            handleFeatureArticle(article.id);
                          }}
                        >
                          {article?.isFeatured ? (
                            <FaStar className="text-lg text-primary-foreground" />
                          ) : (
                            <FaRegStar className="text-lg text-white" />
                          )}
                        </IconButton>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box className="flex flex-col items-center justify-center gap-2 md:w-[440px] w-[90%] mx-auto md:p-4 p-2">
          <div className="w-fit p-4 rounded-full bg-red-200">
            <IoWarningOutline className="text-red-500 text-3xl font-semibold" />
          </div>
          <h1 className="text-xl font-semibold">Are you sure?</h1>
          <p className="text-center">
            This action will completely remove this article and cannot be
            undone. Still wish to proceed?
          </p>
          <Button
            fullWidth
            onClick={handleDeleteArticle}
            className="bg-red-500 text-white hover:bg-red-400 !h-9"
            disabled={deleteLoading}
          >
            {deleteLoading ? (
              <LoadinProgress className="!h-8 !w-8" />
            ) : (
              "Delete"
            )}
          </Button>
          <Button
            fullWidth
            onClick={handleCloseDialog}
            autoFocus
            variant="contained"
            className="bg-slate-200 text-accent hover:bg-slate-100 !h-9"
          >
            Cancel
          </Button>
        </Box>
      </Dialog>
    </ProtectedRoute>
  );
};

export default Articles;
