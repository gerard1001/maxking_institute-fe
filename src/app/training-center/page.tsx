import React from "react";
import ServicesSection from "./sections/ServicesSection";
import OpportunitiesSection from "./sections/OpportunitiesSection";
import { Button } from "@mui/material";
import { RxExternalLink } from "react-icons/rx";

const TrainingCenter = () => {
  return (
    <div className="lg:p-10 p-4 py-14 max-w-[1400px] mx-auto">
      {/* <ServicesSection />
      <OpportunitiesSection /> */}

      <div className="w-[100%] min-h-[200px] mx-auto py-6 relative linear-gradient-featured flex flex-col items-center justify-center gap-10">
        <h1 className="text-accent text-3xl uppercase max-w-[640px] text-center">
          Welcome to our Training Center: Gateway to Enlightened Learning!
        </h1>
        <div className="w-full flex flex-wrap items-center justify-evenly gap-6">
          <div className="min-w-[240px] aspect-video bg-secondary rounded-md flex flex-col items-center justify-center">
            <h1 className="text-primary-foreground text-4xl font-semibold text-center">
              3.5K
            </h1>
            <h1 className="text-white text-xl text-center">Books</h1>
          </div>
          <div className="min-w-[240px] aspect-video bg-secondary rounded-md flex flex-col items-center justify-center">
            <h1 className="text-primary-foreground text-4xl font-semibold text-center">
              3.5K
            </h1>
            <h1 className="text-white text-xl text-center">Articles</h1>
          </div>
          <div className="min-w-[240px] aspect-video bg-secondary rounded-md flex flex-col items-center justify-center">
            <h1 className="text-primary-foreground text-4xl font-semibold text-center">
              3.5K
            </h1>
            <h1 className="text-white text-xl text-center">Publications</h1>
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
            <Button
              variant="contained"
              className="xs:mt-5 mt-1 bg-primary min-w-[180px] text-base"
            >
              Visit
              <RxExternalLink className="text-[14px] ml-2 text-primary-foreground" />
            </Button>
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
            <h1 className="text-3xl text-white font-semibold">Publications</h1>
            <Button
              variant="contained"
              className="xs:mt-5 mt-1 bg-primary min-w-[180px] text-base"
            >
              Visit{" "}
              <RxExternalLink className="text-[14px] ml-2 text-primary-foreground" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingCenter;
