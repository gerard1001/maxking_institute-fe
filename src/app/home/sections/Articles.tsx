"use client";

import React, { useEffect } from "react";
import {
  fetchArticles,
  selectArticles,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { format } from "date-fns";
import { CiHeart } from "react-icons/ci";
import { GoComment } from "react-icons/go";
import { FaBlog } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle";
import { ViewAll } from "./PopularCourses";
import { Divider } from "@mui/material";
import { MdOutlinePlaylistAdd } from "react-icons/md";

const Articles = () => {
  const dispatch = useDispatch();
  const state = useSelector(selectArticles);

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  return (
    <div className="lg:p-10 p-2">
      <SectionTitle
        title="recent ARTICLES"
        icon={FaBlog}
        rightSideActions={ViewAll("/articles")}
      />
      <div className="grid lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 grid-cols-1 lg:p-10 p-4 gap-4">
        {state?.articles?.map((article) => {
          return (
            <div key={article.id} className="max-w-[350px] sm:pb-6 pb-2">
              <div className="overflow-hidden bg-cover bg-no-repeat rounded-md w-full cursor-pointer">
                <img
                  src={article.coverImage}
                  alt=""
                  className="w-full aspect-video transition duration-300 ease-in-out hover:scale-105 object-cover"
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
              <h1 className="text-slate-900 font-bold text-xl line-clamp-2 min-h-14">
                {article.title}
              </h1>
              <p className="line-clamp-3 my-2">{article.description}</p>
              <div className="flex items-center gap-3 justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-[2px] text-black/75">
                    <CiHeart className="text-2xl" />
                    <span className="">12 likes</span>
                  </div>
                  <div className="flex items-center gap-[4px] text-black/75">
                    <GoComment className="text-xl" />
                    <span className=""> 5 comments</span>
                  </div>
                </div>
                <div className="text-black/75">
                  <MdOutlinePlaylistAdd className="text-xl" />
                </div>
              </div>
              <Divider className="sm:hidden block mt-4" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Articles;
