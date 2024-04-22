"use client";

import React, { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Box, Button, Dialog, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import {
  deleteArticle,
  featureArticle,
  fetchArticles,
  fetchFeaturedArticles,
  selectArticles,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { CiHeart } from "react-icons/ci";
import { GoComment } from "react-icons/go";
import { TbTextPlus } from "react-icons/tb";
import { format } from "date-fns";
import { FaHome, FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { IoWarningOutline } from "react-icons/io5";
import { FaRegStar, FaStar } from "react-icons/fa6";
import LoadinProgress from "@/components/LoadingProgess";
import { useSnackbar } from "notistack";

const Articles = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const state = useSelector(selectArticles);
  const { enqueueSnackbar } = useSnackbar();

  const articles = state.articles;
  const featuredArticles = state.featuredArticles;
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [articleId, setArticleId] = useState<string>("");

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

  return (
    <ProtectedRoute>
      <section className="w-full flex flex-col gap-6 pb-10">
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
        <div className="w-full h-fit flex flex-col items-start">
          <h1 className="text-xl font-semibold ml-1 text-accent">
            Featured Articles
          </h1>
          <div className="w-full flex items-center overflow-x-auto gap-8 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-3 px-8 rounded-lg min-h-[180px]">
            {featuredArticles?.map((article) => {
              return (
                <div key={article.id} className="w-[320px]">
                  <img
                    src={article.coverImage}
                    alt=""
                    className="w-[300px] aspect-video object-cover"
                  />
                  {/* <div className="w-[100px] h-[100px] bg-gray-200 rounded-lg"></div>
                  <div className="flex flex-col gap-2">
                    <h1 className="text-lg font-semibold">{article.title}</h1>
                    <p className="text-black/75">{article.description}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-3">
                        <CiHeart className="text-xl" />
                        <span>12</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <GoComment className="text-xl" />
                        <span>5</span>
                      </div>
                    </div>
                  </div> */}
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full h-fit flex flex-col items-start">
          <h1 className="text-xl font-semibold ml-1 text-accent">
            All Articles
          </h1>
          {/* <div className="w-full flex items-center gap-8 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-3 px-8 rounded-lg min-h-[180px]"> */}{" "}
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
                        src={article.author.profile.picture}
                        alt="author image"
                        className="w-7 aspect-square rounded-full object-cover cursor-pointer"
                      />
                      <h1>
                        {article.author.firstName} {article.author.lastName}
                      </h1>
                    </div>
                    <p className="my-2 text-xs font-semibold text-black/75">
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
                        <span className="">12</span>
                      </div>
                      <div className="flex items-center gap-[4px] text-black/75">
                        <GoComment className="text-xl" />
                        <span className=""> 5</span>
                      </div>
                    </div>
                    <div className="text-black/75">
                      <TbTextPlus className="text-xl" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 justify-between mt-1 bg-secondary px-2 py-1">
                    <div className="flex items-center gap-2 shadow-sm">
                      <IconButton
                        onClick={() => {
                          router.push(`/dashboard/articles/${article.id}/edit`);
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
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box className="flex flex-col items-center justify-center gap-2 w-[440px] mx-auto p-4">
          <div className="w-fit p-4 rounded-full bg-red-200">
            <IoWarningOutline className="text-red-500 text-3xl font-semibold" />
          </div>
          <h1 className="text-xl font-semibold">Are you sure?</h1>
          <p className="text-center">
            This action will completely remove this user and cannot be undone.
            Still wish to proceed?
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
