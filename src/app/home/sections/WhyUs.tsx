"use client";

import React from "react";
import Image from "next/image";
import SectionTitle from "../../../components/SectionTitle";
import { TiInfoOutline } from "react-icons/ti";
import {
  findPinnedTweet,
  selectTweets,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { objectIsEmpty } from "@/lib/functions/object_check.function";
import { Tweet } from "react-tweet";
import { useSnackbar } from "notistack";

const benefits = [
  {
    title: "Online tutorials",
    descr:
      "Elevate your learning with our comprehensive online tutorials, crafted for optimal understanding.",
    img: "/benefits4.png",
  },
  {
    title: "Books & Library",
    descr:
      "Enjoy the powerful, useful and life changing resources made available to you and Helping you expand your mind and allow you for creative thinking for greater perspective.",
    img: "/benefits2.png",
  },
  {
    title: "Online evaluation",
    descr:
      "Experience seamless online evaluation, ensuring a dynamic assessment of your progress.",
    img: "/benefits6.png",
  },
  {
    title: "Get certification",
    descr:
      "Upon successful completion of our life changing courses through our rigorous classes, you will be awarded and certified to show your achievements.",
    img: "/benefits1.png",
  },
  {
    title: "Our experts and instructors",
    descr:
      "Meet and Get the professional education and reliable consultation by our expert team of instructors and teachers from different industries around the globe.",
    img: "/benefits3.png",
  },
  {
    title: "anywhere, anytime",
    descr:
      "Enjoy the flexibility of learning anywhere, anytime, empowering you to tailor education to your schedule.",
    img: "/benefits7.png",
  },
];

const WhyUs = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const tweetState = useSelector(selectTweets);

  React.useEffect(() => {
    dispatch(findPinnedTweet())
      .unwrap()
      .catch((error) => {
        if (error.statusCode !== 404)
          enqueueSnackbar(error.message, { variant: "error" });
      });
  }, []);

  return (
    <div className="lg:p-10 p-2" id="why-us">
      <SectionTitle title="Why choose us?" icon={TiInfoOutline} />
      <div className="flex flex-wrap gap-3 h-fit 2xl:justify-normal justify-center">
        <div
          className="flex flex-wrap content-center pt-16 max-w-[900px] w-fit mx-auto gap-2"
          data-aos="fade-up"
        >
          {benefits.map((values, idx) => {
            return (
              <div
                className="group flex flex-col relative items-start justify-start gap-5 max-w-[250px] mx-auto mb-10 bg-sky-400/0 rounded-xl p-4 cursor-default hover:bg-white hover:shadow-xl ease-in transition-all duration-200  hover:scale-105 mt-6"
                key={idx}
              >
                <div className="w-[80px] h-[80px] absolute left-[50%] -top-[32%] -translate-x-[50%] bg-sky-600/0 group-hover:-top-[30%] crazy-round flex flex-col justify-center items-center ease-in transition-all duration-500">
                  <div className="flex flex-col items center p-3 bg-secondary rounded-[50%]">
                    <Image
                      src={values.img}
                      alt=""
                      width={30}
                      height={30}
                      className=" invert"
                    />
                  </div>
                </div>
                <div className="w-full text-center">
                  <h1 className="text-lg font-semibold text-slate-800 capitalize my-1">
                    {values.title}
                  </h1>
                  <h1 className="text-zinc-700 group-hover:text-zinc-700">
                    {values.descr}
                  </h1>
                </div>
              </div>
            );
          })}
        </div>{" "}
        {tweetState?.tweet && !objectIsEmpty(tweetState?.tweet) && (
          <div className="2xl:w-[22%] w-auto light text-xs pt-10">
            <div className="tweet-class">
              <Tweet id={tweetState?.tweet?.tweetId} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhyUs;
