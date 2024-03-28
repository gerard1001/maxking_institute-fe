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
import { TbTextPlus } from "react-icons/tb";
import { FaBlog } from "react-icons/fa";
import SectionTitle from "../SectionTitle";
import { ViewAll } from "./PopularCourses";

const Articles = () => {
  const dispatch = useDispatch();
  const state = useSelector(selectArticles);

  console.log(state.articles);

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  return (
    <div className="p-10">
      <SectionTitle
        title="recent ARTICLES"
        icon={FaBlog}
        rightSideActions={ViewAll("/about")}
      />
      <div className="flex items-center flex-wrap p-10">
        {state.articles.map((article) => {
          return (
            <div key={article.id} className="max-w-[350px]">
              <img
                src={article.coverImage}
                alt=""
                className="w-full aspect-video"
              />
              <div className="flex items-end gap-3 py-2 text-slate-900 text-sm font-bold">
                <img
                  src={article.author.profile.picture}
                  alt="author image"
                  className="w-8 aspect-square rounded-full object-cover"
                />
                <h1>
                  {article.author.firstName} {article.author.lastName}
                </h1>
              </div>
              <h1 className="text-slate-900 font-bold text-xl">
                {article.title}
              </h1>
              <p className="line-clamp-2">{article.description}</p>
              <p className="my-2 text-sm font-semibold text-black/75">
                {format(article.createdAt, "PP")}
              </p>
              <div className="flex items-center gap-3 justify-between">
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Articles;
