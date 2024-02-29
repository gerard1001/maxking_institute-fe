"use client";

import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { MdOutlineDoubleArrow } from "react-icons/md";
import Slider from "react-slick";
import "../../assets/styles/slick-main/slick.styles.css";
import "../../assets/styles/slick-main/slick-theme.styles.css";

const ImageSlider = () => {
  const slides = [
    {
      title: "EXCELLENT EDUCATION",
      descr: "WE HAVE THE BEST PROGRAMS  AND COURSES FOR YOU",
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
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
  };

  const PreviousBtn = (props: any) => {
    return (
      <div className={props.className} onClick={props.onClick}>
        <MdOutlineDoubleArrow className="text-zinc-50 text-8xl transform -scale-x-100" />
      </div>
    );
  };

  const NextBtn = (props: any) => {
    return (
      <div className={props.className} onClick={props.onClick}>
        <MdOutlineDoubleArrow className="text-zinc-50 text-8xl" />
      </div>
    );
  };
  return (
    <div className="w-full pt-[49px]">
      <Slider prevArrow={<PreviousBtn />} nextArrow={<NextBtn />} {...settings}>
        {slides.map((values, idx) => {
          return (
            <div key={idx} className="wrapper relative">
              <div className="flex flex-col justify-center w-[70%] aspect-[16/7] absolute top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 text-white p-2 z-10">
                <div className="flex flex-col items-center justify-center">
                  <h1 className="text-6xl uppercase text-center">
                    {values.title}
                  </h1>
                  <h1 className="text-xl font-thin text-zinc-300 uppercase  text-center mt-3 pb-3 border-b">
                    {values.descr}
                  </h1>
                </div>
                {/* <div className="flex items-center justify-end gap-1 hover:underline hover:text-slate-400 cursor-pointer">
                  Learn more
                  <IoIosArrowRoundForward className="text-2xl" />
                </div> */}
              </div>
              <div className="!w-full !h-[50%] fill relative mx-auto">
                {" "}
                <img
                  src={values.img}
                  alt=""
                  className="object-cover object-center border border-[#afafaf33] w-[100%] md:h-[560px] aspect-[16/9] overl"
                />
                <div className="absolute inset-0 bg-black opacity-50"></div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default ImageSlider;
