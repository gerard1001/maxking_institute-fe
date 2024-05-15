"use client";

import React, { useEffect } from "react";
import {
  fetchArticles,
  fetchFeaturedArticles,
  selectArticles,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { format } from "date-fns";
import { CiHeart } from "react-icons/ci";
import { GoComment } from "react-icons/go";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Slider from "react-slick";
import { Button, IconButton } from "@mui/material";
import { IoArrowForward } from "react-icons/io5";
import { SuspenseLoading } from "@/components/SuspenseLoading";
import { useRouter } from "next/navigation";
import { MdOutlinePlaylistAdd } from "react-icons/md";

const ArticlesPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const state = useSelector(selectArticles);

  const articles = state.articles;
  const featuredArticles = state.featuredArticles;

  useEffect(() => {
    dispatch(fetchArticles());
    dispatch(fetchFeaturedArticles());
  }, [dispatch]);

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
          {featuredArticles.length > 0 && (
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
            {articles.map((article) => {
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
                      <MdOutlinePlaylistAdd className="text-xl" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default ArticlesPage;
