"use client";

import React from "react";
import programs from "@/lib/utils/programs.json";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";

const Programs = () => {
  const router = useRouter();
  return (
    <>
      <div className="lg:p-10 p-4 pt-20">
        <h1 className="text-center text-3xl text-accent uppercase font-bold mb-10 mt-4">
          MKI Programs
        </h1>

        <p>
          At Max King’s Institute (MKI), We carry out a number of activities and
          or programs to empower communities and enabling their future. As part
          of our principles, we are committed to being a leader catalyst for
          healthy and social-economic change believing that the power of our
          programs can change people’s lives for the better.
        </p>
        <p className="mt-4">
          We so strongly believe in our initiatives to tackle on different
          community’s challenges and make effective impact and opportunities for
          the greater change and sustainable development.
        </p>
        <div className="">
          <div className="grid md:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-4 mt-10">
            {programs?.map((program, index: number) => {
              return (
                <div
                  key={program.slug}
                  className="overflow-hidden bg-cover bg-no-repeat rounded relative group w-full xlg:max-w-[440px] max-w-[440px] aspect-square"
                >
                  <div className="absolute w-full m-auto left-0 right-0 top-0 bottom-0 flex flex-col items-center justify-center bg-black/30 group-hover:bg-black/0">
                    <h1 className="text-center text-primary-foreground font-bold group-hover:hidden transition-all delay-300 text-4xl bg-secondary/40  shadow-2xl">
                      {" "}
                      {program.slug}
                    </h1>
                  </div>
                  <img
                    src={program.image}
                    alt=""
                    className="object-cover rounded-md transition-all duration-300 ease-in-out hover:scale-110 h-full w-full"
                  />
                  <div className="w-full h-full absolute bg-gradient-to-b from-[#a55109b9] to-[#666666c9] -bottom-[75%] opacity-0 group-hover:bottom-0 group-hover:opacity-100 transition-all duration-300 ease-in-out flex flex-col items-center justify-center p-2 gap-3">
                    <h1 className="uppercase text-white text-2xl font-bold text-center">
                      {program.title}
                    </h1>
                    {/* <p className="text-center text-white lg:text-base text-sm">
                    BAREFOOT NOMAD is a web app that empowers individuals with
                    comprehensive medical information and resources for informed
                    healthcare decisions.{" "}
                  </p> */}
                    <Button
                      content="Explore"
                      className={`text-white font-normal opacity-100 bg-secondary`}
                      onClick={() => router.push(`/programs/${program.slug}`)}
                    >
                      Read more
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Programs;
