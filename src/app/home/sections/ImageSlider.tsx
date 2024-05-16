"use client";

import React from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Slider from "react-slick";
import { IconButton } from "@mui/material";

const ImageSlider = () => {
  const slides = [
    {
      title: "EXCELLENT EDUCATION",
      descr:
        "We strive for making and ensuring that everyone, anywhere, at any time, has access to quality MKI education services",
      img: "/slider4.jpg",
    },
    {
      title: "IMPACT AND MEANINGFUL CHANGE",
      descr:
        "MKI is dedicated to fostering socio-economic sustainability through education",
      img: "/slider5.jpg",
    },
    {
      title: "We inspire, we empower",
      descr:
        "Engage, connect, and learn from global experiences. Share your own journey with fellow members worldwide.",
      img: "/slider6.jpg",
    },
  ];
  const settings = {
    dots: true,
    // fade: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
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
        <FaChevronLeft className="text-primary text-lg" />
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
        <FaChevronRight className="text-primary text-lg" />
      </IconButton>
    );
  };

  return (
    <div className="w-full pb-8 wrapper1" id="slides">
      <Slider prevArrow={<PreviousBtn />} nextArrow={<NextBtn />} {...settings}>
        {slides.map((values, idx) => {
          return (
            <div key={idx} className="wrapper relative">
              <div className="flex flex-col justify-center w-[80%] max-w-[550px] aspect-[16/7] absolute xxs:top-[50%] top-[60%] left-[50%] -translate-x-2/4 -translate-y-2/4 text-white p-2 z-10 bg-black/65">
                <div className="flex flex-col items-center justify-center">
                  <h1 className="sm:text-4xl text-xl uppercase text-center max-w-[500px] pb-3 border-b">
                    {values.title}
                  </h1>
                  <h1 className="md:text-lg text-sm font-light text-white/60 text-center mt-3">
                    {values.descr}
                  </h1>
                </div>
              </div>
              <div className="!w-full !h-[50%] fill relative mx-auto">
                {" "}
                <img
                  src={values.img}
                  alt=""
                  className="object-cover object-center border border-[#afafaf33] w-[100%] md:h-[560px] xs:aspect-[16/9] aspect-square"
                />
                <div className="absolute inset-0 bg-black opacity-50 top-overlay-linear-gradient"></div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default ImageSlider;
