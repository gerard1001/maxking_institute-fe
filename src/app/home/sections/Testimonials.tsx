"use client";

import React from "react";
import SectionTitle from "../../../components/SectionTitle";
import { GrBlockQuote } from "react-icons/gr";
import { IconButton } from "@mui/material";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Slider from "react-slick";
import { useSnackbar } from "notistack";
import {
  fetchTestimonials,
  selectTestimonials,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { BiSolidQuoteLeft, BiSolidQuoteRight } from "react-icons/bi";

const Testimonials = () => {
  const dispatch = useDispatch();
  const testimonialState = useSelector(selectTestimonials);
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    dispatch(fetchTestimonials())
      .unwrap()
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
  }, []);
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
    <div className="lg:p-10 p-2" id="testimonials">
      <SectionTitle title="WHAT PEOPLE SAY" icon={GrBlockQuote} />
      <div className="lg:pt-10 pt-4 flex items-center gap-5 w-full justify-center min-h-80">
        <div className="w-full pb-8 wrapper1" id="slides">
          <Slider
            prevArrow={<PreviousBtn />}
            nextArrow={<NextBtn />}
            {...settings}
          >
            {testimonialState.allTestimonials
              .filter((testimonial) => testimonial.isPinned)
              .map((testimonial) => (
                <div key={testimonial.id} className="wrapper relative">
                  <div
                    className={`rounded-md p-6 w-full mx-auto max-w-[640px] mb-4 bg-white
            `}
                  >
                    <div className="flex items-center py-12 bg-primary text-white lg:p-6 p-2 relative rounded-t-xl rounded-br-xl z-50">
                      <BiSolidQuoteLeft className="absolute text-8xl text-primary-foreground top-4 left-4 opacity-30" />
                      <BiSolidQuoteRight className="absolute text-8xl text-primary-foreground bottom-4 right-4 opacity-30" />
                      <div className="bg-primary lg:w-[40px] w-[20px] aspect-square rotate-45 absolute lg:-bottom-[20px] -bottom-[10px] lg:left-2 left-1 z-10" />
                      <p
                        className="lg:text-2xl text-base leading-tight"
                        style={{
                          fontFamily: "Amarante, serif",
                        }}
                      >
                        {testimonial.text}
                      </p>{" "}
                    </div>
                    <div className="flex items-center pb-4 w-full lg:mt-6 mt-2 ml-4">
                      <img
                        src={testimonial.user.profile.picture}
                        alt="author image"
                        className="w-7 aspect-square rounded-full object-cover cursor-pointer"
                      />
                      <div className="ml-2">
                        <h1 className="text-accent text-lg font-semibold">
                          {testimonial.user.firstName}{" "}
                          {testimonial.user.lastName}
                        </h1>
                        <p className="text-muted text-xs">
                          {new Date(testimonial.createdAt).toDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
