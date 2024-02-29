import React from "react";
import Image from "next/image";

const benefits = [
  {
    title: "Online tutorials",
    descr:
      "Elevate your learning with our comprehensive online tutorials, crafted for optimal understanding.",
    img: "/benefits1.png",
  },
  {
    title: "Free e-library",
    descr:
      "Immerse yourself in knowledge with our free e-library, a vast repository catering to diverse subjects.",
    img: "/benefits2.png",
  },
  {
    title: "Online evaluation",
    descr:
      "Experience seamless online evaluation, ensuring a dynamic assessment of your progress.",
    img: "/benefits3.png",
  },
  {
    title: "Get certified",
    descr:
      "Achieve milestones and validate your skills with a personalized certificate upon completion.",
    img: "/benefits4.png",
  },
  {
    title: "Mentor support",
    descr:
      "Receive guidance and insights from experienced mentors, enriching your learning journey.",
    img: "/benefits5.png",
  },
  {
    title: "anywhere, anytime",
    descr:
      "Enjoy the flexibility of learning anywhere, anytime, empowering you to tailor education to your schedule.",
    img: "/benefits6.png",
  },
];

const WhyUs = () => {
  return (
    <div className="">
      <h1 className="text-center text-2xl text-slate-800 font-bold py-8">
        Why choose us?
      </h1>
      <div
        className="flex flex-wrap content-center pt-16 max-w-[900px] w-fit mx-auto gap-2"
        data-aos="fade-up"
      >
        {benefits.map((values, idx) => {
          return (
            <div
              className="group flex flex-col relative items-start justify-start gap-5 w-[250px] mx-auto mb-10 bg-sky-400/0 rounded-xl p-4 cursor-default hover:bg-slate-200/80 hover:shadow-xl ease-in transition-all duration-200  hover:scale-105"
              key={idx}
            >
              <div className="w-[80px] h-[80px] absolute left-[50%] -top-[32%] -translate-x-[50%] bg-sky-600/0 group-hover:-top-[30%] crazy-round flex flex-col justify-center items-center ease-in transition-all duration-500">
                <div className="flex flex-col items center p-3 bg-slate-300 rounded-[50%]">
                  <Image
                    src={values.img}
                    alt=""
                    width={30}
                    height={30}
                    className="filter backdrop-invert-0"
                  />
                </div>
              </div>
              <div className="w-full text-center">
                <h1 className="text-lg font-semibold text-slate-800 capitalize my-1">
                  {values.title}
                </h1>
                <h1 className="text-zinc-700 group-hover:text-zinc-700 line-clamp-4">
                  {values.descr}
                </h1>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WhyUs;
