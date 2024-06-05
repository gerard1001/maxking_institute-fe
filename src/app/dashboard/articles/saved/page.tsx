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
import { useSnackbar } from "notistack";
import { MdOutlinePlaylistRemove } from "react-icons/md";

const SavedArticles = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const state = useSelector(selectArticles);
  const { enqueueSnackbar } = useSnackbar();
  const pathName = usePathname();

  const [page, setPage] = useState<"main" | "saved">("main");
  const articles = state.savedArticles;

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

  const splits = pathName.split("/");
  React.useEffect(() => {
    if (splits[2] === "articles" && splits[3] === "saved") {
      setPage("saved");
    } else {
      setPage("main");
    }
  }, [pathName]);

  return (
    <div>
      {" "}
      <div className="w-full h-fit flex flex-col items-start">
        <h1 className="text-xl font-semibold ml-1 text-accent">
          Your Saved Articles
        </h1>
        <div className="flex items-center gap-2 pb-2">
          <Chip
            label="All"
            className={`cursor-pointer ${
              page === "main" && " bg-muted text-white"
            }`}
            onClick={() => {
              setPage("main");
              router.push("/dashboard/articles");
            }}
          />
          <Chip
            label="Saved"
            className={`cursor-pointer ${
              page === "saved" && " bg-muted text-white"
            }`}
            onClick={() => {
              setPage("saved");
            }}
          />
        </div>
        {articles?.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center py-8 rounded-lg bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <h1 className="text-lg font-semibold text-black/75">
              No saved articles
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
                    <IconButton
                      className="text-black/75"
                      onClick={() => {
                        saveArticle(article?.id);
                      }}
                    >
                      <MdOutlinePlaylistRemove className="text-xl text-red-500" />
                    </IconButton>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedArticles;
