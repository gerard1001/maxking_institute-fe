"use client";

import React from "react";
import { Button } from "@mui/material";
import { RxExternalLink } from "react-icons/rx";
import Footer from "@/components/Footer";
import {
  fetchAllCourses,
  fetchArticles,
  fetchDocuments,
  selectArticles,
  selectCourses,
  selectDocuments,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import OpportunitiesSection from "./sections/OpportunitiesSection";

const TrainingCenter = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const documentState = useSelector(selectDocuments);
  const articleState = useSelector(selectArticles);
  const courseState = useSelector(selectCourses);
  const { enqueueSnackbar } = useSnackbar();

  const articlesCount = articleState.articles?.length || 0;
  const booksCount = documentState.allDocuments?.filter(
    (doc) => doc.type === "book"
  ).length;
  const publicationsCount = documentState.allDocuments?.filter(
    (doc) => doc.type === "publication"
  ).length;
  const coursesCount = courseState.allCourses?.length || 0;

  React.useEffect(() => {
    dispatch(fetchDocuments())
      .unwrap()
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: "error" });
      });

    dispatch(fetchArticles())
      .unwrap()
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: "error" });
      });

    dispatch(fetchAllCourses())
      .unwrap()
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: "error" });
      });
  }, []);

  return (
    <>
      <div className="lg:p-10 p-4 py-14 max-w-[1400px] mx-auto">
        {/* <ServicesSection />
      <OpportunitiesSection /> */}

        <div className="w-[100%] min-h-[200px] mx-auto py-6 relative linear-gradient-featured flex flex-col items-center justify-center gap-10">
          <h1 className="text-accent text-3xl uppercase max-w-[640px] text-center">
            Welcome to our Training Center: Gateway to Enlightened Learning!
          </h1>
          <div className="w-full flex flex-wrap items-center justify-evenly gap-4">
            <div className="w-[300px] mx-auto aspect-video bg-secondary rounded-md flex flex-col items-center justify-center">
              <h1 className="text-primary-foreground text-4xl font-semibold text-center">
                {booksCount}
              </h1>
              <h1 className="text-white text-xl text-center">Books</h1>
            </div>
            <div className="w-[300px] mx-auto aspect-video bg-secondary rounded-md flex flex-col items-center justify-center">
              <h1 className="text-primary-foreground text-4xl font-semibold text-center">
                {articlesCount}
              </h1>
              <h1 className="text-white text-xl text-center">Articles</h1>
            </div>
            <div className="w-[300px] mx-auto aspect-video bg-secondary rounded-md flex flex-col items-center justify-center">
              <h1 className="text-primary-foreground text-4xl font-semibold text-center">
                {publicationsCount}
              </h1>
              <h1 className="text-white text-xl text-center">Publications</h1>
            </div>
            <div className="w-[300px] mx-auto aspect-video bg-secondary rounded-md flex flex-col items-center justify-center">
              <h1 className="text-primary-foreground text-4xl font-semibold text-center">
                {coursesCount}
              </h1>
              <h1 className="text-white text-xl text-center">Courses</h1>
            </div>
          </div>
        </div>
        <div className="my-10 flex flex-wrap items-center justify-evenly gap-4">
          <div className="max-w-[300px] relative mx-auto rounded-lg">
            <img
              src="/library.jpg"
              alt=""
              className="object-cover object-center border border-[#afafaf33] w-[100%] aspect-[3/2] rounded-lg"
            />
            <div className="absolute inset-0 bg-black/50 top-overlay-linear-gradient rounded-lg flex flex-col items-center justify-center">
              <h1 className="text-3xl text-white font-semibold">E-Library</h1>
              <a
                target="_blank"
                href="/library/#books"
                rel="noopener noreferrer"
              >
                <Button
                  variant="contained"
                  className="xs:mt-5 mt-1 bg-primary min-w-[180px] text-base"
                >
                  Visit
                  <RxExternalLink className="text-[14px] ml-2 text-primary-foreground" />
                </Button>
              </a>
            </div>
          </div>
          <div className="max-w-[300px] relative mx-auto rounded-lg">
            <img
              src="/articles.jpg"
              alt=""
              className="object-cover object-center border border-[#afafaf33] w-[100%] aspect-[3/2] rounded-lg"
            />
            <div className="absolute inset-0 bg-black/50 top-overlay-linear-gradient rounded-lg flex flex-col items-center justify-center">
              <h1 className="text-3xl text-white font-semibold">Articles</h1>
              <a target="_blank" href="/articles" rel="noopener noreferrer">
                <Button
                  variant="contained"
                  className="xs:mt-5 mt-1 bg-primary min-w-[180px] text-base"
                >
                  Visit
                  <RxExternalLink className="text-[14px] ml-2 text-primary-foreground" />
                </Button>
              </a>
            </div>
          </div>
          <div className="max-w-[300px] relative mx-auto rounded-lg">
            <img
              src="/publications.jpg"
              alt=""
              className="object-cover object-center border border-[#afafaf33] w-[100%] aspect-[3/2] rounded-lg"
            />
            <div className="absolute inset-0 bg-black/50 top-overlay-linear-gradient rounded-lg flex flex-col items-center justify-center">
              <h1 className="text-3xl text-white font-semibold">
                Publications
              </h1>
              <a
                target="_blank"
                href="/library/#publications"
                rel="noopener noreferrer"
              >
                <Button
                  variant="contained"
                  className="xs:mt-5 mt-1 bg-primary min-w-[180px] text-base"
                >
                  Visit{" "}
                  <RxExternalLink className="text-[14px] ml-2 text-primary-foreground" />
                </Button>
              </a>
            </div>
          </div>
          <div className="max-w-[300px] relative mx-auto rounded-lg">
            <img
              src="/publications.jpg"
              alt=""
              className="object-cover object-center border border-[#afafaf33] w-[100%] aspect-[3/2] rounded-lg"
            />
            <div className="absolute inset-0 bg-black/50 top-overlay-linear-gradient rounded-lg flex flex-col items-center justify-center">
              <h1 className="text-3xl text-white font-semibold">Courses</h1>
              <a target="_blank" href="/courses" rel="noopener noreferrer">
                <Button
                  variant="contained"
                  className="xs:mt-5 mt-1 bg-primary min-w-[180px] text-base"
                >
                  Visit{" "}
                  <RxExternalLink className="text-[14px] ml-2 text-primary-foreground" />
                </Button>
              </a>
            </div>
          </div>
        </div>
        {/* <OpportunitiesSection /> */}
      </div>
      <Footer />
    </>
  );
};

export default TrainingCenter;
