"use client";

import { SuspenseLoading } from "@/components/SuspenseLoading";
import {
  fetchRelatedArticles,
  fetchSingleArticle,
  selectArticles,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { format } from "date-fns/format";
import React, { useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { GoComment } from "react-icons/go";
import { TbTextPlus } from "react-icons/tb";
import Drawer from "@mui/material/Drawer";
import { MdOutlineClose } from "react-icons/md";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
interface SingleArticleProps {
  params: {
    articleId: string;
  };
}

const SingleArticle = ({ params: { articleId } }: SingleArticleProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const state = useSelector(selectArticles);

  const [open, setOpen] = React.useState(false);

  const openDrawer = () => {
    setOpen(true);
  };
  const closeDrawer = () => {
    setOpen(false);
  };

  const article = state.singleArticle;
  const relatedArticles = state.relatedArticles;

  useEffect(() => {
    dispatch(fetchSingleArticle(articleId));
    dispatch(fetchRelatedArticles(articleId));
  }, [dispatch, articleId]);
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
            <div className="w-[100%] min-h-screen px-4 xs:mt-2 mt-0 bg-yellow-100">
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
                  <div className="flex items-center gap-[2px] text-black/75">
                    <CiHeart className="text-2xl" />
                    <span className="">12</span>
                  </div>
                  <div
                    className="flex items-center gap-[4px] text-black/75"
                    onClick={() => {
                      openDrawer();
                    }}
                  >
                    <GoComment className="text-xl" />
                    <span className=""> 5</span>
                  </div>
                </div>
                <div className="text-black/75">
                  <TbTextPlus className="text-xl" />
                </div>
              </div>
              <div className="border-y border-accent-foreground/50 py-3">
                <h1 className="text-xl font-bold my-3">{article.title}</h1>
                <p className="">{article.description}</p>
              </div>
              <div className="py-3">
                <p>{article.body}</p>
              </div>
            </div>
            <div
              className={`${
                relatedArticles?.length === 0
                  ? "hidden"
                  : "md:w-[320px] w-[250px] min-h-screen md:block hidden xs:mt-2 mt-0 lg:pl-4 md:pl-2"
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
          </div>
        </div>
      )}
      <Drawer open={open} onClose={closeDrawer} className="" anchor="right">
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
            <p>{article.body}</p>
            <p>{article.body}</p>
            <p>{article.body}</p>
            <p>{article.body}</p>
            <p>{article.body}</p>
            <p>{article.body}</p>
            <p>{article.body}</p>
            <p>{article.body}</p>
            <p>{article.body}</p>
            <p>{article.body}</p>
            <p>{article.body}</p>
            <p>{article.body}</p>
            <p>{article.body}</p>
            <p>{article.body}</p>
            <p>{article.body}</p>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default SingleArticle;
