"use client";

import React, { useEffect } from "react";
import {
  fetchArticles,
  selectArticles,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";

const LatestUpdates = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const articleState = useSelector(selectArticles);

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
  }, []);
  return (
    <div
      className={`w-full h-[44px] items-center justify-center bg-slate-200 relative ${
        articleState?.articles?.length === 0 ? "hidden" : "2xl:block hidden"
      }`}
    >
      <div className="absolute h-full bg-secondary pr-2 w-fit left-0 top-0 bottom-0 flex flex-col items-center justify-center text-white z-50">
        ⚡Latest Updates
      </div>
      <div className="overflow-hidden whitespace-nowrap h-full flex flex-col items-center justify-center">
        <div className="inline-block animate-marquee hover:animation-paused">
          {articleState?.articles?.slice(0, 5)?.map((item, index) => (
            <a
              href={`/articles/${item.id}`}
              key={index}
              className="mx-4 text-sky-500 text-base cursor-pointer hover:underline"
            >
              ◾ {item.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestUpdates;
